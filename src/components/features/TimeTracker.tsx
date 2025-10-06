import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Play, Pause, Square } from 'lucide-react';
import { TimeEntry } from '@/types';

interface TimeTrackerProps {
  taskId: string;
  onTimeLogged: (entry: TimeEntry) => void;
}

const TimeTracker = ({ taskId, onTimeLogged }: TimeTrackerProps) => {
  const { toast } = useToast();
  const [isTracking, setIsTracking] = useState(false);
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [description, setDescription] = useState('');
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTracking && !isPaused && startTime) {
      interval = setInterval(() => {
        setElapsedTime(Math.floor((Date.now() - startTime.getTime()) / 1000));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTracking, isPaused, startTime]);

  const handleStart = () => {
    setStartTime(new Date());
    setIsTracking(true);
    setIsPaused(false);
    toast({
      title: 'Timer Started',
      description: 'Time tracking has begun',
    });
  };

  const handlePause = () => {
    setIsPaused(!isPaused);
    toast({
      title: isPaused ? 'Timer Resumed' : 'Timer Paused',
    });
  };

  const handleStop = () => {
    if (!startTime) return;

    const entry: TimeEntry = {
      id: `time-${Date.now()}`,
      taskId,
      userId: 'current-user',
      startTime: startTime.toISOString(),
      endTime: new Date().toISOString(),
      duration: Math.floor(elapsedTime / 60),
      description,
      createdAt: new Date().toISOString(),
    };

    onTimeLogged(entry);
    setIsTracking(false);
    setStartTime(null);
    setElapsedTime(0);
    setDescription('');
    setIsPaused(false);

    toast({
      title: 'Time Logged',
      description: `Tracked ${Math.floor(elapsedTime / 60)} minutes`,
    });
  };

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Time Tracker</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-center">
          <div className="text-4xl font-mono font-bold mb-4">
            {formatTime(elapsedTime)}
          </div>
          <div className="flex gap-2 justify-center">
            {!isTracking ? (
              <Button onClick={handleStart}>
                <Play className="h-4 w-4 mr-2" />
                Start
              </Button>
            ) : (
              <>
                <Button onClick={handlePause} variant="outline">
                  <Pause className="h-4 w-4 mr-2" />
                  {isPaused ? 'Resume' : 'Pause'}
                </Button>
                <Button onClick={handleStop} variant="destructive">
                  <Square className="h-4 w-4 mr-2" />
                  Stop
                </Button>
              </>
            )}
          </div>
        </div>

        {isTracking && (
          <div className="space-y-2">
            <Label>Description (optional)</Label>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="What are you working on?"
              rows={2}
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TimeTracker;

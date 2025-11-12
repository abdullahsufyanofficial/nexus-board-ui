import { useState } from 'react';
import { RecurringConfig } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Calendar, Repeat } from 'lucide-react';

interface RecurringTaskConfigProps {
  config?: RecurringConfig;
  onSave: (config: RecurringConfig | undefined) => void;
}

const RecurringTaskConfig = ({ config, onSave }: RecurringTaskConfigProps) => {
  const [enabled, setEnabled] = useState(!!config);
  const [frequency, setFrequency] = useState<RecurringConfig['frequency']>(
    config?.frequency || 'weekly'
  );
  const [interval, setInterval] = useState(config?.interval || 1);
  const [endDate, setEndDate] = useState(config?.endDate || '');

  const handleSave = () => {
    if (!enabled) {
      onSave(undefined);
      return;
    }

    onSave({
      frequency,
      interval,
      endDate: endDate || undefined,
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <Repeat className="h-5 w-5" />
          Recurring Task
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <Label>Enable Recurring</Label>
          <Button
            variant={enabled ? 'default' : 'outline'}
            size="sm"
            onClick={() => setEnabled(!enabled)}
          >
            {enabled ? 'Enabled' : 'Disabled'}
          </Button>
        </div>

        {enabled && (
          <>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Frequency</Label>
                <Select value={frequency} onValueChange={(v: any) => setFrequency(v)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="daily">Daily</SelectItem>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Every</Label>
                <Input
                  type="number"
                  min="1"
                  value={interval}
                  onChange={(e) => setInterval(parseInt(e.target.value) || 1)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>End Date (Optional)</Label>
              <Input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>

            <div className="p-3 bg-muted rounded-lg">
              <p className="text-sm">
                This task will repeat every {interval} {frequency === 'daily' ? 'day' : frequency === 'weekly' ? 'week' : 'month'}
                {endDate && ` until ${new Date(endDate).toLocaleDateString()}`}
              </p>
            </div>
          </>
        )}

        <Button onClick={handleSave} className="w-full">
          Save Configuration
        </Button>
      </CardContent>
    </Card>
  );
};

export default RecurringTaskConfig;

import { WorkloadData } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Users } from 'lucide-react';

interface WorkloadViewProps {
  workloadData: WorkloadData[];
}

const WorkloadView = ({ workloadData }: WorkloadViewProps) => {
  const maxHours = Math.max(...workloadData.map(w => w.totalHours), 40);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="h-5 w-5" />
          Team Workload
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {workloadData.map((data) => {
            const utilization = (data.totalHours / maxHours) * 100;
            const isOverloaded = data.totalHours > 40;

            return (
              <div key={data.userId} className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={data.user.avatar} />
                      <AvatarFallback>{data.user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{data.user.name}</p>
                      <p className="text-sm text-muted-foreground">{data.user.role}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">
                      {data.totalHours}h / {maxHours}h
                    </p>
                    <Badge variant={isOverloaded ? 'destructive' : 'secondary'}>
                      {data.totalTasks} tasks
                    </Badge>
                  </div>
                </div>

                <Progress value={utilization} className="h-2" />

                <div className="flex gap-2 text-xs">
                  {Object.entries(data.tasksByStatus).map(([status, count]) => (
                    count > 0 && (
                      <Badge key={status} variant="outline">
                        {status}: {count}
                      </Badge>
                    )
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default WorkloadView;

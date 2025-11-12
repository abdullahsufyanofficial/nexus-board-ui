import { useState } from 'react';
import { Task } from '@/types';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { X, GitBranch } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface TaskDependenciesProps {
  task: Task;
  allTasks: Task[];
  onUpdateDependencies: (dependencies: string[]) => void;
}

const TaskDependencies = ({ task, allTasks, onUpdateDependencies }: TaskDependenciesProps) => {
  const [selectedTask, setSelectedTask] = useState('');

  const availableTasks = allTasks.filter(
    t => t.id !== task.id && !task.dependencies?.includes(t.id)
  );

  const dependentTasks = allTasks.filter(t => task.dependencies?.includes(t.id));

  const handleAddDependency = () => {
    if (selectedTask) {
      const newDeps = [...(task.dependencies || []), selectedTask];
      onUpdateDependencies(newDeps);
      setSelectedTask('');
    }
  };

  const handleRemoveDependency = (taskId: string) => {
    const newDeps = (task.dependencies || []).filter(id => id !== taskId);
    onUpdateDependencies(newDeps);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <GitBranch className="h-5 w-5" />
          Task Dependencies
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">
            This task depends on:
          </p>
          {dependentTasks.length === 0 ? (
            <p className="text-sm text-muted-foreground italic">No dependencies</p>
          ) : (
            <div className="space-y-2">
              {dependentTasks.map(depTask => (
                <div key={depTask.id} className="flex items-center justify-between p-2 border rounded">
                  <div className="flex-1">
                    <p className="text-sm font-medium">{depTask.title}</p>
                    <Badge variant="outline" className="text-xs">
                      {depTask.status}
                    </Badge>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleRemoveDependency(depTask.id)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex gap-2">
          <Select value={selectedTask} onValueChange={setSelectedTask}>
            <SelectTrigger className="flex-1">
              <SelectValue placeholder="Select task" />
            </SelectTrigger>
            <SelectContent>
              {availableTasks.map(t => (
                <SelectItem key={t.id} value={t.id}>
                  {t.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button onClick={handleAddDependency} disabled={!selectedTask}>
            Add
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default TaskDependencies;

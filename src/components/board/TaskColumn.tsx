import { useDroppable } from '@dnd-kit/core';
import { Plus } from 'lucide-react';

import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface TaskColumnProps {
  id: string;
  title: string;
  count: number;
  color: string;
  children: React.ReactNode;
  onAddTask?: () => void;
  canAddTask?: boolean;
}

const TaskColumn = ({ id, title, count, color, children, onAddTask, canAddTask = true }: TaskColumnProps) => {
  const { setNodeRef, isOver } = useDroppable({
    id,
    data: {
      type: 'column',
      status: id,
    },
  });

  return (
    <Card className={`flex flex-col h-full transition-all duration-200 ${
      isOver ? 'ring-2 ring-primary bg-primary/5' : ''
    }`}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded-full ${color}`} />
            <h3 className="font-medium">{title}</h3>
            <span className="text-muted-foreground text-sm">({count})</span>
          </div>
          {canAddTask && onAddTask && (
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-6 w-6 hover:bg-primary/10" 
              onClick={onAddTask}
            >
              <Plus className="h-4 w-4" />
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="flex-1 pt-0" ref={setNodeRef}>
        <div className="min-h-[400px]">
          {children}
        </div>
      </CardContent>
    </Card>
  );
};

export default TaskColumn;
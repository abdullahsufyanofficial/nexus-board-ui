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
}

const TaskColumn = ({ id, title, count, color, children }: TaskColumnProps) => {
  const { setNodeRef } = useDroppable({
    id,
  });

  return (
    <Card className="flex flex-col h-full">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded-full ${color}`} />
            <h3 className="font-medium">{title}</h3>
            <span className="text-muted-foreground text-sm">({count})</span>
          </div>
          <Button variant="ghost" size="icon" className="h-6 w-6">
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="flex-1 pt-0" ref={setNodeRef}>
        {children}
      </CardContent>
    </Card>
  );
};

export default TaskColumn;
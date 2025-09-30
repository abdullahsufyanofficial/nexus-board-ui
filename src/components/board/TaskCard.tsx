import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Calendar, MessageCircle, Paperclip, GripVertical } from 'lucide-react';

import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Task } from '../../types';

interface TaskCardProps {
  task: Task;
  getPriorityColor: (priority: Task['priority']) => string;
  isDragging?: boolean;
  onClick?: () => void;
}

const TaskCard = ({ task, getPriorityColor, isDragging = false, onClick }: TaskCardProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging: isSortableDragging,
  } = useSortable({ 
    id: task.id,
    data: {
      type: 'task',
      task,
    },
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const isBeingDragged = isDragging || isSortableDragging;

  return (
    <div ref={setNodeRef} style={style}>
      <Card 
        className={`cursor-pointer hover:shadow-md transition-all duration-200 group ${
          isBeingDragged ? 'opacity-50 rotate-2 shadow-xl' : ''
        }`}
        onClick={onClick}
      >
        <CardContent className="p-4">
          <div className="space-y-3">
            {/* Header with drag handle */}
            <div className="flex items-start justify-between">
              <h4 className="font-medium text-sm leading-tight flex-1 pr-2">{task.title}</h4>
              <div className="flex items-center gap-1">
                <Badge variant={getPriorityColor(task.priority) as any} className="text-xs">
                  {task.priority}
                </Badge>
                <div 
                  {...attributes} 
                  {...listeners}
                  className="opacity-0 group-hover:opacity-100 transition-opacity cursor-grab active:cursor-grabbing p-1 hover:bg-muted rounded"
                >
                  <GripVertical className="h-3 w-3 text-muted-foreground" />
                </div>
              </div>
            </div>

            {task.description && (
              <p className="text-xs text-muted-foreground line-clamp-2">
                {task.description}
              </p>
            )}

            {/* Task metadata */}
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <div className="flex items-center gap-2">
                {task.dueDate && (
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {new Date(task.dueDate).toLocaleDateString()}
                  </div>
                )}
                {task.commentsCount > 0 && (
                  <div className="flex items-center gap-1">
                    <MessageCircle className="h-3 w-3" />
                    {task.commentsCount}
                  </div>
                )}
                {task.attachments && task.attachments.length > 0 && (
                  <div className="flex items-center gap-1">
                    <Paperclip className="h-3 w-3" />
                    {task.attachments.length}
                  </div>
                )}
              </div>

              {/* Assignees */}
              <div className="flex -space-x-1">
                {task.assignees.slice(0, 2).map((assignee) => (
                  <Avatar key={assignee.id} className="h-6 w-6 border border-background">
                    <AvatarImage src={assignee.avatar} />
                    <AvatarFallback className="text-xs">
                      {assignee.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                ))}
                {task.assignees.length > 2 && (
                  <div className="h-6 w-6 rounded-full bg-muted border border-background flex items-center justify-center text-xs text-muted-foreground">
                    +{task.assignees.length - 2}
                  </div>
                )}
              </div>
            </div>

            {/* Tags */}
            {task.tags.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {task.tags.slice(0, 3).map((tag) => (
                  <Badge key={tag} variant="outline" className="text-xs px-1 py-0">
                    {tag}
                  </Badge>
                ))}
                {task.tags.length > 3 && (
                  <Badge variant="outline" className="text-xs px-1 py-0">
                    +{task.tags.length - 3}
                  </Badge>
                )}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TaskCard;
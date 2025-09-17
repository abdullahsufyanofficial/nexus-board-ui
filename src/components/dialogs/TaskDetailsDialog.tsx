import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { format } from 'date-fns';
import { 
  Calendar, 
  Clock, 
  User, 
  Tag, 
  Edit, 
  Trash2, 
  MessageCircle,
  Paperclip,
  Flag,
  CheckCircle,
  Circle,
  PlayCircle,
  Eye
} from 'lucide-react';

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { useToast } from '@/hooks/use-toast';

import { Task } from '../../types';
import { deleteTask, updateTaskStatus } from '../../store/slices/tasksSlice';
import TaskDialog from './TaskDialog';

interface TaskDetailsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  task: Task | null;
}

const TaskDetailsDialog = ({ open, onOpenChange, task }: TaskDetailsDialogProps) => {
  const dispatch = useDispatch();
  const { toast } = useToast();
  const [showEditDialog, setShowEditDialog] = useState(false);

  if (!task) return null;

  const getPriorityColor = (priority: Task['priority']) => {
    switch (priority) {
      case 'urgent':
        return 'destructive';
      case 'high':
        return 'destructive';
      case 'medium':
        return 'default';
      case 'low':
        return 'secondary';
      default:
        return 'secondary';
    }
  };

  const getStatusIcon = (status: Task['status']) => {
    switch (status) {
      case 'todo':
        return <Circle className="h-4 w-4" />;
      case 'in-progress':
        return <PlayCircle className="h-4 w-4" />;
      case 'review':
        return <Eye className="h-4 w-4" />;
      case 'done':
        return <CheckCircle className="h-4 w-4" />;
      default:
        return <Circle className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: Task['status']) => {
    switch (status) {
      case 'todo':
        return 'secondary';
      case 'in-progress':
        return 'default';
      case 'review':
        return 'warning';
      case 'done':
        return 'success';
      default:
        return 'secondary';
    }
  };

  const handleStatusChange = async (newStatus: Task['status']) => {
    try {
      await dispatch(updateTaskStatus({ taskId: task.id, status: newStatus }) as any);
      toast({
        title: "Status Updated",
        description: `Task status changed to ${newStatus.replace('-', ' ')}`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update task status.",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async () => {
    try {
      await dispatch(deleteTask(task.id) as any);
      toast({
        title: "Task Deleted",
        description: "Task has been successfully deleted.",
      });
      onOpenChange(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete task.",
        variant: "destructive",
      });
    }
  };

  const progressPercentage = task.actualHours && task.estimatedHours 
    ? Math.min((task.actualHours / task.estimatedHours) * 100, 100)
    : 0;

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <div className="flex items-start justify-between">
              <div className="space-y-2 flex-1 mr-4">
                <DialogTitle className="text-xl">{task.title}</DialogTitle>
                <div className="flex items-center gap-2">
                  <Badge variant={getStatusColor(task.status) as any} className="flex items-center gap-1">
                    {getStatusIcon(task.status)}
                    {task.status.replace('-', ' ')}
                  </Badge>
                  <Badge variant={getPriorityColor(task.priority) as any}>
                    <Flag className="h-3 w-3 mr-1" />
                    {task.priority}
                  </Badge>
                </div>
              </div>
              <div className="flex gap-1">
                <Button variant="ghost" size="sm" onClick={() => setShowEditDialog(true)}>
                  <Edit className="h-4 w-4" />
                </Button>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Delete Task</AlertDialogTitle>
                      <AlertDialogDescription>
                        Are you sure you want to delete this task? This action cannot be undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
          </DialogHeader>

          <div className="space-y-6">
            {/* Description */}
            {task.description && (
              <div>
                <h4 className="font-medium mb-2">Description</h4>
                <p className="text-muted-foreground leading-relaxed">{task.description}</p>
              </div>
            )}

            {/* Task Details Grid */}
            <div className="grid gap-4 md:grid-cols-2">
              {/* Due Date */}
              {task.dueDate && (
                <div className="flex items-center gap-3">
                  <Calendar className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Due Date</p>
                    <p className="text-sm text-muted-foreground">
                      {format(new Date(task.dueDate), 'PPP')}
                    </p>
                  </div>
                </div>
              )}

              {/* Time Tracking */}
              {(task.estimatedHours || task.actualHours) && (
                <div className="flex items-center gap-3">
                  <Clock className="h-5 w-5 text-muted-foreground" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">Time Tracking</p>
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span>Progress: {task.actualHours || 0}h / {task.estimatedHours || 0}h</span>
                        <span>{Math.round(progressPercentage)}%</span>
                      </div>
                      <Progress value={progressPercentage} className="h-1" />
                    </div>
                  </div>
                </div>
              )}

              {/* Comments */}
              {task.commentsCount > 0 && (
                <div className="flex items-center gap-3">
                  <MessageCircle className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Comments</p>
                    <p className="text-sm text-muted-foreground">{task.commentsCount} comments</p>
                  </div>
                </div>
              )}

              {/* Attachments */}
              {task.attachments && task.attachments.length > 0 && (
                <div className="flex items-center gap-3">
                  <Paperclip className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Attachments</p>
                    <p className="text-sm text-muted-foreground">{task.attachments.length} files</p>
                  </div>
                </div>
              )}
            </div>

            <Separator />

            {/* Assignees */}
            <div>
              <h4 className="font-medium mb-3 flex items-center gap-2">
                <User className="h-4 w-4" />
                Assignees ({task.assignees.length})
              </h4>
              <div className="space-y-2">
                {task.assignees.map((assignee) => (
                  <div key={assignee.id} className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={assignee.avatar} />
                      <AvatarFallback>
                        {assignee.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">{assignee.name}</p>
                      <p className="text-xs text-muted-foreground capitalize">{assignee.role}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Tags */}
            {task.tags.length > 0 && (
              <div>
                <h4 className="font-medium mb-3 flex items-center gap-2">
                  <Tag className="h-4 w-4" />
                  Tags
                </h4>
                <div className="flex flex-wrap gap-2">
                  {task.tags.map((tag) => (
                    <Badge key={tag} variant="outline">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Quick Actions */}
            <div>
              <h4 className="font-medium mb-3">Quick Actions</h4>
              <div className="flex flex-wrap gap-2">
                {task.status !== 'todo' && (
                  <Button variant="outline" size="sm" onClick={() => handleStatusChange('todo')}>
                    Move to To Do
                  </Button>
                )}
                {task.status !== 'in-progress' && (
                  <Button variant="outline" size="sm" onClick={() => handleStatusChange('in-progress')}>
                    Start Progress
                  </Button>
                )}
                {task.status !== 'review' && (
                  <Button variant="outline" size="sm" onClick={() => handleStatusChange('review')}>
                    Move to Review
                  </Button>
                )}
                {task.status !== 'done' && (
                  <Button variant="outline" size="sm" onClick={() => handleStatusChange('done')}>
                    Mark Complete
                  </Button>
                )}
              </div>
            </div>

            {/* Meta Information */}
            <div className="text-xs text-muted-foreground pt-4 border-t">
              <div className="grid gap-1 md:grid-cols-2">
                <p>Created: {format(new Date(task.createdAt), 'PPP')}</p>
                <p>Updated: {format(new Date(task.updatedAt), 'PPP')}</p>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <TaskDialog
        open={showEditDialog}
        onOpenChange={setShowEditDialog}
        task={task}
      />
    </>
  );
};

export default TaskDetailsDialog;
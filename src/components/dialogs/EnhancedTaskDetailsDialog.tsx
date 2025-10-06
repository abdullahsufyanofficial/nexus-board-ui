import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { format } from 'date-fns';
import {
  Calendar,
  Clock,
  User,
  Tag,
  Edit,
  Trash2,
  Flag
} from 'lucide-react';

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { useToast } from '@/hooks/use-toast';

import { Task, Comment, TimeEntry, Attachment } from '@/types';
import { RootState } from '@/store';
import { deleteTask, updateTaskStatus, fetchTasks } from '@/store/slices/tasksSlice';
import TaskDialog from './TaskDialog';

import TimeTracker from '@/components/features/TimeTracker';
import CommentsSection from '@/components/features/CommentsSection';
import FileAttachments from '@/components/features/FileAttachments';
import TaskDependencies from '@/components/features/TaskDependencies';

import { timeEntriesApi, commentsApi, attachmentsApi, dependenciesApi, activitiesApi } from '@/api/features';

interface EnhancedTaskDetailsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  task: Task | null;
}

const EnhancedTaskDetailsDialog = ({ open, onOpenChange, task }: EnhancedTaskDetailsDialogProps) => {
  const dispatch = useDispatch();
  const { toast } = useToast();
  const { user } = useSelector((state: RootState) => state.auth);
  const { tasks } = useSelector((state: RootState) => state.tasks);

  const [showEditDialog, setShowEditDialog] = useState(false);
  const [comments, setComments] = useState<Comment[]>([]);
  const [attachments, setAttachments] = useState<Attachment[]>([]);
  const [dependencies, setDependencies] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (task && open) {
      loadTaskData();
    }
  }, [task, open]);

  const loadTaskData = async () => {
    if (!task) return;

    setIsLoading(true);
    try {
      const [commentsData, attachmentsData, dependenciesData] = await Promise.all([
        commentsApi.getByTaskId(task.id),
        attachmentsApi.getByTaskId(task.id),
        dependenciesApi.getByTaskId(task.id),
      ]);

      setComments(commentsData as Comment[]);
      setAttachments(attachmentsData as Attachment[]);
      setDependencies(dependenciesData);
    } catch (error) {
      console.error('Error loading task data:', error);
      toast({
        title: 'Error',
        description: 'Failed to load task details',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (!task || !user) return null;

  const handleDelete = async () => {
    try {
      await dispatch(deleteTask(task.id) as any);
      toast({
        title: 'Task Deleted',
        description: 'Task has been successfully deleted.',
      });
      onOpenChange(false);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to delete task.',
        variant: 'destructive',
      });
    }
  };

  const handleTimeLogged = async (entry: TimeEntry) => {
    try {
      await timeEntriesApi.create(entry);
      await activitiesApi.create({
        type: 'time_logged',
        title: 'logged time',
        description: `${entry.duration} minutes on "${task.title}"`,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          avatar: user.avatar,
          role: user.role,
        },
        taskId: task.id,
        projectId: task.projectId,
      });

      toast({
        title: 'Time Logged',
        description: 'Time entry has been recorded.',
      });
    } catch (error) {
      console.error('Error logging time:', error);
    }
  };

  const handleAddComment = async (content: string) => {
    try {
      await commentsApi.create(task.id, content, user.id);
      await activitiesApi.create({
        type: 'comment_added',
        title: 'added a comment',
        description: `on "${task.title}"`,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          avatar: user.avatar,
          role: user.role,
        },
        taskId: task.id,
        projectId: task.projectId,
      });

      await loadTaskData();
      toast({
        title: 'Comment Added',
        description: 'Your comment has been posted.',
      });
    } catch (error) {
      console.error('Error adding comment:', error);
      toast({
        title: 'Error',
        description: 'Failed to add comment.',
        variant: 'destructive',
      });
    }
  };

  const handleAddAttachment = async (file: File) => {
    try {
      await attachmentsApi.create(task.id, file, user.id);
      await activitiesApi.create({
        type: 'file_uploaded',
        title: 'uploaded a file',
        description: `${file.name} to "${task.title}"`,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          avatar: user.avatar,
          role: user.role,
        },
        taskId: task.id,
        projectId: task.projectId,
      });

      await loadTaskData();
      toast({
        title: 'File Uploaded',
        description: 'Attachment has been added.',
      });
    } catch (error) {
      console.error('Error uploading file:', error);
      toast({
        title: 'Error',
        description: 'Failed to upload file.',
        variant: 'destructive',
      });
    }
  };

  const handleRemoveAttachment = async (attachmentId: string) => {
    try {
      await attachmentsApi.delete(attachmentId);
      await loadTaskData();
      toast({
        title: 'Attachment Removed',
        description: 'File has been deleted.',
      });
    } catch (error) {
      console.error('Error removing attachment:', error);
      toast({
        title: 'Error',
        description: 'Failed to remove attachment.',
        variant: 'destructive',
      });
    }
  };

  const handleUpdateDependencies = async (newDependencies: string[]) => {
    try {
      const added = newDependencies.filter(id => !dependencies.includes(id));
      const removed = dependencies.filter(id => !newDependencies.includes(id));

      for (const depId of added) {
        await dependenciesApi.add(task.id, depId);
      }

      for (const depId of removed) {
        await dependenciesApi.remove(task.id, depId);
      }

      setDependencies(newDependencies);
      toast({
        title: 'Dependencies Updated',
        description: 'Task dependencies have been updated.',
      });
    } catch (error) {
      console.error('Error updating dependencies:', error);
      toast({
        title: 'Error',
        description: 'Failed to update dependencies.',
        variant: 'destructive',
      });
    }
  };

  const getPriorityColor = (priority: Task['priority']) => {
    switch (priority) {
      case 'urgent':
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

  const taskWithDeps = { ...task, dependencies };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <div className="flex items-start justify-between">
              <div className="space-y-2 flex-1 mr-4">
                <DialogTitle className="text-xl">{task.title}</DialogTitle>
                <div className="flex items-center gap-2">
                  <Badge variant={task.status === 'done' ? 'default' : 'secondary'}>
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

          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="comments">Comments ({comments.length})</TabsTrigger>
              <TabsTrigger value="attachments">Files ({attachments.length})</TabsTrigger>
              <TabsTrigger value="time">Time</TabsTrigger>
              <TabsTrigger value="dependencies">Dependencies</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4">
              {task.description && (
                <div>
                  <h4 className="font-medium mb-2">Description</h4>
                  <p className="text-muted-foreground leading-relaxed">{task.description}</p>
                </div>
              )}

              <div className="grid gap-4 md:grid-cols-2">
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

                {(task.estimatedHours || task.actualHours) && (
                  <div className="flex items-center gap-3">
                    <Clock className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Time Estimate</p>
                      <p className="text-sm text-muted-foreground">
                        {task.estimatedHours || 0}h estimated
                      </p>
                    </div>
                  </div>
                )}
              </div>

              <Separator />

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
            </TabsContent>

            <TabsContent value="comments">
              <CommentsSection
                taskId={task.id}
                comments={comments}
                onAddComment={handleAddComment}
              />
            </TabsContent>

            <TabsContent value="attachments">
              <FileAttachments
                taskId={task.id}
                attachments={attachments}
                onAddAttachment={handleAddAttachment}
                onRemoveAttachment={handleRemoveAttachment}
              />
            </TabsContent>

            <TabsContent value="time">
              <TimeTracker
                taskId={task.id}
                onTimeLogged={handleTimeLogged}
              />
            </TabsContent>

            <TabsContent value="dependencies">
              <TaskDependencies
                task={taskWithDeps}
                allTasks={tasks}
                onUpdateDependencies={handleUpdateDependencies}
              />
            </TabsContent>
          </Tabs>
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

export default EnhancedTaskDetailsDialog;

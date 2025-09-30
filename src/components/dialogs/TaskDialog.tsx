import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { Calendar as CalendarIcon, User, Tag, CircleAlert as AlertCircle } from 'lucide-react';
import { format } from 'date-fns';

import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

import { RootState } from '../../store';
import { createTask, updateTask } from '../../store/slices/tasksSlice';
import { Task, TaskStatus, TaskPriority } from '../../types';
import { users } from '../../data/users';

interface TaskDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  task?: Task | null;
  projectId?: string;
  initialStatus?: TaskStatus;
}

const TaskDialog = ({ open, onOpenChange, task, projectId, initialStatus = 'todo' }: TaskDialogProps) => {
  const dispatch = useDispatch();
  const { toast } = useToast();
  const { isLoading } = useSelector((state: RootState) => state.tasks);
  
  const [selectedAssignees, setSelectedAssignees] = useState<string[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState('');
  const [dueDate, setDueDate] = useState<Date | undefined>();

  const { register, handleSubmit, setValue, watch, reset, formState: { errors } } = useForm({
    defaultValues: {
      title: '',
      description: '',
      status: initialStatus,
      priority: 'medium' as TaskPriority,
      estimatedHours: ''
    }
  });

  useEffect(() => {
    if (task) {
      reset({
        title: task.title,
        description: task.description || '',
        status: task.status,
        priority: task.priority,
        estimatedHours: task.estimatedHours?.toString() || ''
      });
      setSelectedAssignees(task.assignees.map(a => a.id));
      setTags(task.tags);
      setDueDate(task.dueDate ? new Date(task.dueDate) : undefined);
    } else {
      reset({
        title: '',
        description: '',
        status: initialStatus,
        priority: 'medium',
        estimatedHours: ''
      });
      setSelectedAssignees([]);
      setTags([]);
      setDueDate(undefined);
    }
  }, [task, initialStatus, reset]);

  const onSubmit = async (data: any) => {
    try {
      const taskData = {
        ...data,
        projectId: projectId || task?.projectId,
        boardId: selectedBoard?.id,
        assignees: users.filter(user => selectedAssignees.includes(user.id))
          .map(({ id, name, email, avatar, role }) => ({ id, name, email, avatar, role })),
        tags,
        dueDate: dueDate?.toISOString(),
        estimatedHours: data.estimatedHours ? parseInt(data.estimatedHours) : undefined
      };

      if (task) {
        await dispatch(updateTask({ id: task.id, ...taskData }) as any);
        toast({
          title: "Task Updated",
          description: "Task has been successfully updated.",
        });
      } else {
        await dispatch(createTask(taskData) as any);
        toast({
          title: "Task Created",
          description: "New task has been successfully created.",
        });
      }
      
      onOpenChange(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleAssigneeToggle = (userId: string) => {
    setSelectedAssignees(prev => 
      prev.includes(userId) 
        ? prev.filter(id => id !== userId)
        : [...prev, userId]
    );
  };

  const handleAddTag = () => {
    if (newTag && !tags.includes(newTag)) {
      setTags(prev => [...prev, newTag]);
      setNewTag('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(prev => prev.filter(tag => tag !== tagToRemove));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{task ? 'Edit Task' : 'Create New Task'}</DialogTitle>
          <DialogDescription>
            {task ? 'Update task details and assignments' : 'Create a new task for your project'}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title *</Label>
              <Input
                id="title"
                {...register('title', { required: 'Title is required' })}
                placeholder="Enter task title"
              />
              {errors.title && (
                <p className="text-sm text-destructive flex items-center gap-1">
                  <AlertCircle className="h-4 w-4" />
                  {errors.title.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                {...register('description')}
                placeholder="Enter task description"
                rows={3}
              />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label>Status</Label>
                <Select value={watch('status')} onValueChange={(value) => setValue('status', value as TaskStatus)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todo">To Do</SelectItem>
                    <SelectItem value="in-progress">In Progress</SelectItem>
                    <SelectItem value="review">Review</SelectItem>
                    <SelectItem value="done">Done</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Priority</Label>
                <Select value={watch('priority')} onValueChange={(value) => setValue('priority', value as TaskPriority)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="urgent">Urgent</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label>Due Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !dueDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {dueDate ? format(dueDate, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={dueDate}
                      onSelect={setDueDate}
                      initialFocus
                      className="pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-2">
                <Label htmlFor="estimatedHours">Estimated Hours</Label>
                <Input
                  id="estimatedHours"
                  {...register('estimatedHours')}
                  placeholder="e.g., 8"
                  type="number"
                  min="0"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Assignees</Label>
              <div className="space-y-2">
                <div className="flex flex-wrap gap-2">
                  {selectedAssignees.map(userId => {
                    const user = users.find(u => u.id === userId);
                    return user ? (
                      <Badge key={userId} variant="secondary" className="flex items-center gap-1">
                        <Avatar className="h-4 w-4">
                          <AvatarImage src={user.avatar} />
                          <AvatarFallback className="text-xs">
                            {user.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        {user.name}
                        <button
                          type="button"
                          onClick={() => handleAssigneeToggle(userId)}
                          className="ml-1 hover:text-destructive"
                        >
                          ×
                        </button>
                      </Badge>
                    ) : null;
                  })}
                </div>
                <Select onValueChange={handleAssigneeToggle}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select assignees" />
                  </SelectTrigger>
                  <SelectContent>
                    {users.map(user => (
                      <SelectItem key={user.id} value={user.id}>
                        <div className="flex items-center gap-2">
                          <Avatar className="h-6 w-6">
                            <AvatarImage src={user.avatar} />
                            <AvatarFallback className="text-xs">
                              {user.name.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{user.name}</p>
                            <p className="text-sm text-muted-foreground">{user.role}</p>
                          </div>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Tags</Label>
              <div className="space-y-2">
                <div className="flex flex-wrap gap-1">
                  {tags.map(tag => (
                    <Badge key={tag} variant="outline" className="flex items-center gap-1">
                      {tag}
                      <button
                        type="button"
                        onClick={() => handleRemoveTag(tag)}
                        className="ml-1 hover:text-destructive"
                      >
                        ×
                      </button>
                    </Badge>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Input
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    placeholder="Add a tag"
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
                  />
                  <Button type="button" variant="outline" onClick={handleAddTag}>
                    Add
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'Saving...' : task ? 'Update Task' : 'Create Task'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default TaskDialog;
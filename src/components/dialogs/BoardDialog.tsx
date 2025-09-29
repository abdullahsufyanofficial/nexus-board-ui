import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { Palette, CircleAlert as AlertCircle } from 'lucide-react';

import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';

import { RootState } from '../../store';
import { createBoard, updateBoard } from '../../store/slices/boardsSlice';
import { Board } from '../../types';

interface BoardDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  board?: Board | null;
  projectId: string;
}

const colorOptions = [
  { value: 'bg-blue-500', label: 'Blue', color: '#3b82f6' },
  { value: 'bg-green-500', label: 'Green', color: '#10b981' },
  { value: 'bg-red-500', label: 'Red', color: '#ef4444' },
  { value: 'bg-purple-500', label: 'Purple', color: '#8b5cf6' },
  { value: 'bg-orange-500', label: 'Orange', color: '#f97316' },
  { value: 'bg-pink-500', label: 'Pink', color: '#ec4899' },
  { value: 'bg-indigo-500', label: 'Indigo', color: '#6366f1' },
  { value: 'bg-teal-500', label: 'Teal', color: '#14b8a6' },
];

const BoardDialog = ({ open, onOpenChange, board, projectId }: BoardDialogProps) => {
  const dispatch = useDispatch();
  const { toast } = useToast();
  const { isLoading } = useSelector((state: RootState) => state.boards);
  const { user } = useSelector((state: RootState) => state.auth);
  
  const [selectedColor, setSelectedColor] = useState('bg-blue-500');
  const [isEnabled, setIsEnabled] = useState(true);
  const [isFrozen, setIsFrozen] = useState(false);
  const [status, setStatus] = useState<'active' | 'inactive'>('active');

  const { register, handleSubmit, setValue, watch, reset, formState: { errors } } = useForm({
    defaultValues: {
      name: '',
      description: '',
    }
  });

  useEffect(() => {
    if (board) {
      reset({
        name: board.name,
        description: board.description || '',
      });
      setSelectedColor(board.color);
      setIsEnabled(board.isEnabled);
      setIsFrozen(board.isFrozen);
      setStatus(board.status);
    } else {
      reset({
        name: '',
        description: '',
      });
      setSelectedColor('bg-blue-500');
      setIsEnabled(true);
      setIsFrozen(false);
      setStatus('active');
    }
  }, [board, reset]);

  const onSubmit = async (data: any) => {
    try {
      const boardData = {
        ...data,
        projectId,
        color: selectedColor,
        status,
        isEnabled,
        isFrozen,
        createdBy: user?.id || '',
      };

      if (board) {
        await dispatch(updateBoard({ id: board.id, ...boardData }) as any);
        toast({
          title: "Board Updated",
          description: "Board has been successfully updated.",
        });
      } else {
        await dispatch(createBoard(boardData) as any);
        toast({
          title: "Board Created",
          description: "New board has been successfully created.",
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

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>{board ? 'Edit Board' : 'Create New Board'}</DialogTitle>
          <DialogDescription>
            {board ? 'Update board settings and permissions' : 'Create a new board for organizing tasks'}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Board Name *</Label>
              <Input
                id="name"
                {...register('name', { required: 'Board name is required' })}
                placeholder="Enter board name"
              />
              {errors.name && (
                <p className="text-sm text-destructive flex items-center gap-1">
                  <AlertCircle className="h-4 w-4" />
                  {errors.name.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                {...register('description')}
                placeholder="Enter board description"
                rows={2}
              />
            </div>

            <div className="space-y-2">
              <Label>Board Color</Label>
              <div className="grid grid-cols-4 gap-2">
                {colorOptions.map((color) => (
                  <button
                    key={color.value}
                    type="button"
                    onClick={() => setSelectedColor(color.value)}
                    className={`relative w-full h-10 rounded-lg border-2 transition-all ${
                      selectedColor === color.value 
                        ? 'border-primary scale-105 shadow-lg' 
                        : 'border-border hover:border-primary/50'
                    }`}
                    style={{ backgroundColor: color.color }}
                  >
                    {selectedColor === color.value && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-4 h-4 bg-white rounded-full flex items-center justify-center">
                          <div className="w-2 h-2 bg-primary rounded-full" />
                        </div>
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Status</Label>
                  <p className="text-sm text-muted-foreground">
                    Active boards are visible to all team members
                  </p>
                </div>
                <Select value={status} onValueChange={(value: 'active' | 'inactive') => setStatus(value)}>
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Enable Board</Label>
                  <p className="text-sm text-muted-foreground">
                    Disabled boards cannot be used for task management
                  </p>
                </div>
                <Switch
                  checked={isEnabled}
                  onCheckedChange={setIsEnabled}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Freeze Board</Label>
                  <p className="text-sm text-muted-foreground">
                    Frozen boards are read-only and cannot be modified
                  </p>
                </div>
                <Switch
                  checked={isFrozen}
                  onCheckedChange={setIsFrozen}
                />
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'Saving...' : board ? 'Update Board' : 'Create Board'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default BoardDialog;
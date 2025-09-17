import { useState } from 'react';
import { Filter, X } from 'lucide-react';

import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

import { Task, TaskStatus, TaskPriority } from '../../types';
import { users } from '../../data/users';

export interface FilterOptions {
  status: TaskStatus[];
  priority: TaskPriority[];
  assignees: string[];
  tags: string[];
  dueDateRange: 'all' | 'overdue' | 'today' | 'week' | 'month';
}

interface FilterDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  filters: FilterOptions;
  onFiltersChange: (filters: FilterOptions) => void;
  availableTags: string[];
}

const FilterDialog = ({ open, onOpenChange, filters, onFiltersChange, availableTags }: FilterDialogProps) => {
  const [localFilters, setLocalFilters] = useState<FilterOptions>(filters);

  const handleStatusToggle = (status: TaskStatus) => {
    setLocalFilters(prev => ({
      ...prev,
      status: prev.status.includes(status)
        ? prev.status.filter(s => s !== status)
        : [...prev.status, status]
    }));
  };

  const handlePriorityToggle = (priority: TaskPriority) => {
    setLocalFilters(prev => ({
      ...prev,
      priority: prev.priority.includes(priority)
        ? prev.priority.filter(p => p !== priority)
        : [...prev.priority, priority]
    }));
  };

  const handleAssigneeToggle = (assigneeId: string) => {
    setLocalFilters(prev => ({
      ...prev,
      assignees: prev.assignees.includes(assigneeId)
        ? prev.assignees.filter(a => a !== assigneeId)
        : [...prev.assignees, assigneeId]
    }));
  };

  const handleTagToggle = (tag: string) => {
    setLocalFilters(prev => ({
      ...prev,
      tags: prev.tags.includes(tag)
        ? prev.tags.filter(t => t !== tag)
        : [...prev.tags, tag]
    }));
  };

  const handleApply = () => {
    onFiltersChange(localFilters);
    onOpenChange(false);
  };

  const handleClear = () => {
    const clearedFilters: FilterOptions = {
      status: [],
      priority: [],
      assignees: [],
      tags: [],
      dueDateRange: 'all'
    };
    setLocalFilters(clearedFilters);
    onFiltersChange(clearedFilters);
  };

  const activeFiltersCount = 
    localFilters.status.length + 
    localFilters.priority.length + 
    localFilters.assignees.length + 
    localFilters.tags.length + 
    (localFilters.dueDateRange !== 'all' ? 1 : 0);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filter Tasks
            {activeFiltersCount > 0 && (
              <Badge variant="secondary" className="ml-2">
                {activeFiltersCount}
              </Badge>
            )}
          </DialogTitle>
          <DialogDescription>
            Filter tasks by status, priority, assignees, and more
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 max-h-[60vh] overflow-y-auto">
          {/* Status Filter */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">Status</Label>
            <div className="grid grid-cols-2 gap-2">
              {[
                { value: 'todo', label: 'To Do' },
                { value: 'in-progress', label: 'In Progress' },
                { value: 'review', label: 'Review' },
                { value: 'done', label: 'Done' }
              ].map(status => (
                <div key={status.value} className="flex items-center space-x-2">
                  <Checkbox
                    id={`status-${status.value}`}
                    checked={localFilters.status.includes(status.value as TaskStatus)}
                    onCheckedChange={() => handleStatusToggle(status.value as TaskStatus)}
                  />
                  <Label htmlFor={`status-${status.value}`} className="text-sm">
                    {status.label}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          {/* Priority Filter */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">Priority</Label>
            <div className="grid grid-cols-2 gap-2">
              {[
                { value: 'low', label: 'Low' },
                { value: 'medium', label: 'Medium' },
                { value: 'high', label: 'High' },
                { value: 'urgent', label: 'Urgent' }
              ].map(priority => (
                <div key={priority.value} className="flex items-center space-x-2">
                  <Checkbox
                    id={`priority-${priority.value}`}
                    checked={localFilters.priority.includes(priority.value as TaskPriority)}
                    onCheckedChange={() => handlePriorityToggle(priority.value as TaskPriority)}
                  />
                  <Label htmlFor={`priority-${priority.value}`} className="text-sm">
                    {priority.label}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          {/* Due Date Filter */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">Due Date</Label>
            <Select
              value={localFilters.dueDateRange}
              onValueChange={(value) => setLocalFilters(prev => ({ ...prev, dueDateRange: value as any }))}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Tasks</SelectItem>
                <SelectItem value="overdue">Overdue</SelectItem>
                <SelectItem value="today">Due Today</SelectItem>
                <SelectItem value="week">Due This Week</SelectItem>
                <SelectItem value="month">Due This Month</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Separator />

          {/* Assignee Filter */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">Assignees</Label>
            <div className="space-y-2 max-h-32 overflow-y-auto">
              {users.map(user => (
                <div key={user.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={`assignee-${user.id}`}
                    checked={localFilters.assignees.includes(user.id)}
                    onCheckedChange={() => handleAssigneeToggle(user.id)}
                  />
                  <Avatar className="h-6 w-6">
                    <AvatarImage src={user.avatar} />
                    <AvatarFallback className="text-xs">
                      {user.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <Label htmlFor={`assignee-${user.id}`} className="text-sm flex-1">
                    {user.name}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Tags Filter */}
          {availableTags.length > 0 && (
            <>
              <Separator />
              <div className="space-y-2">
                <Label className="text-sm font-medium">Tags</Label>
                <div className="space-y-2 max-h-24 overflow-y-auto">
                  {availableTags.map(tag => (
                    <div key={tag} className="flex items-center space-x-2">
                      <Checkbox
                        id={`tag-${tag}`}
                        checked={localFilters.tags.includes(tag)}
                        onCheckedChange={() => handleTagToggle(tag)}
                      />
                      <Label htmlFor={`tag-${tag}`} className="text-sm">
                        {tag}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>

        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={handleClear}>
            Clear All
          </Button>
          <Button onClick={handleApply}>
            Apply Filters
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default FilterDialog;
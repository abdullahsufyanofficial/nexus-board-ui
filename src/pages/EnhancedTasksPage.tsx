import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Plus } from 'lucide-react';

import { RootState, AppDispatch } from '@/store';
import { fetchTasks } from '@/store/slices/tasksSlice';
import { fetchProjects } from '@/store/slices/projectsSlice';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

import AdvancedSearch from '@/components/features/AdvancedSearch';
import TaskTemplates from '@/components/features/TaskTemplates';
import TaskDialog from '@/components/dialogs/TaskDialog';
import EnhancedTaskDetailsDialog from '@/components/dialogs/EnhancedTaskDetailsDialog';
import { SearchFilters, Task, TaskTemplate } from '@/types';
import { templatesApi } from '@/api/features';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';

const EnhancedTasksPage = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { tasks, isLoading } = useSelector((state: RootState) => state.tasks);
  const { projects } = useSelector((state: RootState) => state.projects);

  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [detailsDialogOpen, setDetailsDialogOpen] = useState(false);
  const [templates, setTemplates] = useState<TaskTemplate[]>([]);
  const [filteredTasks, setFilteredTasks] = useState<Task[]>(tasks);

  useEffect(() => {
    dispatch(fetchTasks(undefined));
    dispatch(fetchProjects());
    loadTemplates();
  }, [dispatch]);

  useEffect(() => {
    setFilteredTasks(tasks);
  }, [tasks]);

  const loadTemplates = async () => {
    try {
      const data = await templatesApi.getAll();
      setTemplates(data as TaskTemplate[]);
    } catch (error) {
      console.error('Error loading templates:', error);
    }
  };

  const handleSearch = (filters: SearchFilters) => {
    let filtered = [...tasks];

    if (filters.query) {
      filtered = filtered.filter(task =>
        task.title.toLowerCase().includes(filters.query!.toLowerCase()) ||
        task.description?.toLowerCase().includes(filters.query!.toLowerCase())
      );
    }

    if (filters.priorities && filters.priorities.length > 0) {
      filtered = filtered.filter(task => filters.priorities!.includes(task.priority));
    }

    if (filters.statuses && filters.statuses.length > 0) {
      filtered = filtered.filter(task => filters.statuses!.includes(task.status));
    }

    if (filters.tags && filters.tags.length > 0) {
      filtered = filtered.filter(task =>
        task.tags.some(tag => filters.tags!.includes(tag))
      );
    }

    if (filters.dateRange) {
      filtered = filtered.filter(task => {
        if (!task.dueDate) return false;
        const dueDate = new Date(task.dueDate);
        const start = filters.dateRange!.start ? new Date(filters.dateRange!.start) : null;
        const end = filters.dateRange!.end ? new Date(filters.dateRange!.end) : null;

        if (start && dueDate < start) return false;
        if (end && dueDate > end) return false;
        return true;
      });
    }

    setFilteredTasks(filtered);
  };

  const handleUseTemplate = (template: TaskTemplate) => {
    setIsCreateDialogOpen(true);
  };

  const handleTaskClick = (task: Task) => {
    setSelectedTask(task);
    setDetailsDialogOpen(true);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'destructive';
      case 'high': return 'secondary';
      case 'medium': return 'outline';
      default: return 'outline';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'done': return 'default';
      case 'in-progress': return 'secondary';
      case 'review': return 'outline';
      default: return 'outline';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Tasks</h1>
          <p className="text-muted-foreground">Manage and track all your tasks with advanced features</p>
        </div>

        <div className="flex gap-2">
          <TaskTemplates templates={templates} onUseTemplate={handleUseTemplate} />
          <Button onClick={() => setIsCreateDialogOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            New Task
          </Button>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <AdvancedSearch onSearch={handleSearch} />
      </div>

      <div className="grid gap-4">
        {isLoading ? (
          <div className="text-center py-8">Loading tasks...</div>
        ) : filteredTasks.length === 0 ? (
          <Card>
            <CardContent className="pt-6">
              <div className="text-center py-8">
                <p className="text-muted-foreground">No tasks found</p>
              </div>
            </CardContent>
          </Card>
        ) : (
          filteredTasks.map((task) => {
            const project = projects.find(p => p.id === task.projectId);
            return (
              <Card
                key={task.id}
                className="hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => handleTaskClick(task)}
              >
                <CardContent className="pt-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-semibold">{task.title}</h3>
                        <Badge variant={getPriorityColor(task.priority) as any}>{task.priority}</Badge>
                        <Badge variant={getStatusColor(task.status) as any}>{task.status}</Badge>
                      </div>

                      {task.description && (
                        <p className="text-sm text-muted-foreground mb-2 line-clamp-2">{task.description}</p>
                      )}

                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        {project && <span>{project.name}</span>}
                        {task.dueDate && (
                          <span>{format(new Date(task.dueDate), 'MMM dd, yyyy')}</span>
                        )}
                        {task.assignees.length > 0 && (
                          <span>{task.assignees.length} assignee{task.assignees.length > 1 ? 's' : ''}</span>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })
        )}
      </div>

      <TaskDialog
        open={isCreateDialogOpen}
        onOpenChange={setIsCreateDialogOpen}
      />

      <EnhancedTaskDetailsDialog
        open={detailsDialogOpen}
        onOpenChange={setDetailsDialogOpen}
        task={selectedTask}
      />
    </div>
  );
};

export default EnhancedTasksPage;

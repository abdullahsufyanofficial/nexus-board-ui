import { useEffect, useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  SortableContext,
  arrayMove,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { ArrowLeft, Plus, Filter, Users, Calendar } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import TaskCard from '../components/board/TaskCard';
import TaskColumn from '../components/board/TaskColumn';
import TaskDialog from '../components/dialogs/TaskDialog';
import TaskDetailsDialog from '../components/dialogs/TaskDetailsDialog';
import FilterDialog, { FilterOptions } from '../components/dialogs/FilterDialog';
import AssigneesDialog from '../components/dialogs/AssigneesDialog';

import { RootState } from '../store';
import { fetchProjectById } from '../store/slices/projectsSlice';
import { fetchTasks, updateTaskStatus, moveTaskOptimistic } from '../store/slices/tasksSlice';
import { Task } from '../types';

const columns = [
  { id: 'todo', title: 'To Do', color: 'bg-muted' },
  { id: 'in-progress', title: 'In Progress', color: 'bg-primary' },
  { id: 'review', title: 'Review', color: 'bg-warning' },
  { id: 'done', title: 'Done', color: 'bg-success' },
] as const;

const BoardPage = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const dispatch = useDispatch();
  const { currentProject } = useSelector((state: RootState) => state.projects);
  const { tasks, isLoading } = useSelector((state: RootState) => state.tasks);
  
  const [activeTask, setActiveTask] = useState<Task | null>(null);
  const [showTaskDialog, setShowTaskDialog] = useState(false);
  const [showTaskDetails, setShowTaskDetails] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [newTaskStatus, setNewTaskStatus] = useState<Task['status']>('todo');
  const [showFilters, setShowFilters] = useState(false);
  const [showAssignees, setShowAssignees] = useState(false);
  const [filters, setFilters] = useState<FilterOptions>({
    status: [],
    priority: [],
    assignees: [],
    tags: [],
    dueDateRange: 'all'
  });

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  useEffect(() => {
    if (projectId) {
      dispatch(fetchProjectById(projectId) as any);
      dispatch(fetchTasks(projectId) as any);
    }
  }, [dispatch, projectId]);

  if (!projectId) {
    return <Navigate to="/projects" replace />;
  }

  const projectTasks = tasks.filter(task => task.projectId === projectId);

  // Apply filters
  const filteredTasks = projectTasks.filter(task => {
    // Status filter
    if (filters.status.length > 0 && !filters.status.includes(task.status)) {
      return false;
    }
    
    // Priority filter
    if (filters.priority.length > 0 && !filters.priority.includes(task.priority)) {
      return false;
    }
    
    // Assignee filter
    if (filters.assignees.length > 0 && !task.assignees.some(a => filters.assignees.includes(a.id))) {
      return false;
    }
    
    // Tag filter
    if (filters.tags.length > 0 && !task.tags.some(t => filters.tags.includes(t))) {
      return false;
    }
    
    // Due date filter
    if (filters.dueDateRange !== 'all' && task.dueDate) {
      const dueDate = new Date(task.dueDate);
      const now = new Date();
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      
      switch (filters.dueDateRange) {
        case 'overdue':
          if (dueDate >= today && task.status !== 'done') return false;
          break;
        case 'today':
          const tomorrow = new Date(today.getTime() + 24 * 60 * 60 * 1000);
          if (dueDate < today || dueDate >= tomorrow) return false;
          break;
        case 'week':
          const weekFromNow = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
          if (dueDate < today || dueDate >= weekFromNow) return false;
          break;
        case 'month':
          const monthFromNow = new Date(today.getTime() + 30 * 24 * 60 * 60 * 1000);
          if (dueDate < today || dueDate >= monthFromNow) return false;
          break;
      }
    }
    
    return true;
  });

  // Get unique tags for filter options
  const availableTags = Array.from(new Set(projectTasks.flatMap(task => task.tags)));

  const getTasksByStatus = (status: Task['status']) => {
    return filteredTasks.filter(task => task.status === status);
  };

  const handleDragStart = (event: DragStartEvent) => {
    const task = projectTasks.find(t => t.id === event.active.id);
    if (task) {
      setActiveTask(task);
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveTask(null);

    if (!over) return;

    const taskId = active.id as string;
    const newStatus = over.id as Task['status'];
    
    const task = filteredTasks.find(t => t.id === taskId);
    if (!task || task.status === newStatus) return;

    // Optimistic update
    dispatch(moveTaskOptimistic({ taskId, newStatus }));
    
    // Update on server
    dispatch(updateTaskStatus({ taskId, status: newStatus }) as any);
  };

  const handleTaskClick = (task: Task) => {
    setSelectedTask(task);
    setShowTaskDetails(true);
  };

  const handleAddTask = (status?: Task['status']) => {
    setNewTaskStatus(status || 'todo');
    setShowTaskDialog(true);
  };

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

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to={`/projects/${projectId}`}>
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold">
                {currentProject?.name || 'Project Board'}
              </h1>
              <p className="text-muted-foreground">
                Manage tasks with drag and drop Kanban board
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" onClick={() => setShowFilters(true)}>
              <Filter className="mr-2 h-4 w-4" />
              Filter
              {(filters.status.length + filters.priority.length + filters.assignees.length + filters.tags.length + (filters.dueDateRange !== 'all' ? 1 : 0)) > 0 && (
                <Badge variant="secondary" className="ml-2">
                  {filters.status.length + filters.priority.length + filters.assignees.length + filters.tags.length + (filters.dueDateRange !== 'all' ? 1 : 0)}
                </Badge>
              )}
            </Button>
            <Button variant="outline" size="sm" onClick={() => setShowAssignees(true)}>
              <Users className="mr-2 h-4 w-4" />
              Assignees
            </Button>
            <Button onClick={() => handleAddTask()}>
              <Plus className="mr-2 h-4 w-4" />
              Add Task
            </Button>
          </div>
        </div>

        {/* Board Stats */}
        <div className="grid grid-cols-4 gap-4 mt-6">
          {columns.map((column) => {
            const columnTasks = getTasksByStatus(column.id);
            return (
              <Card key={column.id}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">{column.title}</p>
                      <p className="text-2xl font-bold">{columnTasks.length}</p>
                    </div>
                    <div className={`w-3 h-3 rounded-full ${column.color}`} />
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </motion.div>

      {/* Kanban Board */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <DndContext
          sensors={sensors}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >
          <div className="grid grid-cols-4 gap-6 min-h-[600px]">
            {columns.map((column) => {
              const columnTasks = getTasksByStatus(column.id);
              return (
                <TaskColumn
                  key={column.id}
                  id={column.id}
                  title={column.title}
                  count={columnTasks.length}
                  color={column.color}
                  onAddTask={() => handleAddTask(column.id)}
                >
                  <SortableContext
                    items={columnTasks.map(task => task.id)}
                    strategy={verticalListSortingStrategy}
                  >
                    <div className="space-y-3">
                      {columnTasks.map((task) => (
                        <TaskCard
                          key={task.id}
                          task={task}
                          getPriorityColor={getPriorityColor}
                          onClick={() => handleTaskClick(task)}
                        />
                      ))}
                    </div>
                  </SortableContext>
                </TaskColumn>
              );
            })}
          </div>

          <DragOverlay>
            {activeTask ? (
              <TaskCard
                task={activeTask}
                getPriorityColor={getPriorityColor}
                isDragging
              />
            ) : null}
          </DragOverlay>
        </DndContext>
      </motion.div>

      <TaskDialog
        open={showTaskDialog}
        onOpenChange={setShowTaskDialog}
        projectId={projectId}
        initialStatus={newTaskStatus}
      />

      <TaskDetailsDialog
        open={showTaskDetails}
        onOpenChange={setShowTaskDetails}
        task={selectedTask}
      />

      <FilterDialog
        open={showFilters}
        onOpenChange={setShowFilters}
        filters={filters}
        onFiltersChange={setFilters}
        availableTags={availableTags}
      />

      <AssigneesDialog
        open={showAssignees}
        onOpenChange={setShowAssignees}
        projectId={projectId}
      />
    </div>
  );
};

export default BoardPage;
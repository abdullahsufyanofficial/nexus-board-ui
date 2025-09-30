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
  closestCenter,
  DragOverEvent,
} from '@dnd-kit/core';
import {
  SortableContext,
  arrayMove,
  horizontalListSortingStrategy,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { ArrowLeft, Plus, Filter, Users, Calendar, Settings, Layers } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import BoardCard from '../components/board/BoardCard';
import TaskCard from '../components/board/TaskCard';
import TaskColumn from '../components/board/TaskColumn';
import BoardDialog from '../components/dialogs/BoardDialog';
import TaskDialog from '../components/dialogs/TaskDialog';
import TaskDetailsDialog from '../components/dialogs/TaskDetailsDialog';
import FilterDialog, { FilterOptions } from '../components/dialogs/FilterDialog';
import AssigneesDialog from '../components/dialogs/AssigneesDialog';
import { useToast } from '@/hooks/use-toast';

import { RootState } from '../store';
import { fetchProjectById } from '../store/slices/projectsSlice';
import { fetchTasks, updateTaskStatus, moveTaskOptimistic } from '../store/slices/tasksSlice';
import { fetchBoards, updateBoard, deleteBoard, reorderBoards, reorderBoardsOptimistic } from '../store/slices/boardsSlice';
import { Board, Task, TaskStatus } from '../types';

const TASK_COLUMNS = [
  { id: 'todo', title: 'To Do', color: 'bg-slate-500' },
  { id: 'in-progress', title: 'In Progress', color: 'bg-blue-500' },
  { id: 'review', title: 'Review', color: 'bg-amber-500' },
  { id: 'done', title: 'Done', color: 'bg-green-500' },
] as const;

const BoardPage = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const dispatch = useDispatch();
  const { toast } = useToast();
  const { currentProject } = useSelector((state: RootState) => state.projects);
  const { tasks } = useSelector((state: RootState) => state.tasks);
  const { boards, isLoading } = useSelector((state: RootState) => state.boards);
  const { user } = useSelector((state: RootState) => state.auth);
  
  const [activeBoard, setActiveBoard] = useState<Board | null>(null);
  const [activeTask, setActiveTask] = useState<Task | null>(null);
  const [selectedBoard, setSelectedBoard] = useState<Board | null>(null);
  const [showBoardDialog, setShowBoardDialog] = useState(false);
  const [editingBoard, setEditingBoard] = useState<Board | null>(null);
  const [deletingBoard, setDeletingBoard] = useState<Board | null>(null);
  const [showTaskDialog, setShowTaskDialog] = useState(false);
  const [showTaskDetails, setShowTaskDetails] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [showAssignees, setShowAssignees] = useState(false);
  const [newTaskStatus, setNewTaskStatus] = useState<TaskStatus>('todo');
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
      dispatch(fetchBoards(projectId) as any);
    }
  }, [dispatch, projectId]);

  useEffect(() => {
    if (boards.length > 0 && !selectedBoard) {
      const activeBoard = boards.find(b => b.status === 'active' && b.isEnabled) || boards[0];
      setSelectedBoard(activeBoard);
    }
  }, [boards, selectedBoard]);

  if (!projectId) {
    return <Navigate to="/dashboard/projects" replace />;
  }

  const canManageBoards = user?.role === 'admin' || user?.role === 'manager';

  const getTasksByBoard = (boardId: string) => {
    return tasks.filter(task => task.boardId === boardId || (!task.boardId && boardId === boards[0]?.id));
  };

  const getTasksByStatus = (status: TaskStatus, boardId?: string) => {
    const boardTasks = boardId ? getTasksByBoard(boardId) : tasks;
    return boardTasks.filter(task => task.status === status);
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

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    
    if (active.data.current?.type === 'board') {
      const board = boards.find(b => b.id === active.id);
      if (board) {
        setActiveBoard(board);
      }
    } else if (active.data.current?.type === 'task') {
      const task = tasks.find(t => t.id === active.id);
      if (task) {
        setActiveTask(task);
      }
    }
  };

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
    
    if (!over) return;
    
    // Handle task drag over different columns
    if (active.data.current?.type === 'task' && over.data.current?.type === 'column') {
      const taskId = active.id as string;
      const newStatus = over.id as TaskStatus;
      
      const task = tasks.find(t => t.id === taskId);
      if (task && task.status !== newStatus) {
        // Optimistic update
        dispatch(moveTaskOptimistic({ taskId, newStatus }));
      }
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    setActiveBoard(null);
    setActiveTask(null);

    if (!over) return;

    // Handle board reordering
    if (active.data.current?.type === 'board' && over.data.current?.type === 'board') {
      const oldIndex = boards.findIndex(b => b.id === active.id);
      const newIndex = boards.findIndex(b => b.id === over.id);

      if (oldIndex !== -1 && newIndex !== -1 && oldIndex !== newIndex) {
        const newOrder = arrayMove(boards, oldIndex, newIndex);
        const boardIds = newOrder.map(b => b.id);
        
        // Optimistic update
        dispatch(reorderBoardsOptimistic(boardIds));
        
        // Update on server
        dispatch(reorderBoards(boardIds) as any);
      }
    }
    
    // Handle task status change
    else if (active.data.current?.type === 'task') {
      const taskId = active.id as string;
      let newStatus: TaskStatus;
      
      if (over.data.current?.type === 'column') {
        newStatus = over.id as TaskStatus;
      } else if (over.data.current?.type === 'task') {
        const overTask = tasks.find(t => t.id === over.id);
        newStatus = overTask?.status || 'todo';
      } else {
        return;
      }
      
      const task = tasks.find(t => t.id === taskId);
      if (task && task.status !== newStatus) {
        // Update on server
        dispatch(updateTaskStatus({ taskId, status: newStatus }) as any);
      }
    }
  };

  const handleBoardSelect = (board: Board) => {
    if (!board.isEnabled) {
      toast({
        title: "Board Disabled",
        description: "This board is currently disabled and cannot be accessed.",
        variant: "destructive",
      });
      return;
    }
    setSelectedBoard(board);
  };

  const handleEditBoard = (board: Board) => {
    setEditingBoard(board);
    setShowBoardDialog(true);
  };

  const handleDeleteBoard = async () => {
    if (!deletingBoard) return;
    
    try {
      await dispatch(deleteBoard(deletingBoard.id) as any);
      toast({
        title: "Board Deleted",
        description: "Board has been successfully deleted.",
      });
      
      // Select another board if the deleted one was selected
      if (selectedBoard?.id === deletingBoard.id) {
        const remainingBoards = boards.filter(b => b.id !== deletingBoard.id);
        setSelectedBoard(remainingBoards[0] || null);
      }
      
      setDeletingBoard(null);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete board.",
        variant: "destructive",
      });
    }
  };

  const handleToggleBoardStatus = async (board: Board) => {
    try {
      await dispatch(updateBoard({
        id: board.id,
        status: board.status === 'active' ? 'inactive' : 'active'
      }) as any);
      
      toast({
        title: "Board Updated",
        description: `Board ${board.status === 'active' ? 'deactivated' : 'activated'} successfully.`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update board status.",
        variant: "destructive",
      });
    }
  };

  const handleToggleBoardEnabled = async (board: Board) => {
    try {
      await dispatch(updateBoard({
        id: board.id,
        isEnabled: !board.isEnabled
      }) as any);
      
      toast({
        title: "Board Updated",
        description: `Board ${board.isEnabled ? 'disabled' : 'enabled'} successfully.`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update board.",
        variant: "destructive",
      });
    }
  };

  const handleToggleBoardFrozen = async (board: Board) => {
    try {
      await dispatch(updateBoard({
        id: board.id,
        isFrozen: !board.isFrozen
      }) as any);
      
      toast({
        title: "Board Updated",
        description: `Board ${board.isFrozen ? 'unfrozen' : 'frozen'} successfully.`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update board.",
        variant: "destructive",
      });
    }
  };

  const handleAddTask = (status: TaskStatus) => {
    if (selectedBoard?.isFrozen) {
      toast({
        title: "Board Frozen",
        description: "Cannot add tasks to a frozen board.",
        variant: "destructive",
      });
      return;
    }
    setNewTaskStatus(status);
    setShowTaskDialog(true);
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
            <Link to={`/dashboard/projects/${projectId}`}>
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold">
                {currentProject?.name || 'Project Boards'}
              </h1>
              <p className="text-muted-foreground">
                Manage project boards and organize your workflow
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <Button variant="outline" onClick={() => setShowFilters(true)}>
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
            <Button variant="outline" onClick={() => setShowAssignees(true)}>
              <Users className="mr-2 h-4 w-4" />
              Assignees
            </Button>
            {canManageBoards && (
              <Button onClick={() => setShowBoardDialog(true)}>
                <Plus className="mr-2 h-4 w-4" />
                New Board
              </Button>
            )}
          </div>
        </div>
      </motion.div>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      >
        {/* Boards Management Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Layers className="h-5 w-5" />
              Project Boards ({boards.length})
            </h2>
            
            {boards.length === 0 ? (
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center py-12">
                    <Layers className="mx-auto h-12 w-12 text-muted-foreground" />
                    <h3 className="mt-2 text-lg font-semibold">No boards yet</h3>
                    <p className="text-muted-foreground">
                      Create your first board to start organizing tasks
                    </p>
                    {canManageBoards && (
                      <Button className="mt-4" onClick={() => setShowBoardDialog(true)}>
                        <Plus className="mr-2 h-4 w-4" />
                        Create Board
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ) : (
              <SortableContext
                items={boards.map(board => board.id)}
                strategy={horizontalListSortingStrategy}
              >
                <div className="flex gap-4 overflow-x-auto pb-4">
                  {boards.map((board) => {
                    const taskCount = getTasksByBoard(board.id).length;
                    return (
                      <div key={board.id} className="flex-shrink-0">
                        <BoardCard
                          board={board}
                          taskCount={taskCount}
                          canManage={canManageBoards}
                          onEdit={() => handleEditBoard(board)}
                          onDelete={() => setDeletingBoard(board)}
                          onToggleStatus={() => handleToggleBoardStatus(board)}
                          onToggleEnabled={() => handleToggleBoardEnabled(board)}
                          onToggleFrozen={() => handleToggleBoardFrozen(board)}
                          onSelect={() => handleBoardSelect(board)}
                          isSelected={selectedBoard?.id === board.id}
                        />
                      </div>
                    );
                  })}
                </div>
              </SortableContext>
            )}
          </div>

          {/* Kanban Board for Selected Board */}
          {selectedBoard && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold flex items-center gap-2">
                  <div className={`w-4 h-4 rounded-full ${selectedBoard.color}`} />
                  {selectedBoard.name} - Kanban Board
                  {selectedBoard.isFrozen && (
                    <Badge variant="outline" className="ml-2">
                      Read Only
                    </Badge>
                  )}
                </h2>
              </div>

              {selectedBoard.description && (
                <p className="text-muted-foreground">{selectedBoard.description}</p>
              )}

              {/* Kanban Columns */}
              <div className="grid grid-cols-4 gap-6 min-h-[600px]">
                <SortableContext
                  items={TASK_COLUMNS.map(col => col.id)}
                  strategy={horizontalListSortingStrategy}
                >
                  {TASK_COLUMNS.map((column) => {
                    const columnTasks = getTasksByStatus(column.id as TaskStatus, selectedBoard.id);
                    
                    return (
                      <TaskColumn
                        key={column.id}
                        id={column.id}
                        title={column.title}
                        count={columnTasks.length}
                        color={column.color}
                        onAddTask={() => handleAddTask(column.id as TaskStatus)}
                        canAddTask={!selectedBoard.isFrozen}
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
                                onClick={() => {
                                  setSelectedTask(task);
                                  setShowTaskDetails(true);
                                }}
                              />
                            ))}
                          </div>
                        </SortableContext>
                      </TaskColumn>
                    );
                  })}
                </SortableContext>
              </div>
            </div>
          )}
        </motion.div>

        {/* Drag Overlays */}
        <DragOverlay>
          {activeBoard ? (
            <BoardCard
              board={activeBoard}
              taskCount={getTasksByBoard(activeBoard.id).length}
              canManage={canManageBoards}
              onEdit={() => {}}
              onDelete={() => {}}
              onToggleStatus={() => {}}
              onToggleEnabled={() => {}}
              onToggleFrozen={() => {}}
              onSelect={() => {}}
              isDragging
            />
          ) : activeTask ? (
            <TaskCard
              task={activeTask}
              getPriorityColor={getPriorityColor}
              isDragging
            />
          ) : null}
        </DragOverlay>
      </DndContext>

      {/* Board Dialog */}
      <BoardDialog
        open={showBoardDialog}
        onOpenChange={(open) => {
          setShowBoardDialog(open);
          if (!open) setEditingBoard(null);
        }}
        board={editingBoard}
        projectId={projectId}
      />

      {/* Task Dialog */}
      <TaskDialog
        open={showTaskDialog}
        onOpenChange={setShowTaskDialog}
        projectId={projectId}
        initialStatus={newTaskStatus}
      />

      {/* Task Details Dialog */}
      <TaskDetailsDialog
        open={showTaskDetails}
        onOpenChange={setShowTaskDetails}
        task={selectedTask}
      />

      {/* Filter Dialog */}
      <FilterDialog
        open={showFilters}
        onOpenChange={setShowFilters}
        filters={filters}
        onFiltersChange={setFilters}
        availableTags={[]}
      />

      {/* Assignees Dialog */}
      <AssigneesDialog
        open={showAssignees}
        onOpenChange={setShowAssignees}
        projectId={projectId}
      />

      {/* Delete Board Dialog */}
      <AlertDialog open={!!deletingBoard} onOpenChange={() => setDeletingBoard(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Board</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete "{deletingBoard?.name}"? This action cannot be undone and will remove all associated tasks.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteBoard} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Delete Board
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default BoardPage;
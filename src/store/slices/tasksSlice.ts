import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Task } from '../../types';
import { supabase } from '@/integrations/supabase/client';

interface TasksState {
  tasks: Task[];
  currentTask: Task | null;
  isLoading: boolean;
  error: string | null;
}

// Fetch all tasks
export const fetchTasks = createAsyncThunk(
  'tasks/fetchTasks',
  async (projectId: string | undefined, { rejectWithValue }) => {
    try {
      let query = supabase
        .from('tasks')
        .select(`
          *,
          task_assignees(user_id, profiles(id, name, email, avatar, role))
        `)
        .order('created_at', { ascending: false });

      if (projectId) {
        query = query.eq('project_id', projectId);
      }

      const { data, error } = await query;

      if (error) throw error;

      return data.map((t: any) => ({
        id: t.id,
        title: t.title,
        description: t.description,
        status: t.status,
        priority: t.priority,
        projectId: t.project_id,
        boardId: t.board_id,
        assignees: t.task_assignees?.map((a: any) => ({
          id: a.profiles.id,
          name: a.profiles.name,
          email: a.profiles.email,
          avatar: a.profiles.avatar,
          role: a.profiles.role,
        })) || [],
        createdBy: t.created_by,
        dueDate: t.due_date,
        estimatedHours: t.estimated_hours,
        tags: t.tags || [],
        commentsCount: 0,
        createdAt: t.created_at,
        updatedAt: t.updated_at,
      })) as Task[];
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

// Fetch task by ID
export const fetchTaskById = createAsyncThunk(
  'tasks/fetchTaskById',
  async (taskId: string, { rejectWithValue }) => {
    try {
      const { data, error } = await supabase
        .from('tasks')
        .select(`
          *,
          task_assignees(user_id, profiles(id, name, email, avatar, role))
        `)
        .eq('id', taskId)
        .single();

      if (error) throw error;

      return {
        id: data.id,
        title: data.title,
        description: data.description,
        status: data.status,
        priority: data.priority,
        projectId: data.project_id,
        boardId: data.board_id,
        assignees: data.task_assignees?.map((a: any) => ({
          id: a.profiles.id,
          name: a.profiles.name,
          email: a.profiles.email,
          avatar: a.profiles.avatar,
          role: a.profiles.role,
        })) || [],
        createdBy: data.created_by,
        dueDate: data.due_date,
        estimatedHours: data.estimated_hours,
        tags: data.tags || [],
        commentsCount: 0,
        createdAt: data.created_at,
        updatedAt: data.updated_at,
      } as Task;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

// Create task
export const createTask = createAsyncThunk(
  'tasks/createTask',
  async (taskData: Omit<Task, 'id' | 'createdAt' | 'updatedAt' | 'commentsCount'>, { rejectWithValue }) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { data, error } = await supabase
        .from('tasks')
        .insert({
          title: taskData.title,
          description: taskData.description,
          status: taskData.status || 'todo',
          priority: taskData.priority || 'medium',
          project_id: taskData.projectId,
          board_id: taskData.boardId,
          created_by: user.id,
          due_date: taskData.dueDate,
          estimated_hours: taskData.estimatedHours,
          tags: taskData.tags || [],
        })
        .select()
        .single();

      if (error) throw error;

      // Insert assignees if provided
      if (taskData.assignees && taskData.assignees.length > 0) {
        const assigneeInserts = taskData.assignees.map(assignee => ({
          task_id: data.id,
          user_id: assignee.id,
        }));

        await supabase.from('task_assignees').insert(assigneeInserts);
      }

      return {
        id: data.id,
        title: data.title,
        description: data.description,
        status: data.status,
        priority: data.priority,
        projectId: data.project_id,
        boardId: data.board_id,
        assignees: taskData.assignees || [],
        createdBy: data.created_by,
        dueDate: data.due_date,
        estimatedHours: data.estimated_hours,
        tags: data.tags || [],
        commentsCount: 0,
        createdAt: data.created_at,
        updatedAt: data.updated_at,
      } as Task;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

// Update task
export const updateTask = createAsyncThunk(
  'tasks/updateTask',
  async ({ id, ...updates }: Partial<Task> & { id: string }, { rejectWithValue }) => {
    try {
      const { data, error } = await supabase
        .from('tasks')
        .update({
          title: updates.title,
          description: updates.description,
          status: updates.status,
          priority: updates.priority,
          board_id: updates.boardId,
          due_date: updates.dueDate,
          estimated_hours: updates.estimatedHours,
          tags: updates.tags,
        })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;

      // Update assignees if provided
      if (updates.assignees) {
        // Delete existing assignees
        await supabase.from('task_assignees').delete().eq('task_id', id);

        // Insert new assignees
        if (updates.assignees.length > 0) {
          const assigneeInserts = updates.assignees.map(assignee => ({
            task_id: id,
            user_id: assignee.id,
          }));

          await supabase.from('task_assignees').insert(assigneeInserts);
        }
      }

      return {
        id: data.id,
        title: data.title,
        description: data.description,
        status: data.status,
        priority: data.priority,
        projectId: data.project_id,
        boardId: data.board_id,
        assignees: updates.assignees,
        createdBy: data.created_by,
        dueDate: data.due_date,
        estimatedHours: data.estimated_hours,
        tags: data.tags || [],
        commentsCount: 0,
        createdAt: data.created_at,
        updatedAt: data.updated_at,
      } as Task;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

// Delete task
export const deleteTask = createAsyncThunk(
  'tasks/deleteTask',
  async (taskId: string, { rejectWithValue }) => {
    try {
      const { error } = await supabase
        .from('tasks')
        .delete()
        .eq('id', taskId);

      if (error) throw error;

      return taskId;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

// Update task status
export const updateTaskStatus = createAsyncThunk(
  'tasks/updateTaskStatus',
  async ({ taskId, status }: { taskId: string; status: Task['status'] }, { rejectWithValue }) => {
    try {
      const { data, error } = await supabase
        .from('tasks')
        .update({ status })
        .eq('id', taskId)
        .select()
        .single();

      if (error) throw error;

      return { taskId, status, updatedAt: data.updated_at };
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState: TasksState = {
  tasks: [],
  currentTask: null,
  isLoading: false,
  error: null,
};

export const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    clearCurrentTask: (state) => {
      state.currentTask = null;
    },
    setCurrentTask: (state, action: PayloadAction<Task>) => {
      state.currentTask = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
    // Optimistic updates for drag and drop
    moveTaskOptimistic: (state, action: PayloadAction<{ taskId: string; newStatus: Task['status'] }>) => {
      const task = state.tasks.find(t => t.id === action.payload.taskId);
      if (task) {
        task.status = action.payload.newStatus;
        task.updatedAt = new Date().toISOString();
      }
    },
  },
  extraReducers: (builder) => {
    // Fetch tasks
    builder.addCase(fetchTasks.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(fetchTasks.fulfilled, (state, action) => {
      state.isLoading = false;
      state.tasks = action.payload;
    });
    builder.addCase(fetchTasks.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message || 'Failed to fetch tasks';
    });

    // Fetch task by ID
    builder.addCase(fetchTaskById.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(fetchTaskById.fulfilled, (state, action) => {
      state.isLoading = false;
      state.currentTask = action.payload;
    });
    builder.addCase(fetchTaskById.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message || 'Failed to fetch task';
    });

    // Create task
    builder.addCase(createTask.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(createTask.fulfilled, (state, action) => {
      state.isLoading = false;
      state.tasks.push(action.payload);
    });
    builder.addCase(createTask.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message || 'Failed to create task';
    });

    // Update task
    builder.addCase(updateTask.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(updateTask.fulfilled, (state, action) => {
      state.isLoading = false;
      const index = state.tasks.findIndex(t => t.id === action.payload.id);
      if (index !== -1) {
        state.tasks[index] = { ...state.tasks[index], ...action.payload };
      }
      if (state.currentTask?.id === action.payload.id) {
        state.currentTask = { ...state.currentTask, ...action.payload };
      }
    });
    builder.addCase(updateTask.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message || 'Failed to update task';
    });

    // Delete task
    builder.addCase(deleteTask.fulfilled, (state, action) => {
      state.tasks = state.tasks.filter(t => t.id !== action.payload);
      if (state.currentTask?.id === action.payload) {
        state.currentTask = null;
      }
    });

    // Update task status
    builder.addCase(updateTaskStatus.fulfilled, (state, action) => {
      const task = state.tasks.find(t => t.id === action.payload.taskId);
      if (task) {
        task.status = action.payload.status;
        task.updatedAt = action.payload.updatedAt;
      }
    });
  },
});

export const { clearCurrentTask, setCurrentTask, clearError, moveTaskOptimistic } = tasksSlice.actions;
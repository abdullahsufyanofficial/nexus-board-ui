import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Board } from '../../types';
import { supabase } from '@/integrations/supabase/client';

interface BoardsState {
  boards: Board[];
  currentBoard: Board | null;
  isLoading: boolean;
  error: string | null;
}

// Fetch boards by project
export const fetchBoards = createAsyncThunk(
  'boards/fetchBoards',
  async (projectId: string, { rejectWithValue }) => {
    try {
      const { data, error } = await supabase
        .from('boards')
        .select('*')
        .eq('project_id', projectId)
        .order('position', { ascending: true });

      if (error) throw error;

      return data.map((b: any) => ({
        id: b.id,
        name: b.name,
        description: b.description,
        projectId: b.project_id,
        position: b.position,
        createdAt: b.created_at,
        updatedAt: b.updated_at,
      })) as Board[];
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const createBoard = createAsyncThunk(
  'boards/createBoard',
  async (boardData: Omit<Board, 'id' | 'createdAt' | 'updatedAt' | 'position'>, { rejectWithValue }) => {
    try {
      // Get max position for this project
      const { data: existingBoards, error: fetchError } = await supabase
        .from('boards')
        .select('position')
        .eq('project_id', boardData.projectId)
        .order('position', { ascending: false })
        .limit(1);

      if (fetchError) throw fetchError;

      const maxPosition = existingBoards && existingBoards.length > 0 ? existingBoards[0].position : -1;

      const { data, error } = await supabase
        .from('boards')
        .insert({
          name: boardData.name,
          description: boardData.description,
          project_id: boardData.projectId,
          position: maxPosition + 1,
        })
        .select()
        .single();

      if (error) throw error;

      return {
        id: data.id,
        name: data.name,
        description: data.description,
        projectId: data.project_id,
        position: data.position,
        createdAt: data.created_at,
        updatedAt: data.updated_at,
      } as Board;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateBoard = createAsyncThunk(
  'boards/updateBoard',
  async ({ id, ...updates }: Partial<Board> & { id: string }, { rejectWithValue }) => {
    try {
      const { data, error } = await supabase
        .from('boards')
        .update({
          name: updates.name,
          description: updates.description,
          position: updates.position,
        })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;

      return {
        id: data.id,
        name: data.name,
        description: data.description,
        projectId: data.project_id,
        position: data.position,
        createdAt: data.created_at,
        updatedAt: data.updated_at,
      } as Board;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteBoard = createAsyncThunk(
  'boards/deleteBoard',
  async (boardId: string, { rejectWithValue }) => {
    try {
      const { error } = await supabase
        .from('boards')
        .delete()
        .eq('id', boardId);

      if (error) throw error;

      return boardId;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const reorderBoards = createAsyncThunk(
  'boards/reorderBoards',
  async (boardIds: string[]) => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return boardIds;
  }
);

const initialState: BoardsState = {
  boards: [],
  currentBoard: null,
  isLoading: false,
  error: null,
};

export const boardsSlice = createSlice({
  name: 'boards',
  initialState,
  reducers: {
    setCurrentBoard: (state, action: PayloadAction<Board>) => {
      state.currentBoard = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
    // Optimistic updates for drag and drop
    reorderBoardsOptimistic: (state, action: PayloadAction<string[]>) => {
      const boardIds = action.payload;
      state.boards = boardIds.map((id, index) => {
        const board = state.boards.find(b => b.id === id);
        return board ? { ...board, position: index } : board;
      }).filter(Boolean) as Board[];
    },
  },
  extraReducers: (builder) => {
    // Fetch boards
    builder.addCase(fetchBoards.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(fetchBoards.fulfilled, (state, action) => {
      state.isLoading = false;
      state.boards = action.payload;
    });
    builder.addCase(fetchBoards.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message || 'Failed to fetch boards';
    });

    // Create board
    builder.addCase(createBoard.fulfilled, (state, action) => {
      state.boards.push(action.payload);
    });

    // Update board
    builder.addCase(updateBoard.fulfilled, (state, action) => {
      const index = state.boards.findIndex(b => b.id === action.payload.id);
      if (index !== -1) {
        state.boards[index] = { ...state.boards[index], ...action.payload };
      }
    });

    // Delete board
    builder.addCase(deleteBoard.fulfilled, (state, action) => {
      state.boards = state.boards.filter(b => b.id !== action.payload);
    });

    // Reorder boards
    builder.addCase(reorderBoards.fulfilled, (state, action) => {
      const boardIds = action.payload;
      state.boards = boardIds.map((id, index) => {
        const board = state.boards.find(b => b.id === id);
        return board ? { ...board, position: index } : board;
      }).filter(Boolean) as Board[];
    });
  },
});

export const { setCurrentBoard, clearError, reorderBoardsOptimistic } = boardsSlice.actions;
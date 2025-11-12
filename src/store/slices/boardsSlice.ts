import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Board } from '../../types';
import { getBoardsByProject } from '../../data/boards';
import boardsData from '../../data/boards.json';

// In-memory storage for boards (simulates database)
let boardsStorage: Board[] = [...(boardsData as Board[])];

interface BoardsState {
  boards: Board[];
  currentBoard: Board | null;
  isLoading: boolean;
  error: string | null;
}

// Mock API calls - replace with real API endpoints
export const fetchBoards = createAsyncThunk(
  'boards/fetchBoards',
  async (projectId: string) => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return boardsStorage
      .filter(board => board.projectId === projectId)
      .sort((a, b) => a.position - b.position);
  }
);

export const createBoard = createAsyncThunk(
  'boards/createBoard',
  async (boardData: Omit<Board, 'id' | 'createdAt' | 'updatedAt' | 'position'>) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const existingBoards = boardsStorage.filter(b => b.projectId === boardData.projectId);
    const newBoard: Board = {
      ...boardData,
      id: `board-${Date.now()}`,
      position: existingBoards.length,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    boardsStorage.push(newBoard);
    return newBoard;
  }
);

export const updateBoard = createAsyncThunk(
  'boards/updateBoard',
  async ({ id, ...updates }: Partial<Board> & { id: string }) => {
    await new Promise(resolve => setTimeout(resolve, 400));
    
    const boardIndex = boardsStorage.findIndex(b => b.id === id);
    if (boardIndex !== -1) {
      boardsStorage[boardIndex] = {
        ...boardsStorage[boardIndex],
        ...updates,
        updatedAt: new Date().toISOString(),
      };
    }
    
    return {
      ...updates,
      id,
      updatedAt: new Date().toISOString(),
    };
  }
);

export const deleteBoard = createAsyncThunk(
  'boards/deleteBoard',
  async (boardId: string) => {
    await new Promise(resolve => setTimeout(resolve, 400));
    boardsStorage = boardsStorage.filter(b => b.id !== boardId);
    return boardId;
  }
);

export const reorderBoards = createAsyncThunk(
  'boards/reorderBoards',
  async (boardIds: string[]) => {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    // Update positions in storage
    boardIds.forEach((id, index) => {
      const boardIndex = boardsStorage.findIndex(b => b.id === id);
      if (boardIndex !== -1) {
        boardsStorage[boardIndex].position = index;
        boardsStorage[boardIndex].updatedAt = new Date().toISOString();
      }
    });
    
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
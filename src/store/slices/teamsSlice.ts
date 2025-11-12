import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Team } from '../../types';
import { getUserSummaries } from '../../data/users';

interface TeamsState {
  teams: Team[];
  currentTeam: Team | null;
  isLoading: boolean;
  error: string | null;
}

// Mock teams data
const mockTeams: Team[] = [
  {
    id: '1',
    name: 'Frontend Team',
    description: 'Responsible for all user-facing applications and interfaces',
    members: getUserSummaries(['2', '4', '6', '8']),
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z',
  },
  {
    id: '2',
    name: 'Backend Team',
    description: 'Handles server-side development and API design',
    members: getUserSummaries(['1', '3', '7']),
    createdAt: '2024-01-16T10:00:00Z',
    updatedAt: '2024-01-16T10:00:00Z',
  },
  {
    id: '3',
    name: 'DevOps Team',
    description: 'Infrastructure, deployment, and system operations',
    members: getUserSummaries(['1', '5', '7']),
    createdAt: '2024-01-17T10:00:00Z',
    updatedAt: '2024-01-17T10:00:00Z',
  },
];

// Mock API calls - replace with real API endpoints
export const fetchTeams = createAsyncThunk(
  'teams/fetchTeams',
  async () => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    return mockTeams;
  }
);

export const fetchTeamById = createAsyncThunk(
  'teams/fetchTeamById',
  async (teamId: string) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    const team = mockTeams.find(t => t.id === teamId);
    if (!team) {
      throw new Error('Team not found');
    }
    return team;
  }
);

export const createTeam = createAsyncThunk(
  'teams/createTeam',
  async (teamData: Omit<Team, 'id' | 'createdAt' | 'updatedAt'>) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 600));
    
    const newTeam: Team = {
      ...teamData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    return newTeam;
  }
);

export const updateTeam = createAsyncThunk(
  'teams/updateTeam',
  async ({ id, ...updates }: Partial<Team> & { id: string }) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const updatedTeam = {
      ...updates,
      id,
      updatedAt: new Date().toISOString(),
    };
    
    return updatedTeam;
  }
);

export const deleteTeam = createAsyncThunk(
  'teams/deleteTeam',
  async (teamId: string) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    return teamId;
  }
);

const initialState: TeamsState = {
  teams: [],
  currentTeam: null,
  isLoading: false,
  error: null,
};

export const teamsSlice = createSlice({
  name: 'teams',
  initialState,
  reducers: {
    clearCurrentTeam: (state) => {
      state.currentTeam = null;
    },
    setCurrentTeam: (state, action: PayloadAction<Team>) => {
      state.currentTeam = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Fetch teams
    builder.addCase(fetchTeams.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(fetchTeams.fulfilled, (state, action) => {
      state.isLoading = false;
      state.teams = action.payload;
    });
    builder.addCase(fetchTeams.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message || 'Failed to fetch teams';
    });

    // Fetch team by ID
    builder.addCase(fetchTeamById.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(fetchTeamById.fulfilled, (state, action) => {
      state.isLoading = false;
      state.currentTeam = action.payload;
    });
    builder.addCase(fetchTeamById.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message || 'Failed to fetch team';
    });

    // Create team
    builder.addCase(createTeam.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(createTeam.fulfilled, (state, action) => {
      state.isLoading = false;
      state.teams.push(action.payload);
    });
    builder.addCase(createTeam.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message || 'Failed to create team';
    });

    // Update team
    builder.addCase(updateTeam.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(updateTeam.fulfilled, (state, action) => {
      state.isLoading = false;
      const index = state.teams.findIndex(t => t.id === action.payload.id);
      if (index !== -1) {
        state.teams[index] = { ...state.teams[index], ...action.payload };
      }
      if (state.currentTeam?.id === action.payload.id) {
        state.currentTeam = { ...state.currentTeam, ...action.payload };
      }
    });
    builder.addCase(updateTeam.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message || 'Failed to update team';
    });

    // Delete team
    builder.addCase(deleteTeam.fulfilled, (state, action) => {
      state.teams = state.teams.filter(t => t.id !== action.payload);
      if (state.currentTeam?.id === action.payload) {
        state.currentTeam = null;
      }
    });
  },
});

export const { clearCurrentTeam, setCurrentTeam, clearError } = teamsSlice.actions;
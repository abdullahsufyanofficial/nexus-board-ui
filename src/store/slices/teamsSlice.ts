import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Team } from '../../types';
import { supabase } from '@/integrations/supabase/client';

interface TeamsState {
  teams: Team[];
  currentTeam: Team | null;
  isLoading: boolean;
  error: string | null;
}

// Fetch all teams
export const fetchTeams = createAsyncThunk(
  'teams/fetchTeams',
  async (_, { rejectWithValue }) => {
    try {
      const { data, error } = await supabase
        .from('teams')
        .select(`
          *,
          team_members(
            user_id,
            profiles(id, name, email, avatar, role)
          )
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;

      return data.map((t: any) => ({
        id: t.id,
        name: t.name,
        description: t.description,
        members: t.team_members?.map((tm: any) => ({
          id: tm.profiles.id,
          name: tm.profiles.name,
          email: tm.profiles.email,
          avatar: tm.profiles.avatar,
          role: tm.profiles.role,
        })) || [],
        createdAt: t.created_at,
        updatedAt: t.updated_at,
      })) as Team[];
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchTeamById = createAsyncThunk(
  'teams/fetchTeamById',
  async (teamId: string, { rejectWithValue }) => {
    try {
      const { data, error } = await supabase
        .from('teams')
        .select(`
          *,
          team_members(
            user_id,
            profiles(id, name, email, avatar, role)
          )
        `)
        .eq('id', teamId)
        .single();

      if (error) throw error;

      return {
        id: data.id,
        name: data.name,
        description: data.description,
        members: data.team_members?.map((tm: any) => ({
          id: tm.profiles.id,
          name: tm.profiles.name,
          email: tm.profiles.email,
          avatar: tm.profiles.avatar,
          role: tm.profiles.role,
        })) || [],
        createdAt: data.created_at,
        updatedAt: data.updated_at,
      } as Team;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const createTeam = createAsyncThunk(
  'teams/createTeam',
  async (teamData: Omit<Team, 'id' | 'createdAt' | 'updatedAt'>, { rejectWithValue }) => {
    try {
      const { data, error } = await supabase
        .from('teams')
        .insert({
          name: teamData.name,
          description: teamData.description,
        })
        .select()
        .single();

      if (error) throw error;

      // Insert team members if provided
      if (teamData.members && teamData.members.length > 0) {
        const memberInserts = teamData.members.map(member => ({
          team_id: data.id,
          user_id: member.id,
        }));

        await supabase.from('team_members').insert(memberInserts);
      }

      return {
        id: data.id,
        name: data.name,
        description: data.description,
        members: teamData.members || [],
        createdAt: data.created_at,
        updatedAt: data.updated_at,
      } as Team;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateTeam = createAsyncThunk(
  'teams/updateTeam',
  async ({ id, ...updates }: Partial<Team> & { id: string }, { rejectWithValue }) => {
    try {
      const { data, error } = await supabase
        .from('teams')
        .update({
          name: updates.name,
          description: updates.description,
        })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;

      // Update team members if provided
      if (updates.members) {
        // Delete existing members
        await supabase.from('team_members').delete().eq('team_id', id);

        // Insert new members
        if (updates.members.length > 0) {
          const memberInserts = updates.members.map(member => ({
            team_id: id,
            user_id: member.id,
          }));

          await supabase.from('team_members').insert(memberInserts);
        }
      }

      return {
        id: data.id,
        name: data.name,
        description: data.description,
        members: updates.members,
        createdAt: data.created_at,
        updatedAt: data.updated_at,
      } as Team;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteTeam = createAsyncThunk(
  'teams/deleteTeam',
  async (teamId: string, { rejectWithValue }) => {
    try {
      const { error } = await supabase
        .from('teams')
        .delete()
        .eq('id', teamId);

      if (error) throw error;

      return teamId;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
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
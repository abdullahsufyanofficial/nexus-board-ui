import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { AuthState, User, LoginRequest, RegisterRequest } from '../../types';
import apiClient from '../../api/client';

// Mock API calls - replace with real API endpoints
export const loginUser = createAsyncThunk(
  'auth/login',
  async (credentials: LoginRequest) => {
    // Mock login - replace with actual API call
    const mockUser: User = {
      id: '1',
      name: 'Alex Thompson',
      email: credentials.email,
      avatar: 'https://i.pravatar.cc/150?img=1',
      role: 'admin',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    const mockToken = 'mock-jwt-token-' + Date.now();
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return { user: mockUser, token: mockToken };
  }
);

export const registerUser = createAsyncThunk(
  'auth/register',
  async (userData: RegisterRequest) => {
    // Mock registration - replace with actual API call
    const mockUser: User = {
      id: Date.now().toString(),
      name: userData.name,
      email: userData.email,
      avatar: 'https://i.pravatar.cc/150?img=' + Math.floor(Math.random() * 50),
      role: 'member',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    const mockToken = 'mock-jwt-token-' + Date.now();
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return { user: mockUser, token: mockToken };
  }
);

export const logoutUser = createAsyncThunk(
  'auth/logout',
  async () => {
    // Clear local storage
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_data');
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
  }
);

const initialState: AuthState = {
  user: null,
  token: localStorage.getItem('auth_token'),
  isLoading: false,
  isAuthenticated: !!localStorage.getItem('auth_token'),
};

// Try to restore user from localStorage
const savedUser = localStorage.getItem('user_data');
if (savedUser && initialState.token) {
  try {
    initialState.user = JSON.parse(savedUser);
  } catch (error) {
    console.error('Failed to parse saved user data:', error);
  }
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearAuth: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem('auth_token');
      localStorage.removeItem('user_data');
    },
    updateUser: (state, action: PayloadAction<Partial<User>>) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
        localStorage.setItem('user_data', JSON.stringify(state.user));
      }
    },
  },
  extraReducers: (builder) => {
    // Login
    builder.addCase(loginUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
      
      // Store in localStorage
      localStorage.setItem('auth_token', action.payload.token);
      localStorage.setItem('user_data', JSON.stringify(action.payload.user));
    });
    builder.addCase(loginUser.rejected, (state) => {
      state.isLoading = false;
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
    });

    // Register
    builder.addCase(registerUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
      
      // Store in localStorage
      localStorage.setItem('auth_token', action.payload.token);
      localStorage.setItem('user_data', JSON.stringify(action.payload.user));
    });
    builder.addCase(registerUser.rejected, (state) => {
      state.isLoading = false;
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
    });

    // Logout
    builder.addCase(logoutUser.fulfilled, (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
    });
  },
});

export const { clearAuth, updateUser } = authSlice.actions;
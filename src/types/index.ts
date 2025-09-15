// User Types
export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: 'admin' | 'manager' | 'member';
  createdAt: string;
  updatedAt: string;
}

export interface UserSummary {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: 'admin' | 'manager' | 'member';
}

// Auth Types
export interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}

export interface LoginRequest {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

// Project Types
export interface Project {
  id: string;
  name: string;
  description: string;
  startDate?: string;
  endDate?: string;
  status: 'active' | 'paused' | 'completed' | 'archived';
  visibility: 'public' | 'private';
  progress: number; // 0-100
  members: UserSummary[];
  tags: string[];
  repo?: string;
  avatar?: string;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
}

// Task Types
export type TaskStatus = 'todo' | 'in-progress' | 'review' | 'done';
export type TaskPriority = 'low' | 'medium' | 'high' | 'urgent';

export interface Task {
  id: string;
  projectId: string;
  title: string;
  description?: string;
  status: TaskStatus;
  priority: TaskPriority;
  assignees: UserSummary[];
  dueDate?: string;
  tags: string[];
  attachments?: Attachment[];
  commentsCount: number;
  estimatedHours?: number;
  actualHours?: number;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
}

export interface Attachment {
  id: string;
  name: string;
  url: string;
  size: number;
  type: string;
  uploadedAt: string;
  uploadedBy: string;
}

// Team Types
export interface Team {
  id: string;
  name: string;
  description?: string;
  members: UserSummary[];
  createdAt: string;
  updatedAt: string;
}

// Activity Types
export interface Activity {
  id: string;
  type: 'task_created' | 'task_updated' | 'project_created' | 'user_joined' | 'comment_added';
  title: string;
  description: string;
  user: UserSummary;
  projectId?: string;
  taskId?: string;
  createdAt: string;
}

// API Response Types
export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Dashboard Types
export interface DashboardStats {
  activeProjects: number;
  openTasks: number;
  overdueTasks: number;
  teamUtilization: number;
}

// Chart Data Types
export interface ChartData {
  name: string;
  value: number;
  date?: string;
}
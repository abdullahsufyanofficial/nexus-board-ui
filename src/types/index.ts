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
  boardId?: string;
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
  // New advanced features
  dependencies?: string[]; // Task IDs this task depends on
  timeEntries?: TimeEntry[];
  comments?: Comment[];
  recurring?: RecurringConfig;
  templateId?: string;
  automationRules?: AutomationRule[];
  customFields?: Record<string, any>;
}

// Board Types
export interface Board {
  id: string;
  projectId: string;
  name: string;
  description?: string;
  color: string;
  position: number;
  status: 'active' | 'inactive';
  isEnabled: boolean;
  isFrozen: boolean;
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
  type: 'task_created' | 'task_updated' | 'project_created' | 'user_joined' | 'comment_added' | 'file_uploaded' | 'time_logged';
  title: string;
  description: string;
  user: UserSummary;
  projectId?: string;
  taskId?: string;
  createdAt: string;
  metadata?: Record<string, any>;
}

// Advanced Feature Types

// 1. Time Tracking
export interface TimeEntry {
  id: string;
  taskId: string;
  userId: string;
  startTime: string;
  endTime?: string;
  duration: number; // minutes
  description?: string;
  createdAt: string;
}

// 2. Comments
export interface Comment {
  id: string;
  taskId: string;
  userId: string;
  user: UserSummary;
  content: string;
  mentions?: string[]; // User IDs mentioned
  attachments?: Attachment[];
  createdAt: string;
  updatedAt: string;
}

// 3. Recurring Tasks
export interface RecurringConfig {
  frequency: 'daily' | 'weekly' | 'monthly';
  interval: number; // Every X days/weeks/months
  endDate?: string;
  lastCreated?: string;
}

// 4. Task Templates
export interface TaskTemplate {
  id: string;
  name: string;
  description?: string;
  priority: TaskPriority;
  estimatedHours?: number;
  tags: string[];
  checklistItems?: string[];
  customFields?: Record<string, any>;
  createdBy: string;
  createdAt: string;
}

// 5. Automation Rules
export interface AutomationRule {
  id: string;
  name: string;
  trigger: 'status_change' | 'assignee_change' | 'due_date' | 'created';
  conditions: AutomationCondition[];
  actions: AutomationAction[];
  enabled: boolean;
}

export interface AutomationCondition {
  field: string;
  operator: 'equals' | 'contains' | 'greater_than' | 'less_than';
  value: any;
}

export interface AutomationAction {
  type: 'assign' | 'add_tag' | 'set_priority' | 'notify' | 'move_to_board';
  value: any;
}

// 6. Workload
export interface WorkloadData {
  userId: string;
  user: UserSummary;
  totalTasks: number;
  totalHours: number;
  tasksByPriority: Record<TaskPriority, number>;
  tasksByStatus: Record<TaskStatus, number>;
}

// 7. Search
export interface SearchFilters {
  query?: string;
  projectIds?: string[];
  assigneeIds?: string[];
  priorities?: TaskPriority[];
  statuses?: TaskStatus[];
  tags?: string[];
  dateRange?: {
    start: string;
    end: string;
  };
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
  recentActivities: Activity[];
  upcomingDeadlines: Task[];
}

// Chart Data Types
export interface ChartData {
  name: string;
  value: number;
  date?: string;
}

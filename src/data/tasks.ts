import { Task } from '../types';
import { getUserSummaries, getRandomUsers } from './users';

export const tasks: Task[] = [
  // ProjectFlow Mobile App tasks
  {
    id: '1',
    projectId: '1',
    title: 'Implement user authentication',
    description: 'Add biometric authentication and social login options',
    status: 'done',
    priority: 'high',
    assignees: getUserSummaries(['2', '3']),
    dueDate: '2024-02-15',
    tags: ['auth', 'security'],
    attachments: [],
    commentsCount: 5,
    estimatedHours: 16,
    actualHours: 18,
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-02-10T14:30:00Z',
    createdBy: '1',
  },
  {
    id: '2',
    projectId: '1',
    title: 'Design offline sync mechanism',
    description: 'Implement conflict resolution for offline data synchronization',
    status: 'in-progress',
    priority: 'high',
    assignees: getUserSummaries(['1', '4']),
    dueDate: '2024-03-20',
    tags: ['sync', 'offline'],
    attachments: [],
    commentsCount: 12,
    estimatedHours: 32,
    actualHours: 20,
    createdAt: '2024-01-20T10:00:00Z',
    updatedAt: '2024-03-10T16:15:00Z',
    createdBy: '1',
  },
  {
    id: '3',
    projectId: '1',
    title: 'Optimize app performance',
    description: 'Profile and optimize app startup time and memory usage',
    status: 'todo',
    priority: 'medium',
    assignees: getUserSummaries(['3']),
    dueDate: '2024-04-01',
    tags: ['performance', 'optimization'],
    attachments: [],
    commentsCount: 3,
    estimatedHours: 24,
    createdAt: '2024-02-01T10:00:00Z',
    updatedAt: '2024-02-01T10:00:00Z',
    createdBy: '2',
  },
  
  // Analytics Dashboard v2 tasks
  {
    id: '4',
    projectId: '2',
    title: 'Create new chart components',
    description: 'Build reusable chart components with D3.js and React',
    status: 'in-progress',
    priority: 'high',
    assignees: getUserSummaries(['2', '6']),
    dueDate: '2024-03-25',
    tags: ['charts', 'components'],
    attachments: [],
    commentsCount: 8,
    estimatedHours: 40,
    actualHours: 25,
    createdAt: '2024-02-05T10:00:00Z',
    updatedAt: '2024-03-10T13:20:00Z',
    createdBy: '2',
  },
  {
    id: '5',
    projectId: '2',
    title: 'Implement real-time data updates',
    description: 'Add WebSocket connection for live data streaming',
    status: 'review',
    priority: 'medium',
    assignees: getUserSummaries(['5']),
    dueDate: '2024-03-30',
    tags: ['real-time', 'websockets'],
    attachments: [],
    commentsCount: 6,
    estimatedHours: 20,
    actualHours: 22,
    createdAt: '2024-02-10T10:00:00Z',
    updatedAt: '2024-03-08T11:40:00Z',
    createdBy: '5',
  },

  // API Gateway Microservice tasks
  {
    id: '6',
    projectId: '3',
    title: 'Setup rate limiting',
    description: 'Implement Redis-based rate limiting with configurable rules',
    status: 'done',
    priority: 'high',
    assignees: getUserSummaries(['1', '7']),
    dueDate: '2024-02-28',
    tags: ['rate-limiting', 'redis'],
    attachments: [],
    commentsCount: 4,
    estimatedHours: 16,
    actualHours: 14,
    createdAt: '2024-02-01T10:00:00Z',
    updatedAt: '2024-02-25T15:30:00Z',
    createdBy: '1',
  },
  {
    id: '7',
    projectId: '3',
    title: 'Add service discovery',
    description: 'Integrate with Consul for automatic service discovery',
    status: 'done',
    priority: 'high',
    assignees: getUserSummaries(['3']),
    dueDate: '2024-03-10',
    tags: ['service-discovery', 'consul'],
    attachments: [],
    commentsCount: 7,
    estimatedHours: 24,
    actualHours: 26,
    createdAt: '2024-02-15T10:00:00Z',
    updatedAt: '2024-03-08T17:20:00Z',
    createdBy: '3',
  },

  // Customer Support Portal tasks
  {
    id: '8',
    projectId: '4',
    title: 'Design ticket system UI',
    description: 'Create wireframes and mockups for ticket management interface',
    status: 'in-progress',
    priority: 'medium',
    assignees: getUserSummaries(['8']),
    dueDate: '2024-03-20',
    tags: ['ui', 'design'],
    attachments: [],
    commentsCount: 2,
    estimatedHours: 12,
    actualHours: 8,
    createdAt: '2024-02-20T10:00:00Z',
    updatedAt: '2024-03-10T10:15:00Z',
    createdBy: '8',
  },
  {
    id: '9',
    projectId: '4',
    title: 'Build knowledge base search',
    description: 'Implement full-text search with Elasticsearch',
    status: 'todo',
    priority: 'medium',
    assignees: getUserSummaries(['4', '5']),
    dueDate: '2024-04-15',
    tags: ['search', 'elasticsearch'],
    attachments: [],
    commentsCount: 1,
    estimatedHours: 28,
    createdAt: '2024-03-01T10:00:00Z',
    updatedAt: '2024-03-01T10:00:00Z',
    createdBy: '5',
  },

  // Infrastructure Migration tasks
  {
    id: '10',
    projectId: '5',
    title: 'Setup Kubernetes cluster',
    description: 'Configure production-ready K8s cluster with monitoring and logging',
    status: 'in-progress',
    priority: 'urgent',
    assignees: getUserSummaries(['1', '7']),
    dueDate: '2024-03-25',
    tags: ['kubernetes', 'infrastructure'],
    attachments: [],
    commentsCount: 15,
    estimatedHours: 48,
    actualHours: 32,
    createdAt: '2024-03-05T10:00:00Z',
    updatedAt: '2024-03-10T18:45:00Z',
    createdBy: '1',
  },

  // Design System Library tasks
  {
    id: '11',
    projectId: '6',
    title: 'Create component documentation',
    description: 'Write comprehensive docs with usage examples and props',
    status: 'done',
    priority: 'low',
    assignees: getUserSummaries(['6']),
    dueDate: '2024-04-05',
    tags: ['documentation'],
    attachments: [],
    commentsCount: 3,
    estimatedHours: 16,
    actualHours: 15,
    createdAt: '2024-03-20T10:00:00Z',
    updatedAt: '2024-04-05T12:00:00Z',
    createdBy: '6',
  },
];

// Helper functions
export const getTasksByProject = (projectId: string) => {
  return tasks.filter(task => task.projectId === projectId);
};

export const getTasksByStatus = (status: Task['status']) => {
  return tasks.filter(task => task.status === status);
};

export const getTasksByAssignee = (userId: string) => {
  return tasks.filter(task => 
    task.assignees.some(assignee => assignee.id === userId)
  );
};

export const getOverdueTasks = () => {
  const now = new Date();
  return tasks.filter(task => 
    task.dueDate && 
    new Date(task.dueDate) < now && 
    task.status !== 'done'
  );
};

export const getTasksByPriority = (priority: Task['priority']) => {
  return tasks.filter(task => task.priority === priority);
};
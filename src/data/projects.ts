import { Project } from '../types';
import { getUserSummaries, getRandomUsers } from './users';

export const projects: Project[] = [
  {
    id: '1',
    name: 'ProjectFlow Mobile App',
    description: 'Native mobile application for iOS and Android with real-time sync and offline capabilities.',
    startDate: '2024-01-15',
    endDate: '2024-06-15',
    status: 'active',
    visibility: 'private',
    progress: 75,
    members: getUserSummaries(['1', '2', '3', '4']),
    tags: ['mobile', 'react-native', 'high-priority'],
    repo: 'github.com/projectflow/mobile-app',
    avatar: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=400',
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-03-10T15:30:00Z',
    createdBy: '1',
  },
  {
    id: '2',
    name: 'Analytics Dashboard v2',
    description: 'Complete redesign of the analytics dashboard with advanced reporting and data visualization.',
    startDate: '2024-02-01',
    endDate: '2024-05-01',
    status: 'active',
    visibility: 'public',
    progress: 45,
    members: getUserSummaries(['2', '5', '6']),
    tags: ['frontend', 'analytics', 'charts'],
    repo: 'github.com/projectflow/analytics-v2',
    avatar: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400',
    createdAt: '2024-02-01T10:00:00Z',
    updatedAt: '2024-03-10T12:15:00Z',
    createdBy: '2',
  },
  {
    id: '3',
    name: 'API Gateway Microservice',
    description: 'Scalable API gateway with authentication, rate limiting, and service discovery.',
    startDate: '2024-01-20',
    endDate: '2024-04-20',
    status: 'active',
    visibility: 'private',
    progress: 90,
    members: getUserSummaries(['1', '3', '7']),
    tags: ['backend', 'microservices', 'api'],
    repo: 'github.com/projectflow/api-gateway',
    avatar: 'https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=400',
    createdAt: '2024-01-20T10:00:00Z',
    updatedAt: '2024-03-10T16:45:00Z',
    createdBy: '1',
  },
  {
    id: '4',
    name: 'Customer Support Portal',
    description: 'Self-service portal for customers with ticketing system and knowledge base.',
    startDate: '2024-02-15',
    endDate: '2024-07-15',
    status: 'active',
    visibility: 'public',
    progress: 25,
    members: getUserSummaries(['4', '5', '8']),
    tags: ['frontend', 'customer-support', 'portal'],
    repo: 'github.com/projectflow/support-portal',
    avatar: 'https://images.unsplash.com/photo-1553028826-f4804151e2a2?w=400',
    createdAt: '2024-02-15T10:00:00Z',
    updatedAt: '2024-03-10T11:20:00Z',
    createdBy: '5',
  },
  {
    id: '5',
    name: 'Infrastructure Migration',
    description: 'Migration from legacy infrastructure to cloud-native Kubernetes platform.',
    startDate: '2024-03-01',
    endDate: '2024-08-01',
    status: 'active',
    visibility: 'private',
    progress: 15,
    members: getUserSummaries(['1', '2', '7']),
    tags: ['infrastructure', 'kubernetes', 'migration'],
    repo: 'github.com/projectflow/infra-migration',
    avatar: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400',
    createdAt: '2024-03-01T10:00:00Z',
    updatedAt: '2024-03-10T14:10:00Z',
    createdBy: '1',
  },
  {
    id: '6',
    name: 'Design System Library',
    description: 'Comprehensive design system with React components and Figma assets.',
    startDate: '2024-01-10',
    endDate: '2024-04-10',
    status: 'completed',
    visibility: 'public',
    progress: 100,
    members: getUserSummaries(['6', '8']),
    tags: ['design', 'components', 'library'],
    repo: 'github.com/projectflow/design-system',
    avatar: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400',
    createdAt: '2024-01-10T10:00:00Z',
    updatedAt: '2024-04-10T17:00:00Z',
    createdBy: '6',
  },
];

// Helper functions
export const getProjectsByStatus = (status: Project['status']) => {
  return projects.filter(project => project.status === status);
};

export const getProjectsByMember = (userId: string) => {
  return projects.filter(project => 
    project.members.some(member => member.id === userId)
  );
};

export const getActiveProjects = () => {
  return projects.filter(project => project.status === 'active');
};
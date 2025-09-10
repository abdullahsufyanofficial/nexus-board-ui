import { User, UserSummary } from '../types';

export const users: User[] = [
  {
    id: '1',
    name: 'Alex Thompson',
    email: 'alex@projectflow.com',
    avatar: 'https://i.pravatar.cc/150?img=1',
    role: 'admin',
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z',
  },
  {
    id: '2',
    name: 'Sarah Chen',
    email: 'sarah@projectflow.com',
    avatar: 'https://i.pravatar.cc/150?img=2',
    role: 'manager',
    createdAt: '2024-01-16T10:00:00Z',
    updatedAt: '2024-01-16T10:00:00Z',
  },
  {
    id: '3',
    name: 'Michael Rodriguez',
    email: 'michael@projectflow.com',
    avatar: 'https://i.pravatar.cc/150?img=3',
    role: 'member',
    createdAt: '2024-01-17T10:00:00Z',
    updatedAt: '2024-01-17T10:00:00Z',
  },
  {
    id: '4',
    name: 'Emily Johnson',
    email: 'emily@projectflow.com',
    avatar: 'https://i.pravatar.cc/150?img=4',
    role: 'member',
    createdAt: '2024-01-18T10:00:00Z',
    updatedAt: '2024-01-18T10:00:00Z',
  },
  {
    id: '5',
    name: 'David Kim',
    email: 'david@projectflow.com',
    avatar: 'https://i.pravatar.cc/150?img=5',
    role: 'manager',
    createdAt: '2024-01-19T10:00:00Z',
    updatedAt: '2024-01-19T10:00:00Z',
  },
  {
    id: '6',
    name: 'Lisa Wang',
    email: 'lisa@projectflow.com',
    avatar: 'https://i.pravatar.cc/150?img=6',
    role: 'member',
    createdAt: '2024-01-20T10:00:00Z',
    updatedAt: '2024-01-20T10:00:00Z',
  },
  {
    id: '7',
    name: 'James Wilson',
    email: 'james@projectflow.com',
    avatar: 'https://i.pravatar.cc/150?img=7',
    role: 'member',
    createdAt: '2024-01-21T10:00:00Z',
    updatedAt: '2024-01-21T10:00:00Z',
  },
  {
    id: '8',
    name: 'Rachel Green',
    email: 'rachel@projectflow.com',
    avatar: 'https://i.pravatar.cc/150?img=8',
    role: 'member',
    createdAt: '2024-01-22T10:00:00Z',
    updatedAt: '2024-01-22T10:00:00Z',
  },
];

// Helper function to get user summaries
export const getUserSummaries = (userIds: string[]): UserSummary[] => {
  return users
    .filter(user => userIds.includes(user.id))
    .map(({ id, name, email, avatar, role }) => ({ id, name, email, avatar, role }));
};

// Get random users
export const getRandomUsers = (count: number): UserSummary[] => {
  const shuffled = [...users].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count).map(({ id, name, email, avatar, role }) => ({ id, name, email, avatar, role }));
};
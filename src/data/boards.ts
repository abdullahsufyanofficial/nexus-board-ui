import { Board } from '../types';

export const boards: Board[] = [
  {
    id: 'board-1',
    projectId: '1',
    name: 'Development Sprint',
    description: 'Main development workflow for the mobile app',
    color: 'bg-blue-500',
    position: 0,
    status: 'active',
    isEnabled: true,
    isFrozen: false,
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z',
    createdBy: '1',
  },
  {
    id: 'board-2',
    projectId: '1',
    name: 'Bug Fixes',
    description: 'Track and resolve bugs and issues',
    color: 'bg-red-500',
    position: 1,
    status: 'active',
    isEnabled: true,
    isFrozen: false,
    createdAt: '2024-01-16T10:00:00Z',
    updatedAt: '2024-01-16T10:00:00Z',
    createdBy: '2',
  },
  {
    id: 'board-3',
    projectId: '1',
    name: 'Feature Requests',
    description: 'New features and enhancements',
    color: 'bg-green-500',
    position: 2,
    status: 'inactive',
    isEnabled: false,
    isFrozen: true,
    createdAt: '2024-01-17T10:00:00Z',
    updatedAt: '2024-01-17T10:00:00Z',
    createdBy: '1',
  },
];

export const getBoardsByProject = (projectId: string) => {
  return boards
    .filter(board => board.projectId === projectId)
    .sort((a, b) => a.position - b.position);
};
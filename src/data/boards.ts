import { Board } from '../types';
import boardsData from './boards.json';

export const boards: Board[] = boardsData as Board[];

export const getBoardsByProject = (projectId: string) => {
  return boards
    .filter(board => board.projectId === projectId)
    .sort((a, b) => a.position - b.position);
}
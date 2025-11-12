import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { MoveHorizontal as MoreHorizontal, CreditCard as Edit, Trash2, Eye, EyeOff, Snowflake, Play, Pause, GripVertical } from 'lucide-react';

import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Board } from '../../types';

interface BoardCardProps {
  board: Board;
  taskCount: number;
  canManage: boolean;
  onEdit: () => void;
  onDelete: () => void;
  onToggleStatus: () => void;
  onToggleEnabled: () => void;
  onToggleFrozen: () => void;
  onSelect: () => void;
  isDragging?: boolean;
  isSelected?: boolean;
}

const BoardCard = ({ 
  board, 
  taskCount, 
  canManage, 
  onEdit, 
  onDelete, 
  onToggleStatus, 
  onToggleEnabled, 
  onToggleFrozen, 
  onSelect,
  isDragging = false,
  isSelected = false
}: BoardCardProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging: isSortableDragging,
  } = useSortable({ 
    id: board.id,
    data: {
      type: 'board',
      board,
    },
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const getStatusBadge = () => {
    if (!board.isEnabled) return { variant: 'secondary', text: 'Disabled' };
    if (board.isFrozen) return { variant: 'outline', text: 'Frozen' };
    if (board.status === 'inactive') return { variant: 'secondary', text: 'Inactive' };
    return { variant: 'default', text: 'Active' };
  };

  const statusBadge = getStatusBadge();
  const isBeingDragged = isDragging || isSortableDragging;

  return (
    <div ref={setNodeRef} style={style} className="w-64">
      <Card 
        className={`cursor-pointer hover:shadow-lg transition-all duration-200 group ${
          isBeingDragged ? 'opacity-50 rotate-2 shadow-xl' : ''
        } ${!board.isEnabled ? 'opacity-60' : ''} ${
          isSelected ? 'ring-2 ring-primary bg-primary/5' : ''
        }`}
        onClick={onSelect}
      >
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 flex-1">
              <div className={`w-4 h-4 rounded-full ${board.color}`} />
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-lg truncate">{board.name}</h3>
                {board.description && (
                  <p className="text-sm text-muted-foreground line-clamp-1">
                    {board.description}
                  </p>
                )}
              </div>
            </div>
            
            <div className="flex items-center gap-1">
              {/* Drag handle */}
              {canManage && (
                <div 
                  {...attributes} 
                  {...listeners}
                  className="opacity-0 group-hover:opacity-100 transition-opacity cursor-grab active:cursor-grabbing p-1 hover:bg-muted rounded"
                  onClick={(e) => e.stopPropagation()}
                >
                  <GripVertical className="h-4 w-4 text-muted-foreground" />
                </div>
              )}
              
              {/* Actions menu */}
              {canManage && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                    <Button variant="ghost" size="icon" className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={(e) => { e.stopPropagation(); onEdit(); }}>
                      <Edit className="mr-2 h-4 w-4" />
                      Edit Board
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={(e) => { e.stopPropagation(); onToggleStatus(); }}>
                      {board.status === 'active' ? (
                        <>
                          <Pause className="mr-2 h-4 w-4" />
                          Set Inactive
                        </>
                      ) : (
                        <>
                          <Play className="mr-2 h-4 w-4" />
                          Set Active
                        </>
                      )}
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={(e) => { e.stopPropagation(); onToggleEnabled(); }}>
                      {board.isEnabled ? (
                        <>
                          <EyeOff className="mr-2 h-4 w-4" />
                          Disable Board
                        </>
                      ) : (
                        <>
                          <Eye className="mr-2 h-4 w-4" />
                          Enable Board
                        </>
                      )}
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={(e) => { e.stopPropagation(); onToggleFrozen(); }}>
                      {board.isFrozen ? (
                        <>
                          <Play className="mr-2 h-4 w-4" />
                          Unfreeze Board
                        </>
                      ) : (
                        <>
                          <Snowflake className="mr-2 h-4 w-4" />
                          Freeze Board
                        </>
                      )}
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem 
                      onClick={(e) => { e.stopPropagation(); onDelete(); }}
                      className="text-destructive"
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete Board
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="pt-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Badge variant={statusBadge.variant as any} className="text-xs">
                {statusBadge.text}
              </Badge>
              <span className="text-sm text-muted-foreground">
                {taskCount} task{taskCount !== 1 ? 's' : ''}
              </span>
            </div>
            
            <div className="flex items-center gap-1">
              {board.isFrozen && (
                <div title="Frozen">
                  <Snowflake className="h-4 w-4 text-blue-500" />
                </div>
              )}
              {!board.isEnabled && (
                <div title="Disabled">
                  <EyeOff className="h-4 w-4 text-muted-foreground" />
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BoardCard;
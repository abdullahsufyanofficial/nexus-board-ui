import { useState } from 'react';
import { SearchFilters, TaskPriority, TaskStatus } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Search, X, Filter } from 'lucide-react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';

interface AdvancedSearchProps {
  onSearch: (filters: SearchFilters) => void;
}

const AdvancedSearch = ({ onSearch }: AdvancedSearchProps) => {
  const [filters, setFilters] = useState<SearchFilters>({});
  const [isOpen, setIsOpen] = useState(false);

  const priorities: TaskPriority[] = ['low', 'medium', 'high', 'urgent'];
  const statuses: TaskStatus[] = ['todo', 'in-progress', 'review', 'done'];

  const handleSearch = () => {
    onSearch(filters);
    setIsOpen(false);
  };

  const handleClear = () => {
    setFilters({});
    onSearch({});
  };

  const togglePriority = (priority: TaskPriority) => {
    const current = filters.priorities || [];
    const updated = current.includes(priority)
      ? current.filter(p => p !== priority)
      : [...current, priority];
    setFilters({ ...filters, priorities: updated });
  };

  const toggleStatus = (status: TaskStatus) => {
    const current = filters.statuses || [];
    const updated = current.includes(status)
      ? current.filter(s => s !== status)
      : [...current, status];
    setFilters({ ...filters, statuses: updated });
  };

  const activeFiltersCount = 
    (filters.query ? 1 : 0) +
    (filters.priorities?.length || 0) +
    (filters.statuses?.length || 0) +
    (filters.tags?.length || 0);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" className="relative">
          <Filter className="h-4 w-4 mr-2" />
          Advanced Search
          {activeFiltersCount > 0 && (
            <Badge className="ml-2 h-5 w-5 p-0 flex items-center justify-center">
              {activeFiltersCount}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Advanced Search</SheetTitle>
        </SheetHeader>

        <div className="space-y-6 mt-6">
          <div className="space-y-2">
            <Label>Search Query</Label>
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                value={filters.query || ''}
                onChange={(e) => setFilters({ ...filters, query: e.target.value })}
                placeholder="Search tasks..."
                className="pl-9"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Priority</Label>
            <div className="flex flex-wrap gap-2">
              {priorities.map((priority) => (
                <Badge
                  key={priority}
                  variant={filters.priorities?.includes(priority) ? 'default' : 'outline'}
                  className="cursor-pointer"
                  onClick={() => togglePriority(priority)}
                >
                  {priority}
                </Badge>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label>Status</Label>
            <div className="flex flex-wrap gap-2">
              {statuses.map((status) => (
                <Badge
                  key={status}
                  variant={filters.statuses?.includes(status) ? 'default' : 'outline'}
                  className="cursor-pointer"
                  onClick={() => toggleStatus(status)}
                >
                  {status}
                </Badge>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label>Date Range</Label>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <Input
                  type="date"
                  value={filters.dateRange?.start || ''}
                  onChange={(e) => setFilters({ 
                    ...filters, 
                    dateRange: { ...filters.dateRange, start: e.target.value } as any
                  })}
                />
              </div>
              <div>
                <Input
                  type="date"
                  value={filters.dateRange?.end || ''}
                  onChange={(e) => setFilters({ 
                    ...filters, 
                    dateRange: { ...filters.dateRange, end: e.target.value } as any
                  })}
                />
              </div>
            </div>
          </div>

          <div className="flex gap-2 pt-4">
            <Button onClick={handleSearch} className="flex-1">
              Apply Filters
            </Button>
            <Button onClick={handleClear} variant="outline">
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default AdvancedSearch;

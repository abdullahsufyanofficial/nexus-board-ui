import { useState } from 'react';
import { AutomationRule } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Zap, Plus } from 'lucide-react';

interface AutomationRulesProps {
  rules: AutomationRule[];
  onToggleRule: (ruleId: string, enabled: boolean) => void;
  onAddRule: () => void;
}

const AutomationRules = ({ rules, onToggleRule, onAddRule }: AutomationRulesProps) => {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5" />
            Automation Rules
          </CardTitle>
          <Button size="sm" onClick={onAddRule}>
            <Plus className="h-4 w-4 mr-1" />
            Add Rule
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {rules.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-sm text-muted-foreground mb-4">
              No automation rules yet
            </p>
            <Button onClick={onAddRule}>
              <Plus className="h-4 w-4 mr-2" />
              Create First Rule
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {rules.map((rule) => (
              <div
                key={rule.id}
                className="flex items-start justify-between p-4 border rounded-lg"
              >
                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-2">
                    <h4 className="font-medium">{rule.name}</h4>
                    <Badge variant={rule.enabled ? 'default' : 'secondary'}>
                      {rule.enabled ? 'Active' : 'Inactive'}
                    </Badge>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    <p>
                      <span className="font-medium">When:</span> {rule.trigger}
                    </p>
                    <p>
                      <span className="font-medium">Then:</span> {rule.actions.length} action(s)
                    </p>
                  </div>
                </div>
                <Switch
                  checked={rule.enabled}
                  onCheckedChange={(checked) => onToggleRule(rule.id, checked)}
                />
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AutomationRules;

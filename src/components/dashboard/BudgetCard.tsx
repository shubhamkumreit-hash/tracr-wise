import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Edit, Save, X } from 'lucide-react';

interface BudgetCardProps {
  budget: number;
  spent: number;
  onUpdateBudget: (amount: number) => void;
}

export const BudgetCard = ({ budget, spent, onUpdateBudget }: BudgetCardProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newBudget, setNewBudget] = useState(budget.toString());

  const percentage = (spent / budget) * 100;
  const remaining = budget - spent;

  const handleSave = () => {
    const amount = parseFloat(newBudget);
    if (amount > 0) {
      onUpdateBudget(amount);
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setNewBudget(budget.toString());
    setIsEditing(false);
  };

  return (
    <Card className="p-6 bg-gradient-card shadow-md">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-foreground">Monthly Budget</h2>
        {!isEditing ? (
          <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>
            <Edit className="h-4 w-4" />
          </Button>
        ) : (
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={handleSave}>
              <Save className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm" onClick={handleCancel}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>

      {isEditing ? (
        <div className="space-y-2">
          <Label htmlFor="budget">Budget Amount ($)</Label>
          <Input
            id="budget"
            type="number"
            step="0.01"
            min="0"
            value={newBudget}
            onChange={(e) => setNewBudget(e.target.value)}
          />
        </div>
      ) : (
        <>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm text-muted-foreground">Spent</span>
                <span className="text-sm font-medium">${spent.toFixed(2)}</span>
              </div>
              <Progress value={percentage} className="h-3" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 bg-background rounded-lg border border-border">
                <p className="text-xs text-muted-foreground mb-1">Budget</p>
                <p className="text-xl font-bold text-foreground">${budget.toFixed(2)}</p>
              </div>
              <div className="p-3 bg-background rounded-lg border border-border">
                <p className="text-xs text-muted-foreground mb-1">Remaining</p>
                <p className={`text-xl font-bold ${remaining >= 0 ? 'text-success' : 'text-destructive'}`}>
                  ${Math.abs(remaining).toFixed(2)}
                </p>
              </div>
            </div>

            {percentage > 80 && (
              <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
                <p className="text-sm text-destructive font-medium">
                  {percentage > 100 ? '⚠️ Budget exceeded!' : '⚠️ Approaching budget limit'}
                </p>
              </div>
            )}
          </div>
        </>
      )}
    </Card>
  );
};

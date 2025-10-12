import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
import { Expense } from '@/services/apiService';

interface ExpenseListProps {
  expenses: Expense[];
  onDeleteExpense: (id: string) => void;
}

export const ExpenseList = ({ expenses, onDeleteExpense }: ExpenseListProps) => {
  return (
    <Card className="p-6 bg-gradient-card shadow-md">
      <h2 className="text-xl font-semibold mb-4 text-foreground">Recent Expenses</h2>
      
      {expenses.length === 0 ? (
        <p className="text-center text-muted-foreground py-8">No expenses yet. Add your first expense!</p>
      ) : (
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {expenses.map((expense) => (
            <div
              key={expense.id}
              className="flex items-center justify-between p-4 bg-background rounded-lg border border-border hover:shadow-md transition-shadow"
            >
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-1">
                  <span className="px-3 py-1 text-xs font-medium rounded-full bg-primary text-primary-foreground">
                    {expense.category}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {new Date(expense.date).toLocaleDateString()}
                  </span>
                </div>
                {expense.note && (
                  <p className="text-sm text-muted-foreground">{expense.note}</p>
                )}
              </div>
              
              <div className="flex items-center gap-3">
                <span className="text-lg font-bold text-foreground">
                  ${expense.amount.toFixed(2)}
                </span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => onDeleteExpense(expense.id)}
                  className="hover:bg-destructive hover:text-destructive-foreground"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
};

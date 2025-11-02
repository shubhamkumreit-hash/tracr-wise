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
    <Card className="p-6 bg-gradient-card shadow-lg hover:shadow-xl transition-shadow border-none animate-fade-in">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-gradient-secondary rounded-lg animate-pulse-glow">
          <Trash2 className="h-5 w-5 text-white" />
        </div>
        <h2 className="text-xl font-bold text-foreground">Recent Expenses</h2>
      </div>
      
      {expenses.length === 0 ? (
        <div className="text-center py-12 animate-fade-in">
          <div className="mb-4 opacity-50 animate-float">
            <Trash2 className="h-16 w-16 mx-auto text-muted-foreground" />
          </div>
          <p className="text-muted-foreground text-lg">No expenses yet</p>
          <p className="text-sm text-muted-foreground mt-2">Add your first expense to get started!</p>
        </div>
      ) : (
        <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
          {expenses.map((expense, index) => (
            <div
              key={expense.id}
              className="flex items-center justify-between p-4 bg-background rounded-xl border border-border hover:shadow-lg hover:border-primary/50 transition-all hover-lift animate-slide-in-right"
              style={{ animationDelay: `${index * 0.05}s`, animationFillMode: 'backwards' }}
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
                  className="hover:bg-destructive hover:text-destructive-foreground transition-all"
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

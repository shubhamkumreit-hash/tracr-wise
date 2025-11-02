import { TrendingUp, TrendingDown, DollarSign, Calendar, Receipt } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { ExpenseStats } from '@/services/apiService';

interface StatsCardsProps {
  stats: ExpenseStats | null;
  totalSpent: number;
  budget: number;
}

export const StatsCards = ({ stats, totalSpent, budget }: StatsCardsProps) => {
  if (!stats) return null;

  const remaining = budget - totalSpent;
  const avgExpense = stats.averageExpense || 0;
  const topCategory = Object.entries(stats.categoryBreakdown)
    .sort(([, a], [, b]) => b - a)[0];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <Card className="p-6 bg-gradient-card border-none shadow-lg hover-lift animate-scale-in" style={{ animationDelay: '0.1s', animationFillMode: 'backwards' }}>
        <div className="flex items-center justify-between mb-4">
          <div className="p-3 bg-gradient-primary rounded-xl shadow-glow">
            <DollarSign className="h-6 w-6 text-white" />
          </div>
          {remaining >= 0 ? (
            <TrendingUp className="h-5 w-5 text-success" />
          ) : (
            <TrendingDown className="h-5 w-5 text-destructive" />
          )}
        </div>
        <div>
          <p className="text-sm text-muted-foreground mb-1">Remaining Budget</p>
          <p className={`text-2xl font-bold ${remaining >= 0 ? 'text-success' : 'text-destructive'}`}>
            ${Math.abs(remaining).toFixed(2)}
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            {remaining >= 0 ? 'On track' : 'Over budget'}
          </p>
        </div>
      </Card>

      <Card className="p-6 bg-gradient-card border-none shadow-lg hover-lift animate-scale-in" style={{ animationDelay: '0.2s', animationFillMode: 'backwards' }}>
        <div className="flex items-center justify-between mb-4">
          <div className="p-3 bg-gradient-secondary rounded-xl">
            <Calendar className="h-6 w-6 text-white" />
          </div>
        </div>
        <div>
          <p className="text-sm text-muted-foreground mb-1">Avg. Expense</p>
          <p className="text-2xl font-bold text-foreground">
            ${avgExpense.toFixed(2)}
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            Per transaction
          </p>
        </div>
      </Card>

      <Card className="p-6 bg-gradient-card border-none shadow-lg hover-lift animate-scale-in" style={{ animationDelay: '0.3s', animationFillMode: 'backwards' }}>
        <div className="flex items-center justify-between mb-4">
          <div className="p-3 bg-gradient-success rounded-xl">
            <TrendingUp className="h-6 w-6 text-white" />
          </div>
        </div>
        <div>
          <p className="text-sm text-muted-foreground mb-1">Top Category</p>
          <p className="text-2xl font-bold text-foreground">
            {topCategory?.[0] || 'N/A'}
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            ${topCategory?.[1]?.toFixed(2) || '0.00'} spent
          </p>
        </div>
      </Card>

      <Card className="p-6 bg-gradient-card border-none shadow-lg hover-lift animate-scale-in" style={{ animationDelay: '0.4s', animationFillMode: 'backwards' }}>
        <div className="flex items-center justify-between mb-4">
          <div className="p-3 bg-accent rounded-xl">
            <Receipt className="h-6 w-6 text-white" />
          </div>
        </div>
        <div>
          <p className="text-sm text-muted-foreground mb-1">Total Expenses</p>
          <p className="text-2xl font-bold text-foreground">
            {stats.expenseCount}
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            This month
          </p>
        </div>
      </Card>
    </div>
  );
};


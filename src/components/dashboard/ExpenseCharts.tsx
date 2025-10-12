import { Card } from '@/components/ui/card';
import { BarChart, Bar, PieChart, Pie, Cell, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';
import { Expense, ExpenseStats } from '@/services/apiService';

interface ExpenseChartsProps {
  expenses: Expense[];
  stats: ExpenseStats;
}

const COLORS = ['#8b5cf6', '#6366f1', '#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#ec4899'];

export const ExpenseCharts = ({ expenses, stats }: ExpenseChartsProps) => {
  const categoryData = Object.entries(stats.categoryBreakdown).map(([name, value]) => ({
    name,
    value,
  }));

  const dailyData = expenses
    .slice(0, 7)
    .map((exp) => ({
      date: new Date(exp.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      amount: exp.amount,
    }))
    .reverse();

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <Card className="p-6 bg-gradient-card shadow-lg hover:shadow-xl transition-shadow border-none">
        <h3 className="text-xl font-bold mb-6 text-foreground">Spending by Category</h3>
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={categoryData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {categoryData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip formatter={(value: number) => `$${value.toFixed(2)}`} />
          </PieChart>
        </ResponsiveContainer>
      </Card>

      <Card className="p-6 bg-gradient-card shadow-lg hover:shadow-xl transition-shadow border-none">
        <h3 className="text-xl font-bold mb-6 text-foreground">Recent Activity</h3>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={dailyData}>
            <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" />
            <YAxis stroke="hsl(var(--muted-foreground))" />
            <Tooltip formatter={(value: number) => `$${value.toFixed(2)}`} />
            <Bar dataKey="amount" fill="hsl(var(--primary))" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </Card>
    </div>
  );
};

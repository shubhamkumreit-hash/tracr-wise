import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { expenseApi, budgetApi, statsApi, Expense, Budget, ExpenseStats } from '@/services/apiService';
import { ExpenseForm } from '@/components/dashboard/ExpenseForm';
import { ExpenseList } from '@/components/dashboard/ExpenseList';
import { BudgetCard } from '@/components/dashboard/BudgetCard';
import { ExpenseCharts } from '@/components/dashboard/ExpenseCharts';
import { DashboardHeader } from '@/components/dashboard/DashboardHeader';
import { DashboardHero } from '@/components/dashboard/DashboardHero';
import { StatsCards } from '@/components/dashboard/StatsCards';
import { toast } from 'sonner';

const Dashboard = () => {
  const { isAuthenticated, isLoading } = useAuth();
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [budget, setBudget] = useState<Budget | null>(null);
  const [stats, setStats] = useState<ExpenseStats | null>(null);
  const [isLoadingData, setIsLoadingData] = useState(true);

  useEffect(() => {
    if (isAuthenticated) {
      loadData();
    }
  }, [isAuthenticated]);

  const loadData = async () => {
    try {
      setIsLoadingData(true);
      const [expensesData, budgetData, statsData] = await Promise.all([
        expenseApi.getAll(),
        budgetApi.get(),
        statsApi.get(),
      ]);
      setExpenses(expensesData);
      setBudget(budgetData);
      setStats(statsData);
    } catch (error: any) {
      toast.error('Failed to load data');
    } finally {
      setIsLoadingData(false);
    }
  };

  const handleAddExpense = async (expense: Omit<Expense, 'id' | 'userId' | 'createdAt' | 'updatedAt'>) => {
    try {
      await expenseApi.create(expense);
      await loadData();
      toast.success('Expense added successfully!');
    } catch (error) {
      toast.error('Failed to add expense');
    }
  };

  const handleDeleteExpense = async (id: string) => {
    try {
      await expenseApi.delete(id);
      await loadData();
      toast.success('Expense deleted successfully!');
    } catch (error) {
      toast.error('Failed to delete expense');
    }
  };

  const handleUpdateBudget = async (amount: number) => {
    try {
      await budgetApi.update(amount);
      await loadData();
      toast.success('Budget updated successfully!');
    } catch (error) {
      toast.error('Failed to update budget');
    }
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-primary/20 via-background to-secondary/20">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-primary border-t-transparent shadow-glow"></div>
          <p className="text-sm text-muted-foreground animate-pulse">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  const totalSpent = expenses.reduce((sum, exp) => sum + exp.amount, 0);
  const budgetAmount = budget?.amount || 5000;

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-secondary/10">
      <DashboardHeader />
      
      <DashboardHero totalSpent={totalSpent} budget={budgetAmount} expenseCount={expenses.length} />
      
      <main className="container mx-auto px-4 py-8 space-y-8">
        {isLoadingData ? (
          <div className="flex justify-center items-center h-64">
            <div className="flex flex-col items-center gap-3">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent"></div>
              <p className="text-sm text-muted-foreground">Loading your data...</p>
            </div>
          </div>
        ) : (
          <>
            <StatsCards stats={stats} totalSpent={totalSpent} budget={budgetAmount} />
            
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-1 space-y-6">
                <ExpenseForm onAddExpense={handleAddExpense} />
                <BudgetCard
                  budget={budgetAmount}
                  spent={totalSpent}
                  onUpdateBudget={handleUpdateBudget}
                />
              </div>
              
              <div className="lg:col-span-2 space-y-6">
                <ExpenseList expenses={expenses} onDeleteExpense={handleDeleteExpense} />
                {stats && <ExpenseCharts expenses={expenses} stats={stats} />}
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default Dashboard;

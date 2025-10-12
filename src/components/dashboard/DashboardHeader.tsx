import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Wallet, LogOut } from 'lucide-react';

export const DashboardHeader = () => {
  const { signOut } = useAuth();

  return (
    <header className="bg-card border-b border-border shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-primary rounded-xl shadow-glow">
              <Wallet className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Expense Tracker</h1>
              <p className="text-sm text-muted-foreground">Track your spending</p>
            </div>
          </div>
          
          <Button onClick={signOut} variant="outline" size="sm">
            <LogOut className="mr-2 h-4 w-4" />
            Sign Out
          </Button>
        </div>
      </div>
    </header>
  );
};

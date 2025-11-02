import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Wallet, LogOut } from 'lucide-react';

export const DashboardHeader = () => {
  const { signOut } = useAuth();

  return (
    <header className="bg-card border-b border-border shadow-md backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between animate-fade-in-down">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-primary rounded-xl shadow-glow animate-pulse-glow">
              <Wallet className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold gradient-text">Expense Tracker</h1>
              <p className="text-sm text-muted-foreground">Track your spending</p>
            </div>
          </div>
          
          <Button onClick={signOut} variant="outline" size="sm" className="hover-lift">
            <LogOut className="mr-2 h-4 w-4" />
            Sign Out
          </Button>
        </div>
      </div>
    </header>
  );
};

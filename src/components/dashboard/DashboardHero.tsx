import { TrendingUp, Wallet, Receipt } from 'lucide-react';

interface DashboardHeroProps {
  totalSpent: number;
  budget: number;
  expenseCount: number;
}

export const DashboardHero = ({ totalSpent, budget, expenseCount }: DashboardHeroProps) => {
  const remaining = budget - totalSpent;
  const percentUsed = (totalSpent / budget) * 100;

  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-primary via-secondary to-accent text-white">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=1920&h=400&fit=crop')] opacity-10 bg-cover bg-center" />
      
      <div className="relative container mx-auto px-4 py-12">
        <div className="max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-fade-in-down">
            Welcome Back! 👋
          </h1>
          <p className="text-xl text-white/90 mb-8 animate-fade-in" style={{ animationDelay: '0.1s', animationFillMode: 'backwards' }}>
            Here's your financial overview for this month
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="glass-effect bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover-lift animate-scale-in shadow-xl" style={{ animationDelay: '0.2s', animationFillMode: 'backwards' }}>
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-white/20 rounded-lg animate-pulse-glow">
                  <Wallet className="h-5 w-5" />
                </div>
                <span className="text-sm text-white/80">Total Budget</span>
              </div>
              <p className="text-3xl font-bold">${budget.toFixed(2)}</p>
            </div>
            
            <div className="glass-effect bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover-lift animate-scale-in shadow-xl" style={{ animationDelay: '0.3s', animationFillMode: 'backwards' }}>
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-white/20 rounded-lg animate-pulse-glow">
                  <TrendingUp className="h-5 w-5" />
                </div>
                <span className="text-sm text-white/80">Total Spent</span>
              </div>
              <p className="text-3xl font-bold">${totalSpent.toFixed(2)}</p>
              <p className="text-sm text-white/70 mt-1">{percentUsed.toFixed(0)}% of budget</p>
            </div>
            
            <div className="glass-effect bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover-lift animate-scale-in shadow-xl" style={{ animationDelay: '0.4s', animationFillMode: 'backwards' }}>
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-white/20 rounded-lg animate-pulse-glow">
                  <Receipt className="h-5 w-5" />
                </div>
                <span className="text-sm text-white/80">Expenses</span>
              </div>
              <p className="text-3xl font-bold">{expenseCount}</p>
              <p className="text-sm text-white/70 mt-1">{remaining >= 0 ? `$${remaining.toFixed(2)} left` : 'Over budget!'}</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />
    </div>
  );
};

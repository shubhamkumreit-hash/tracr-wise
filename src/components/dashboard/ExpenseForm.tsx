import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card } from '@/components/ui/card';
import { Plus } from 'lucide-react';
import { Expense } from '@/services/apiService';

const CATEGORIES = ['Food', 'Transportation', 'Entertainment', 'Shopping', 'Healthcare', 'Bills', 'Other'];

interface ExpenseFormProps {
  onAddExpense: (expense: Omit<Expense, 'id' | 'userId' | 'createdAt' | 'updatedAt'>) => Promise<void>;
}

export const ExpenseForm = ({ onAddExpense }: ExpenseFormProps) => {
  const [category, setCategory] = useState('');
  const [amount, setAmount] = useState('');
  const [note, setNote] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!category || !amount) return;

    setIsSubmitting(true);
    try {
      await onAddExpense({
        category,
        amount: parseFloat(amount),
        note,
        date,
      });
      
      setCategory('');
      setAmount('');
      setNote('');
      setDate(new Date().toISOString().split('T')[0]);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="p-6 bg-gradient-card shadow-md">
      <h2 className="text-xl font-semibold mb-4 text-foreground">Add Expense</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="category">Category</Label>
          <Select value={category} onValueChange={setCategory} required>
            <SelectTrigger id="category">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              {CATEGORIES.map((cat) => (
                <SelectItem key={cat} value={cat}>
                  {cat}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="amount">Amount ($)</Label>
          <Input
            id="amount"
            type="number"
            step="0.01"
            min="0"
            placeholder="0.00"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="date">Date</Label>
          <Input
            id="date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="note">Note (optional)</Label>
          <Input
            id="note"
            placeholder="Add a note..."
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />
        </div>

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          <Plus className="mr-2 h-4 w-4" />
          {isSubmitting ? 'Adding...' : 'Add Expense'}
        </Button>
      </form>
    </Card>
  );
};

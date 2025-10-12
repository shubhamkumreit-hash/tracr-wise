import { awsConfig } from '@/config/aws-config';
import { getIdToken } from './authService';

const API_BASE_URL = awsConfig.apiBaseUrl;

const getAuthHeaders = async () => {
  const token = await getIdToken();
  return {
    'Content-Type': 'application/json',
    'Authorization': token,
  };
};

export interface Expense {
  id: string;
  userId: string;
  category: string;
  amount: number;
  note: string;
  date: string;
  createdAt: string;
  updatedAt: string;
}

export interface Budget {
  userId: string;
  amount: number;
  updatedAt?: string;
}

export interface ExpenseStats {
  totalExpenses: number;
  expenseCount: number;
  categoryBreakdown: Record<string, number>;
  monthlyBreakdown: Record<string, number>;
  averageExpense: number;
}

export const expenseApi = {
  getAll: async (): Promise<Expense[]> => {
    const headers = await getAuthHeaders();
    const response = await fetch(`${API_BASE_URL}/expenses`, {
      headers,
    });
    if (!response.ok) throw new Error('Failed to fetch expenses');
    return response.json();
  },

  create: async (expense: Omit<Expense, 'id' | 'userId' | 'createdAt' | 'updatedAt'>): Promise<Expense> => {
    const headers = await getAuthHeaders();
    const response = await fetch(`${API_BASE_URL}/expenses`, {
      method: 'POST',
      headers,
      body: JSON.stringify(expense),
    });
    if (!response.ok) throw new Error('Failed to create expense');
    return response.json();
  },

  update: async (id: string, expense: Partial<Omit<Expense, 'id' | 'userId' | 'createdAt' | 'updatedAt'>>): Promise<Expense> => {
    const headers = await getAuthHeaders();
    const response = await fetch(`${API_BASE_URL}/expenses/${id}`, {
      method: 'PUT',
      headers,
      body: JSON.stringify(expense),
    });
    if (!response.ok) throw new Error('Failed to update expense');
    return response.json();
  },

  delete: async (id: string): Promise<void> => {
    const headers = await getAuthHeaders();
    const response = await fetch(`${API_BASE_URL}/expenses/${id}`, {
      method: 'DELETE',
      headers,
    });
    if (!response.ok) throw new Error('Failed to delete expense');
  },
};

export const budgetApi = {
  get: async (): Promise<Budget> => {
    const headers = await getAuthHeaders();
    const response = await fetch(`${API_BASE_URL}/budget`, {
      headers,
    });
    if (!response.ok) throw new Error('Failed to fetch budget');
    return response.json();
  },

  update: async (amount: number): Promise<Budget> => {
    const headers = await getAuthHeaders();
    const response = await fetch(`${API_BASE_URL}/budget`, {
      method: 'PUT',
      headers,
      body: JSON.stringify({ amount }),
    });
    if (!response.ok) throw new Error('Failed to update budget');
    return response.json();
  },
};

export const statsApi = {
  get: async (): Promise<ExpenseStats> => {
    const headers = await getAuthHeaders();
    const response = await fetch(`${API_BASE_URL}/stats`, {
      headers,
    });
    if (!response.ok) throw new Error('Failed to fetch stats');
    return response.json();
  },
};

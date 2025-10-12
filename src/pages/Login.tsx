import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { LoginForm } from '@/components/auth/LoginForm';
import { SignupForm } from '@/components/auth/SignupForm';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';
import { Wallet } from 'lucide-react';

const Login = () => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-primary p-4">
      <Card className="w-full max-w-md p-8 shadow-glow">
        <div className="flex flex-col items-center mb-8">
          <div className="p-3 bg-gradient-primary rounded-2xl mb-4 shadow-glow">
            <Wallet className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-foreground">Expense Tracker</h1>
          <p className="text-muted-foreground mt-2">Manage your finances with ease</p>
        </div>

        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Sign In</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>
          <TabsContent value="login" className="mt-6">
            <LoginForm />
          </TabsContent>
          <TabsContent value="signup" className="mt-6">
            <SignupForm />
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
};

export default Login;

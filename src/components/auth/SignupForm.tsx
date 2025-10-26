import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Loader2, Mail, CheckCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import * as authService from '@/services/authService';

export const SignupForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showVerification, setShowVerification] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const { signUp } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    if (password.length < 8) {
      toast.error('Password must be at least 8 characters');
      return;
    }

    setIsLoading(true);

    try {
      await signUp(email, password, name);
      setShowVerification(true);
      toast.success('Account created! Please check your email to verify.');
    } catch (error: any) {
      toast.error(error.message || 'Failed to sign up');
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerification = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await authService.confirmSignUp(email, verificationCode);
      setIsVerified(true);
      toast.success('Account verified! You can now sign in.');
    } catch (error: any) {
      toast.error(error.message || 'Invalid verification code');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendCode = async () => {
    setIsLoading(true);
    try {
      await authService.resendConfirmationCode(email);
      toast.success('Verification code resent! Check your email.');
    } catch (error: any) {
      toast.error(error.message || 'Failed to resend code');
    } finally {
      setIsLoading(false);
    }
  };

  if (isVerified) {
    return (
      <div className="space-y-4">
        <Alert className="border-green-500 bg-green-50">
          <CheckCircle className="h-4 w-4 text-green-600" />
          <AlertTitle className="text-green-800">Account Verified!</AlertTitle>
          <AlertDescription className="text-green-700">
            Your account has been successfully verified. You can now sign in with your credentials.
          </AlertDescription>
        </Alert>
        <Button 
          variant="default" 
          className="w-full" 
          onClick={() => {
            setIsVerified(false);
            setShowVerification(false);
          }}
        >
          Go to Sign In
        </Button>
      </div>
    );
  }

  if (showVerification) {
    return (
      <div className="space-y-4">
        <Alert>
          <Mail className="h-4 w-4" />
          <AlertTitle>Verify Your Email</AlertTitle>
          <AlertDescription>
            We've sent a 6-digit verification code to <strong>{email}</strong>.
            Please enter the code below to activate your account.
          </AlertDescription>
        </Alert>
        
        <form onSubmit={handleVerification} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="verificationCode">Verification Code</Label>
            <Input
              id="verificationCode"
              type="text"
              placeholder="Enter 6-digit code"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              required
              maxLength={6}
              className="text-center text-lg tracking-widest"
            />
          </div>
          
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Verify Account
          </Button>
        </form>

        <div className="flex gap-2">
          <Button 
            variant="outline" 
            className="flex-1" 
            onClick={() => setShowVerification(false)}
            disabled={isLoading}
          >
            Back to Sign Up
          </Button>
          <Button 
            variant="ghost" 
            className="flex-1" 
            onClick={handleResendCode}
            disabled={isLoading}
          >
            Resend Code
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type="password"
          placeholder="Create a password (min 8 characters)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength={8}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="confirmPassword">Confirm Password</Label>
        <Input
          id="confirmPassword"
          type="password"
          placeholder="Re-enter your password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          minLength={8}
        />
      </div>
      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        Create Account
      </Button>
    </form>
  );
};

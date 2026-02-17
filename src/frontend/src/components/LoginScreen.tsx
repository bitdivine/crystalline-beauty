import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Sparkles, Shield, Zap, Clock } from 'lucide-react';

export default function LoginScreen() {
  const { login, loginStatus } = useInternetIdentity();

  const isLoggingIn = loginStatus === 'logging-in';

  return (
    <div className="flex min-h-screen flex-col">
      <div className="container flex flex-1 flex-col items-center justify-center py-12">
        <div className="mb-8 text-center">
          <div className="mb-4 inline-flex h-20 w-20 items-center justify-center rounded-2xl bg-primary shadow-lg">
            <Sparkles className="h-10 w-10 text-primary-foreground" />
          </div>
          <h1 className="mb-2 text-4xl font-bold tracking-tight">Welcome to BotSpa</h1>
          <p className="text-lg text-muted-foreground">Your intelligent service management platform</p>
        </div>

        <Card className="w-full max-w-md shadow-xl">
          <CardHeader className="text-center">
            <CardTitle>Get Started</CardTitle>
            <CardDescription>Sign in securely with Internet Identity to manage your service orders</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <Button onClick={login} disabled={isLoggingIn} className="w-full" size="lg">
              {isLoggingIn ? (
                <>
                  <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-r-transparent" />
                  Connecting...
                </>
              ) : (
                <>
                  <Shield className="mr-2 h-5 w-5" />
                  Sign In with Internet Identity
                </>
              )}
            </Button>

            <div className="space-y-3 pt-4">
              <div className="flex items-start gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent">
                  <Zap className="h-4 w-4 text-accent-foreground" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium">Quick & Easy</h3>
                  <p className="text-sm text-muted-foreground">Create and manage service orders in seconds</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-secondary">
                  <Shield className="h-4 w-4 text-secondary-foreground" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium">Secure & Private</h3>
                  <p className="text-sm text-muted-foreground">Your data is protected with blockchain security</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-muted">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium">Always Available</h3>
                  <p className="text-sm text-muted-foreground">Access your orders anytime, anywhere</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

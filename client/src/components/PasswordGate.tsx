import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Lock } from "lucide-react";
import { apiRequest, queryClient } from "@/lib/queryClient";

interface AuthStatus {
  authenticated: boolean;
  passwordRequired: boolean;
}

interface PasswordGateProps {
  children: React.ReactNode;
}

export default function PasswordGate({ children }: PasswordGateProps) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { data: authStatus, isLoading } = useQuery<AuthStatus>({
    queryKey: ["/api/auth/check"],
  });

  const loginMutation = useMutation({
    mutationFn: async (password: string) => {
      const response = await apiRequest("POST", "/api/auth/login", { password });
      return response;
    },
    onSuccess: () => {
      setError("");
      queryClient.invalidateQueries({ queryKey: ["/api/auth/check"] });
    },
    onError: () => {
      setError("Invalid password. Please try again.");
      setPassword("");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password.trim()) {
      loginMutation.mutate(password);
    }
  };

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center">
        <div className="text-gray-600">Loading...</div>
      </div>
    );
  }

  // If no password required or already authenticated, show the app
  if (!authStatus?.passwordRequired || authStatus?.authenticated) {
    return <>{children}</>;
  }

  // Show password gate
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1 text-center">
          <div className="flex justify-center mb-4">
            <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center">
              <Lock className="h-8 w-8 text-primary" />
            </div>
          </div>
          <CardTitle className="text-2xl font-heading">Password Required</CardTitle>
          <CardDescription>
            Please enter the password to access this site
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Input
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loginMutation.isPending}
                autoFocus
                data-testid="input-password"
              />
              {error && (
                <p className="text-sm text-red-600" data-testid="text-error">
                  {error}
                </p>
              )}
            </div>
            <Button
              type="submit"
              className="w-full"
              disabled={loginMutation.isPending || !password.trim()}
              data-testid="button-submit"
            >
              {loginMutation.isPending ? "Verifying..." : "Access Site"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

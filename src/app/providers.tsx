"use client";

import * as React from "react";
import { Toast } from "@/components";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { resolveValue, Toaster } from "react-hot-toast";

import { AuthProvider } from "@/hooks/useAuth";

export default function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = React.useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
          },
        },
      })
  );

  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <Toaster toastOptions={{ duration: 3000, style: { marginRight: 2000 } }}>
          {(toast) => (
            <div>
              {toast.type === "success" ? (
                <Toast title={`${resolveValue(toast.message, toast)}`} />
              ) : (
                <Toast title={`${resolveValue(toast.message, toast)}`} error />
              )}
            </div>
          )}
        </Toaster>
        {children}
        <div id="portal"></div>
      </QueryClientProvider>
    </AuthProvider>
  );
}

'use client';

import { useAutoLogin } from "@/features/auth/hooks/use-auto-login";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

const Providers = ({children}: {children: React.ReactNode}) => {
    const [queryClient] = useState(
        () => 
            new QueryClient({
                defaultOptions: {
                    queries: {
                        retry: 1,
                        refetchOnWindowFocus: false,
                    }
                }
            })
    );

    useAutoLogin();

    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    )
}

export default Providers;
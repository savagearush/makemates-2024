"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { poppins, Navbar } from "./layout";

export function DashboardLayout({ children }: { children: React.ReactNode; }) {

    const queryClient = new QueryClient();

    return (
        <QueryClientProvider client={queryClient}>
            <div
                className={`flex flex-col ${poppins.className} items-center h-screen `}
            >
                <div className="z-[999] bg-slate-100 fixed top-0 h-[100px] flex items-center justify-center w-full">
                    <Navbar />
                </div>
                <div className="mt-[100px] flex w-[1200px] justify-between items-center relative pl-4">{children}</div>
            </div>
        </QueryClientProvider>
    );
}

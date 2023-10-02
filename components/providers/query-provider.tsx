"use client";
import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

type QueryClientProviderProps = {
  children: React.ReactNode;
};

const queryClient = new QueryClient();

const QueryProvider = ({ children }: QueryClientProviderProps) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default QueryProvider;

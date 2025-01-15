import React from "react";
// redux
import { Provider } from "react-redux";
import { store } from "../../redux/store";
// theme
import { ThemeProvider } from "@mui/material";
import { theme } from "./theme";
// react query
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SnackbarProvider } from "notistack";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import client from "./client";
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      cacheTime: 0,
      staleTime: 0,
      refetchOnWindowFocus: true,
      refetchInterval: 0,
      retry: false,
    },
  },
});
const Providers = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <ApolloProvider client={client}>
        <Provider store={store}>
          <ThemeProvider theme={theme}>{children}</ThemeProvider>
          <SnackbarProvider />
        </Provider>
      </ApolloProvider>
    </QueryClientProvider>
  );
};

export default Providers;
// npm install @tanstack/react-query yup react-hook-form @hookform/resolvers

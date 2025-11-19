// src/App.tsx
import { QueryProvider } from "@/providers/QueryProvider";
import AppRouter from "@/router/AppRouter";
import { Toaster } from "sonner";
import { ThemeProvider } from "@/providers/theme-provider";

function App() {
  return (
    <QueryProvider>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <AppRouter />
      </ThemeProvider>
      <Toaster richColors />
    </QueryProvider>
  );
}

export default App;

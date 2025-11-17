// src/router/ProtectedRoute.tsx
import { Navigate } from 'react-router';
import { useIsAuthenticated } from '@/hooks/useAuth';
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuth } = useIsAuthenticated();
  
  if (!isAuth) {
    return <Navigate to="/" replace />;
  }
  
  return (
    <SidebarProvider>
      <AppSidebar />
      <main>
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  );
}

export default ProtectedRoute;
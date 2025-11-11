import { Navigate } from 'react-router';
import { useAuth } from '@/providers/AuthProvider';
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuth } = useAuth();
  
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
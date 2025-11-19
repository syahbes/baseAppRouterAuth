import { useAdminById } from '@/features/admins/hooks/useAdminById'
import { useParams } from 'react-router';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuthUser } from '@/hooks/useAuth';

const AdminDetailsPage = () => {
    const { id } = useParams();
    const adminId = Number(id);
    const { data: admin, isLoading, error } = useAdminById(adminId);
    const { data: currentUser } = useAuthUser();

    const isSuperAdmin = currentUser?.role === 'super_admin';

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-lg">Loading admin details...</div>
            </div>
        );
    }

    if (error || !admin) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-lg text-red-600">
                    {error?.message || 'Admin not found'}
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto p-6">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
                <h1 className="text-2xl font-bold">Admin Details</h1>
            </div>

            <Card>
                <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <CardTitle>Admin Information</CardTitle>
                    {isSuperAdmin && (
                        <Button variant="outline" size="sm">
                            Edit
                        </Button>
                    )}
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
                        <div>
                            <label className="block text-sm font-medium text-muted-foreground">First Name</label>
                            <p className="mt-1 text-lg">{admin.firstName}</p>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-muted-foreground">Last Name</label>
                            <p className="mt-1 text-lg">{admin.lastName}</p>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-muted-foreground">Email</label>
                            <p className="mt-1 text-lg">{admin.email}</p>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-muted-foreground">Role</label>
                            <p className="mt-1 text-lg">
                                <span className={`inline-flex px-2 py-1 text-sm rounded-full ${admin.role === 'super_admin'
                                    ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
                                    : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                                    }`}>
                                    {admin.role}
                                </span>
                            </p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export { AdminDetailsPage }

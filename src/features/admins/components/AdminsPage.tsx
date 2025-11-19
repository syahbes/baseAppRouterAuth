import type { Admin } from "@/types/api.types";
import { useAdminsData } from "../hooks";
import LoadingSpinner from "@/components/LoadingSpinner";
import { useNavigate } from 'react-router';
import { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const AdminCard = ({ admin }: { admin: Admin }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/admins/${admin.id}`);
  };

  return (
    <Card
      className="hover:shadow-md transition-all duration-200 cursor-pointer hover:border-gray-200"
      onClick={handleClick}
    >
      <CardContent className="p-6">
        <div className="flex items-center space-x-4">
          <div className="flex-shrink-0">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
              <span className="text-white font-semibold text-lg">
                {admin.firstName[0]}{admin.lastName[0]}
              </span>
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-gray-900 dark:text-gray-100 font-medium text-lg truncate">
              {admin.firstName} {admin.lastName}
            </h3>
            <p className="text-gray-500 dark:text-gray-400 text-sm truncate">{admin.email}</p>
          </div>
          <div className="flex-shrink-0">
            <svg className="w-5 h-5 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const AdminsPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const { data: admins, isLoading, isError, error } = useAdminsData(currentPage, pageSize);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  const handlePreviousPage = () => {
    setCurrentPage(prev => prev - 1);
  };

  const handleNextPage = () => {
    setCurrentPage(prev => prev + 1);
  };

  return (
    <div className="p-6">
      <div className="space-y-3">
        {admins?.items.map((admin) => (
          <AdminCard key={admin.id} admin={admin} />
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="mt-6 flex items-center justify-between">
        <Button
          onClick={handlePreviousPage}
          disabled={!admins?.hasPreviousPage}
          variant="outline"
          size="sm"
        >
          Previous
        </Button>

        <span className="text-sm text-gray-700 dark:text-gray-300">
          Page {admins?.page} of {Math.ceil((admins?.totalItems || 0) / pageSize)}
        </span>

        <Button
          onClick={handleNextPage}
          disabled={!admins?.hasNextPage}
          variant="outline"
          size="sm"
        >
          Next
        </Button>
      </div>
    </div>
  );
};
export { AdminsPage };

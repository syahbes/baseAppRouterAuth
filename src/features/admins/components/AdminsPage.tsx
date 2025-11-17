import { useAdminsData } from "../hooks";
import LoadingSpinner from "@/components/LoadingSpinner";

const AdminsPage = () => {
const { data: admins, isLoading, isError, error } = useAdminsData();

if (isLoading) {
  return <LoadingSpinner />;
}

if (isError) {
  return <div>Error: {error.message}</div>;
}

return (
    <div className="home-page">
      <h1>Admins</h1>
      <ul>
        {admins?.items.map((admin) => (
          <li key={admin.id}>{admin.email}</li>
        ))}
      </ul>
    </div>
  );
};

export { AdminsPage };
import { useAdminsData } from "@/hooks/useAdminsData";


const Admins = () => {
const { data: admins, isLoading, isError, error } = useAdminsData();

if (isLoading) {
  return <div>Loading...</div>;
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

export default Admins;
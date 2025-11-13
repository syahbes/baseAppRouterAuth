// src/pages/home.tsx
import { Button } from "@/components/ui/button";
import { useAuth } from "@/providers/AuthProvider";

const Home = () => {
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="home-page">
      <h1>Welcome to Home Page</h1>

      {user && (
        <div className="user-info">
          <p>Logged in as: {user.email}</p>
        </div>
      )}

      <div
        style={{
          display: "flex",
          marginLeft: "200px",
          height: "50vh",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Button onClick={handleLogout} className="logout-btn">
          Logout
        </Button>
      </div>
    </div>
  );
};

export default Home;

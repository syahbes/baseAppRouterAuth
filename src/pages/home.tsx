// src/pages/home.tsx
import { useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import { useAuthUser, useLogout } from "@/hooks/useAuth";
import { ModeToggle } from "@/components/mode-toggle";

const Home = () => {
  const navigate = useNavigate();
  const { data: user } = useAuthUser();
  const { mutate: logout } = useLogout();

  const handleLogout = () => {
    logout(undefined, {
      onSuccess: () => {
        navigate("/");
      },
    });
  };

  return (
    <div>
      <h1>Welcome to Home Page</h1>
      <ModeToggle />

      {user && (
        <div className="user-info">
          <p>Logged in as: {user.email}</p>
          <p>role: {user.role}</p>
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
          gap: "20px",
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
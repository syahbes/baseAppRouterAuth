// src/pages/home.tsx
import { useAuth } from '@/providers/AuthProvider';
import { UserProfile } from '@/components/UserProfile'

const Home = () => {
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout failed:', error);
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

      <UserProfile />

      <button onClick={handleLogout} className="logout-btn">
        Logout
      </button>
    </div>
  );
};

export default Home;
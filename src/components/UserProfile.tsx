// src/components/UserProfile.tsx
import { useUserData } from '@/hooks/useUserData';

export const UserProfile = () => {
  const { data: user, isLoading, isError, error } = useUserData();

  if (isLoading) {
    return (
      <div className="user-profile loading">
        <p>Loading user data...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="user-profile error">
        <p>Error loading user data: {error?.message || 'Unknown error'}</p>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="user-profile">
      <h2>User Profile</h2>
      <div className="profile-details">
        <div className="profile-item">
          <strong>ID:</strong> {user.id}
        </div>
        <div className="profile-item">
          <strong>Email:</strong> {user.email}
        </div>
        {user.name && (
          <div className="profile-item">
            <strong>Name:</strong> {user.name}
          </div>
        )}
        {user.role && (
          <div className="profile-item">
            <strong>Role:</strong> {user.role}
          </div>
        )}
        {user.lastLogin && (
          <div className="profile-item">
            <strong>Last Login:</strong> {new Date(user.lastLogin).toLocaleString()}
          </div>
        )}
        {user.preferences && (
          <div className="profile-item">
            <strong>Theme:</strong> {user.preferences.theme}
            <br />
            <strong>Notifications:</strong> {user.preferences.notifications ? 'Enabled' : 'Disabled'}
          </div>
        )}
      </div>
    </div>
  );
};

import { useAuth } from '@/providers/AuthProvider';

const HomePage = () => {
  const { user, logout, isLoading } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#f8f9fa',
      padding: '2rem'
    }}>
      {/* Header */}
      <header style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'white',
        padding: '1rem 2rem',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        marginBottom: '2rem'
      }}>
        <div>
          <h1 style={{ margin: 0, color: '#333' }}>Dashboard</h1>
          {user && (
            <p style={{ margin: '0.5rem 0 0 0', color: '#666' }}>
              Welcome back, {user.name || user.email}!
            </p>
          )}
        </div>
        
        <button
          onClick={handleLogout}
          disabled={isLoading}
          style={{
            padding: '0.5rem 1rem',
            backgroundColor: '#dc3545',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: isLoading ? 'not-allowed' : 'pointer',
            fontSize: '14px',
            opacity: isLoading ? 0.6 : 1
          }}
        >
          {isLoading ? 'Logging out...' : 'Logout'}
        </button>
      </header>

      {/* Main Content */}
      <main style={{
        backgroundColor: 'white',
        padding: '2rem',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        <h2 style={{ color: '#333', marginBottom: '1rem' }}>User Information</h2>
        
        {user && (
          <div style={{
            backgroundColor: '#f8f9fa',
            padding: '1rem',
            borderRadius: '4px',
            border: '1px solid #dee2e6'
          }}>
            <div style={{ marginBottom: '0.5rem' }}>
              <strong>User ID:</strong> {user.id}
            </div>
            <div style={{ marginBottom: '0.5rem' }}>
              <strong>Email:</strong> {user.email}
            </div>
            {user.name && (
              <div>
                <strong>Name:</strong> {user.name}
              </div>
            )}
          </div>
        )}

        <div style={{ marginTop: '2rem' }}>
          <h3 style={{ color: '#333' }}>🎉 You're successfully authenticated!</h3>
          <p style={{ color: '#666' }}>
            Your session is active and you have access to protected content.
          </p>
        </div>
      </main>
    </div>
  );
};

export default HomePage;
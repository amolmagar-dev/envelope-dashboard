import { BrowserRouter as Router } from 'react-router-dom';
import { useState } from 'react';
import Sidebar from './components/Sidebar/Sidebar';
import AppRoutes from './router';
import AuthContainer from './components/auth/AuthContainer';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  return (
    <Router>
      <div className="h-screen">
        {!isAuthenticated ? (
          // Show AuthContainer when not logged in
          <AuthContainer onLogin={handleLogin} />
        ) : (
          // Show Sidebar and main routes when logged in
          <div>
            {/* <Sidebar onLogout={handleLogout} /> */}
            <main>
              <AppRoutes />
            </main>
          </div>
        )}
      </div>
    </Router>
  );
}

export default App;
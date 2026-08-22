import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { Dashboard } from './pages/Dashboard';
import { Login } from './pages/Login';
import { Signup } from './pages/Signup';
import { Trips } from './pages/Trips';
import { TripWorkspace } from './pages/TripWorkspace';
import { CreateTrip } from './pages/CreateTrip';
import { Explore } from './pages/Explore';
import { SharedTrip } from './pages/SharedTrip';
import { Profile } from './pages/Profile';
import { AppLayout } from './components/layout/AppLayout';
import { AuthLayout } from './components/layout/AuthLayout';
import { TripProvider } from './context/TripContext';
import { AuthProvider, useAuth } from './context/AuthContext';

// Protects routes that require authentication
function ProtectedRoute() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-muted/30">
        <div className="text-center space-y-3">
          <div className="h-8 w-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-muted-foreground text-sm">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}

// Redirects authenticated users away from auth pages
function PublicOnlyRoute() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-muted/30">
        <div className="h-8 w-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
      </div>
    );
  }

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
}

function App() {
  return (
    <AuthProvider>
      <TripProvider>
        <Router>
          <Routes>
            {/* Auth Routes — only accessible when NOT logged in */}
            <Route element={<PublicOnlyRoute />}>
              <Route element={<AuthLayout />}>
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
              </Route>
            </Route>

            {/* Public Routes */}
            <Route path="/trips/:id/share" element={<SharedTrip />} />

            {/* Protected App Routes — require authentication */}
            <Route element={<ProtectedRoute />}>
              <Route element={<AppLayout />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/trips" element={<Trips />} />
                <Route path="/trips/new" element={<CreateTrip />} />
                <Route path="/trips/:id" element={<TripWorkspace />} />
                <Route path="/explore" element={<Explore />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/" element={<Navigate to="/dashboard" replace />} />
              </Route>
            </Route>
          </Routes>
        </Router>
      </TripProvider>
    </AuthProvider>
  );
}

export default App;

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
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

function App() {
  return (
    <TripProvider>
      <Router>
        <Routes>
          {/* Auth Routes */}
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Route>

          {/* Public Routes */}
          <Route path="/trips/:id/share" element={<SharedTrip />} />

          {/* Protected App Routes */}
          <Route element={<AppLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/trips" element={<Trips />} />
            <Route path="/trips/new" element={<CreateTrip />} />
            <Route path="/trips/:id" element={<TripWorkspace />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
          </Route>
        </Routes>
      </Router>
    </TripProvider>
  );
}

export default App;

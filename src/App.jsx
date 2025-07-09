import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Box } from '@mui/material';
import { useAuth } from './contexts/AuthContext';
import Layout from './components/Layout';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import VehiclesPage from './pages/VehiclesPage';
import OwnersPage from './pages/OwnersPage';
import ServiceLogsPage from './pages/ServiceLogsPage';
import FuelLogsPage from './pages/FuelLogsPage';
import PartFinderPage from './pages/PartFinderPage';
import UpcomingServicePage from './pages/UpcomingServicePage';
import SettingsPage from './pages/SettingsPage';
import HelpPage from './pages/HelpPage';

function App() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        Loading...
      </Box>
    );
  }

  if (!user) {
    return <LoginPage />;
  }

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/vehicles" element={<VehiclesPage />} />
        <Route path="/owners" element={<OwnersPage />} />
        <Route path="/service-logs" element={<ServiceLogsPage />} />
        <Route path="/fuel-logs" element={<FuelLogsPage />} />
        <Route path="/upcoming-service" element={<UpcomingServicePage />} />
        <Route path="/part-finder" element={<PartFinderPage />} />
        <Route path="/help" element={<HelpPage />} />
        {user?.role === 'admin' && (
          <Route path="/settings" element={<SettingsPage />} />
        )}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Layout>
  );
}

export default App;
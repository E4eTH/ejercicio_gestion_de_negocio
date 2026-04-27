import { Routes, Route } from 'react-router-dom';
import MenuPage from '../pages/MenuPage';
import LoginPage from '../pages/LoginPage';
import DashboardPage from '../pages/admin/DashboardPage';
import ProtectedRoute from './ProtectedRoute';

const AppRouter = () => (
  <Routes>
    <Route path="/" element={<MenuPage />} />
    <Route path="/login" element={<LoginPage />} />
    <Route
      path="/admin"
      element={
        <ProtectedRoute>
          <DashboardPage />
        </ProtectedRoute>
      }
    />
  </Routes>
);

export default AppRouter;
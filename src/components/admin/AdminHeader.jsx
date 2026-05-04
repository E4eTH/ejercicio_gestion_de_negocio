import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Button from '../ui/Button';

const AdminHeader = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <div className="flex flex-col sm:flex-row justify-between items-start gap-6 sm:gap-0">
      <div>
        <p className="text-xs uppercase tracking-[0.4em] text-amber-700 mb-1">Panel de gestión</p>
        <h1 className="font-display italic text-4xl text-[#fdfaf6]">La Terraza</h1>
        <p className="text-stone-500 text-sm mt-1">{user?.email}</p>
      </div>
      <div className="flex flex-wrap gap-3 w-full sm:w-auto">
        <Button onClick={() => navigate('/')} variant="secondary">
          Ver carta
        </Button>
        <Button onClick={handleLogout} variant="primary">
          Cerrar sesión
        </Button>
      </div>
    </div>
  );
};

export default AdminHeader;

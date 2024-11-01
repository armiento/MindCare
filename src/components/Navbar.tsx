import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/auth');
  };

  if (location.pathname === '/auth') {
    return null;
  }

  return (
    <header className="header">
      <div className="header-content">
        <Link to="/" className="logo">
          🧘 MindCare
        </Link>
        <nav className="flex items-center gap-4">
          {[
            { path: '/', label: 'Inicio' },
            { path: '/meditation', label: 'Meditación' },
            { path: '/mood-tracker', label: 'Estado de Ánimo' }
          ].map(({ path, label }) => (
            <Link
              key={path}
              to={path}
              className={`btn ${
                location.pathname === path ? 'btn-primary' : 'btn-secondary'
              }`}
            >
              {label}
            </Link>
          ))}
          {user && (
            <div className="flex items-center gap-4 ml-4 border-l pl-4">
              <span className="text-sm text-gray-600">
                {user.username}
              </span>
              <button
                onClick={handleLogout}
                className="btn btn-secondary"
              >
                Cerrar Sesión
              </button>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}
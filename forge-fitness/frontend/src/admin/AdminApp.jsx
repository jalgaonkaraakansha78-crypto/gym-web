import { useState } from 'react';
import AdminLogin from './AdminLogin';
import AdminForgotPassword from './AdminForgotPassword';
import AdminResetPassword from './AdminResetPassword';
import AdminDashboard from './AdminDashboard';

const TOKEN_KEY = 'forge_admin_token';

export default function AdminApp() {
  const [token, setToken] = useState(() => localStorage.getItem(TOKEN_KEY));

  function handleLogout() {
    localStorage.removeItem(TOKEN_KEY);
    setToken(null);
  }

  const path = window.location.pathname;

  if (path === '/admin/forgot-password') {
    return <AdminForgotPassword />;
  }

  if (path === '/admin/reset-password') {
    const resetToken = new URLSearchParams(window.location.search).get('token');
    return <AdminResetPassword token={resetToken} />;
  }

  if (!token) {
    return <AdminLogin onLogin={setToken} />;
  }

  // If a stored token has expired, any protected call in AdminDashboard will
  // throw an "invalid or expired token" error — the dashboard surfaces that
  // via its error banner, and logging out clears the bad token.
  return <AdminDashboard onLogout={handleLogout} />;
}

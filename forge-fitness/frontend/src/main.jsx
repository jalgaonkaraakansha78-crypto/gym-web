import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import AdminApp from './admin/AdminApp.jsx';

// Simple path-based routing — no router library needed for just two "pages".
// Visiting /admin (or /admin/anything) shows the admin dashboard instead of
// the public site.
const isAdminRoute = window.location.pathname.startsWith('/admin');

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {isAdminRoute ? <AdminApp /> : <App />}
  </StrictMode>,
);

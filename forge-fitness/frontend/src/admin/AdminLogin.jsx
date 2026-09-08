import { useState } from 'react';
import { Dumbbell, Loader2 } from 'lucide-react';
import { adminLogin } from '../services/api';
import './AdminApp.css';

export default function AdminLogin({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState({ state: 'idle', message: '' });

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus({ state: 'loading', message: '' });
    try {
      const res = await adminLogin(email, password);
      localStorage.setItem('forge_admin_token', res.token);
      onLogin(res.token);
    } catch (err) {
      setStatus({ state: 'error', message: err.message || 'Login failed' });
    }
  }

  return (
    <div className="admin-login">
      <form className="admin-login__card" onSubmit={handleSubmit}>
        <div className="admin-login__brand">
          <Dumbbell size={22} strokeWidth={2.4} />
          <span>FORGE<em>FITNESS</em></span>
        </div>
        <h1>Admin Login</h1>
        <p className="admin-login__sub">Sign in to view bookings, enquiries and manage content.</p>

        <label>
          Email
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="admin@forgefitness.in"
          />
        </label>
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="••••••••"
          />
        </label>

        <button type="submit" className="btn btn-primary" disabled={status.state === 'loading'}>
          {status.state === 'loading' && <Loader2 size={17} className="spin" />}
          Log In
        </button>

        {status.state === 'error' && <p className="admin-login__error">{status.message}</p>}

        <a href="/admin/forgot-password" className="admin-login__back">
          Forgot your password?
        </a>
      </form>
    </div>
  );
}

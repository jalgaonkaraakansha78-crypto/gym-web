import { useState } from 'react';
import { Dumbbell, Loader2 } from 'lucide-react';
import { resetPassword } from '../services/api';
import './AdminApp.css';

export default function AdminResetPassword({ token }) {
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [status, setStatus] = useState({ state: 'idle', message: '' });

  async function handleSubmit(e) {
    e.preventDefault();

    if (password !== confirm) {
      setStatus({ state: 'error', message: 'Passwords do not match' });
      return;
    }
    if (password.length < 6) {
      setStatus({ state: 'error', message: 'Password must be at least 6 characters' });
      return;
    }

    setStatus({ state: 'loading', message: '' });
    try {
      const res = await resetPassword(token, password);
      setStatus({ state: 'success', message: res.message || 'Password reset successfully.' });
    } catch (err) {
      setStatus({ state: 'error', message: err.message || 'Something went wrong' });
    }
  }

  if (!token) {
    return (
      <div className="admin-login">
        <div className="admin-login__card">
          <p className="admin-login__error">
            This link is missing a reset token. Please use the link from your email, or request a new one.
          </p>
          <a href="/admin/forgot-password" className="btn btn-outline">Request new link</a>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-login">
      <form className="admin-login__card" onSubmit={handleSubmit}>
        <div className="admin-login__brand">
          <Dumbbell size={22} strokeWidth={2.4} />
          <span>FORGE<em>FITNESS</em></span>
        </div>
        <h1>Set a New Password</h1>

        {status.state === 'success' ? (
          <>
            <p className="admin-login__success">{status.message}</p>
            <a href="/admin" className="btn btn-primary">Go to Login</a>
          </>
        ) : (
          <>
            <label>
              New Password
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                placeholder="At least 6 characters"
              />
            </label>
            <label>
              Confirm New Password
              <input
                type="password"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                required
                minLength={6}
                placeholder="Re-enter password"
              />
            </label>
            <button type="submit" className="btn btn-primary" disabled={status.state === 'loading'}>
              {status.state === 'loading' && <Loader2 size={17} className="spin" />}
              Reset Password
            </button>
            {status.state === 'error' && <p className="admin-login__error">{status.message}</p>}
          </>
        )}
      </form>
    </div>
  );
}

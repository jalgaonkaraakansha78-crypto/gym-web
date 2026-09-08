import { useState } from 'react';
import { Loader2 } from 'lucide-react';
import { changePassword } from '../services/api';

export default function ChangePasswordForm() {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [status, setStatus] = useState({ state: 'idle', message: '' });

  async function handleSubmit(e) {
    e.preventDefault();

    if (newPassword !== confirm) {
      setStatus({ state: 'error', message: 'New passwords do not match' });
      return;
    }
    if (newPassword.length < 6) {
      setStatus({ state: 'error', message: 'New password must be at least 6 characters' });
      return;
    }

    setStatus({ state: 'loading', message: '' });
    try {
      const res = await changePassword(currentPassword, newPassword);
      setStatus({ state: 'success', message: res.message || 'Password updated successfully' });
      setCurrentPassword('');
      setNewPassword('');
      setConfirm('');
    } catch (err) {
      setStatus({ state: 'error', message: err.message || 'Failed to update password' });
    }
  }

  return (
    <form className="resource-form" onSubmit={handleSubmit} style={{ maxWidth: 420 }}>
      <div className="resource-form__header">
        <h3>Change Password</h3>
      </div>

      <div className="resource-form__grid" style={{ gridTemplateColumns: '1fr' }}>
        <label>
          Current Password
          <input
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            required
          />
        </label>
        <label>
          New Password
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
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
          />
        </label>
      </div>

      <button type="submit" className="btn btn-primary" disabled={status.state === 'loading'}>
        {status.state === 'loading' && <Loader2 size={16} className="spin" />}
        Update Password
      </button>

      {status.state === 'success' && <p className="admin-success">{status.message}</p>}
      {status.state === 'error' && <p className="admin-error">{status.message}</p>}
    </form>
  );
}

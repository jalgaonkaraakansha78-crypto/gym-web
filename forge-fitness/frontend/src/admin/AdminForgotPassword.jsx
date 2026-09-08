import { useState } from 'react';
import { Dumbbell, Loader2, ArrowLeft } from 'lucide-react';
import { forgotPassword } from '../services/api';
import './AdminApp.css';

export default function AdminForgotPassword() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState({ state: 'idle', message: '' });

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus({ state: 'loading', message: '' });
    try {
      const res = await forgotPassword(email);
      setStatus({
        state: 'success',
        message: res.message || 'If an account exists for that email, a reset link has been sent.',
      });
    } catch (err) {
      setStatus({ state: 'error', message: err.message || 'Something went wrong' });
    }
  }

  return (
    <div className="admin-login">
      <form className="admin-login__card" onSubmit={handleSubmit}>
        <div className="admin-login__brand">
          <Dumbbell size={22} strokeWidth={2.4} />
          <span>FORGE<em>FITNESS</em></span>
        </div>
        <h1>Forgot Password</h1>
        <p className="admin-login__sub">
          Enter your admin email and we&rsquo;ll send a link to reset your password.
        </p>

        {status.state === 'success' ? (
          <p className="admin-login__success">{status.message}</p>
        ) : (
          <>
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
            <button type="submit" className="btn btn-primary" disabled={status.state === 'loading'}>
              {status.state === 'loading' && <Loader2 size={17} className="spin" />}
              Send Reset Link
            </button>
            {status.state === 'error' && <p className="admin-login__error">{status.message}</p>}
          </>
        )}

        <a href="/admin" className="admin-login__back">
          <ArrowLeft size={14} /> Back to login
        </a>
      </form>
    </div>
  );
}

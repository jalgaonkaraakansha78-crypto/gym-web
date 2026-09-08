import { useState } from 'react';
import { Trash2 } from 'lucide-react';
import { updateTrialStatus, deleteTrial } from '../services/api';

const STATUS_OPTIONS = ['new', 'contacted', 'converted', 'cancelled'];

function formatDate(iso) {
  if (!iso) return '—';
  return new Date(iso).toLocaleString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export default function TrialsTable({ trials, onChange }) {
  const [busyId, setBusyId] = useState(null);

  async function handleStatusChange(id, status) {
    setBusyId(id);
    try {
      await updateTrialStatus(id, status);
      onChange();
    } finally {
      setBusyId(null);
    }
  }

  async function handleDelete(id) {
    if (!window.confirm('Delete this booking? This cannot be undone.')) return;
    setBusyId(id);
    try {
      await deleteTrial(id);
      onChange();
    } finally {
      setBusyId(null);
    }
  }

  if (!trials.length) {
    return <p className="admin-empty">No free trial bookings yet.</p>;
  }

  return (
    <div className="admin-table-wrap">
      <table className="admin-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Phone</th>
            <th>Email</th>
            <th>Program</th>
            <th>Preferred</th>
            <th>Message</th>
            <th>Status</th>
            <th>Submitted</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {trials.map((t) => (
            <tr key={t._id}>
              <td className="admin-table__name">{t.name}</td>
              <td><a href={`tel:${t.phone}`}>{t.phone}</a></td>
              <td>{t.email ? <a href={`mailto:${t.email}`}>{t.email}</a> : '—'}</td>
              <td>{t.program || '—'}</td>
              <td>
                {t.preferredDate || '—'}
                {t.preferredTime ? ` · ${t.preferredTime}` : ''}
              </td>
              <td className="admin-table__message" title={t.message}>{t.message || '—'}</td>
              <td>
                <select
                  value={t.status}
                  disabled={busyId === t._id}
                  onChange={(e) => handleStatusChange(t._id, e.target.value)}
                  className={`status-pill status-pill--${t.status}`}
                >
                  {STATUS_OPTIONS.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </td>
              <td className="admin-table__date">{formatDate(t.createdAt)}</td>
              <td>
                <button
                  className="admin-icon-btn"
                  disabled={busyId === t._id}
                  onClick={() => handleDelete(t._id)}
                  aria-label="Delete booking"
                >
                  <Trash2 size={15} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

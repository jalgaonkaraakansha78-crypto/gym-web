import { useState } from 'react';
import { Trash2 } from 'lucide-react';
import { deleteContactMessage } from '../services/api';

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

export default function ContactsTable({ contacts, onChange }) {
  const [busyId, setBusyId] = useState(null);

  async function handleDelete(id) {
    if (!window.confirm('Delete this message? This cannot be undone.')) return;
    setBusyId(id);
    try {
      await deleteContactMessage(id);
      onChange();
    } finally {
      setBusyId(null);
    }
  }

  if (!contacts.length) {
    return <p className="admin-empty">No contact messages yet.</p>;
  }

  return (
    <div className="admin-table-wrap">
      <table className="admin-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Message</th>
            <th>Submitted</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((c) => (
            <tr key={c._id}>
              <td className="admin-table__name">{c.name}</td>
              <td><a href={`mailto:${c.email}`}>{c.email}</a></td>
              <td>{c.phone ? <a href={`tel:${c.phone}`}>{c.phone}</a> : '—'}</td>
              <td className="admin-table__message" title={c.message}>{c.message}</td>
              <td className="admin-table__date">{formatDate(c.createdAt)}</td>
              <td>
                <button
                  className="admin-icon-btn"
                  disabled={busyId === c._id}
                  onClick={() => handleDelete(c._id)}
                  aria-label="Delete message"
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

import { useCallback, useEffect, useState } from 'react';
import { Plus, Pencil, Trash2, X, Loader2 } from 'lucide-react';

// A single reusable table + form for any simple resource (memberships,
// trainers, programs, testimonials). Pass in a field config and the four
// API functions, and this renders list/create/edit/delete for it.
//
// field.type: 'text' | 'textarea' | 'number' | 'checkbox' | 'list'
// 'list' fields are edited as a comma-separated string and stored as an array.

function emptyFormFromFields(fields) {
  const obj = {};
  fields.forEach((f) => {
    if (f.type === 'checkbox') obj[f.name] = false;
    else obj[f.name] = '';
  });
  return obj;
}

function itemToForm(item, fields) {
  const obj = {};
  fields.forEach((f) => {
    const value = item[f.name];
    if (f.type === 'list') obj[f.name] = Array.isArray(value) ? value.join(', ') : '';
    else if (f.type === 'checkbox') obj[f.name] = Boolean(value);
    else obj[f.name] = value ?? '';
  });
  return obj;
}

function formToPayload(form, fields) {
  const payload = {};
  fields.forEach((f) => {
    const value = form[f.name];
    if (f.type === 'list') {
      payload[f.name] = value
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean);
    } else if (f.type === 'number') {
      payload[f.name] = value === '' ? undefined : Number(value);
    } else {
      payload[f.name] = value;
    }
  });
  return payload;
}

export default function ResourceManager({ title, fields, api, columns }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editingId, setEditingId] = useState(null); // null = closed, 'new' = creating, id = editing
  const [form, setForm] = useState(emptyFormFromFields(fields));
  const [saving, setSaving] = useState(false);
  const [busyId, setBusyId] = useState(null);

  const load = useCallback(async () => {
    setError('');
    try {
      const res = await api.list();
      setItems(res.data);
    } catch (err) {
      setError(err.message || `Failed to load ${title.toLowerCase()}`);
    } finally {
      setLoading(false);
    }
  }, [api, title]);

  useEffect(() => {
    load();
  }, [load]);

  function openNew() {
    setForm(emptyFormFromFields(fields));
    setEditingId('new');
  }

  function openEdit(item) {
    setForm(itemToForm(item, fields));
    setEditingId(item._id);
  }

  function closeForm() {
    setEditingId(null);
  }

  function updateField(name, value) {
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);
    setError('');
    try {
      const payload = formToPayload(form, fields);
      if (editingId === 'new') {
        await api.create(payload);
      } else {
        await api.update(editingId, payload);
      }
      setEditingId(null);
      await load();
    } catch (err) {
      setError(err.message || 'Save failed');
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id) {
    if (!window.confirm(`Delete this ${title.toLowerCase().slice(0, -1)}? This cannot be undone.`)) return;
    setBusyId(id);
    try {
      await api.delete(id);
      await load();
    } catch (err) {
      setError(err.message || 'Delete failed');
    } finally {
      setBusyId(null);
    }
  }

  const displayColumns = columns || fields.filter((f) => f.type !== 'textarea');

  return (
    <div className="resource-manager">
      <div className="resource-manager__toolbar">
        <button className="btn btn-primary" onClick={openNew}>
          <Plus size={16} /> Add {title.slice(0, -1)}
        </button>
      </div>

      {error && <p className="admin-error">{error}</p>}

      {editingId && (
        <form className="resource-form" onSubmit={handleSubmit}>
          <div className="resource-form__header">
            <h3>{editingId === 'new' ? `Add ${title.slice(0, -1)}` : `Edit ${title.slice(0, -1)}`}</h3>
            <button type="button" className="admin-icon-btn" onClick={closeForm} aria-label="Close">
              <X size={16} />
            </button>
          </div>

          <div className="resource-form__grid">
            {fields.map((f) => (
              <label
                key={f.name}
                className={f.type === 'textarea' ? 'resource-form__field--wide' : ''}
              >
                {f.label}
                {f.type === 'textarea' ? (
                  <textarea
                    rows={3}
                    value={form[f.name]}
                    onChange={(e) => updateField(f.name, e.target.value)}
                    required={f.required}
                  />
                ) : f.type === 'checkbox' ? (
                  <input
                    type="checkbox"
                    checked={form[f.name]}
                    onChange={(e) => updateField(f.name, e.target.checked)}
                    className="resource-form__checkbox"
                  />
                ) : (
                  <input
                    type={f.type === 'number' ? 'number' : 'text'}
                    value={form[f.name]}
                    onChange={(e) => updateField(f.name, e.target.value)}
                    required={f.required}
                    placeholder={f.placeholder}
                    min={f.min}
                    max={f.max}
                  />
                )}
              </label>
            ))}
          </div>

          <button type="submit" className="btn btn-primary" disabled={saving}>
            {saving && <Loader2 size={16} className="spin" />}
            {editingId === 'new' ? 'Create' : 'Save Changes'}
          </button>
        </form>
      )}

      {loading ? (
        <p className="admin-empty">Loading...</p>
      ) : !items.length ? (
        <p className="admin-empty">No {title.toLowerCase()} yet — add your first one above.</p>
      ) : (
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                {displayColumns.map((f) => (
                  <th key={f.name}>{f.label}</th>
                ))}
                <th></th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item._id}>
                  {displayColumns.map((f) => (
                    <td key={f.name}>
                      {f.type === 'list'
                        ? (item[f.name] || []).join(', ')
                        : f.type === 'checkbox'
                        ? (item[f.name] ? 'Yes' : 'No')
                        : String(item[f.name] ?? '—')}
                    </td>
                  ))}
                  <td className="resource-manager__actions">
                    <button className="admin-icon-btn" onClick={() => openEdit(item)} aria-label="Edit">
                      <Pencil size={15} />
                    </button>
                    <button
                      className="admin-icon-btn"
                      disabled={busyId === item._id}
                      onClick={() => handleDelete(item._id)}
                      aria-label="Delete"
                    >
                      <Trash2 size={15} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

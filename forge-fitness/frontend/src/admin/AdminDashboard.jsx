import { useCallback, useEffect, useState } from 'react';
import { Dumbbell, LogOut, RefreshCw, Loader2 } from 'lucide-react';
import {
  getStats,
  getAllTrials,
  getAllContacts,
  createMembership,
  updateMembership,
  deleteMembership,
  createTrainer,
  updateTrainer,
  deleteTrainer,
  createProgram,
  updateProgram,
  deleteProgram,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
  getMemberships,
  getTrainers,
  getPrograms,
  getTestimonials,
} from '../services/api';
import StatsCards from './StatsCards';
import TrialsTable from './TrialsTable';
import ContactsTable from './ContactsTable';
import ResourceManager from './ResourceManager';
import ChangePasswordForm from './ChangePasswordForm';
import './AdminApp.css';

const TABS = [
  { key: 'trials', label: 'Free Trial Bookings' },
  { key: 'contacts', label: 'Contact Messages' },
  { key: 'memberships', label: 'Memberships' },
  { key: 'trainers', label: 'Trainers' },
  { key: 'programs', label: 'Programs' },
  { key: 'testimonials', label: 'Testimonials' },
  { key: 'settings', label: 'Settings' },
];

const MEMBERSHIP_FIELDS = [
  { name: 'name', label: 'Name', type: 'text', required: true },
  { name: 'price', label: 'Price (₹)', type: 'number', required: true, min: 0 },
  { name: 'duration', label: 'Duration', type: 'text', required: true, placeholder: 'per month' },
  { name: 'features', label: 'Features (comma-separated)', type: 'list' },
  { name: 'popular', label: 'Most Popular', type: 'checkbox' },
  { name: 'description', label: 'Description', type: 'textarea' },
];

const TRAINER_FIELDS = [
  { name: 'name', label: 'Name', type: 'text', required: true },
  { name: 'specialization', label: 'Specialization', type: 'text', required: true },
  { name: 'experience', label: 'Experience', type: 'text', required: true, placeholder: '8 Years Experience' },
  { name: 'image', label: 'Image URL', type: 'text', required: true },
  { name: 'bio', label: 'Bio', type: 'textarea' },
];

const PROGRAM_FIELDS = [
  { name: 'name', label: 'Name', type: 'text', required: true },
  { name: 'category', label: 'Category', type: 'text' },
  { name: 'image', label: 'Image URL', type: 'text', required: true },
  { name: 'description', label: 'Description', type: 'textarea', required: true },
];

const TESTIMONIAL_FIELDS = [
  { name: 'name', label: 'Name', type: 'text', required: true },
  { name: 'rating', label: 'Rating (1-5)', type: 'number', required: true, min: 1, max: 5 },
  { name: 'image', label: 'Avatar Image URL', type: 'text' },
  { name: 'message', label: 'Message', type: 'textarea', required: true },
];

export default function AdminDashboard({ onLogout }) {
  const [tab, setTab] = useState('trials');
  const [stats, setStats] = useState(null);
  const [trials, setTrials] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadOverview = useCallback(async () => {
    setError('');
    try {
      const [statsRes, trialsRes, contactsRes] = await Promise.all([
        getStats(),
        getAllTrials(),
        getAllContacts(),
      ]);
      setStats(statsRes.data);
      setTrials(trialsRes.data);
      setContacts(contactsRes.data);
    } catch (err) {
      setError(err.message || 'Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadOverview();
  }, [loadOverview]);

  return (
    <div className="admin-dashboard">
      <header className="admin-header">
        <div className="admin-header__brand">
          <Dumbbell size={20} strokeWidth={2.4} />
          <span>FORGE<em>FITNESS</em> Admin</span>
        </div>
        <div className="admin-header__actions">
          <button className="btn btn-ghost" onClick={loadOverview} disabled={loading}>
            {loading ? <Loader2 size={16} className="spin" /> : <RefreshCw size={16} />}
            Refresh
          </button>
          <button className="btn btn-outline" onClick={onLogout}>
            <LogOut size={16} /> Log Out
          </button>
        </div>
      </header>

      <main className="admin-main">
        {error && <p className="admin-error">{error}</p>}

        <StatsCards stats={stats} />

        <div className="admin-tabs admin-tabs--wrap">
          {TABS.map((t) => (
            <button
              key={t.key}
              className={`admin-tab ${tab === t.key ? 'is-active' : ''}`}
              onClick={() => setTab(t.key)}
            >
              {t.label}
              {t.key === 'trials' && trials.length ? ` (${trials.length})` : ''}
              {t.key === 'contacts' && contacts.length ? ` (${contacts.length})` : ''}
            </button>
          ))}
        </div>

        {tab === 'trials' &&
          (loading ? <p className="admin-empty">Loading...</p> : <TrialsTable trials={trials} onChange={loadOverview} />)}

        {tab === 'contacts' &&
          (loading ? <p className="admin-empty">Loading...</p> : <ContactsTable contacts={contacts} onChange={loadOverview} />)}

        {tab === 'memberships' && (
          <ResourceManager
            title="Memberships"
            fields={MEMBERSHIP_FIELDS}
            api={{ list: getMemberships, create: createMembership, update: updateMembership, delete: deleteMembership }}
          />
        )}

        {tab === 'trainers' && (
          <ResourceManager
            title="Trainers"
            fields={TRAINER_FIELDS}
            api={{ list: getTrainers, create: createTrainer, update: updateTrainer, delete: deleteTrainer }}
          />
        )}

        {tab === 'programs' && (
          <ResourceManager
            title="Programs"
            fields={PROGRAM_FIELDS}
            api={{ list: getPrograms, create: createProgram, update: updateProgram, delete: deleteProgram }}
          />
        )}

        {tab === 'testimonials' && (
          <ResourceManager
            title="Testimonials"
            fields={TESTIMONIAL_FIELDS}
            api={{ list: getTestimonials, create: createTestimonial, update: updateTestimonial, delete: deleteTestimonial }}
          />
        )}

        {tab === 'settings' && <ChangePasswordForm />}
      </main>
    </div>
  );
}

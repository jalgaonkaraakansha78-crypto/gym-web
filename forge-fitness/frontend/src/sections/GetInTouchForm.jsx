import { useState } from 'react';
import { Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import { bookTrial, sendContactMessage } from '../services/api';
import './GetInTouchForm.css';

const PROGRAM_OPTIONS = [
  'Weight Training',
  'Muscle Building',
  'Fat Loss',
  'Personal Training',
  'Functional Training',
  'Cardio',
];

const TRIAL_INITIAL = {
  name: '',
  phone: '',
  email: '',
  preferredDate: '',
  preferredTime: '',
  program: '',
  message: '',
};

const CONTACT_INITIAL = { name: '', email: '', phone: '', message: '' };

export default function GetInTouchForm() {
  const [tab, setTab] = useState('trial'); // 'trial' | 'contact'
  const [trialData, setTrialData] = useState(TRIAL_INITIAL);
  const [contactData, setContactData] = useState(CONTACT_INITIAL);
  const [status, setStatus] = useState({ state: 'idle', message: '' }); // idle | loading | success | error

  const isTrial = tab === 'trial';

  function updateTrial(e) {
    setTrialData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }
  function updateContact(e) {
    setContactData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function switchTab(next) {
    setTab(next);
    setStatus({ state: 'idle', message: '' });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus({ state: 'loading', message: '' });

    try {
      if (isTrial) {
        const res = await bookTrial(trialData);
        setStatus({ state: 'success', message: res.message || 'Free trial booked successfully.' });
        setTrialData(TRIAL_INITIAL);
      } else {
        const res = await sendContactMessage(contactData);
        setStatus({ state: 'success', message: res.message || 'Message sent successfully.' });
        setContactData(CONTACT_INITIAL);
      }
    } catch (err) {
      setStatus({
        state: 'error',
        message: err.message || 'Something went wrong. Please try again or call us directly.',
      });
    }
  }

  return (
    <div className="get-in-touch">
      <div className="get-in-touch__tabs" role="tablist">
        <button
          type="button"
          role="tab"
          aria-selected={isTrial}
          className={`get-in-touch__tab ${isTrial ? 'is-active' : ''}`}
          onClick={() => switchTab('trial')}
        >
          Book Free Trial
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={!isTrial}
          className={`get-in-touch__tab ${!isTrial ? 'is-active' : ''}`}
          onClick={() => switchTab('contact')}
        >
          Send a Message
        </button>
      </div>

      <form className="get-in-touch__form" onSubmit={handleSubmit}>
        {isTrial ? (
          <>
            <div className="form-row">
              <label>
                Full Name *
                <input name="name" value={trialData.name} onChange={updateTrial} required placeholder="Your name" />
              </label>
              <label>
                Phone Number *
                <input name="phone" value={trialData.phone} onChange={updateTrial} required placeholder="+91 98765 43210" />
              </label>
            </div>
            <div className="form-row">
              <label>
                Email
                <input type="email" name="email" value={trialData.email} onChange={updateTrial} placeholder="you@email.com" />
              </label>
              <label>
                Program
                <select name="program" value={trialData.program} onChange={updateTrial}>
                  <option value="">Select a program</option>
                  {PROGRAM_OPTIONS.map((p) => (
                    <option key={p} value={p}>{p}</option>
                  ))}
                </select>
              </label>
            </div>
            <div className="form-row">
              <label>
                Preferred Date
                <input type="date" name="preferredDate" value={trialData.preferredDate} onChange={updateTrial} />
              </label>
              <label>
                Preferred Time
                <input type="time" name="preferredTime" value={trialData.preferredTime} onChange={updateTrial} />
              </label>
            </div>
            <label>
              Message
              <textarea
                name="message"
                value={trialData.message}
                onChange={updateTrial}
                rows={3}
                placeholder="Anything we should know before your trial session?"
              />
            </label>
          </>
        ) : (
          <>
            <div className="form-row">
              <label>
                Full Name *
                <input name="name" value={contactData.name} onChange={updateContact} required placeholder="Your name" />
              </label>
              <label>
                Phone Number
                <input name="phone" value={contactData.phone} onChange={updateContact} placeholder="+91 98765 43210" />
              </label>
            </div>
            <label>
              Email *
              <input type="email" name="email" value={contactData.email} onChange={updateContact} required placeholder="you@email.com" />
            </label>
            <label>
              Message *
              <textarea
                name="message"
                value={contactData.message}
                onChange={updateContact}
                required
                rows={4}
                placeholder="How can we help?"
              />
            </label>
          </>
        )}

        <button type="submit" className="btn btn-primary get-in-touch__submit" disabled={status.state === 'loading'}>
          {status.state === 'loading' && <Loader2 size={17} className="spin" />}
          {isTrial ? 'Book Free Trial' : 'Send Message'}
        </button>

        {status.state === 'success' && (
          <p className="get-in-touch__status is-success"><CheckCircle2 size={16} /> {status.message}</p>
        )}
        {status.state === 'error' && (
          <p className="get-in-touch__status is-error"><AlertCircle size={16} /> {status.message}</p>
        )}
      </form>
    </div>
  );
}

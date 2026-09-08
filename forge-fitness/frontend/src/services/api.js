// Central place for all backend calls. Every component imports from here
// instead of calling fetch() directly, so the API base URL and error
// handling only need to live in one place.

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

async function request(path, options = {}) {
  const token = localStorage.getItem('forge_admin_token');

  const res = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  });

  let body = null;
  try {
    body = await res.json();
  } catch {
    // no JSON body (e.g. network failure) — body stays null
  }

  if (!res.ok) {
    const message = body?.message || `Request failed with status ${res.status}`;
    throw new Error(message);
  }

  return body;
}

// ---- Public content (used by the main site) ----
export const getMemberships = () => request('/memberships');
export const getTrainers = () => request('/trainers');
export const getPrograms = () => request('/programs');
export const getTestimonials = () => request('/testimonials');

// ---- Public forms ----
export const bookTrial = (payload) =>
  request('/trials', { method: 'POST', body: JSON.stringify(payload) });

export const sendContactMessage = (payload) =>
  request('/contact', { method: 'POST', body: JSON.stringify(payload) });

// ---- Admin ----
export const adminLogin = (email, password) =>
  request('/auth/login', { method: 'POST', body: JSON.stringify({ email, password }) });

export const changePassword = (currentPassword, newPassword) =>
  request('/auth/change-password', {
    method: 'PUT',
    body: JSON.stringify({ currentPassword, newPassword }),
  });

export const forgotPassword = (email) =>
  request('/auth/forgot-password', { method: 'POST', body: JSON.stringify({ email }) });

export const resetPassword = (token, password) =>
  request(`/auth/reset-password/${token}`, { method: 'PUT', body: JSON.stringify({ password }) });

export const getStats = () => request('/admin/stats');
export const getAllTrials = (status) => request(`/trials${status ? `?status=${status}` : ''}`);
export const updateTrialStatus = (id, status) =>
  request(`/trials/${id}/status`, { method: 'PUT', body: JSON.stringify({ status }) });
export const deleteTrial = (id) => request(`/trials/${id}`, { method: 'DELETE' });
export const getAllContacts = () => request('/contact');
export const deleteContactMessage = (id) => request(`/contact/${id}`, { method: 'DELETE' });

export const createMembership = (payload) =>
  request('/memberships', { method: 'POST', body: JSON.stringify(payload) });
export const updateMembership = (id, payload) =>
  request(`/memberships/${id}`, { method: 'PUT', body: JSON.stringify(payload) });
export const deleteMembership = (id) => request(`/memberships/${id}`, { method: 'DELETE' });

export const createTrainer = (payload) =>
  request('/trainers', { method: 'POST', body: JSON.stringify(payload) });
export const updateTrainer = (id, payload) =>
  request(`/trainers/${id}`, { method: 'PUT', body: JSON.stringify(payload) });
export const deleteTrainer = (id) => request(`/trainers/${id}`, { method: 'DELETE' });

export const createProgram = (payload) =>
  request('/programs', { method: 'POST', body: JSON.stringify(payload) });
export const updateProgram = (id, payload) =>
  request(`/programs/${id}`, { method: 'PUT', body: JSON.stringify(payload) });
export const deleteProgram = (id) => request(`/programs/${id}`, { method: 'DELETE' });

export const createTestimonial = (payload) =>
  request('/testimonials', { method: 'POST', body: JSON.stringify(payload) });
export const updateTestimonial = (id, payload) =>
  request(`/testimonials/${id}`, { method: 'PUT', body: JSON.stringify(payload) });
export const deleteTestimonial = (id) => request(`/testimonials/${id}`, { method: 'DELETE' });

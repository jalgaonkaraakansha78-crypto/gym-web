// Small, dependency-free validation helpers. Kept intentionally simple —
// this is not a full validation library, just enough to catch obviously
// bad input before it reaches MongoDB.

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// Accepts optional leading +, then 7-15 digits (covers most local & intl formats)
const PHONE_RE = /^\+?[0-9\s-]{7,15}$/;

function isNonEmptyString(value) {
  return typeof value === 'string' && value.trim().length > 0;
}

function isValidEmail(value) {
  return typeof value === 'string' && EMAIL_RE.test(value.trim());
}

function isValidPhone(value) {
  return typeof value === 'string' && PHONE_RE.test(value.trim());
}

module.exports = { isNonEmptyString, isValidEmail, isValidPhone };

/**
 * state.js — Shared application state and utilities
 * Imported by all modules. Has no imports itself, breaking circular dependencies.
 */

// ─── App State ────────────────────────────────────────────────────────────────
export const AppState = {
  categories: [],   // { id, name, description }
  questions: [],    // { id, type, categoryId, name, defaultMark, generalFeedback, typeData }
  activeSection: 'categories',
};

// ─── Badge updater ────────────────────────────────────────────────────────────
export const updateBadge = (section, count) => {
  const badge = document.getElementById(`badge-${section}`);
  if (badge) badge.textContent = count;
};

// ─── ID generator ─────────────────────────────────────────────────────────────
export const genId = (prefix = 'id') =>
  `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;

// ─── HTML escaper ─────────────────────────────────────────────────────────────
export const escHtml = (str) => String(str)
  .replace(/&/g, '&amp;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;');

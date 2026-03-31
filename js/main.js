/**
 * main.js — Application entry point
 * Bootstraps the app: i18n, navigation, privacy notice, section routing,
 * category manager, and question manager.
 */

import I18n from './i18n.js';
import { initCategories } from './categories.js';
import { initQuestions } from './questions.js';

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

// ─── Navigation ───────────────────────────────────────────────────────────────
const initNav = () => {
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      navigateTo(link.getAttribute('data-section'));
    });
  });
};

export const navigateTo = (sectionId) => {
  document.querySelectorAll('.nav-link').forEach(l => {
    l.classList.toggle('active', l.getAttribute('data-section') === sectionId);
  });
  document.querySelectorAll('.app-section').forEach(s => {
    s.classList.toggle('hidden', s.id !== `section-${sectionId}`);
  });
  AppState.activeSection = sectionId;
};

// ─── Language Toggle ──────────────────────────────────────────────────────────
const initLangToggle = () => {
  const btn = document.getElementById('btn-lang');
  if (!btn) return;
  btn.addEventListener('click', () => {
    I18n.toggle();
    btn.textContent = I18n.t('common.language');
    setTimeout(() => {
      [1, 2, 3].forEach(i => {
        const el = document.getElementById(`privacy-check-${i}`);
        if (el) el.textContent = I18n.t(`privacy.check${i}`);
      });
    }, 50);
  });
};

// ─── Privacy Notice ───────────────────────────────────────────────────────────
const initPrivacyNotice = () => {
  const modal    = document.getElementById('privacy-modal');
  const overlay  = document.getElementById('privacy-overlay');
  const closeBtn = document.getElementById('privacy-close');
  const headerBtn = document.getElementById('privacy-learn-more');
  const footerBtn = document.getElementById('footer-privacy-link');

  const openModal = () => {
    modal.removeAttribute('hidden');
    overlay.removeAttribute('hidden');
    closeBtn.focus();
  };

  const closeModal = () => {
    modal.setAttribute('hidden', '');
    overlay.setAttribute('hidden', '');
  };

  if (headerBtn) headerBtn.addEventListener('click', openModal);
  if (footerBtn) footerBtn.addEventListener('click', openModal);
  if (closeBtn)  closeBtn.addEventListener('click', closeModal);
  if (overlay)   overlay.addEventListener('click', closeModal);

  // Populate checklist
  [1, 2, 3].forEach(i => {
    const el = document.getElementById(`privacy-check-${i}`);
    if (el) el.textContent = I18n.t(`privacy.check${i}`);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !modal.hasAttribute('hidden')) closeModal();
  });

  // Auto-show on first visit
  if (!localStorage.getItem('moodle-builder-privacy-seen')) {
    setTimeout(() => {
      openModal();
      localStorage.setItem('moodle-builder-privacy-seen', '1');
    }, 600);
  }
};

// ─── Boot ─────────────────────────────────────────────────────────────────────
const boot = () => {
  I18n.init();
  initNav();
  initLangToggle();
  initPrivacyNotice();
  initCategories();
  initQuestions();
  navigateTo('categories');

  const btn = document.getElementById('btn-lang');
  if (btn) btn.textContent = I18n.t('common.language');
};

document.addEventListener('DOMContentLoaded', boot);

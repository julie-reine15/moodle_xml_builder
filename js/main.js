/**
 * main.js — Application entry point
 * Bootstraps the app: i18n, navigation, privacy notice, and section routing
 */

import I18n from './i18n.js';

// ─── App State ────────────────────────────────────────────────────────────────
export const AppState = {
  categories: [],   // { id, name, description }
  questions: [],    // { id, type, categoryId, name, ... }
  activeSection: 'categories',
};

// ─── Navigation ───────────────────────────────────────────────────────────────
const initNav = () => {
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const target = link.getAttribute('data-section');
      navigateTo(target);
    });
  });
};

export const navigateTo = (sectionId) => {
  // Update nav state
  document.querySelectorAll('.nav-link').forEach(l => {
    l.classList.toggle('active', l.getAttribute('data-section') === sectionId);
  });

  // Show/hide sections
  document.querySelectorAll('.app-section').forEach(s => {
    s.classList.toggle('hidden', s.id !== `section-${sectionId}`);
  });

  AppState.activeSection = sectionId;
};

// ─── Language Toggle ──────────────────────────────────────────────────────────
const initLangToggle = () => {
  const btn = document.getElementById('btn-lang');
  if (btn) {
    btn.addEventListener('click', () => {
      I18n.toggle();
      // Update button label after toggle (the new lang label is in t('common.language'))
      btn.textContent = I18n.t('common.language');
    });
  }
};

// ─── Privacy Notice ───────────────────────────────────────────────────────────
const initPrivacyNotice = () => {
  const modal = document.getElementById('privacy-modal');
  const overlay = document.getElementById('privacy-overlay');
  const closeBtn = document.getElementById('privacy-close');
  const learnMoreBtn = document.getElementById('privacy-learn-more');

  const openModal = () => {
    modal.removeAttribute('hidden');
    overlay.removeAttribute('hidden');
    closeBtn.focus();
  };

  const closeModal = () => {
    modal.setAttribute('hidden', '');
    overlay.setAttribute('hidden', '');
  };

  if (learnMoreBtn) learnMoreBtn.addEventListener('click', openModal);
  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  if (overlay) overlay.addEventListener('click', closeModal);

  // Keyboard: close on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !modal.hasAttribute('hidden')) closeModal();
  });

  // Show notice once on first visit
  const seen = localStorage.getItem('moodle-builder-privacy-seen');
  if (!seen) {
    // Slight delay so the page renders first
    setTimeout(() => {
      openModal();
      localStorage.setItem('moodle-builder-privacy-seen', '1');
    }, 600);
  }
};

// ─── Boot ─────────────────────────────────────────────────────────────────────
const boot = async () => {
  await I18n.init();
  initNav();
  initLangToggle();
  initPrivacyNotice();
  navigateTo('categories');

  // Update lang button label after i18n is ready
  const btn = document.getElementById('btn-lang');
  if (btn) btn.textContent = I18n.t('common.language');
};

document.addEventListener('DOMContentLoaded', boot);

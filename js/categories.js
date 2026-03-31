/**
 * categories.js — Category manager
 * Full CRUD for question categories, with localStorage persistence.
 */

import I18n from './i18n.js';
import { AppState, updateBadge } from './main.js';

// ─── Constants ────────────────────────────────────────────────────────────────
const STORAGE_KEY = 'moodle-builder-categories';

// ─── State helpers ────────────────────────────────────────────────────────────
const save = () => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(AppState.categories));
};

const load = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    AppState.categories = stored ? JSON.parse(stored) : [];
  } catch {
    AppState.categories = [];
  }
};

const genId = () => `cat_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;

// ─── Form state ───────────────────────────────────────────────────────────────
let editingId = null; // null = creating new, string = editing existing

// ─── DOM refs ─────────────────────────────────────────────────────────────────
const getEls = () => ({
  list:       document.getElementById('categories-list'),
  empty:      document.getElementById('categories-empty'),
  formCard:   document.getElementById('category-form-card'),
  form:       document.getElementById('category-form'),
  nameInput:  document.getElementById('cat-name'),
  descInput:  document.getElementById('cat-desc'),
  nameError:  document.getElementById('cat-name-error'),
  addBtn:     document.getElementById('btn-add-category'),
  cancelBtn:  document.getElementById('btn-cancel-category'),
});

// ─── Render ───────────────────────────────────────────────────────────────────
const render = () => {
  const { list, empty } = getEls();

  // Remove existing category cards (keep the empty state element)
  list.querySelectorAll('.item-card').forEach(el => el.remove());

  if (AppState.categories.length === 0) {
    empty.classList.remove('hidden');
    updateBadge('categories', 0);
    return;
  }

  empty.classList.add('hidden');
  updateBadge('categories', AppState.categories.length);

  AppState.categories.forEach(cat => {
    const card = document.createElement('div');
    card.className = 'item-card';
    card.setAttribute('role', 'listitem');
    card.dataset.id = cat.id;

    const questionCount = (window.AppState || AppState).questions
      ? AppState.questions.filter(q => q.categoryId === cat.id).length
      : 0;

    card.innerHTML = `
      <div class="item-card-body">
        <div class="item-card-title">${escHtml(cat.name)}</div>
        <div class="item-card-meta">
          ${cat.description ? `<span>${escHtml(cat.description)}</span>` : ''}
          <span class="tag tag-primary">${questionCount} question${questionCount !== 1 ? 's' : ''}</span>
        </div>
      </div>
      <div class="item-card-actions">
        <button class="btn btn-ghost btn-sm btn-edit-cat" data-id="${cat.id}" type="button"
          aria-label="${I18n.t('common.edit')} ${escHtml(cat.name)}">
          ${iconEdit()}
          <span>${I18n.t('common.edit')}</span>
        </button>
        <button class="btn btn-ghost btn-sm btn-delete-cat" data-id="${cat.id}" type="button"
          aria-label="${I18n.t('common.delete')} ${escHtml(cat.name)}">
          ${iconDelete()}
        </button>
      </div>
    `;
    list.appendChild(card);
  });

  // Attach card-level listeners
  list.querySelectorAll('.btn-edit-cat').forEach(btn => {
    btn.addEventListener('click', () => startEdit(btn.dataset.id));
  });
  list.querySelectorAll('.btn-delete-cat').forEach(btn => {
    btn.addEventListener('click', () => deleteCategory(btn.dataset.id));
  });
};

// ─── Form show/hide ───────────────────────────────────────────────────────────
const showForm = (cat = null) => {
  const { formCard, nameInput, descInput, nameError, addBtn } = getEls();
  editingId = cat ? cat.id : null;
  nameInput.value = cat ? cat.name : '';
  descInput.value = cat ? (cat.description || '') : '';
  nameError.classList.add('hidden');
  nameError.textContent = '';
  formCard.classList.remove('hidden');
  addBtn.classList.add('hidden');
  nameInput.focus();
};

const hideForm = () => {
  const { formCard, addBtn, nameInput, descInput, nameError } = getEls();
  formCard.classList.add('hidden');
  addBtn.classList.remove('hidden');
  nameInput.value = '';
  descInput.value = '';
  nameError.classList.add('hidden');
  editingId = null;
};

// ─── CRUD ─────────────────────────────────────────────────────────────────────
const startEdit = (id) => {
  const cat = AppState.categories.find(c => c.id === id);
  if (cat) showForm(cat);
};

const deleteCategory = (id) => {
  if (!confirm(I18n.t('categories.deleteConfirm'))) return;

  // Reassign questions in this category to uncategorised (empty string)
  AppState.questions.forEach(q => {
    if (q.categoryId === id) q.categoryId = '';
  });

  AppState.categories = AppState.categories.filter(c => c.id !== id);
  save();
  render();
};

const submitForm = () => {
  const { nameInput, descInput, nameError } = getEls();
  const name = nameInput.value.trim();

  // Validate
  if (!name) {
    nameError.textContent = I18n.t('validation.categoryRequired');
    nameError.classList.remove('hidden');
    nameInput.focus();
    return;
  }

  if (editingId) {
    // Update existing
    const cat = AppState.categories.find(c => c.id === editingId);
    if (cat) {
      cat.name = name;
      cat.description = descInput.value.trim();
    }
  } else {
    // Create new
    AppState.categories.push({
      id: genId(),
      name,
      description: descInput.value.trim(),
    });
  }

  save();
  hideForm();
  render();
};

// ─── Helpers ──────────────────────────────────────────────────────────────────
const escHtml = (str) =>
  str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const iconEdit = () => `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>`;

const iconDelete = () => `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg>`;

// ─── Public API ───────────────────────────────────────────────────────────────

/**
 * Returns all categories as <option> elements for use in the question form.
 * @returns {string} HTML string of <option> elements
 */
export const getCategoryOptions = () => {
  if (AppState.categories.length === 0) {
    return `<option value="">${I18n.t('categories.empty')}</option>`;
  }
  return AppState.categories
    .map(c => `<option value="${c.id}">${escHtml(c.name)}</option>`)
    .join('');
};

export const getCategories = () => AppState.categories;

export const rerenderCategories = () => render();

// ─── Init ─────────────────────────────────────────────────────────────────────
export const initCategories = () => {
  load();

  const { addBtn, cancelBtn, form } = getEls();

  addBtn.addEventListener('click', () => showForm());
  cancelBtn.addEventListener('click', hideForm);
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    submitForm();
  });

  render();
};

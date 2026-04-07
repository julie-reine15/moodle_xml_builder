/**
 * categories.js \u2014 Category manager
 * Full CRUD with transfer-before-delete protection.
 */

import I18n from './i18n.js';
import { AppState, updateBadge, genId, escHtml } from './state.js';

const STORAGE_KEY = 'moodle-builder-categories';
const QUESTIONS_KEY = 'moodle-builder-questions';

// \u2500\u2500\u2500 Persistence \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
const save = () => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(AppState.categories));
};

// Save questions too (needed after category transfer)
const saveQuestions = () => {
  localStorage.setItem(QUESTIONS_KEY, JSON.stringify(AppState.questions));
};

const load = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    AppState.categories = stored ? JSON.parse(stored) : [];
  } catch {
    AppState.categories = [];
  }
};

// \u2500\u2500\u2500 Form state \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
let editingId = null;

// \u2500\u2500\u2500 DOM refs \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
const getEls = () => ({
  list:      document.getElementById('categories-list'),
  empty:     document.getElementById('categories-empty'),
  formCard:  document.getElementById('category-form-card'),
  form:      document.getElementById('category-form'),
  nameInput: document.getElementById('cat-name'),
  descInput: document.getElementById('cat-desc'),
  nameError: document.getElementById('cat-name-error'),
  addBtn:    document.getElementById('btn-add-category'),
  cancelBtn: document.getElementById('btn-cancel-category'),
});

// \u2500\u2500\u2500 Render \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
const render = () => {
  const { list, empty } = getEls();

  list.querySelectorAll('.item-card, .transfer-prompt').forEach(el => el.remove());

  if (AppState.categories.length === 0) {
    empty.classList.remove('hidden');
    updateBadge('categories', 0);
    return;
  }

  empty.classList.add('hidden');
  updateBadge('categories', AppState.categories.length);

  AppState.categories.forEach(cat => {
    const questionCount = AppState.questions.filter(q => q.categoryId === cat.id).length;

    const card = document.createElement('div');
    card.className = 'item-card';
    card.setAttribute('role', 'listitem');
    card.dataset.id = cat.id;

    card.innerHTML = `
      <div class="item-card-body">
        <div class="item-card-title">${escHtml(cat.name)}</div>
        <div class="item-card-meta">
          ${cat.description ? `<span>${escHtml(cat.description)}</span>` : ''}
          <span class="tag tag-primary">${questionCount} question${questionCount !== 1 ? 's' : ''}</span>
        </div>
      </div>
      <div class="item-card-actions">
        <button class="btn btn-ghost btn-sm btn-edit-cat" data-id="${cat.id}" type="button">
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

  list.querySelectorAll('.btn-edit-cat').forEach(btn => {
    btn.addEventListener('click', () => startEdit(btn.dataset.id));
  });
  list.querySelectorAll('.btn-delete-cat').forEach(btn => {
    btn.addEventListener('click', () => handleDelete(btn.dataset.id));
  });
};

// \u2500\u2500\u2500 Delete: check for linked questions first \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
const handleDelete = (id) => {
  const linkedCount = AppState.questions.filter(q => q.categoryId === id).length;

  if (linkedCount === 0) {
    // Safe to delete directly
    if (!confirm(I18n.t('categories.deleteConfirm'))) return;
    AppState.categories = AppState.categories.filter(c => c.id !== id);
    save();
    render();
    return;
  }

  // Has linked questions \u2014 show transfer prompt inline
  showTransferPrompt(id, linkedCount);
};

// \u2500\u2500\u2500 Transfer prompt (inline, below the card) \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
const showTransferPrompt = (sourceId, count) => {
  // Remove any existing prompt first
  document.querySelectorAll('.transfer-prompt').forEach(el => el.remove());

  const others = AppState.categories.filter(c => c.id !== sourceId);

  const prompt = document.createElement('div');
  prompt.className = 'transfer-prompt card';
  prompt.style.cssText = 'border-color: var(--color-warning); background: var(--color-warning-bg); margin-top: -8px;';

  const msg = I18n.t('categories.deleteBlocked').replace('{count}', count);
  const optionsHTML = others.length === 0
    ? `<option value="" disabled selected>${I18n.t('categories.noOtherCategories')}</option>`
    : `<option value="" disabled selected>${I18n.t('categories.selectTarget')}</option>
       ${others.map(c => `<option value="${c.id}">${escHtml(c.name)}</option>`).join('')}`;

  prompt.innerHTML = `
    <div style="display:flex; align-items:flex-start; gap:var(--space-3); margin-bottom:var(--space-4);">
      <span aria-hidden="true" style="font-size:1.2rem; flex-shrink:0;">&#x26A0;&#xFE0F;</span>
      <p style="font-size:var(--text-sm); color:var(--color-warning); margin:0;">${msg}</p>
    </div>
    <div class="form-group" style="margin-bottom:var(--space-4);">
      <label class="form-label" for="transfer-select">${I18n.t('categories.transferLabel')}</label>
      <select id="transfer-select" class="form-select">${optionsHTML}</select>
      <div class="field-error hidden" id="transfer-error" role="alert"></div>
    </div>
    <div style="display:flex; justify-content:flex-end; gap:var(--space-3);">
      <button type="button" class="btn btn-ghost btn-sm" id="btn-transfer-cancel">
        ${I18n.t('common.cancel')}
      </button>
      ${others.length > 0 ? `
        <button type="button" class="btn btn-accent btn-sm" id="btn-transfer-confirm" data-source="${sourceId}">
          ${I18n.t('categories.transferConfirm')}
        </button>` : ''}
    </div>
  `;

  // Insert after the card for this category
  const card = document.querySelector(`.item-card[data-id="${sourceId}"]`);
  if (card) card.after(prompt);

  document.getElementById('btn-transfer-cancel')
    .addEventListener('click', () => prompt.remove());

  const confirmBtn = document.getElementById('btn-transfer-confirm');
  if (confirmBtn) {
    confirmBtn.addEventListener('click', () => {
      const targetId = document.getElementById('transfer-select').value;
      const errorEl = document.getElementById('transfer-error');

      if (!targetId) {
        errorEl.textContent = I18n.t('validation.categoryRequired');
        errorEl.classList.remove('hidden');
        return;
      }

      // Transfer questions
      AppState.questions.forEach(q => {
        if (q.categoryId === sourceId) q.categoryId = targetId;
      });
      saveQuestions();

      // Delete source category
      AppState.categories = AppState.categories.filter(c => c.id !== sourceId);
      save();

      prompt.remove();
      render();

      // Refresh question badge with updated counts
      updateBadge('questions', AppState.questions.length);
    });
  }
};

// \u2500\u2500\u2500 Form show / hide \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
const showForm = (cat = null) => {
  const { formCard, nameInput, descInput, nameError, addBtn } = getEls();
  // Close any open transfer prompt
  document.querySelectorAll('.transfer-prompt').forEach(el => el.remove());
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

// \u2500\u2500\u2500 CRUD \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
const startEdit = (id) => {
  const cat = AppState.categories.find(c => c.id === id);
  if (cat) showForm(cat);
};

const submitForm = () => {
  const { nameInput, descInput, nameError } = getEls();
  const name = nameInput.value.trim();

  if (!name) {
    nameError.textContent = I18n.t('validation.categoryRequired');
    nameError.classList.remove('hidden');
    nameInput.focus();
    return;
  }

  if (editingId) {
    const cat = AppState.categories.find(c => c.id === editingId);
    if (cat) { cat.name = name; cat.description = descInput.value.trim(); }
  } else {
    AppState.categories.push({ id: genId('cat'), name, description: descInput.value.trim() });
  }

  save();
  hideForm();
  render();
};

// \u2500\u2500\u2500 Icons \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
const iconEdit = () => `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>`;
const iconDelete = () => `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg>`;

// \u2500\u2500\u2500 Public API \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
export const getCategoryOptions = () => {
  if (AppState.categories.length === 0) {
    return `<option value="" disabled>${I18n.t('categories.empty')}</option>`;
  }
  return AppState.categories
    .map(c => `<option value="${c.id}">${escHtml(c.name)}</option>`)
    .join('');
};

// Called by questions.js after a question is saved/edited to refresh category cards
export const rerenderCategories = () => render();

export const initCategories = () => {
  load();
  const { addBtn, cancelBtn, form } = getEls();
  addBtn.addEventListener('click', () => showForm());
  cancelBtn.addEventListener('click', hideForm);
  form.addEventListener('submit', (e) => { e.preventDefault(); submitForm(); });
  render();
};

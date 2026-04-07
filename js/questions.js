/**
 * questions.js — Question manager
 * Handles the question form shell: type selector, common fields, list rendering.
 * Type-specific fields are injected by questionForms.js (Step 3).
 */

import I18n from './i18n.js';
import { AppState, updateBadge, genId, escHtml } from './state.js';
import { getCategoryOptions, rerenderCategories } from './categories.js';

// ─── Constants ────────────────────────────────────────────────────────────────
const STORAGE_KEY = 'moodle-builder-questions';

const QUESTION_TYPES = [
  { key: 'multichoice',      phase: 1 },
  { key: 'multichoicemulti', phase: 1 },
  { key: 'truefalse',        phase: 1 },
  { key: 'shortanswer',      phase: 1 },
  { key: 'essay',            phase: 1 },
  { key: 'matching',         phase: 2 },
  { key: 'numerical',        phase: 2 },
  { key: 'calculated',       phase: 3 },
  { key: 'ddwtos',           phase: 3 },
  { key: 'gapselect',        phase: 3 },
  { key: 'ordering',         phase: 3 },
  { key: 'wordselect',       phase: 3 },
];

const CURRENT_PHASE = 1;

// ─── Persistence ─────────────────────────────────────────────────────────────
const save = () => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(AppState.questions));
};

const load = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    AppState.questions = stored ? JSON.parse(stored) : [];
  } catch {
    AppState.questions = [];
  }
};

// ─── Form state ───────────────────────────────────────────────────────────────
let editingId = null;

// ─── DOM refs ─────────────────────────────────────────────────────────────────
const getEls = () => ({
  list:          document.getElementById('questions-list'),
  empty:         document.getElementById('questions-empty'),
  formCard:      document.getElementById('question-form-card'),
  formContainer: document.getElementById('question-form-container'),
  addBtn:        document.getElementById('btn-add-question'),
});

// ─── Type dropdown ────────────────────────────────────────────────────────────
const buildTypeOptions = () => {
  const comingSoon = I18n.t('questions.comingSoon');
  return QUESTION_TYPES.map(({ key, phase }) => {
    const label = I18n.t(`questions.types.${key}`);
    if (phase <= CURRENT_PHASE) {
      return `<option value="${key}">${label}</option>`;
    }
    return `<option value="${key}" disabled style="color:var(--color-text-muted)">${label} — ${comingSoon}</option>`;
  }).join('');
};

// ─── Form HTML ────────────────────────────────────────────────────────────────
const buildFormHTML = (q = null) => {
  const isEdit = q !== null;
  const fr = I18n.getLang() === 'fr';

  return `
    <form id="question-form" novalidate>

      <div class="form-row">
        <div class="form-group">
          <label class="form-label" for="q-type">
            ${I18n.t('questions.type')} <span class="required-mark">*</span>
          </label>
          <select id="q-type" class="form-select" ${isEdit ? 'disabled' : ''}>
            ${buildTypeOptions()}
          </select>
          ${isEdit ? `<span class="form-hint">${fr ? I18n.t('questions.typeLockedHint') : 'Type cannot be changed after creation.'}</span>` : ''}
        </div>

        <div class="form-group">
          <label class="form-label" for="q-category">
            ${I18n.t('questions.category')} <span class="required-mark">*</span>
          </label>
          <select id="q-category" class="form-select">
            <option value="">${fr ? I18n.t('questions.selectCategory') : '— Select a category —'}</option>
            ${getCategoryOptions()}
          </select>
          <div class="field-error hidden" id="q-category-error" role="alert"></div>
        </div>
      </div>

      <div class="form-group">
        <label class="form-label" for="q-name">
          ${I18n.t('questions.name')} <span class="required-mark">*</span>
        </label>
        <input type="text" id="q-name" class="form-input"
          placeholder="${I18n.t('questions.namePlaceholder')}"
          value="${isEdit ? escHtml(q.name) : ''}"
          autocomplete="off" />
        <div class="field-error hidden" id="q-name-error" role="alert"></div>
      </div>

      <div class="form-group">
        <label class="form-label" for="q-default-mark">
          ${I18n.t('questions.defaultMark')}
        </label>
        <input type="number" id="q-default-mark" class="form-input"
          value="${isEdit ? q.defaultMark : '1'}"
          min="0" step="0.01" style="max-width:140px;" />
      </div>

      <div id="q-type-fields">
        <div class="notice notice-info" style="margin-bottom:var(--space-5);">
          <span aria-hidden="true">🔧</span>
          <span>${fr
            ? I18n.t('questions.typeFieldsNotice')
            : 'Type-specific fields will be available in the next development step.'
          }</span>
        </div>
      </div>

      <div class="form-group">
        <label class="form-label" for="q-general-feedback">
          ${I18n.t('questions.generalFeedback')}
        </label>
        <textarea id="q-general-feedback" class="form-textarea" rows="3"
          placeholder="${fr ? I18n.t('questions.feedbackPlaceholder') : 'Feedback shown after answering'}"
        >${isEdit ? escHtml(q.generalFeedback || '') : ''}</textarea>
      </div>

      <hr class="divider" />

      <div style="display:flex;justify-content:flex-end;gap:var(--space-3);flex-wrap:wrap;">
        <button type="button" class="btn btn-ghost" id="btn-cancel-question">
          ${I18n.t('questions.cancel')}
        </button>
        <button type="submit" class="btn btn-primary">
          ${I18n.t('questions.save')}
        </button>
      </div>

    </form>
  `;
};

// ─── Show / hide form ─────────────────────────────────────────────────────────
const showForm = (q = null) => {
  editingId = q ? q.id : null;
  const { formCard, formContainer, addBtn } = getEls();
  formContainer.innerHTML = buildFormHTML(q);
  formCard.classList.remove('hidden');
  addBtn.classList.add('hidden');

  if (q) {
    document.getElementById('q-type').value = q.type;
    document.getElementById('q-category').value = q.categoryId || '';
  }

  document.getElementById('question-form')
    .addEventListener('submit', (e) => { e.preventDefault(); submitForm(); });
  document.getElementById('btn-cancel-question')
    .addEventListener('click', hideForm);
  document.getElementById('q-name').focus();
};

const hideForm = () => {
  const { formCard, formContainer, addBtn } = getEls();
  formCard.classList.add('hidden');
  formContainer.innerHTML = '';
  addBtn.classList.remove('hidden');
  editingId = null;
};

// ─── Submit ───────────────────────────────────────────────────────────────────
const submitForm = () => {
  const typeEl   = document.getElementById('q-type');
  const catEl    = document.getElementById('q-category');
  const nameEl   = document.getElementById('q-name');
  const markEl   = document.getElementById('q-default-mark');
  const fbEl     = document.getElementById('q-general-feedback');
  const nameErr  = document.getElementById('q-name-error');
  const catErr   = document.getElementById('q-category-error');
  let valid = true;

  if (!nameEl.value.trim()) {
    nameErr.textContent = I18n.t('validation.questionNameRequired');
    nameErr.classList.remove('hidden');
    nameEl.classList.add('error');
    valid = false;
  } else {
    nameErr.classList.add('hidden');
    nameEl.classList.remove('error');
  }

  if (!catEl.value) {
    catErr.textContent = I18n.t('validation.categoryRequired');
    catErr.classList.remove('hidden');
    catEl.classList.add('error');
    valid = false;
  } else {
    catErr.classList.add('hidden');
    catEl.classList.remove('error');
  }

  if (!valid) return;

  const existing = editingId ? AppState.questions.find(q => q.id === editingId) : null;

  const data = {
    type:            existing ? existing.type : typeEl.value,
    categoryId:      catEl.value,
    name:            nameEl.value.trim(),
    defaultMark:     parseFloat(markEl.value) || 1,
    generalFeedback: fbEl.value.trim(),
    typeData:        existing ? existing.typeData : {},
  };

  if (editingId) {
    const idx = AppState.questions.findIndex(q => q.id === editingId);
    if (idx !== -1) AppState.questions[idx] = { ...AppState.questions[idx], ...data };
  } else {
    AppState.questions.push({ id: genId('q'), ...data });
  }

  save();
  hideForm();
  render();
  rerenderCategories();
};

// ─── Render list ──────────────────────────────────────────────────────────────
const render = () => {
  const { list, empty } = getEls();
  list.querySelectorAll('.item-card').forEach(el => el.remove());

  if (AppState.questions.length === 0) {
    empty.classList.remove('hidden');
    updateBadge('questions', 0);
    return;
  }

  empty.classList.add('hidden');
  updateBadge('questions', AppState.questions.length);

  AppState.questions.forEach(q => {
    const cat = AppState.categories.find(c => c.id === q.categoryId);
    const catName = cat ? cat.name : (I18n.getLang() === 'fr' ? I18n.t('questions.uncategorised') : 'Uncategorised');
    const typeLabel = I18n.t(`questions.types.${q.type}`);

    const card = document.createElement('div');
    card.className = 'item-card';
    card.setAttribute('role', 'listitem');
    card.dataset.id = q.id;
    card.innerHTML = `
      <div class="item-card-body">
        <div class="item-card-title">${escHtml(q.name)}</div>
        <div class="item-card-meta">
          <span class="tag tag-primary">${escHtml(typeLabel)}</span>
          <span class="tag">${escHtml(catName)}</span>
          <span>${q.defaultMark} pt${q.defaultMark !== 1 ? 's' : ''}</span>
        </div>
      </div>
      <div class="item-card-actions">
        <button class="btn btn-ghost btn-sm btn-edit-q" data-id="${q.id}" type="button">
          ${iconEdit()} <span>${I18n.t('common.edit')}</span>
        </button>
        <button class="btn btn-ghost btn-sm btn-duplicate-q" data-id="${q.id}" type="button">
          ${iconDuplicate()}
        </button>
        <button class="btn btn-ghost btn-sm btn-delete-q" data-id="${q.id}" type="button">
          ${iconDelete()}
        </button>
      </div>
    `;
    list.appendChild(card);
  });

  list.querySelectorAll('.btn-edit-q').forEach(btn => {
    btn.addEventListener('click', () => {
      const q = AppState.questions.find(q => q.id === btn.dataset.id);
      if (q) showForm(q);
    });
  });
  list.querySelectorAll('.btn-duplicate-q').forEach(btn => {
    btn.addEventListener('click', () => duplicateQuestion(btn.dataset.id));
  });
  list.querySelectorAll('.btn-delete-q').forEach(btn => {
    btn.addEventListener('click', () => deleteQuestion(btn.dataset.id));
  });
};

// ─── Actions ──────────────────────────────────────────────────────────────────
const duplicateQuestion = (id) => {
  const q = AppState.questions.find(q => q.id === id);
  if (!q) return;
  const suffix = I18n.getLang() === 'fr' ? I18n.t('questions.copyLabel') : ' (copy)';
  AppState.questions.push({ ...JSON.parse(JSON.stringify(q)), id: genId('q'), name: q.name + suffix });
  save();
  render();
  rerenderCategories();
};

const deleteQuestion = (id) => {
  if (!confirm(I18n.t('questions.deleteConfirm'))) return;
  AppState.questions = AppState.questions.filter(q => q.id !== id);
  save();
  render();
  rerenderCategories();
};

// ─── Icons ────────────────────────────────────────────────────────────────────
const iconEdit = () => `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>`;
const iconDelete = () => `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg>`;
const iconDuplicate = () => `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>`;

// ─── Init ─────────────────────────────────────────────────────────────────────
export const initQuestions = () => {
  load();
  const { addBtn } = getEls();
  addBtn.addEventListener('click', () => showForm());
  render();
};

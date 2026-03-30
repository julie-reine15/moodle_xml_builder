/**
 * i18n.js — Bilingual language system (FR / EN)
 * Loads locale JSON files and provides a translation function t()
 */

const I18n = (() => {
  let currentLang = 'fr';
  let translations = {};

  /**
   * Resolve the base URL for locale files regardless of subdirectory depth.
   * import.meta.url = .../js/i18n.js → go up one level → .../locales/
   */
  const localeBase = new URL('../locales/', import.meta.url).href;

  /**
   * Load a locale file and apply translations to the DOM.
   * @param {string} lang - 'fr' or 'en'
   */
  const load = async (lang) => {
    try {
      const response = await fetch(`${localeBase}${lang}.json`);
      if (!response.ok) throw new Error(`Failed to load locale: ${lang}`);
      translations = await response.json();
      currentLang = lang;
      document.documentElement.setAttribute('lang', lang);
      localStorage.setItem('moodle-builder-lang', lang);
      applyToDOM();
    } catch (err) {
      console.error('[i18n] Error loading locale:', err);
    }
  };

  /**
   * Get a translated string by dot-notation key.
   * @param {string} key - e.g. 'common.save'
   * @param {Object} [vars] - optional replacement variables e.g. { name: 'foo' }
   * @returns {string}
   */
  const t = (key, vars = {}) => {
    const value = key.split('.').reduce((obj, k) => obj?.[k], translations);
    if (value === undefined) {
      console.warn(`[i18n] Missing key: ${key} (${currentLang})`);
      return key;
    }
    return Object.entries(vars).reduce(
      (str, [k, v]) => str.replace(new RegExp(`{{${k}}}`, 'g'), v),
      value
    );
  };

  /**
   * Apply translations to all elements with data-i18n attributes.
   * data-i18n="key"              → sets textContent
   * data-i18n-placeholder="key"  → sets placeholder attribute
   * data-i18n-title="key"        → sets title attribute
   * data-i18n-aria="key"         → sets aria-label attribute
   */
  const applyToDOM = () => {
    document.querySelectorAll('[data-i18n]').forEach(el => {
      el.textContent = t(el.getAttribute('data-i18n'));
    });
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      el.placeholder = t(el.getAttribute('data-i18n-placeholder'));
    });
    document.querySelectorAll('[data-i18n-title]').forEach(el => {
      el.title = t(el.getAttribute('data-i18n-title'));
    });
    document.querySelectorAll('[data-i18n-aria]').forEach(el => {
      el.setAttribute('aria-label', t(el.getAttribute('data-i18n-aria')));
    });
  };

  /**
   * Toggle between FR and EN.
   */
  const toggle = () => {
    load(currentLang === 'fr' ? 'en' : 'fr');
  };

  /**
   * Get the current language code.
   */
  const getLang = () => currentLang;

  /**
   * Initialise: load saved language or default to French.
   */
  const init = () => {
    const saved = localStorage.getItem('moodle-builder-lang') || 'fr';
    load(saved);
  };

  return { init, load, toggle, t, getLang, applyToDOM };
})();

export default I18n;

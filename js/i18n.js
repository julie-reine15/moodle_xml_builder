/**
 * i18n.js — Bilingual language system (FR / EN)
 * Locales are embedded directly — no fetch, no path dependency, works on any host.
 */

const LOCALES = {
  fr: {
    app: {
      title: "Créateur de banque de questions Moodle",
      subtitle: "Créez votre fichier XML Moodle facilement, sans installation"
    },
    nav: {
      categories: "Catégories",
      questions: "Questions",
      preview: "Aperçu",
      export: "Exporter XML"
    },
    privacy: {
      badge: "🔒 Vos données restent sur votre ordinateur",
      title: "Confidentialité de vos données",
      body: "Tout ce que vous saisissez dans cet outil — vos questions, vos réponses, vos catégories — reste uniquement sur votre ordinateur, dans votre navigateur. Aucune donnée n'est envoyée à un serveur, stockée en ligne ou transmise à qui que ce soit. Cet outil fonctionne entièrement en local, comme un logiciel installé sur votre machine.",
      check1: "Vos questions et réponses ne quittent jamais votre ordinateur",
      check2: "Aucun compte, aucune connexion, aucun serveur impliqué",
      check3: "Le fichier XML est généré et enregistré directement sur votre machine",
      close: "Compris"
    },
    categories: {
      title: "Catégories de questions",
      description: "Organisez vos questions en catégories. Moodle utilisera ces catégories pour classer vos questions dans la banque.",
      add: "Ajouter une catégorie",
      namePlaceholder: "Nom de la catégorie (ex : Chapitre 1 – Lexique)",
      descPlaceholder: "Description facultative",
      empty: "Aucune catégorie créée. Commencez par en ajouter une.",
      defaultName: "Sans catégorie",
      deleteConfirm: "Supprimer cette catégorie ? Les questions associées seront déplacées vers « Sans catégorie ».",
      edit: "Modifier",
      delete: "Supprimer",
      save: "Enregistrer"
    },
    questions: {
      title: "Questions",
      add: "Ajouter une question",
      type: "Type de question",
      category: "Catégorie",
      name: "Titre de la question (interne)",
      namePlaceholder: "Ex : Q1 – Compréhension vocabulaire",
      questionText: "Énoncé de la question",
      defaultMark: "Note par défaut",
      generalFeedback: "Feedback général (facultatif)",
      empty: "Aucune question ajoutée. Cliquez sur « Ajouter une question » pour commencer.",
      edit: "Modifier",
      delete: "Supprimer",
      duplicate: "Dupliquer",
      save: "Enregistrer la question",
      cancel: "Annuler",
      deleteConfirm: "Supprimer cette question définitivement ?",
      types: {
        multichoice: "Choix multiple (réponse unique)",
        multichoicemulti: "Choix multiple (réponses multiples)",
        truefalse: "Vrai / Faux",
        shortanswer: "Réponse courte",
        essay: "Rédaction libre (essai)",
        matching: "Correspondance",
        numerical: "Numérique",
        calculated: "Calculé",
        ddwtos: "Glisser-déposer dans le texte",
        gapselect: "Sélectionner les mots manquants",
        ordering: "Mise en ordre",
        wordselect: "Sélection de mots"
      }
    },
    multichoice: {
      answers: "Réponses",
      addAnswer: "Ajouter une réponse",
      answerText: "Texte de la réponse",
      grade: "Note (%)",
      feedback: "Feedback pour cette réponse (facultatif)",
      shuffle: "Mélanger les réponses",
      single: "Une seule réponse correcte",
      correctHint: "Attribuez 100% à la bonne réponse, 0% aux mauvaises."
    },
    truefalse: {
      correctAnswer: "Réponse correcte",
      true: "Vrai",
      false: "Faux",
      feedbackTrue: "Feedback si l'étudiant répond Vrai",
      feedbackFalse: "Feedback si l'étudiant répond Faux"
    },
    shortanswer: {
      answers: "Réponses acceptées",
      addAnswer: "Ajouter une réponse acceptée",
      answerText: "Réponse acceptée",
      grade: "Note (%)",
      caseSensitive: "Sensible à la casse",
      hint: "Vous pouvez utiliser * comme joker (ex : *bonjour*)"
    },
    essay: {
      responseFormat: "Format de réponse attendu",
      responseFormats: {
        editor: "Éditeur de texte enrichi",
        editorfilepicker: "Éditeur + fichiers joints",
        plain: "Texte brut",
        monospaced: "Police à chasse fixe",
        noinline: "Aucun texte en ligne"
      },
      lines: "Nombre de lignes",
      attachments: "Pièces jointes autorisées",
      graderInfo: "Instructions pour le correcteur (facultatif)"
    },
    matching: {
      pairs: "Paires à associer",
      addPair: "Ajouter une paire",
      question: "Question / Terme",
      answer: "Réponse / Définition",
      shuffle: "Mélanger les réponses"
    },
    numerical: {
      answer: "Réponse numérique correcte",
      tolerance: "Tolérance (±)",
      unit: "Unité (facultatif)",
      addAnswer: "Ajouter une réponse alternative"
    },
    export: {
      title: "Exporter le fichier XML",
      description: "Votre fichier XML Moodle sera généré et téléchargé sur votre ordinateur. Vous pourrez ensuite l'importer directement dans Moodle.",
      filename: "Nom du fichier",
      download: "Télécharger le fichier XML",
      noQuestions: "Ajoutez au moins une question avant d'exporter.",
      success: "Fichier généré avec succès !",
      saveDialogHint: "Une fenêtre va s'ouvrir pour choisir où enregistrer votre fichier."
    },
    common: {
      required: "Obligatoire",
      optional: "Facultatif",
      yes: "Oui",
      no: "Non",
      add: "Ajouter",
      save: "Enregistrer",
      cancel: "Annuler",
      delete: "Supprimer",
      edit: "Modifier",
      close: "Fermer",
      loading: "Chargement…",
      error: "Une erreur est survenue.",
      confirmDelete: "Êtes-vous sûr de vouloir supprimer cet élément ?",
      language: "English"
    },
    footer: {
      privacy: "Aucune donnée transmise — tout reste sur votre ordinateur",
      privacyLink: "En savoir plus",
      github: "Voir le projet sur GitHub",
      madeFor: "Développé pour l'Inalco"
    },
    validation: {
      categoryRequired: "Veuillez sélectionner ou créer une catégorie.",
      questionTextRequired: "L'énoncé de la question est obligatoire.",
      questionNameRequired: "Le titre interne est obligatoire.",
      atLeastTwoAnswers: "Ajoutez au moins deux réponses.",
      oneCorrectAnswer: "Au moins une réponse doit avoir une note de 100%.",
      atLeastTwoPairs: "Ajoutez au moins deux paires.",
      numericalAnswerRequired: "La réponse numérique est obligatoire."
    }
  },

  en: {
    app: {
      title: "Moodle Question Bank Builder",
      subtitle: "Create your Moodle XML file easily — no installation required"
    },
    nav: {
      categories: "Categories",
      questions: "Questions",
      preview: "Preview",
      export: "Export XML"
    },
    privacy: {
      badge: "🔒 Your data stays on your computer",
      title: "Your data stays private",
      body: "Everything you type into this tool — your questions, answers, and categories — stays only on your computer, inside your browser. Nothing is sent to a server, stored online, or shared with anyone. This tool works entirely on your own machine, like software installed locally.",
      check1: "Your questions and answers never leave your computer",
      check2: "No account, no login, no server involved",
      check3: "The XML file is generated and saved directly on your machine",
      close: "Got it"
    },
    categories: {
      title: "Question Categories",
      description: "Organise your questions into categories. Moodle will use these to sort your questions in the question bank.",
      add: "Add a category",
      namePlaceholder: "Category name (e.g. Chapter 1 – Vocabulary)",
      descPlaceholder: "Optional description",
      empty: "No categories yet. Start by adding one.",
      defaultName: "Uncategorised",
      deleteConfirm: "Delete this category? Questions in it will be moved to 'Uncategorised'.",
      edit: "Edit",
      delete: "Delete",
      save: "Save"
    },
    questions: {
      title: "Questions",
      add: "Add a question",
      type: "Question type",
      category: "Category",
      name: "Question title (internal)",
      namePlaceholder: "e.g. Q1 – Vocabulary comprehension",
      questionText: "Question text",
      defaultMark: "Default mark",
      generalFeedback: "General feedback (optional)",
      empty: "No questions yet. Click 'Add a question' to get started.",
      edit: "Edit",
      delete: "Delete",
      duplicate: "Duplicate",
      save: "Save question",
      cancel: "Cancel",
      deleteConfirm: "Permanently delete this question?",
      types: {
        multichoice: "Multiple choice (single answer)",
        multichoicemulti: "Multiple choice (multiple answers)",
        truefalse: "True / False",
        shortanswer: "Short answer",
        essay: "Essay",
        matching: "Matching",
        numerical: "Numerical",
        calculated: "Calculated",
        ddwtos: "Drag and drop into text",
        gapselect: "Select missing words",
        ordering: "Ordering",
        wordselect: "Word select"
      }
    },
    multichoice: {
      answers: "Answers",
      addAnswer: "Add an answer",
      answerText: "Answer text",
      grade: "Grade (%)",
      feedback: "Feedback for this answer (optional)",
      shuffle: "Shuffle answers",
      single: "Single correct answer",
      correctHint: "Set 100% for the correct answer, 0% for incorrect ones."
    },
    truefalse: {
      correctAnswer: "Correct answer",
      true: "True",
      false: "False",
      feedbackTrue: "Feedback if student answers True",
      feedbackFalse: "Feedback if student answers False"
    },
    shortanswer: {
      answers: "Accepted answers",
      addAnswer: "Add an accepted answer",
      answerText: "Accepted answer",
      grade: "Grade (%)",
      caseSensitive: "Case sensitive",
      hint: "You can use * as a wildcard (e.g. *hello*)"
    },
    essay: {
      responseFormat: "Expected response format",
      responseFormats: {
        editor: "Rich text editor",
        editorfilepicker: "Editor + file attachments",
        plain: "Plain text",
        monospaced: "Monospaced font",
        noinline: "No inline text"
      },
      lines: "Number of lines",
      attachments: "Allowed attachments",
      graderInfo: "Instructions for the grader (optional)"
    },
    matching: {
      pairs: "Matching pairs",
      addPair: "Add a pair",
      question: "Question / Term",
      answer: "Answer / Definition",
      shuffle: "Shuffle answers"
    },
    numerical: {
      answer: "Correct numerical answer",
      tolerance: "Tolerance (±)",
      unit: "Unit (optional)",
      addAnswer: "Add alternative answer"
    },
    export: {
      title: "Export XML file",
      description: "Your Moodle XML file will be generated and downloaded to your computer. You can then import it directly into Moodle.",
      filename: "File name",
      download: "Download XML file",
      noQuestions: "Add at least one question before exporting.",
      success: "File successfully generated!",
      saveDialogHint: "A dialog will open to let you choose where to save your file."
    },
    common: {
      required: "Required",
      optional: "Optional",
      yes: "Yes",
      no: "No",
      add: "Add",
      save: "Save",
      cancel: "Cancel",
      delete: "Delete",
      edit: "Edit",
      close: "Close",
      loading: "Loading…",
      error: "An error occurred.",
      confirmDelete: "Are you sure you want to delete this item?",
      language: "Français"
    },
    footer: {
      privacy: "No data transmitted — everything stays on your computer",
      privacyLink: "Learn more",
      github: "View project on GitHub",
      madeFor: "Built for Inalco"
    },
    validation: {
      categoryRequired: "Please select or create a category.",
      questionTextRequired: "Question text is required.",
      questionNameRequired: "Internal title is required.",
      atLeastTwoAnswers: "Please add at least two answers.",
      oneCorrectAnswer: "At least one answer must have a grade of 100%.",
      atLeastTwoPairs: "Please add at least two pairs.",
      numericalAnswerRequired: "A numerical answer is required."
    }
  }
};

// ─── I18n engine ─────────────────────────────────────────────────────────────

const I18n = (() => {
  let currentLang = "fr";

  const load = (lang) => {
    if (!LOCALES[lang]) {
      console.error("[i18n] Unknown locale: " + lang);
      return;
    }
    currentLang = lang;
    document.documentElement.setAttribute("lang", lang);
    localStorage.setItem("moodle-builder-lang", lang);
    applyToDOM();
  };

  const t = (key) => {
    const value = key.split(".").reduce((obj, k) => obj && obj[k], LOCALES[currentLang]);
    if (value === undefined) {
      console.warn("[i18n] Missing key: " + key + " (" + currentLang + ")");
      return key;
    }
    return value;
  };

  const applyToDOM = () => {
    document.querySelectorAll("[data-i18n]").forEach(function(el) {
      el.textContent = t(el.getAttribute("data-i18n"));
    });
    document.querySelectorAll("[data-i18n-placeholder]").forEach(function(el) {
      el.placeholder = t(el.getAttribute("data-i18n-placeholder"));
    });
    document.querySelectorAll("[data-i18n-title]").forEach(function(el) {
      el.title = t(el.getAttribute("data-i18n-title"));
    });
    document.querySelectorAll("[data-i18n-aria]").forEach(function(el) {
      el.setAttribute("aria-label", t(el.getAttribute("data-i18n-aria")));
    });
  };

  const toggle = () => load(currentLang === "fr" ? "en" : "fr");
  const getLang = () => currentLang;
  const init = () => {
    const saved = localStorage.getItem("moodle-builder-lang") || "fr";
    load(saved);
  };

  return { init, load, toggle, t, getLang, applyToDOM };
})();

export default I18n;

/**
 * i18n.js \u2014 Bilingual language system (FR / EN)
 * Locales are embedded directly \u2014 no fetch, no path dependency, works on any host.
 */

const LOCALES = {
  fr: {
    app: {
      title: "Cr\u00e9ateur de banque de questions Moodle",
      subtitle: "Cr\u00e9ez votre fichier XML Moodle facilement, sans installation"
    },
    nav: {
      categories: "Cat\u00e9gories",
      questions: "Questions",
      preview: "Aper\u00e7u",
      export: "Exporter XML"
    },
    privacy: {
      badge: "\u{1f512} Vos donn\u00e9es restent sur votre ordinateur",
      title: "Confidentialit\u00e9 de vos donn\u00e9es",
      body: "Tout ce que vous saisissez dans cet outil \u2014 vos questions, vos r\u00e9ponses, vos cat\u00e9gories \u2014 reste uniquement sur votre ordinateur, dans votre navigateur. Aucune donn\u00e9e n'est envoy\u00e9e \u00e0 un serveur, stock\u00e9e en ligne ou transmise \u00e0 qui que ce soit. Cet outil fonctionne enti\u00e8rement en local, comme un logiciel install\u00e9 sur votre machine.",
      check1: "Vos questions et r\u00e9ponses ne quittent jamais votre ordinateur",
      check2: "Aucun compte, aucune connexion, aucun serveur impliqu\u00e9",
      check3: "Le fichier XML est g\u00e9n\u00e9r\u00e9 et enregistr\u00e9 directement sur votre machine",
      close: "Compris"
    },
    categories: {
      title: "Cat\u00e9gories de questions",
      deleteBlocked: "Cette cat\u00e9gorie contient {count} question(s). Transf\u00e9rez-les vers une autre cat\u00e9gorie avant de supprimer.",
      noOtherCategories: "Aucune autre cat\u00e9gorie disponible",
      transferLabel: "Transf\u00e9rer les questions vers",
      transferConfirm: "Transf\u00e9rer et supprimer",
      selectTarget: "-- S\u00e9lectionner une cat\u00e9gorie --",
      description: "Organisez vos questions en cat\u00e9gories. Moodle utilisera ces cat\u00e9gories pour classer vos questions dans la banque.",
      add: "Ajouter une cat\u00e9gorie",
      namePlaceholder: "Nom de la cat\u00e9gorie (ex : Chapitre 1 \u2013 Lexique)",
      descPlaceholder: "Description facultative",
      empty: "Aucune cat\u00e9gorie cr\u00e9\u00e9e. Commencez par en ajouter une.",
      defaultName: "Sans cat\u00e9gorie",
      deleteConfirm: "Supprimer cette cat\u00e9gorie ? Les questions associ\u00e9es seront d\u00e9plac\u00e9es vers \u00ab Sans cat\u00e9gorie \u00bb.",
      edit: "Modifier",
      delete: "Supprimer",
      save: "Enregistrer"
    },
    questions: {
      title: "Questions",
      add: "Ajouter une question",
      comingSoon: "Bient\u00f4t disponible",
      typeFieldsNotice: "Les champs sp\u00e9cifiques au type seront disponibles \u00e0 l\u2019\u00e9tape suivante.",
      typeLockedHint: "Le type ne peut pas \u00eatre modifi\u00e9 apr\u00e8s cr\u00e9ation.",
      selectCategory: "S\u00e9lectionnez une cat\u00e9gorie",
      feedbackPlaceholder: "Feedback affich\u00e9 apr\u00e8s la r\u00e9ponse",
      copyLabel: " (copie)",
      uncategorised: "Sans cat\u00e9gorie",
      type: "Type de question",
      category: "Cat\u00e9gorie",
      name: "Titre de la question (interne)",
      namePlaceholder: "Ex : Q1 \u2013 Compr\u00e9hension vocabulaire",
      questionText: "\u00c9nonc\u00e9 de la question",
      defaultMark: "Note par d\u00e9faut",
      generalFeedback: "Feedback g\u00e9n\u00e9ral (facultatif)",
      empty: "Aucune question ajout\u00e9e. Cliquez sur \u00ab Ajouter une question \u00bb pour commencer.",
      edit: "Modifier",
      delete: "Supprimer",
      duplicate: "Dupliquer",
      save: "Enregistrer la question",
      cancel: "Annuler",
      deleteConfirm: "Supprimer cette question d\u00e9finitivement ?",
      types: {
        multichoice: "Choix multiple (r\u00e9ponse unique)",
        multichoicemulti: "Choix multiple (r\u00e9ponses multiples)",
        truefalse: "Vrai / Faux",
        shortanswer: "R\u00e9ponse courte",
        essay: "R\u00e9daction libre (essai)",
        matching: "Correspondance",
        numerical: "Num\u00e9rique",
        calculated: "Calcul\u00e9",
        ddwtos: "Glisser-d\u00e9poser dans le texte",
        gapselect: "S\u00e9lectionner les mots manquants",
        ordering: "Mise en ordre",
        wordselect: "S\u00e9lection de mots"
      }
    },
    multichoice: {
      answers: "R\u00e9ponses",
      addAnswer: "Ajouter une r\u00e9ponse",
      answerText: "Texte de la r\u00e9ponse",
      grade: "Note (%)",
      feedback: "Feedback pour cette r\u00e9ponse (facultatif)",
      shuffle: "M\u00e9langer les r\u00e9ponses",
      single: "Une seule r\u00e9ponse correcte",
      correctHint: "Attribuez 100% \u00e0 la bonne r\u00e9ponse, 0% aux mauvaises."
    },
    truefalse: {
      correctAnswer: "R\u00e9ponse correcte",
      true: "Vrai",
      false: "Faux",
      feedbackTrue: "Feedback si l'\u00e9tudiant r\u00e9pond Vrai",
      feedbackFalse: "Feedback si l'\u00e9tudiant r\u00e9pond Faux"
    },
    shortanswer: {
      answers: "R\u00e9ponses accept\u00e9es",
      addAnswer: "Ajouter une r\u00e9ponse accept\u00e9e",
      answerText: "R\u00e9ponse accept\u00e9e",
      grade: "Note (%)",
      caseSensitive: "Sensible \u00e0 la casse",
      hint: "Vous pouvez utiliser * comme joker (ex : *bonjour*)"
    },
    essay: {
      responseFormat: "Format de r\u00e9ponse attendu",
      responseFormats: {
        editor: "\u00c9diteur de texte enrichi",
        editorfilepicker: "\u00c9diteur + fichiers joints",
        plain: "Texte brut",
        monospaced: "Police \u00e0 chasse fixe",
        noinline: "Aucun texte en ligne"
      },
      lines: "Nombre de lignes",
      attachments: "Pi\u00e8ces jointes autoris\u00e9es",
      graderInfo: "Instructions pour le correcteur (facultatif)"
    },
    matching: {
      pairs: "Paires \u00e0 associer",
      addPair: "Ajouter une paire",
      question: "Question / Terme",
      answer: "R\u00e9ponse / D\u00e9finition",
      shuffle: "M\u00e9langer les r\u00e9ponses"
    },
    numerical: {
      answer: "R\u00e9ponse num\u00e9rique correcte",
      tolerance: "Tol\u00e9rance (\u00b1)",
      unit: "Unit\u00e9 (facultatif)",
      addAnswer: "Ajouter une r\u00e9ponse alternative"
    },
    export: {
      title: "Exporter le fichier XML",
      description: "Votre fichier XML Moodle sera g\u00e9n\u00e9r\u00e9 et t\u00e9l\u00e9charg\u00e9 sur votre ordinateur. Vous pourrez ensuite l'importer directement dans Moodle.",
      filename: "Nom du fichier",
      download: "T\u00e9l\u00e9charger le fichier XML",
      noQuestions: "Ajoutez au moins une question avant d'exporter.",
      success: "Fichier g\u00e9n\u00e9r\u00e9 avec succ\u00e8s !",
      saveDialogHint: "Une fen\u00eatre va s'ouvrir pour choisir o\u00f9 enregistrer votre fichier."
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
      loading: "Chargement\u2026",
      error: "Une erreur est survenue.",
      confirmDelete: "\u00cates-vous s\u00fbr de vouloir supprimer cet \u00e9l\u00e9ment ?",
      language: "English"
    },
    footer: {
      privacy: "Aucune donn\u00e9e transmise \u2014 tout reste sur votre ordinateur",
      privacyLink: "En savoir plus",
      github: "Voir le projet sur GitHub",
      madeFor: "D\u00e9velopp\u00e9 pour l'Inalco"
    },
    validation: {
      categoryRequired: "Veuillez s\u00e9lectionner ou cr\u00e9er une cat\u00e9gorie.",
      questionTextRequired: "L'\u00e9nonc\u00e9 de la question est obligatoire.",
      questionNameRequired: "Le titre interne est obligatoire.",
      atLeastTwoAnswers: "Ajoutez au moins deux r\u00e9ponses.",
      oneCorrectAnswer: "Au moins une r\u00e9ponse doit avoir une note de 100%.",
      atLeastTwoPairs: "Ajoutez au moins deux paires.",
      numericalAnswerRequired: "La r\u00e9ponse num\u00e9rique est obligatoire."
    }
  },

  en: {
    app: {
      title: "Moodle Question Bank Builder",
      subtitle: "Create your Moodle XML file easily \u2014 no installation required"
    },
    nav: {
      categories: "Categories",
      questions: "Questions",
      preview: "Preview",
      export: "Export XML"
    },
    privacy: {
      badge: "\u{1f512} Your data stays on your computer",
      title: "Your data stays private",
      body: "Everything you type into this tool \u2014 your questions, answers, and categories \u2014 stays only on your computer, inside your browser. Nothing is sent to a server, stored online, or shared with anyone. This tool works entirely on your own machine, like software installed locally.",
      check1: "Your questions and answers never leave your computer",
      check2: "No account, no login, no server involved",
      check3: "The XML file is generated and saved directly on your machine",
      close: "Got it"
    },
    categories: {
      title: "Question Categories",
      deleteBlocked: "This category contains {count} question(s). Transfer them to another category before deleting.",
      noOtherCategories: "No other categories available",
      transferLabel: "Transfer questions to",
      transferConfirm: "Transfer and delete",
      selectTarget: "-- Select a category --",
      description: "Organise your questions into categories. Moodle will use these to sort your questions in the question bank.",
      add: "Add a category",
      namePlaceholder: "Category name (e.g. Chapter 1 \u2013 Vocabulary)",
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
      comingSoon: "Coming soon",
      typeFieldsNotice: "Type-specific fields will be available in the next development step.",
      typeLockedHint: "Type cannot be changed after creation.",
      selectCategory: "Select a category",
      feedbackPlaceholder: "Feedback shown after answering",
      copyLabel: " (copy)",
      uncategorised: "Uncategorised",
      type: "Question type",
      category: "Category",
      name: "Question title (internal)",
      namePlaceholder: "e.g. Q1 \u2013 Vocabulary comprehension",
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
      tolerance: "Tolerance (\u00b1)",
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
      loading: "Loading\u2026",
      error: "An error occurred.",
      confirmDelete: "Are you sure you want to delete this item?",
      language: "Fran\u00e7ais"
    },
    footer: {
      privacy: "No data transmitted \u2014 everything stays on your computer",
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

// \u2500\u2500\u2500 I18n engine \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500

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

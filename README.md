# Moodle XML Builder

A bilingual (FR/EN) web tool for teachers to create Moodle question bank XML files — directly in the browser, with no installation and no data transmission.

## ✨ Features

- **No installation** — runs entirely in the browser
- **No data transmitted** — questions and answers never leave your computer
- **Bilingual** — French and English interface
- **Rich text editor** — supports RTL scripts and non-latin characters (Arabic, Chinese, Japanese, Hebrew, etc.)
- **Category management** — organise questions into Moodle-compatible categories
- **Multiple question types** — see list below
- **Save dialog** — choose exactly where to save your XML file

## 📋 Supported Question Types

### Phase 1 (available now)
- Multiple choice (single answer)
- Multiple choice (multiple answers)
- True / False
- Short answer
- Essay

### Phase 2 (coming soon)
- Matching
- Numerical

### Phase 3 (planned)
- Calculated
- Drag and drop into text
- Select missing words (gapselect)
- Ordering
- Word select

## 🚀 Usage

1. Open the tool at [GitHub Pages URL]
2. Create one or more **categories** to organise your questions
3. Add your **questions** one by one, choosing the type and category
4. Go to **Export XML** and download your file
5. Import the `.xml` file into Moodle via *Question bank → Import*

## 🔒 Privacy

This tool is designed with privacy as a core principle:

- All processing happens **locally in your browser**
- No question content, answers, or personal data is ever sent to any server
- The only external requests are:
  - Loading the app from GitHub Pages
  - Loading the TinyMCE editor library from its CDN (editor code only — not your content)

## 🛠️ Project Structure

```
moodle-xml-builder/
├── index.html              Main HTML page
├── css/
│   ├── main.css            Design system, layout, header, footer
│   └── components.css      Buttons, forms, cards, modals
├── js/
│   ├── main.js             App entry point, navigation, bootstrapping
│   ├── i18n.js             Bilingual language system (FR/EN)
│   ├── questionForms.js    Dynamic form rendering per question type
│   ├── xmlGenerator.js     Converts question data to Moodle XML
│   └── fileHandler.js      File System Access API + fallback download
├── locales/
│   ├── fr.json             French UI strings
│   └── en.json             English UI strings
└── assets/
    └── icons/
```

## 🌐 Deployment (GitHub Pages)

1. Push this repository to GitHub
2. Go to *Settings → Pages*
3. Set source to `main` branch, root `/`
4. Your tool will be live at `https://<username>.github.io/<repo-name>/`

## 📄 Moodle XML Format

The exported file follows the [Moodle XML format](https://docs.moodle.org/en/Moodle_XML_format), compatible with Moodle 3.x and 4.x.

## 🤝 Contributing

Contributions welcome. Please open an issue before submitting a pull request.

## 📝 License

MIT

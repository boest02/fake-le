# React + TypeScript + SASS + Vite

This project is built using the technologies listed in the title

## Building

To this build this for local use

```
npm install
```

```
npm run dev
```

## File Structure

```
.
├── README.md - *this doc*
├── eslint.config.js - *eslint configuration*
├── index.html - *page html*
├── package-lock.json
├── package.json
├── src
│   ├── App.css - *application base css*
│   ├── App.tsx - *application base component*
│   ├── assets - *application images*
│   ├── components - *application components*
│   ├── index.css - *page css*
│   ├── main.tsx  - *application entry point*
│   ├── ts - *typescript helper scripts*
│   └── vite-env.d.ts - *vite environment settings*
├── tsconfig.app.json - *typescript compiler options*
├── tsconfig.json - *type script config*
└── vite.config.ts - *vite configuration*
```

## Todo's

- Display word to user at the end if wrong
- fill in the onscreen keyboard of used words
- add a way to play again
- add support for only valid words (possibly with this https://api.dictionaryapi.dev/api/v2/entries/en/<word>)




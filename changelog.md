# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

[unreleased]: https://github.com/danielwerg/r6data/compare/v1.0.0...HEAD

<!-- ➕ Added | ➡️ Changed | 🗑️ Deprecated | ➖ Removed | 🐛 Fixed | 🛡️ Security -->

## [unreleased]

### 🐛 Fixed

- Importing the package (CJS and ESM) crashed with `TypeError: _ is not a function` because of a circular import in `src/attachments`.

### ➡️ Changed

- Node.js `>=22.18.0` is now required for development (`engines`).
- Migrated to ESLint 10 flat config (`eslint.config.mjs`) with `typescript-eslint` 8 and `eslint-plugin-import-x`, replacing the unmaintained `@danielwerg/eslint-config`.
- Upgraded Prettier to v3 and inlined the config (`.prettierrc.json`), TypeScript to 6.0, cspell to 10, `vite-plugin-dts` to 5, cheerio to 1.2.
- Inlined the TypeScript config and switched to `moduleResolution: "Bundler"`.

### ➕ Added

- Smoke tests for the CJS and ESM builds (`npm test`).
- GitHub Actions CI workflow for Node 22 and 24.

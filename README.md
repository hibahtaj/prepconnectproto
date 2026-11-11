# PrepConnect — Senior Connect + GeeksforGeeks Practice + Resume Analyser

This update preserves the existing frontend prototype and adds two features:

1. **GeeksforGeeks practice links** on the Mock Tests page, opening official topic pages in a new tab. Questions are **not copied or scraped**, and GeeksforGeeks scores are not imported. The existing local scored MCQs remain available.
2. **Resume Analyser** on the sidebar and dashboard. Upload a text-based PDF, DOCX or TXT (up to 5 MB), select a target role, and receive a transparent heuristic score /100, matched keywords, detected sections and suggestions. PDF extraction uses pdfjs-dist; DOCX uses mammoth. Processing occurs in the browser. No resume upload, AI API, or database is required. Scanned/image-only PDFs are not supported.

## Run

Requires Node.js 18+ and npm. In this folder run:

```bash
npm install
npm run dev
```

Open the local URL shown by Vite (usually http://localhost:5173).

## Current limitations

- Resume scores are **rule-based checklist scores**, not verified ATS scores, job-application predictions, or AI evaluations. Keyword matching is approximate and depends on readable extracted text.
- No backend, PostgreSQL, authentication, email delivery or OpenAI API integration yet. Senior interview requests are temporary in-memory browser state.
- The GeeksforGeeks URLs are external reference links; their pages can change.

## Build

```bash
npm run build
```

## Validation update (October 2026)
- Onboarding requires college, valid alphabetic full name (2+ characters), valid email, branch and selected skills. This is **profile onboarding**, not authenticated login.
- Mock-test generation rejects blank/unsupported skills rather than silently falling back to unrelated questions. Unanswered questions receive zero credit.
- Resume analyser rejects unsupported file types and files over 5 MB; empty/unreadable content receives an error.
- Senior Connect requires a topic and a non-past date; identical pending requests in the current session are blocked. Requests are frontend-only and are **not emailed or saved to a database**.
- GeeksforGeeks links open in a new tab; in-app questions come from the local bank.

Run the lightweight automated validation checks with `node --test tests/validation.test.mjs` (Node.js 18+). These tests check validation helpers and code guards; they are **not a full browser/end-to-end test**. A full Vite build was not verified in this environment because npm dependency installation timed out.

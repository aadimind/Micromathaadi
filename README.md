# Micromathaadi

Editorial publishing platform using Next.js App Router, React, TypeScript, Prisma and PostgreSQL.

## Implemented in repository
- Editorial homepage, article listing/detail, topic browsing, search and about page.
- Admin login, bcrypt password verification and signed HTTP-only session cookie.
- Admin dashboard, article create/edit, draft/publish workflow and protected API.
- PostgreSQL models, validated inputs, slug generation and health endpoint.
- Responsive dark editorial UI.

## Local setup
Requires Node.js 20+, npm and PostgreSQL. Copy `.env.example` to `.env`; set DATABASE_URL, AUTH_SECRET (32+ random characters), ADMIN_EMAIL and ADMIN_PASSWORD (14+ characters). Then:
```bash
npm install
npx prisma generate
npx prisma migrate dev --name init
npm run db:admin
npm run dev
```
Open http://localhost:3000; admin login is /admin/login.

## Scripts
`npm run build`, `npm run typecheck`, `npm run lint`, `npm run db:migrate`, `npm run db:deploy`, `npm run db:admin`.

## Production checklist
Set secrets in hosting environment, configure PostgreSQL backups and monitoring, run `npm run db:deploy`, enforce HTTPS, configure edge rate limiting, and test restore/recovery before launch. No real credentials or production infrastructure are stored or provisioned here.

## Current limitations
The editor stores plain-text paragraphs with line breaks; rich-text/MDX authoring, media upload, revision history, preview scheduling, email, analytics and deployment configuration are not included. Public pages render article body as text (not executable HTML), which avoids raw-HTML injection but is intentionally a minimal publishing format. Changes in GitHub have not been built or runtime-tested in this environment.
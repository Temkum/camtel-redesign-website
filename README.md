# Camtel Customer Portal — Redesign

A modern redesign of the **Camtel (Cameroon Telecommunications)** customer-facing portal. Built with Next.js and TypeScript, it provides customers with a clean interface to manage their accounts, explore telecom products, monitor data usage, and access support.

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)](https://camtel-redesign-website.vercel.app)
[![Built with Next.js](https://img.shields.io/badge/Built%20with-Next.js-black?style=for-the-badge&logo=nextjs)](https://nextjs.org/)
[![Built with TypeScript](https://img.shields.io/badge/Built%20with-TypeScript-black?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Built with Tailwind CSS](https://img.shields.io/badge/Built%20with-Tailwind%20CSS-black?style=for-the-badge&logo=tailwindcss)](https://tailwindcss.com/)
[![Built with shadcn/ui](https://img.shields.io/badge/Built%20with-shadcn%2Fui-black?style=for-the-badge&logo=shadcn)](https://ui.shadcn.com/)
[![Built with Vercel](https://img.shields.io/badge/Built%20with-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com/)
[![Built with PostgreSQL](https://img.shields.io/badge/Built%20with-PostgreSQL-black?style=for-the-badge&logo=postgresql)](https://www.postgresql.org/)
[![Built with drizzle-kit](https://img.shields.io/badge/Built%20with-drizzle-kit-black?style=for-the-badge&logo=drizzle-kit)](https://drizzle-kit.com/)

**Live demo:** [camtel-redesign-website.vercel.app](https://camtel-redesign-website.vercel.app)

## Features

- **Landing page** — Hero section with key stats (500K+ active users, 99.9% uptime, 24/7 support) and featured product offers
- **Customer dashboard** — Quick actions for viewing bills, recharging, and monitoring data usage
- **Services / Products** — Browse Camtel offerings (e.g. X-tremNet 4G LTE dongles, internet plans)
- **Account management** — Self-service account portal for authenticated users
- **Support** — Dedicated support section with contact details
- **Authentication** — Login flow with protected dashboard routes
- **Internationalization-ready** — Language switcher in the nav (English / French)
- **Responsive UI** — Mobile-first layout built with Tailwind CSS and shadcn/ui components

---

## Tech Stack

| Layer           | Technology                                  |
| --------------- | ------------------------------------------- |
| Framework       | [Next.js](https://nextjs.org/) (App Router) |
| Language        | TypeScript                                  |
| Styling         | Tailwind CSS                                |
| Components      | [shadcn/ui](https://ui.shadcn.com/)         |
| Package manager | pnpm                                        |
| Deployment      | Vercel                                      |

- **Next.js** — Server-side rendering, static site generation, and API routes
- **TypeScript** — Strongly typed language for component logic and server-side code
- **Tailwind CSS** — Utility-first CSS framework for styling components
- **shadcn/ui** — React UI components with Tailwind CSS styles
- **Vercel** — Deployment platform for static sites and serverless functions
- **PostgreSQL** — Relational database for storing user data
- **drizzle-kit** — Database migration toolkit for PostgreSQL
- **drizzle-orm** — TypeScript ORM for PostgreSQL
- **zod** — TypeScript schema validation library
- **react-hook-form** — Form handling library
- **react-day-picker** — Date picker library
- **jsonwebtoken** — JSON Web Token implementation
- **uuid** — Generate UUIDs
- **vaul** — Securely store environment variables
- **embla-carousel-react** — React carousel component
- **resend** — Email verification library
- **sonner** — Client-side notification library
- **lucide-react** — React components for Lucide Icons
- **class-variance-authority** — TypeScript utility for working with covariant and contravariant types
- **bcryptjs** — Password hashing library
- **better-auth** — Authentication library
- **date-fns** — Date manipulation library
- **postgres** — PostgreSQL client library
- **cookies** — Cookie management library
- **uuid** — Generate UUIDs
- **clsx** — Classname utility
- **react-resizable-panels** — Resizable split panes library
- **recharts** — React charting library
- **dotenv** — Environment variable management library
- **cmdk** — Command-line toolkit

---

## Project Structure

```
├── app/                  # Next.js App Router — pages and layouts
│   ├── dashboard/        # Protected dashboard routes (services, account, support)
│   └── login/            # Auth pages
├── components/           # Reusable UI components
├── lib/                  # Utility functions and shared logic
├── public/               # Static assets (images, icons)
├── styles/               # Global styles
├── components.json       # shadcn/ui component config
└── next.config.mjs       # Next.js configuration
```

---

## Getting Started

**Prerequisites:** Node.js 18+, pnpm

```bash
# Clone the repo
git clone https://github.com/Temkum/camtel-redesign-website.git
cd camtel-redesign-website

# Install dependencies
pnpm install

# Start dev server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

---

## Deployment

The project is continuously deployed on Vercel. Any push to `main` triggers a new production deployment.

To deploy your own instance:

```bash
pnpm build   # Verify the production build locally
```

Then connect the repo to [Vercel](https://vercel.com) and it will auto-detect the Next.js configuration.

---

## About Camtel

Camtel (Cameroon Telecommunications) is Cameroon's leading state-owned telecommunications provider, headquartered in Yaoundé. This project is an unofficial UI redesign and is not affiliated with or endorsed by Camtel.

**Camtel contact info (reflected in app):**

- Address: B.P. Box 1571, Yaoundé, Cameroon
- Phone: +237 222 23 40 65
- Website: [www.camtel.cm](https://www.camtel.cm)

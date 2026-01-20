# Freelancer Client UI

A modern NextJS application for managing freelance projects, clients, and invoices.

## Tech Stack

- **Next.js 15** - React framework with App Router and Turbopack
- **React 19** - Latest React with improved performance
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - Re-usable components built with Radix UI
- **Lucide React** - Modern icon library
- **Prettier** - Code formatting

## Project Structure

```
freelancer-client-ui/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── layout.tsx          # Root layout
│   │   ├── page.tsx            # Home page
│   │   ├── error.tsx           # Error boundary
│   │   ├── loading.tsx         # Loading UI
│   │   ├── not-found.tsx       # 404 page
│   │   └── globals.css         # Global styles
│   ├── components/             # React components
│   │   ├── ui/                 # Reusable UI components
│   │   │   ├── Button.tsx
│   │   │   └── Card.tsx
│   │   └── layout/             # Layout components
│   │       ├── Header.tsx
│   │       └── Footer.tsx
│   └── lib/                    # Utility functions
│       ├── utils.ts            # Helper utilities
│       └── api.ts              # API client
├── public/                     # Static assets
├── docker/                     # Docker configuration
└── workflows/                  # CI/CD workflows
```

## Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn/pnpm
- Or Docker (see Docker section below)

### Installation

1. **Install dependencies:**

```bash
npm install
# or
yarn install
# or
pnpm install
```

2. **Set up environment variables:**

```bash
cp .env.local.example .env.local
```

Edit `.env.local` and configure your environment variables.

3. **Run the development server:**

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. **Open your browser:**

Navigate to [http://localhost:4200](http://localhost:4200)

## Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking
- `npm run format` - Format code with Prettier

## Adding Components

This project uses [shadcn/ui](https://ui.shadcn.com/) for components. To add new components:

```bash
npx shadcn@latest add button
npx shadcn@latest add card
npx shadcn@latest add dialog
```

Components will be added to `src/components/ui/` and can be customized as needed.

## Docker Setup

The project includes Docker configuration for containerized development and production.

### Development with Docker

```bash
make docker-build
make docker-up
```

### Production with Docker

```bash
make docker-build-prod
make docker-start-prod
```

### Other Docker Commands

- `make docker-stop` - Stop containers
- `make docker-logs` - View container logs
- `make bash` - Connect to app container
- `make docker-down` - Stop and remove containers

## Environment Variables

Create a `.env.local` file based on `.env.local.example`:

- `NEXT_PUBLIC_API_URL` - Backend API URL (default: http://localhost:3000)

## Development

### Adding New Pages

Create new pages in the `src/app` directory following Next.js App Router conventions.

### Creating Components

Add reusable components in `src/components/ui` and layout components in `src/components/layout`.

### API Integration

Use the API client in `src/lib/api.ts` for making backend requests:

```typescript
import { api } from '@/lib/api';

const data = await api.get('/endpoint');
```

## Building for Production

```bash
npm run build
npm start
```

The application will be optimized and ready for production deployment.

## License

See LICENSE file for details.

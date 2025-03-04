# Boilerplate v15

This is a boilerplate project using Next.js v15 as the core framework. It
includes several essential packages to help you get started with your project
quickly and efficiently.

## Features

- **Next.js v15**: The React framework for production.
- **Mantine**: A fully featured React components library.
- **React Query**: Data fetching and state management for React.
- **React Table**: A lightweight and flexible table library for React.
- **Zod**: TypeScript-first schema declaration and validation library.

## Getting Started

### Prerequisites

- Node.js (v18.18 or later)
- npm or pnpm

### Installation

1. Clone the repository:

```bash
git clone https://github.com/developergamatecha/frontend-boilerplate.git
```

2. Navigate to the project directory:

```bash
cd frontend-boilerplate
```

3. Install the dependencies:

```bash
npm install
# or
pnpm install
```

4. Copy `.env.development.example` to `.env.development`

### Running the Development Server

```bash
npm run dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the
result.

## Project Structure (inside src/)

- `app/`: Contains the application's pages.
- `components/`: Contains reusable React components.
- `configs/`: Contains custom configs.
- `styles/`: Contains global styles and CSS modules.
- `types/`: Contains type declarations.
- `utils/`: Contains utility functions and helpers.

## Learn More

To learn more about the technologies used in this project, check out the
following resources:

- [Next.js Documentation](https://nextjs.org/docs)
- [Mantine Documentation](https://mantine.dev/getting-started/)
- [React Query Documentation](https://tanstack.com/query/latest/docs/framework/react/overview)
- [React Table Documentation](https://tanstack.com/table/latest/docs/overview)
- [Zod Documentation](https://zod.dev/)

## Storybook

This project includes Storybook for developing and testing UI components in
isolation.

### Start Storybook

1. Make sure you have installed dependencies:

```bash
npm install
# or
pnpm install
```

2. Start Storybook:

```bash
npm run storybook
# or
pnpm storybook
```

Open [http://localhost:6006](http://localhost:6006) with your browser to view
the Storybook interface.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any
changes.

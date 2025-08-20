# Alpha Class - React + TypeScript + Vite

A modern React application built with TypeScript, Vite, React Router, and React Hook Form.

## Features

- ⚡ **Vite** - Fast development server and build tool
- ⚛️ **React 19** - Latest React with modern features
- 🔷 **TypeScript** - Type-safe development
- 🛣️ **React Router** - Client-side routing
- 📝 **React Hook Form** - Efficient form handling
- 🎨 **Modern CSS** - Responsive design and styling
- 🧹 **ESLint** - Code linting and formatting

## Getting Started

### Prerequisites

Make sure you have the following installed on your machine:

- **Node.js** (version 18 or higher)
- **PNPM** (recommended) or npm

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd alpha-class
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```
   
   Or if you're using npm:
   ```bash
   npm install
   ```

### Development

3. **Start the development server**
   ```bash
   pnpm dev
   ```
   
   Or with npm:
   ```bash
   npm run dev
   ```

4. **Open your browser**
   
   The application will be available at `http://localhost:5173` or `http://localhost:5174`

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Forms/          # Form components
│   ├── Footer.tsx      # Footer component
│   ├── Hero.tsx        # Hero section
│   └── Navbar.tsx      # Navigation bar
├── pages/              # Page components
│   └── Auth/           # Authentication pages
├── App.tsx             # Main app component
└── main.tsx            # Application entry point
```

## Tech Stack

This project is built with modern web technologies:

- **[React 19](https://react.dev/)** - Latest React with modern features
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe JavaScript
- **[Vite](https://vitejs.dev/)** - Fast build tool and dev server
- **[React Router DOM](https://reactrouter.com/)** - Client-side routing
- **[React Hook Form](https://react-hook-form.com/)** - Efficient form handling
- **[ESLint](https://eslint.org/)** - Code linting and formatting

## Development Notes

### Available Vite Plugins

Two official Vite React plugins are available:
- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

### Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      ...tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      ...tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      ...tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

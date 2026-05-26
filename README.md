# React + TypeScript + Vite - Plantilla de Proyecto

Esta plantilla proporciona un setup mínimo para trabajar con React, TypeScript y Vite, incluyendo Hot Module Replacement (HMR) y reglas de ESLint configuradas.

## 📋 Tabla de Contenidos

- [📋 Tabla de Contenidos](#📋-tabla-de-contenidos)
- [🚀 Características Principales](#-características-principales)
- [📦 Requisitos Previos](#-requisitos-previos)
- [🔧 Instalación](#-instalación)
- [📁 Estructura del Proyecto](#-estructura-del-proyecto)
- [🧱 Tecnologías Utilizadas](#-tecnologías-utilizadas)
- [⚙️ Configuración](#️-configuración)
  - [TypeScript (tsconfig)](#typescript-tsconfig)
  - [Vite (vite.config)](#vite-viteconfig)
  - [ESLint (eslint.config)](#eslint-eslintconfig)
- [🔌 Plugins y Herramientas](#-plugins-y-herramientas)
  - [Plugins de Vite](#plugins-de-vite)
  - [Plugins de ESLint](#plugins-de-eslint)
- [🧪 Comandos de Desarrollo](#-comandos-de-desarrollo)
- [⚡ React Compiler (Opcional)](#-react-compiler-opcional)
- [🧹 Expansión de ESLint (Recomendado)](#-expansión-de-eslint-recomendado)
- [📦 Scripts de Build](#-scripts-de-build)
- [🤝 Contribución](#-contribución)
- [📄 Licencia](#-licencia)

## 🚀 Características Principales

- **React 18+** con sintaxis moderna
- **TypeScript** para tipado fuerte y mejor mantenibilidad
- **Vite** como build tool para desarrollo rápido
- **Hot Module Replacement (HMR)** para recarga en caliente
- **ESLint** configurado con reglas básicas
- **Prettier** para formateo consistente
- **Git Hooks** configurados (pre-commit, commit-msg)

## 📦 Requisitos Previos

Asegúrate de tener instalado:

- **Node.js** (v18.0.0 o superior recomendado)
- **npm** o **yarn** (gestor de paquetes)
- **Git** para control de versiones

## 🔧 Instalación

1. **Clona el repositorio:**
   ```bash
   git clone <repositorio-url>
   cd frontend
   ```

2. **Instala las dependencias:**
   ```bash
   # Usando npm
   npm install

   # O usando yarn
   yarn install
   ```

3. **Configura el entorno (opcional):**
   Copia el archivo `.env.example` a `.env` y ajusta las variables si es necesario.

## 📁 Estructura del Proyecto

```
frontend/
├── src/                    # Código fuente de la aplicación
│   ├── app/               # Componentes principales de la aplicación
│   ├── components/        # Componentes reutilizables
│   ├── pages/             # Páginas o vistas
│   ├── hooks/             # Hooks personalizados
│   ├── utils/             # Funciones utilitarias
│   ├── styles/            # Archivos de estilos (CSS/SCSS)
│   └── index.tsx          # Punto de entrada principal
├── public/                # Recursos estáticos (favicon, manifest)
├── vite.config.ts         # Configuración de Vite
├── tsconfig.json          # Configuración de TypeScript
├── tsconfig.node.json     # Configuración para Node.js
├── eslint.config.js       # Configuración de ESLint
├── .eslintrc.js           # Configuración de ESLint (opcional)
├── .prettierrc            # Configuración de Prettier
├── .gitignore             # Archivos ignorados por Git
├── package.json           # Metadatos del proyecto y dependencias
└── README.md              # Documentación del proyecto
```

## 🧱 Tecnologías Utilizadas

- **React**: Biblioteca para construir interfaces de usuario
- **TypeScript**: Superset de JavaScript con tipado estático
- **Vite**: Build tool moderno para desarrollo frontend
- **ESLint**: Linter para detectar problemas y mantener calidad
- **Prettier**: Formateador de código automático
- **Git Hooks**: Automatización de tareas antes de commits

## ⚙️ Configuración

### TypeScript (tsconfig)

El archivo `tsconfig.json` define las opciones de compilación de TypeScript:

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "strict": true,
    "noFallthroughCasesInSwitch": true,
    "noUncheckedIndexedAccess": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true,
    "strictBindCallApply": true,
    "strictPropertyInitialization": true,
    "noImplicitThis": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "noFallthroughPropertiesInSwitch": true,
    "noImplicitOverride": true,
    "exactOptionalPropertyTypes": true
  },
  "include": ["src"]
}
```

### Vite (vite.config)

`vite.config.ts` configura el servidor de desarrollo y el build:

```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: true,
    cors: true
  },
  build: {
    outDir: 'dist',
    minify: 'esbuild'
  },
  clearModuleCache: true
})
```

### ESLint (eslint.config)

`eslint.config.js` define las reglas de linting:

```javascript
import { defineConfig } from 'tseslint'
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Configuración base
      tseslint.configs.recommendedTypeChecked,
      // Otras configuraciones...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
])
```

## 🔌 Plugins y Herramientas

### Plugins de Vite

- **@vitejs/plugin-react**: Integra React con Vite, usando Oxc como compilador
- **@vitejs/plugin-react-swc**: Alternativa que usa SWC para mejor rendimiento

### Plugins de ESLint

- **eslint-plugin-react-x**: Reglas específicas para React
- **eslint-plugin-react-dom**: Reglas para React DOM
- **tseslint**: Configuración base para TypeScript

## 🧪 Comandos de Desarrollo

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "lint": "eslint . --ext .ts,.tsx --fix",
    "format": "prettier --write ."
  }
}
```

### Uso:

- `npm run dev`: Inicia el servidor de desarrollo en `http://localhost:3000`
- `npm run build`: Construye la aplicación para producción
- `npm run preview`: Previsualiza la build de producción
- `npm run lint`: Ejecuta ESLint en todos los archivos
- `npm run format`: Formatea el código con Prettier

## ⚡ React Compiler (Opcional)

El React Compiler mejora el rendimiento pero puede afectar el tiempo de desarrollo. Para habilitarlo:

1. Instala el compilador:
   ```bash
   npx create-react-app@latest --template compiler
   ```

2. Actualiza `vite.config.ts`:
   ```typescript
   import react from '@vitejs/plugin-react'
   // Asegúrate de tener la última versión
   ```

## 🧹 Expansión de ESLint (Recomendado)

Para producción, recomendamos usar reglas type-aware:

```javascript
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      tseslint.configs.recommendedTypeChecked, // Reemplaza la configuración base
      // tseslint.configs.strictTypeChecked,    // Más estricto
      // tseslint.configs.stylisticTypeChecked, // Reglas de estilo
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
])
```

## 📦 Scripts de Build

- **Producción**: `npm run build` → Genera archivos en `dist/`
- **Modo producción**: `npm run preview` → Sirve los archivos estáticos
- **Análisis de bundle**: `npm run build -- --report` → Genera reporte de bundle

## 🤝 Contribución

¡Toda contribución es bienvenida! Sigue estos pasos:

1. Forkea el repositorio
2. Crea una rama para tu feature (`git checkout -b feature/ AmazingFeature`)
3. Realiza commits de tus cambios (`git commit -m "Add AmazingFeature"`)
4. Sube tus cambios (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para detalles.
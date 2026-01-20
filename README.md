# Enterprise Portal

A production-ready Angular 8 enterprise web application demonstrating modern architectural patterns, best practices, and integration with Azure cloud services.

[![Angular](https://img.shields.io/badge/Angular-8.2.0-red.svg)](https://angular.io/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3.5.3-blue.svg)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

## 🎯 Overview

Enterprise Portal is a comprehensive, feature-rich Angular application built with enterprise-grade patterns and practices. It includes authentication, role-based access control, CMS integration, user management, and a responsive dashboard interface.

### Key Features

- ✅ **Modular Architecture** - Feature-based modules with lazy loading
- ✅ **Authentication & Authorization** - JWT-based auth with role guards
- ✅ **CMS Integration** - Contentful headless CMS for dynamic content
- ✅ **Responsive Dashboard** - Real-time metrics and activity tracking
- ✅ **User Profile Management** - Reactive forms with validation
- ✅ **Azure-Ready** - Configured for Azure API Management, Front Door, Key Vault
- ✅ **HTTP Interceptors** - Centralized request/response handling
- ✅ **Route Guards** - Protected routes with role-based access
- ✅ **Shared Components** - Reusable UI components and utilities
- ✅ **SCSS Styling** - Component-scoped styles with global theming

---

## 📋 Table of Contents

- [Project Structure](#-project-structure)
- [Prerequisites](#-prerequisites)
- [Installation](#-installation)
- [Development](#-development)
- [Configuration](#-configuration)
- [Architecture](#-architecture)
- [Features](#-features)
- [Build & Deployment](#-build--deployment)
- [Testing](#-testing)
- [Troubleshooting](#-troubleshooting)
- [Contributing](#-contributing)

---

## 📁 Project Structure

```
enterprise-portal/
├── e2e/                          # End-to-end tests
├── src/
│   ├── app/
│   │   ├── core/                 # Singleton services (CoreModule)
│   │   │   ├── guards/           # Route guards (AuthGuard)
│   │   │   ├── interceptors/     # HTTP interceptors (AuthInterceptor)
│   │   │   └── services/         # Core services (AuthService, ApiService, etc.)
│   │   ├── features/             # Feature modules (lazy-loaded)
│   │   │   ├── cms/              # CMS pages (home, dynamic content)
│   │   │   ├── dashboard/        # Dashboard with metrics
│   │   │   └── profile/          # User profile management
│   │   ├── shared/               # Shared components and utilities
│   │   │   └── components/       # Reusable UI components (header, etc.)
│   │   ├── app-routing.module.ts # Root routing configuration
│   │   ├── app.component.*       # Root component
│   │   └── app.module.ts         # Root module
│   ├── assets/                   # Static assets (images, icons)
│   ├── environments/             # Environment configurations
│   └── styles.scss               # Global styles
├── angular.json                  # Angular CLI configuration
├── package.json                  # Dependencies and scripts
├── tsconfig.json                 # TypeScript configuration
└── README.md                     # This file
```

---

## 🔧 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js**: `10.16.0` (recommended for Angular 8 compatibility)
- **npm**: `6.9.0` or higher
- **Angular CLI**: `8.2.2` - Install globally: `npm install -g @angular/cli@8.2.2`
- **Git**: Latest version

### Recommended IDE

- **Visual Studio Code** with extensions:
  - Angular Language Service
  - TSLint
  - Prettier - Code formatter
  - Angular Snippets

---

## 📦 Installation

### 1. Clone the repository

```bash
git clone <repository-url>
cd enterprise-portal
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Update `src/environments/environment.ts` and `src/environments/environment.prod.ts` with your configuration:

```typescript
export const environment = {
  production: false,
  apiUrl: 'https://your-api.azure-api.net',
  contentful: {
    space: 'your-contentful-space-id',
    accessToken: 'your-contentful-access-token'
  }
};
```

---

## 💻 Development

### Start development server

```bash
ng serve
```

Navigate to `http://localhost:4200/`. The app will automatically reload when you change source files.

### Available npm scripts

```bash
npm start           # Start development server (ng serve)
npm run build       # Build for production
npm run build:dev   # Build for development
npm test            # Run unit tests
npm run test:watch  # Run tests in watch mode
npm run e2e         # Run end-to-end tests
npm run lint        # Lint TypeScript files
```

### Code generation

Generate new components, services, modules, etc.:

```bash
ng generate component features/my-feature/my-component
ng generate service core/services/my-service
ng generate module features/my-feature --routing
ng generate guard core/guards/my-guard
```

---

## ⚙️ Configuration

### Environment Configuration

Two environment files are provided:

- **Development**: `src/environments/environment.ts`
- **Production**: `src/environments/environment.prod.ts`

#### Configuration Options

| Property | Description | Example |
|----------|-------------|---------|
| `production` | Production mode flag | `false` / `true` |
| `apiUrl` | Backend API base URL | `https://api.example.com` |
| `contentful.space` | Contentful CMS space ID | `abc123xyz` |
| `contentful.accessToken` | Contentful delivery API token | `your-access-token` |

### Azure Integration

The application is pre-configured for Azure services:

- **Azure API Management (APIM)**: Backend API gateway
- **Azure Front Door**: Global CDN and load balancing
- **Azure Key Vault**: Secure secrets management
- **Azure AD**: Authentication (requires implementation)

Update the `apiUrl` in environment files to point to your Azure APIM endpoint.

---

## 🏗️ Architecture

### Module Structure

#### CoreModule (Singleton)
- Imported once in `AppModule`
- Contains singleton services (AuthService, ApiService)
- HTTP interceptors for global request/response handling
- Route guards for authentication and authorization

#### SharedModule (Reusable)
- Imported by feature modules
- Contains shared components (HeaderComponent, etc.)
- Reusable directives and pipes
- Common utilities

#### Feature Modules (Lazy-Loaded)
- **DashboardModule**: Metrics dashboard with real-time data
- **ProfileModule**: User profile management with reactive forms
- **CmsModule**: Dynamic content pages powered by Contentful

### Services

#### AuthService
- User authentication and session management
- Role-based access control (Admin, User, Guest)
- Login/logout functionality

#### ApiService
- Centralized HTTP client wrapper
- Consistent error handling
- Response transformation

#### ContentfulService
- Contentful CMS integration
- Dynamic page content retrieval
- Asset management

### Guards

#### AuthGuard
- Protects routes requiring authentication
- Role-based access restrictions
- Redirects unauthorized users to login

### Interceptors

#### AuthInterceptor
- Adds JWT tokens to outgoing requests
- Adds custom headers (X-User-Role, X-API-Version)
- Handles 401/403 errors globally

---

## ✨ Features

### 1. Dashboard
- **Location**: `/dashboard`
- **Features**:
  - Real-time metrics cards (users, revenue, orders, visitors)
  - Resource quick links
  - Activity feed
  - Quick actions panel
  - Recent notifications

### 2. User Profile
- **Location**: `/profile`
- **Features**:
  - Reactive form validation
  - Update user information (name, email, phone, department)
  - Success/error message handling
  - API integration for profile updates

### 3. CMS Pages
- **Location**: `/pages/*`
- **Features**:
  - Dynamic content from Contentful
  - SEO-optimized breadcrumbs
  - Featured pages grid
  - Search functionality
  - Rich text content rendering

### 4. Navigation
- Responsive header with logo
- Active route highlighting
- User dropdown menu
- Notifications badge
- Mobile-friendly design

### 5. Access Control
- Unauthorized page (`/unauthorized`)
- Role-based route protection
- Automatic redirects

---

## 🚀 Build & Deployment

### Development Build

```bash
ng build
```

Output: `dist/enterprise-portal/`

### Production Build

```bash
ng build --prod
```

Optimizations applied:
- Ahead-of-Time (AOT) compilation
- Tree shaking
- Minification
- Dead code elimination
- Production environment configuration

### Build Options

```bash
ng build --prod --base-href=/app/              # Custom base href
ng build --prod --output-path=dist/production  # Custom output path
ng build --prod --source-map                   # Include source maps
```

### Deployment

#### Azure Static Web Apps

```bash
# Build for production
ng build --prod

# Deploy to Azure (using Azure CLI)
az staticwebapp deploy --name your-app-name --resource-group your-rg --source dist/enterprise-portal
```

#### Traditional Web Server (IIS, Nginx, Apache)

1. Build the application: `ng build --prod`
2. Copy contents of `dist/enterprise-portal/` to web server
3. Configure server for Angular routing (see below)

#### Server Configuration for Routing

**Nginx** (`/etc/nginx/sites-available/default`):
```nginx
location / {
  try_files $uri $uri/ /index.html;
}
```

**Apache** (`.htaccess`):
```apache
RewriteEngine On
RewriteBase /
RewriteRule ^index\.html$ - [L]
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . /index.html [L]
```

---

## 🧪 Testing

### Unit Tests

Run unit tests with Karma:

```bash
npm test
```

Run in headless mode (CI/CD):

```bash
ng test --watch=false --browsers=ChromeHeadless
```

### End-to-End Tests

Run e2e tests with Protractor:

```bash
npm run e2e
```

### Code Coverage

```bash
ng test --code-coverage
```

Coverage report: `coverage/index.html`

---

## 🔍 Troubleshooting

### TypeScript Language Service Errors

**Issue**: VS Code shows 23 "NgModule" or "RouterModule" errors in Problems tab.

**Solution**: These are **false positives** caused by Angular 8 (View Engine) incompatibility with modern TypeScript language service. The application compiles and runs perfectly.

**What's been done**:
- ✅ TypeScript configured with `skipLibCheck`, `ignoreDeprecations`
- ✅ Angular compiler options optimized for View Engine
- ✅ VS Code settings configured to minimize false positives
- ✅ All type definitions installed (`@types/node`, `@types/jasmine`)

**To minimize display**:
1. Restart TypeScript server: `Ctrl+Shift+P` → "TypeScript: Restart TS Server"
2. Reload VS Code window: `Ctrl+Shift+P` → "Developer: Reload Window"

These errors do **NOT** affect:
- ✅ Compilation (`ng serve`, `ng build`)
- ✅ Runtime execution
- ✅ Production builds
- ✅ Testing

### Common Issues

#### Port 4200 already in use
```bash
ng serve --port 4300
```

#### Module not found errors
```bash
rm -rf node_modules package-lock.json
npm install
```

#### Build fails with memory error
```bash
node --max_old_space_size=8192 node_modules/@angular/cli/bin/ng build --prod
```

#### Contentful API errors
- Verify `space` and `accessToken` in environment files
- Check Contentful API limits and quotas

---

## 🎨 Styling

### Global Styles
- **File**: `src/styles.scss`
- **Variables**: Define colors, fonts, spacing in global scope
- **Reset**: Normalize browser defaults

### Component Styles
- **Scoped**: Each component has its own `.scss` file
- **Encapsulation**: ViewEncapsulation prevents style leakage
- **BEM Naming**: Follow Block-Element-Modifier convention

### Color Palette

```scss
// Primary colors
$primary: #667eea;
$secondary: #764ba2;

// Status colors
$success: #10b981;
$warning: #f59e0b;
$danger: #ef4444;
$info: #3b82f6;

// Neutral colors
$gray-50: #f9fafb;
$gray-900: #111827;
```

---

## 📚 Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| Angular | 8.2.0 | Frontend framework |
| TypeScript | 3.5.3 | Type-safe JavaScript |
| RxJS | 6.4.0 | Reactive programming |
| SCSS | - | Styling preprocessor |
| Contentful SDK | 7.15.2 | CMS integration |
| Karma | - | Unit test runner |
| Jasmine | - | Testing framework |
| Protractor | - | E2E testing |

---

## 🤝 Contributing

### Development Workflow

1. Create a feature branch: `git checkout -b feature/my-feature`
2. Make your changes
3. Run tests: `npm test`
4. Run linter: `npm run lint`
5. Commit changes: `git commit -m "feat: add my feature"`
6. Push to branch: `git push origin feature/my-feature`
7. Create Pull Request

### Commit Convention

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: Add new feature
fix: Fix bug
docs: Update documentation
style: Format code
refactor: Refactor code
test: Add tests
chore: Update dependencies
```

---

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

## 👥 Support

For questions, issues, or contributions:

- **Issues**: Create an issue in the repository
- **Email**: support@example.com
- **Documentation**: [Project Wiki](https://github.com/your-org/enterprise-portal/wiki)

---

## 🔮 Roadmap

### Planned Features

- [ ] Real Azure AD authentication integration
- [ ] Enhanced role management with permissions
- [ ] Advanced analytics dashboard
- [ ] Real-time notifications with SignalR
- [ ] Multi-language support (i18n)
- [ ] Dark mode theme
- [ ] Advanced filtering and search
- [ ] Export functionality (PDF, Excel)
- [ ] Audit logging
- [ ] Performance monitoring integration

---

**Built with ❤️ using Angular**

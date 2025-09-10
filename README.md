# 🚀 ProjectFlow - Modern Project Management SaaS

A beautiful, production-ready project management application built with React, TypeScript, and modern web technologies.

## ✨ Features

### 🔐 Authentication & Security
- Login/Register with form validation
- Protected routes with role-based access
- Mock JWT authentication (easily replaceable)
- Password strength validation

### 📊 Dashboard & Analytics  
- Beautiful KPI cards (Active Projects, Tasks, Team Utilization)
- Interactive charts (Line, Pie, Bar charts with Recharts)
- Recent activity feed
- Project progress tracking

### 📁 Project Management
- Full CRUD operations for projects
- Grid and list view modes
- Advanced filtering and search
- Project detail pages with tabbed interface
- Progress tracking and team assignment

### 📋 Kanban Board
- Drag-and-drop task management with @dnd-kit
- Four-column workflow (To Do, In Progress, Review, Done)
- Real-time task updates
- Priority and assignee management

### 👥 Team Collaboration
- User management with roles (Admin, Manager, Member)
- Team assignment to projects
- Avatar display and user profiles

## 🛠 Tech Stack

### Frontend Framework
- **React 18** - Modern React with hooks
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and dev server

### State Management
- **Redux Toolkit** - Predictable state container
- **React Query** - Server state management
- **Axios** - HTTP client with interceptors

### UI & Styling
- **Tailwind CSS** - Utility-first CSS framework
- **Shadcn/ui** - Beautiful component library
- **Framer Motion** - Smooth animations
- **Lucide React** - Beautiful icon set

### Forms & Validation
- **React Hook Form** - Performant forms
- **Yup** - Schema validation
- **React Hot Toast** - Toast notifications

### Charts & Visualization
- **Recharts** - Composable charting library

### Drag & Drop
- **@dnd-kit** - Modern drag and drop

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🔧 Environment Setup

Create a `.env` file:

```env
# API Configuration
VITE_API_BASE_URL=http://localhost:3001/api
VITE_MOCK_MODE=true
```

## 📡 API Integration

### Mock Mode (Default)
The app runs with mock data by default. All API calls are simulated with realistic delays.

### Real Backend Integration
To connect a real backend:

1. Set `VITE_MOCK_MODE=false` in your `.env` 
2. Update `VITE_API_BASE_URL` to your API endpoint
3. Replace mock functions in `/src/store/slices/` with real API calls

### API Contract

All endpoints and data shapes are documented in `/src/types/index.ts`. Key endpoints:

```typescript
// Authentication
POST /api/auth/login
POST /api/auth/register
GET /api/auth/me

// Projects
GET /api/projects
GET /api/projects/:id
POST /api/projects
PUT /api/projects/:id
DELETE /api/projects/:id

// Tasks
GET /api/projects/:projectId/tasks
POST /api/projects/:projectId/tasks
PUT /api/tasks/:taskId
DELETE /api/tasks/:taskId
```

## 🎨 Design System

### Colors
- **Primary**: Indigo (#6366F1) - Modern and professional
- **Success**: Emerald (#10B981) - For completed states
- **Warning**: Amber (#F59E0B) - For attention items
- **Destructive**: Red (#EF4444) - For errors and urgent items

### Typography
- Clean sans-serif font stack
- Proper heading hierarchy
- Consistent spacing and sizing

### Components
- Custom variants for all UI components
- Responsive design (mobile, tablet, desktop)
- Dark mode support (via CSS variables)

## 📱 Responsive Design

- **Mobile First**: Optimized for mobile devices
- **Collapsible Sidebar**: Auto-collapse on smaller screens  
- **Touch Friendly**: Proper touch targets and gestures
- **Responsive Charts**: Charts adapt to screen size

## 🔒 Security Features

- **XSS Protection**: Proper input sanitization
- **CSRF Protection**: Token-based authentication
- **Role-Based Access**: Admin, Manager, Member roles
- **Secure Storage**: JWT tokens in localStorage (configurable)

## 🧪 Testing

Testing setup ready with:
- **Vitest** - Fast unit test runner
- **React Testing Library** - Component testing utilities

```bash
npm run test
```

## 🚀 Deployment

### Build
```bash
npm run build
```

### Deploy to Vercel/Netlify
The `dist/` folder contains production-ready static files.

## 📂 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── auth/           # Authentication components
│   ├── board/          # Kanban board components  
│   ├── layouts/        # Page layouts
│   ├── navigation/     # Navigation components
│   └── ui/             # Shadcn UI components
├── data/               # Mock data files
├── hooks/              # Custom React hooks
├── pages/              # Page components
├── store/              # Redux store & slices
├── types/              # TypeScript type definitions
└── api/                # API client configuration
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

---

**Built with ❤️ using modern web technologies**

Demo Credentials:
- Email: Any valid email
- Password: Any password (min 6 characters)
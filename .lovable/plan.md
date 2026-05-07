
# Import EngineerUp App into Lovable

## What this does

Brings your existing EngineerUp application — with all its pages, components, animations, theme switching, favorites, streak tracking, and responsive navigation — into the Lovable environment so it runs as a live preview. No redesign, no feature changes.

## Key adaptation

Your app uses React Router with a traditional SPA structure. Lovable uses TanStack Start with file-based routing. The plan adapts the routing layer while keeping every component, page, animation, and style identical.

## Steps

### 1. Install dependencies

Add the packages your app needs that aren't in the current Lovable project:
- `motion` (Framer Motion animations)
- `canvas-confetti` (challenge page confetti)
- `react-responsive-masonry` (masonry layouts)
- `react-slick` (carousels)
- `@mui/material`, `@mui/icons-material`, `@emotion/react`, `@emotion/styled` (MUI components)
- `react-dnd`, `react-dnd-html5-backend` (drag and drop)
- `react-popper`, `@popperjs/core` (popover positioning)

### 2. Copy all source files

- Copy all page components (Home, Quotes, Stories, Courses, Challenge, Dashboard, Favorites, Motivation, About) into `src/components/pages/`
- Copy custom components (Navbar, BottomNav, Footer, QuoteCard) into `src/components/`
- Copy data files (quotes, stories, courses, challenges) into `src/data/`
- Copy the AppContext provider into `src/context/`
- Copy image assets (IMG.jpeg, Joshua.jpg) into `src/assets/`

### 3. Create TanStack Start route files

Create route files for each page that render the existing page components:
- `src/routes/index.tsx` → Home page
- `src/routes/quotes.tsx` → Quotes page
- `src/routes/stories.tsx` → Stories page
- `src/routes/courses.tsx` → Courses page
- `src/routes/challenge.tsx` → Challenge page
- `src/routes/dashboard.tsx` → Dashboard page
- `src/routes/favorites.tsx` → Favorites page
- `src/routes/motivation.tsx` → Motivation page
- `src/routes/about.tsx` → About page

Each route file will simply import and render the existing page component.

### 4. Update root layout

Modify `src/routes/__root.tsx` to include:
- The AppProvider context wrapper
- Navbar component
- BottomNav component
- Footer component
- Toaster (sonner)
- Proper head metadata for EngineerUp

This mirrors the layout structure from your existing `App.tsx`.

### 5. Adapt styles

Replace `src/styles.css` with your project's theme system (theme.css + tailwind.css), preserving your exact color tokens, dark mode variables, typography, and glassmorphism navbar styling.

### 6. Fix import paths

Update all `react-router` imports in components to use `@tanstack/react-router` equivalents:
- `Link` from `@tanstack/react-router`
- `useLocation` from `@tanstack/react-router`
- Remove `BrowserRouter`, `Routes`, `Route` usage (handled by file-based routing)

### 7. Verify and launch

Confirm the preview loads with all pages accessible, navigation working, theme toggle functional, and animations playing.

## What stays the same

- All visual design, colors, typography, spacing
- Glassmorphism navbar with backdrop blur
- All Framer Motion animations and transitions
- Dark/light theme switching via AppContext
- LocalStorage persistence (favorites, streak, completed tasks)
- Mobile bottom navigation
- Responsive layouts
- All page content and data

## What is NOT included (Phase 2)

- Authentication
- Database/Supabase integration
- Backend logic

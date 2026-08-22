# Goal Description

Build the complete frontend architecture and UI for "GlobeTrotter", a premium smart trip planner application, for an 8-hour solo hackathon. The goal is to provide a highly visual, modern, and polished React application with all core user journeys fully functional using mock data (no backend). 

## Open Questions

None. The user has provided an extremely detailed prompt and asked to build the frontend without asking unnecessary questions and to make reasonable implementation decisions.

## Proposed Changes

### Core Setup & Utilities
- Setup global styles, tailwind config, fonts (Inter/Outfit for a modern look)
- Create `src/lib/utils.ts` for cn (classnames merge)
- Setup React Router with nested routes
- Create mock data structures in `src/data/mock.ts`
- Setup layout components (`AppLayout`, `AuthLayout`)

### Common/UI Components (shadcn/custom)
- Setup basic UI components: Buttons, Cards, Inputs, Dialogs, Selects, Tabs, Progress, Avatar, Badges
- Create reusable application components:
  - `Navbar` / `Sidebar` / `MobileNav`
  - `TripCard`: for dashboard and trips list
  - `DestinationCard`: for city discovery
  - `ActivityCard`: for activity discovery
  - `StatCard` / `BudgetCard`: for dashboard and budget screen

### Pages
- **Authentication**:
  - `/login`: Premium split-screen login with travel imagery.
  - `/signup`: Similar split-screen for registration.
- **Main App**:
  - `/dashboard`: Personalized dashboard with upcoming trips, recent trips, recommended destinations.
  - `/trips`: List of all trips (tabs for upcoming/past/draft).
  - `/trips/new`: Visual form to create a new trip.
  - `/trips/:id`: The Trip Workspace.
    - **Overview Tab**: Summary, route timeline, destination cards.
    - **Itinerary Tab**: Day-by-day builder, adding cities/stops, adding activities.
    - **Calendar Tab**: Visual timeline of activities.
    - **Budget Tab**: Recharts donut chart, expense breakdowns, budget progress.
  - `/trips/:id/share`: Public read-only view of the itinerary.
  - `/explore`: City and Activity discovery pages.
  - `/profile`: Simple profile settings page.

### State & Logic
- Use React Context or just pass state down for mock data where appropriate (given it's a hackathon and no backend, a simple Context `TripContext` or local state will suffice for simulating interactions like adding an activity or creating a trip).
- Implement mock actions:
  - Add/remove activities
  - Create trip
  - Filter destinations/activities

## Verification Plan

### Manual Verification
- Start the Vite dev server and verify no build or TypeScript errors exist.
- Click through the entire user journey: Login -> Dashboard -> Create Trip -> Add Cities/Activities -> View Budget/Calendar -> Share Trip.
- Verify UI responsiveness across Desktop, Tablet, and Mobile views.
- Ensure all hover states, active states, and basic animations look premium and professional.
- Verify charts render correctly.

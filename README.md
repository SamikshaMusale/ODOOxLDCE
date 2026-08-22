# 🌍 GlobeTrotter

> **Plan smarter. Travel better. Everything for your trip in one place.**

GlobeTrotter is a smart travel planning and trip management platform that brings destination discovery, trip creation, itinerary planning, activity management, budgeting, and AI-powered travel assistance together in one place.

---

## ✨ Features

| Feature | Description |
|---|---|
| 🔐 **User Authentication** | Secure signup, login, and logout using Supabase Authentication |
| ✉️ **Email Verification** | Email verification after user registration |
| 🏠 **Dashboard** | Central hub for upcoming and past trips |
| 🌍 **Destination Exploration** | Browse a curated catalog of destinations |
| 🔎 **Smart Search** | Search destinations and trips quickly |
| ✈️ **Trip Management** | Create, edit, and organize trips |
| 🗺️ **Multi-Stop Itineraries** | Add and reorder multiple destinations |
| 📅 **Day-by-Day Planning** | Assign activities to specific trip dates |
| 🎯 **Activity Catalog** | Explore sightseeing, food, culture, adventure, nature, shopping, and relaxation activities |
| 🗓️ **Calendar View** | Visualize activities and stops by date |
| 💰 **Budget Tracking** | Track expenses and view category breakdowns |
| 💱 **Single-Currency Budgeting** | Manage each trip using one consistent currency |
| ☁️ **Supabase Persistence** | Persist and restore trip data using PostgreSQL |
| 🤖 **AI Travel Assistant** | Get travel suggestions and itinerary ideas through an integrated AI chatbot |

---

## 🤖 AI Travel Assistant

GlobeTrotter includes an integrated **AI Travel Assistant powered by Botpress Webchat**.

The assistant is accessible through a floating chat button and can help users with:

- 🌍 Destination suggestions
- 🎯 Activity ideas for specific cities
- 📅 Day-by-day itinerary suggestions
- 💡 General travel planning advice

The goal is to provide useful travel assistance without requiring users to leave the GlobeTrotter application.

---

## 🛠️ Tech Stack

### 🎨 Frontend

- **React 19**
- **TypeScript**
- **Vite**
- **Tailwind CSS v4**

### 🧩 UI & Components

- **Radix UI** — Accessible headless UI components
- **Lucide React** — Icon library
- **React Hook Form** — Form management
- **Zod** — Form validation
- **React Router v7** — Client-side routing
- **Recharts** — Budget data visualization
- **React Day Picker** — Calendar components
- **date-fns** — Date manipulation

### 🗄️ Backend & Database

- **Supabase**
- **PostgreSQL**
- **Supabase Authentication**

### 🤖 AI

- **Botpress Webchat**
- `@botpress/webchat`

---

## 🏗️ Architecture

```text
                         ┌─────────────────────┐
                         │     GlobeTrotter    │
                         └──────────┬──────────┘
                                    │
              ┌─────────────────────┼─────────────────────┐
              │                     │                     │
              ▼                     ▼                     ▼
        Authentication        Trip Management       AI Assistant
              │                     │                     │
              ▼                     ▼                     ▼
       Supabase Auth          TripContext            Botpress
                                    │
                         ┌──────────┼──────────┐
                         │          │          │
                         ▼          ▼          ▼
                       Stops    Activities  Expenses
                         │          │          │
                         └──────────┼──────────┘
                                    ▼
                              PostgreSQL
```

---

## 📁 Project Structure

```text
src/
├── components/
│   ├── layout/             # App layout components
│   ├── shared/             # Reusable UI components
│   └── workspace/          # Trip workspace tabs
│
├── context/
│   ├── AuthContext.tsx     # Supabase authentication state
│   └── TripContext.tsx     # Trip data fetching and persistence
│
├── data/
│   └── mock.ts             # Destination and activity catalogs
│
├── lib/
│   └── supabase.ts         # Supabase client initialization
│
└── pages/
    ├── Dashboard.tsx       # Main user dashboard
    ├── Explore.tsx         # Destination discovery
    ├── CreateTrip.tsx      # Trip creation flow
    └── TripWorkspace.tsx   # Detailed trip workspace
```

---

## 🗄️ Database

GlobeTrotter uses **Supabase PostgreSQL** to persist user travel data.

### Database Relationships

```text
trips
│
├── expenses
│   └── Financial tracking by category
│
└── trip_stops
    │
    └── activities
        └── Activities planned for specific days
```

### Core Tables

| Table | Purpose |
|---|---|
| `trips` | Stores trip details, dates, budget, currency, and user ownership |
| `trip_stops` | Stores cities and destinations included in a trip |
| `activities` | Stores activities associated with stops and dates |
| `expenses` | Stores trip expenses and categories |

### 🔒 Security Note

User authentication and user-level trip ownership are implemented through Supabase Authentication and the application's data layer.

> **Note:** Row Level Security (RLS) is not currently enabled in the PostgreSQL schema. Database-level RLS policies are planned as a production security enhancement.

---

## 🔐 Authentication

Authentication is handled using **Supabase Authentication**.

The implementation includes:

- 👤 User signup
- ✉️ Email verification after signup
- 🔑 User login
- 🚪 Logout functionality
- 🔄 Persistent authenticated sessions
- 🛡️ Protected routes for authenticated users

Unauthenticated users are redirected to the login screen when attempting to access protected areas of the application.

---

## 🚀 Getting Started

### 📋 Prerequisites

Make sure you have the following installed:

- **Node.js 18+**
- **npm**

### 1️⃣ Clone the Repository

```bash
git clone <repository-url>
cd <project-folder>
```

### 2️⃣ Install Dependencies

```bash
npm install
```

### 3️⃣ Configure Environment Variables

Create a `.env.local` file in the project root:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_PUBLISHABLE_KEY=your_supabase_publishable_key
VITE_BOTPRESS_CLIENT_ID=your_botpress_client_id
```

> ⚠️ **Important:** Never commit `.env.local`, Supabase secret keys, service-role keys, or other private credentials to the repository.

### 4️⃣ Start the Development Server

```bash
npm run dev
```

The application will be available at the local development URL provided by Vite.

### 5️⃣ Build for Production

```bash
npm run build
```

### 6️⃣ Run Lint

```bash
npm run lint
```

---

## 🔄 Application Flow

```text
       Signup / Login
             │
             ▼
         Dashboard
             │
      ┌──────┴──────┐
      ▼             ▼
   Explore       Create Trip
      │             │
      └──────┬──────┘
             ▼
      Add Destinations
             │
             ▼
    Build Day-by-Day
       Itinerary
             │
             ▼
       Add Activities
             │
       ┌─────┴─────┐
       ▼           ▼
    Calendar     Budget
       │           │
       └─────┬─────┘
             ▼
     🤖 AI Travel Assistant
```

---

## 🎯 Use Cases

GlobeTrotter is designed for:

- 🧳 **Individual travelers** planning personal trips
- 🎓 **Students** organizing travel plans
- 👥 **Groups** managing multi-destination trips
- 💰 **Budget-conscious travelers** who want expense tracking
- 🤖 **Travelers seeking AI-assisted planning**

---

## 🌟 Why GlobeTrotter?

GlobeTrotter combines the major stages of travel planning into a single platform.

### Instead of using multiple tools:

**Destination discovery**  
↓  
**Trip planning**  
↓  
**Itinerary management**  
↓  
**Activity planning**  
↓  
**Calendar organization**  
↓  
**Budget tracking**  
↓  
**Travel assistance**

### GlobeTrotter brings everything together.

The goal is to make travel planning **simpler, more organized, and more convenient**.

---

## 📌 Project Status

GlobeTrotter currently provides a functional travel planning MVP with:

- ✅ Authentication
- ✅ Email verification
- ✅ Destination discovery and search
- ✅ Trip creation and editing
- ✅ Multi-stop itinerary planning
- ✅ Day-specific activities
- ✅ Calendar planning
- ✅ Budget and expense tracking
- ✅ Persistent Supabase storage
- ✅ AI travel assistance

---

## 🔮 Future Enhancements

Potential future improvements include:

- 🔒 Row Level Security (RLS) for database-level authorization
- 🖼️ Optional trip cover photo uploads
- 👤 User profile management
- 👥 Collaborative trip planning
- 🤖 More personalized AI travel recommendations
- 🌎 Expanded destination and activity catalog
- 🌤️ Real-time travel information and updates

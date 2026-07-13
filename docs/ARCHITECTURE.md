# Project Sukuun - Architecture Documentation

## Overview

Project Sukuun is built on a **modular, type-safe, emotionally-driven architecture**. Every component is designed to support the core mission: to preserve and present memories in an immersive, cinematic experience.

The architecture prioritizes:
- **Modularity**: Each feature engine is independent and can be toggled on/off
- **Type Safety**: Strict TypeScript with Zod runtime validation
- **Configuration Over Code**: All behavior is configurable via TypeScript config files
- **Content-Driven**: Memories are stored as structured data, not hardcoded
- **Performance**: Lazy loading, static rendering, optimized assets
- **Privacy**: Password-protected, no external trackers by default

---

## Core Architecture Principles

### 1. **Modular Engine Design**

Each feature (Gallery, Timeline, Chat, Birthday, etc.) is an independent module:

```
Website
├── Authentication
├── Welcome Engine
├── Memory Engine
├── Gallery Engine
├── Story Engine
├── Timeline Engine
├── Chat Engine
├── Video Engine
├── Birthday Engine
├── Calendar Engine
├── Music Engine
└── (Future Modules)
```

**Benefits:**
- Modules can be enabled/disabled via `features.json`
- Adding new modules doesn't affect existing code
- Each module has clear boundaries and dependencies
- Testing is isolated per module

### 2. **Type System**

All data flows through strict TypeScript types and Zod schemas:

**Memory Types** (`src/types/memory.ts`):
- `PhotoMemory` - photos with stories
- `StoryMemory` - written narratives
- `ChatMemory` - message archives
- `VideoMemory` - video with metadata
- `LetterMemory` - sealed or open letters
- `TimelineMemory` - historical events
- `SpecialEventMemory` - birthdays, proposals, etc.

**Config Types** (`src/types/config.ts`):
- `Theme` - color and design config
- `AnimationConfig` - timing and style
- `Features` - feature flags
- `Security` - auth and session settings
- `Content` - display preferences
- `Calendar` - date tracking config

**API Types** (`src/types/api.ts`):
- Request/response schemas
- Error handling contracts
- Pagination standards

### 3. **Content Architecture**

Memories are stored as **structured JSON files**, not database entries:

```
content/
├── memories/
│   ├── memory-001.json (photo with story)
│   ├── memory-002.json (story)
│   └── memory-003.json (chat)
├── chapters/
│   └── chapters.json (chapter definitions)
├── timeline/
│   └── timeline.json (relationship timeline)
└── calendar/
    └── calendar.json (important dates)
```

**Benefits:**
- Easy version control (git-friendly)
- Human-readable format
- Simple backups (copy the directory)
- No database migration complexity initially
- Easy to edit manually

### 4. **Configuration System**

All application behavior is configurable via TypeScript config files:

```
src/config/
├── website.ts (site metadata)
├── theme.ts (colors, fonts)
├── animations.ts (timing, easing)
├── music.ts (audio playback)
├── features.ts (feature flags)
├── security.ts (auth, sessions)
├── content.ts (display settings)
└── calendar.ts (date tracking)
```

**Loading:**
```typescript
import { loadConfig } from '@/lib/config';

const config = loadConfig();
// config.theme, config.animations, etc.
```

### 5. **Authentication & Sessions**

- **Simple password-based** (not OAuth/social login)
- **Session tokens** stored in SQLite
- **Secure cookies**: httpOnly, secure, sameSite flags
- **Session timeout** configurable (default 1 hour)
- **Optional "remember device"** for convenience

Database schema:
- `users` table - password hashes
- `sessions` table - active sessions with expiry

### 6. **Data Flow**

```
Client (Browser)
    ↓
    ├─ Authentication Middleware (check session)
    ├─ Routes (Next.js App Router)
    │  ├─ /app/(auth)/login - password entry
    │  └─ /app/(authenticated)/* - protected pages
    └─ Components
        ├─ Layouts (CenteredLayout, FullScreenLayout)
        ├─ Modules (Gallery, Timeline, Chat, etc.)
        └─ Animations (Reveal engines)
    ↓
Server
    ├─ API Routes (/api/memories, /api/auth)
    │  ├─ Load memories from /content
    │  ├─ Validate with Zod schemas
    │  └─ Return typed responses
    ├─ Database (SQLite)
    │  ├─ Sessions
    │  └─ Config entries (optional)
    └─ File System
        ├─ /content (memories, stories)
        └─ /public (images, audio, video)
```

---

## Folder Structure

```
sukuun/
├── app/                          # Next.js App Router
│   ├── (auth)/
│   │   └── login/page.tsx
│   ├── (authenticated)/
│   │   ├── layout.tsx           # Auth wrapper
│   │   ├── page.tsx             # Home
│   │   ├── gallery/page.tsx
│   │   └── settings/page.tsx
│   ├── api/                      # Backend API
│   │   ├── auth/logout.ts
│   │   ├── memories/route.ts
│   │   └── memories/[id]/route.ts
│   └── layout.tsx
│
├── src/
│   ├── components/               # Shared UI
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Image.tsx
│   │   ├── Typography.tsx
│   │   └── layouts/
│   │       ├── CenteredLayout.tsx
│   │       ├── FullScreenLayout.tsx
│   │       └── PageTransition.tsx
│   │
│   ├── modules/                  # Feature engines
│   │   ├── gallery/
│   │   ├── memory/
│   │   ├── animation/
│   │   ├── story/
│   │   ├── timeline/
│   │   ├── chat/
│   │   ├── video/
│   │   ├── birthday/
│   │   ├── calendar/
│   │   ├── music/
│   │   └── admin/
│   │
│   ├── hooks/                    # React hooks
│   │   ├── useAuth.ts
│   │   ├── useSmoothScroll.ts
│   │   ├── useReveal.ts
│   │   └── useConfig.ts
│   │
│   ├── lib/                      # Core utilities
│   │   ├── config.ts             # Config loader
│   │   ├── cn.ts                 # Tailwind merge
│   │   ├── auth.ts               # Auth utilities
│   │   ├── database.ts           # DB operations
│   │   ├── memory.ts             # Memory loading
│   │   └── content.ts            # Content rendering
│   │
│   ├── config/                   # Configuration
│   │   ├── website.ts
│   │   ├── theme.ts
│   │   ├── animations.ts
│   │   ├── music.ts
│   │   ├── features.ts
│   │   ├── security.ts
│   │   ├── content.ts
│   │   └── calendar.ts
│   │
│   ├── database/
│   │   ├── schema.ts             # SQL schemas
│   │   └── migrations/
│   │
│   ├── types/                    # TypeScript types
│   │   ├── memory.ts             # Memory schemas
│   │   ├── config.ts             # Config schemas
│   │   ├── api.ts                # API schemas
│   │   └── index.ts              # Exports
│   │
│   └── app/
│       ├── actions/
│       │   └── auth.ts           # Server actions
│       └── middleware.ts         # Auth middleware
│
├── content/                      # User-editable content
│   ├── memories/
│   │   ├── memory-001.json
│   │   ├── memory-002.json
│   │   └── ...
│   ├── stories/
│   ├── chapters/
│   ├── timeline/
│   ├── calendar/
│   └── birthday/
│
├── public/                       # Static assets
│   ├── images/
│   ├── audio/
│   ├── videos/
│   └── icons/
│
├── database/
│   └── sukuun.db                # SQLite database
│
├── docs/
│   ├── ARCHITECTURE.md (this file)
│   ├── SETUP.md
│   └── ADD_MEMORY.md
│
└── Configuration files
    ├── tsconfig.json
    ├── tailwind.config.ts
    ├── next.config.ts
    ├── .env.example
    └── .prettierrc
```

---

## Key Technologies

| Layer | Tech | Purpose |
|-------|------|---------|
| **Frontend** | React 18 + Next.js 16 | UI framework, routing, SSR |
| **Language** | TypeScript | Type safety |
| **Styling** | Tailwind CSS | Design tokens, responsive |
| **Animations** | Framer Motion | Smooth animations |
| **Validation** | Zod | Runtime type checking |
| **Scroll** | Lenis | Smooth scroll physics |
| **Backend** | Node.js + Express | API server |
| **Database** | SQLite | Sessions, config storage |
| **Password Hash** | bcryptjs | Secure credential storage |
| **Icons** | React Icons | Icon library |
| **Deployment** | Vercel / Railway | Hosting |

---

## Authentication Flow

```
1. User visits website
2. Middleware checks for valid session cookie
3. If invalid → Redirect to /login
4. User enters password on /app/(auth)/login/page.tsx
5. Server action validates password hash
6. If correct → Create session token, set secure cookie
7. Redirect to /app/(authenticated)/
8. Middleware verifies session, allows access
9. On logout → Delete session from DB, clear cookie
```

---

## Memory Loading Pipeline

```
1. Client requests GET /api/memories?chapter=Beginning
2. Server loads content/memories/*.json files
3. Zod schemas validate each memory
4. Filter by query parameters
5. Return typed MemoriesListResponse
6. Client caches in React state/SWR
7. Render with appropriate module (Gallery, Timeline, Chat)
8. Animations trigger based on memory.animation config
9. Related memories link together
```

---

## Configuration Loading

```
1. app/layout.tsx calls loadConfig()
2. Config loader imports all TS config files
3. Zod schemas parse and validate each section
4. Merged AppConfig object returned
5. Cached in memory for performance
6. Components access via useConfig() hook
7. On config change → resetConfigCache() + revalidate
```

---

## Future Expansion Points

The modular architecture supports adding:

- **Secret Memory Engine** - hidden chapters, locked content
- **Voice Notes Module** - audio memory recording
- **Handwritten Letters** - scanned document display
- **Interactive Maps** - location-based memories
- **Gift Archive** - wish list, gift tracking
- **Mood Journal** - emotion tracking over time
- **Shared Features** - collaborative editing (optional)
- **AI Summaries** - memory summarization
- **Backup/Restore** - automated backup to cloud

Each module:
1. Gets its own `/src/modules/[name]` folder
2. Exports components and hooks
3. Can be toggled in `features.ts`
4. Integrates via modular composition
5. Does NOT require code changes elsewhere

---

## Performance Targets

- **Lighthouse Performance**: > 95
- **Lighthouse Accessibility**: > 95
- **Core Web Vitals**: Good (LCP < 2.5s, FID < 100ms)
- **Bundle Size**: < 100KB (gzipped)
- **Image Optimization**: WebP/AVIF with lazy loading
- **Static Rendering**: 80%+ of routes pre-rendered

---

## Security Best Practices

✓ Passwords hashed with bcryptjs  
✓ Sessions stored server-side (SQLite)  
✓ Cookies marked httpOnly, secure, sameSite  
✓ No sensitive data in localStorage  
✓ CSRF protection via Next.js built-in  
✓ No external trackers by default  
✓ Content served over HTTPS only  
✓ No hardcoded secrets in code  

---

## Development Workflow

```bash
# Start development
npm run dev

# Build production
npm run build
npm start

# Lint and format
npm run lint
npm run format

# Type check
npx tsc --noEmit

# Initialize database
npm run init-db
```

---

## Next Steps (Phase 2)

Phase 2 will implement:
1. **Login & Authentication** - password entry and session management
2. **Home Page** - welcome screen and memory introduction
3. **Gallery Engine** - photo display with fullscreen viewer
4. **Memory Display** - card and detail views
5. **Animations** - reveal engines and transitions
6. **API Routes** - memory endpoints and filters

---

**Maintained by**: Project Sukuun Development Team  
**Last Updated**: 2026-07-13

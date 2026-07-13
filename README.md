# Project Sukuun

> A private, immersive, emotionally-driven digital experience designed to preserve memories, conversations, milestones, photographs, handwritten stories, videos, letters, and emotions inside one cinematic environment.

**Status**: 🚧 Phase 1 Foundation Complete | Phase 2 Development (Authentication & Gallery)

---

## What is Sukuun?

Sukuun is not a traditional personal website. It's a beautiful, password-protected memory preservation platform built with modern web technology. It gradually reveals memories, encouraging visitors to experience them rather than consume them.

Every page feels intentional. Every interaction carries emotional meaning. The website resembles an interactive storybook more than a social media profile.

### Key Features

- 📸 **Photo Gallery** - Beautiful galleries with multiple layouts (grid, masonry, carousel)
- 📝 **Memory Stories** - Write narratives with word-by-word reveal animations
- 💬 **Chat Archive** - Beautifully formatted conversation transcripts
- 🎬 **Video Display** - Rich video memories with metadata
- 📅 **Timeline Engine** - Show relationship growth over time
- 🎂 **Birthday Celebration** - Special experience for birthdays
- 🎵 **Ambient Music** - Background music for each chapter
- 🔒 **Private & Secure** - Password-protected, no tracking, fully encrypted sessions
- ⚙️ **Configurable** - Change colors, animations, features without touching code

---

## Quick Start

### Setup (5 minutes)

```bash
# 1. Clone the repository
git clone <repo-url>
cd sukuun

# 2. Install dependencies
npm install

# 3. Configure environment
cp .env.example .env.local
# Edit .env.local with your password

# 4. Initialize database
npm run init-db

# 5. Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) and login with your password.

### Adding Your First Memory

Create a JSON file in `content/memories/your-memory.json`:

```json
{
  "id": "memory-001",
  "type": "photo",
  "title": "Your Memory Title",
  "date": "2026-07-13",
  "chapter": "Chapter Name",
  "mood": "happy",
  "photos": ["/images/your-photo.jpg"],
  "story": "Your memory story...",
  "animation": "fadeIn",
  "importance": "high"
}
```

Add images to `public/images/` and reload. Done!

---

## Project Structure

```
sukuun/
├── app/                          # Next.js pages & API
├── src/
│   ├── components/               # Reusable UI components
│   ├── modules/                  # Feature modules (gallery, timeline, etc.)
│   ├── config/                   # Application configuration
│   ├── types/                    # TypeScript type definitions
│   ├── lib/                      # Core utilities
│   └── database/                 # Database schemas
├── content/
│   └── memories/                 # Your memory data (JSON)
├── public/
│   ├── images/                   # Your photos
│   ├── audio/                    # Background music
│   └── videos/                   # Videos
└── docs/
    ├── ARCHITECTURE.md           # Detailed architecture
    └── SETUP.md                  # Setup guide
```

---

## Technology Stack

| Layer | Tech | Purpose |
|-------|------|---------|
| **Frontend** | React 18 + Next.js 16 | UI framework |
| **Language** | TypeScript | Type safety |
| **Styling** | Tailwind CSS | Design system |
| **Animations** | Framer Motion | Smooth animations |
| **Validation** | Zod | Runtime type checking |
| **Backend** | Node.js | Server runtime |
| **Database** | SQLite | Sessions, config |
| **Deployment** | Vercel / Railway | Hosting |

---

## Key Concepts

### Modular Architecture

Each feature (Gallery, Timeline, Chat, Birthday) is an independent module. Enable/disable features in `src/config/features.ts` without any code changes.

### Memory Types

- **Photo**: Images with stories and metadata
- **Story**: Written narratives with word-reveal animations
- **Chat**: Archived conversations beautifully formatted
- **Video**: Videos with rich metadata and controls
- **Letter**: Sealed or open correspondence
- **Special Event**: Birthdays, anniversaries, proposals
- **Timeline**: Historical events and relationships

### Configuration System

Everything is configurable without touching code:

```
src/config/
├── theme.ts          # Colors, fonts, design
├── animations.ts     # Timing, easing, transitions
├── features.ts       # Feature flags
├── security.ts       # Auth, sessions
├── music.ts          # Audio settings
├── calendar.ts       # Date tracking
└── content.ts        # Display preferences
```

---

## Development

### Available Commands

```bash
npm run dev              # Start development server
npm run build            # Build for production
npm start                # Run production build
npm run lint             # Check code with ESLint
npm run format           # Format code with Prettier
npm run init-db          # Initialize database
```

### Environment Variables

Required:
- `APP_PASSWORD` - Login password
- `SESSION_SECRET` - Session signing secret (min 32 chars)

Optional:
- `DATABASE_URL` - SQLite database path (default: `./database/sukuun.db`)
- `NEXT_PUBLIC_SITE_NAME` - Site title (default: `Project Sukuun`)

---

## Documentation

- **[ARCHITECTURE.md](./docs/ARCHITECTURE.md)** - Complete architecture overview
- **[SETUP.md](./docs/SETUP.md)** - Detailed setup and configuration guide
- **[PRD.md](./PRD.md)** - Original product requirements document

---

## Performance

Targets:
- ⚡ **Lighthouse Performance**: > 95
- ♿ **Accessibility**: > 95
- 🖼️ **Image Optimization**: WebP/AVIF with lazy loading
- 🚀 **Bundle Size**: < 100KB (gzipped)
- 📱 **Responsive**: Desktop, Tablet, Mobile, Ultra-wide

---

## Security

✅ Password hashing (bcryptjs)  
✅ Secure sessions (httpOnly cookies)  
✅ Type-safe data validation (Zod)  
✅ No external trackers  
✅ Private by default  
✅ HTTPS enforced  

---

## Roadmap

### Phase 1 ✅ (Foundation Architecture)
- [x] Next.js 14+ setup with TypeScript
- [x] Tailwind CSS with custom theme
- [x] Type system with Zod validation
- [x] Configuration system
- [x] Modular folder structure
- [x] Database schema
- [x] Example memories

### Phase 2 🚧 (Authentication & Gallery)
- [ ] Login page and authentication
- [ ] Home page and welcome
- [ ] Photo gallery engine
- [ ] Memory display components
- [ ] Reveal animations
- [ ] API routes
- [ ] Example content

### Phase 3 (Story & Timeline)
- [ ] Story engine with word-reveal
- [ ] Timeline component
- [ ] Chat archive display
- [ ] Video player
- [ ] Letter display

### Phase 4+ (Advanced Features)
- [ ] Birthday celebration engine
- [ ] Calendar with cycle tracking
- [ ] Admin panel
- [ ] Backup/restore
- [ ] Shared features (optional)
- [ ] Custom modules

---

## Contributing

This is a personal project, but suggestions and improvements are welcome!

---

## License

Private project. Not for public distribution without permission.

---

## Support

For questions or issues:

1. Check [docs/SETUP.md](./docs/SETUP.md) for setup issues
2. Review [docs/ARCHITECTURE.md](./docs/ARCHITECTURE.md) for technical questions
3. Check existing memories in `content/memories/` for examples

---

**Project Sukuun** - Preserve memories. Experience stories.

*Built with ❤️ using React, Next.js, and TypeScript*

**Last Updated**: 2026-07-13

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

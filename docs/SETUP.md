# Project Setup Guide

## Prerequisites

- **Node.js**: 18.x or higher
- **npm**: 9.x or higher
- **Git**: for version control
- **SQLite**: (included automatically)

## Quick Start (5 minutes)

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/sukuun.git
cd sukuun
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment

Copy the example environment file:

```bash
cp .env.example .env.local
```

Edit `.env.local` with your values:

```env
# Required: Set a secure password for login
APP_PASSWORD=your-secure-password-here

# Required: Random string for session signing (min 32 chars)
SESSION_SECRET=your-random-secure-string-min-32-characters

# Optional: Database path
DATABASE_URL=./database/sukuun.db

# Optional: Site name
NEXT_PUBLIC_SITE_NAME=Project Sukuun
```

### 4. Initialize Database

```bash
npm run init-db
```

This creates the SQLite database and initializes tables.

### 5. Start Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 6. Login

- Enter the password you set in `APP_PASSWORD`
- You should see the home page with example memories

---

## Adding Your First Memory

### 1. Create a Memory JSON File

Create a new file in `content/memories/your-memory.json`:

```json
{
  "id": "your-memory-id",
  "type": "photo",
  "title": "Your Memory Title",
  "description": "Optional description",
  "date": "2026-07-13",
  "chapter": "Chapter Name",
  "mood": "happy",
  "tags": ["tag1", "tag2"],
  "photos": ["/images/your-photo.jpg"],
  "story": "Your memory story or description",
  "animation": "fadeIn",
  "importance": "high",
  "hidden": false,
  "unlocked": true
}
```

### 2. Add Images

Place your images in `public/images/` folder.

### 3. Reload Browser

The new memory will appear automatically!

---

## Project Structure

```
sukuun/
├── app/                 # Next.js pages and API routes
├── src/
│   ├── components/      # Reusable UI components
│   ├── modules/         # Feature modules (gallery, timeline, etc.)
│   ├── config/          # Application configuration
│   ├── types/           # TypeScript type definitions
│   ├── lib/             # Core utilities
│   └── database/        # Database schema
├── content/
│   └── memories/        # Your memory data files
├── public/
│   ├── images/          # Your photos and media
│   ├── audio/           # Background music
│   └── videos/          # Video files
└── docs/                # Documentation
```

---

## Common Commands

```bash
# Development
npm run dev              # Start dev server (localhost:3000)
npm run build            # Build for production
npm start                # Run production build

# Code Quality
npm run lint             # Check code style with ESLint
npm run format           # Format code with Prettier
npm run type-check       # Check TypeScript types

# Database
npm run init-db          # Initialize or reset database

# Help
npm run --list           # List all available scripts
```

---

## Configuration

### Customize the Theme

Edit `src/config/theme.ts`:

```typescript
export const themeConfig: Theme = {
  name: 'soft',
  colors: {
    primary: '#2D2D2D',
    secondary: '#5A5A5A',
    background: '#FBF8F3',
    // ... customize colors
  },
};
```

### Enable/Disable Features

Edit `src/config/features.ts`:

```typescript
export const featuresConfig: Features = {
  gallery: true,
  timeline: true,
  birthday: true,
  // ... toggle features
};
```

### Adjust Animation Speed

Edit `src/config/animations.ts`:

```typescript
export const animationsConfig: AnimationConfig = {
  defaultSpeed: 'normal', // 'slow', 'normal', 'fast'
  transitionDuration: 600, // milliseconds
  // ... more settings
};
```

---

## Understanding Memory Types

### Photo Memory

Display beautiful photographs with stories.

```json
{
  "type": "photo",
  "photos": ["/images/photo.jpg"],
  "story": "Optional story",
  "location": "Optional location",
  "cameraInfo": "Optional camera details"
}
```

### Story Memory

Written narratives and reflections.

```json
{
  "type": "story",
  "story": "Your full story text",
  "excerpt": "Short preview (optional)"
}
```

### Chat Memory

Archived conversations, beautifully formatted.

```json
{
  "type": "chat",
  "messages": [
    { "sender": "You", "message": "Hello!", "timestamp": "..." },
    { "sender": "Them", "message": "Hi!", "timestamp": "..." }
  ],
  "participantName": "Person's Name"
}
```

### Letter Memory

Sealed letters or open correspondence.

```json
{
  "type": "letter",
  "content": "Your letter text",
  "author": "From",
  "recipientName": "To",
  "sealed": false
}
```

### Special Event Memory

Birthdays, anniversaries, proposals, etc.

```json
{
  "type": "specialEvent",
  "eventType": "birthday",
  "photos": ["/images/birthday.jpg"],
  "story": "Optional story"
}
```

---

## Troubleshooting

### "Failed to load configuration"

Ensure all config files in `src/config/` exist and have valid TypeScript syntax.

### "Cannot find memories"

Check that `content/memories/` folder exists with valid JSON files.

### "Permission denied" on database

Ensure `database/` folder is writable. Check file permissions or delete `.db` file to recreate.

### Images not loading

Ensure images are in `public/images/` and referenced correctly in memory JSON files (e.g., `/images/photo.jpg`).

### Port 3000 already in use

```bash
# Try a different port
npm run dev -- -p 3001
```

---

## Deployment

### Deploy to Vercel (Recommended)

```bash
# Connect your repo to Vercel at vercel.com
# Set environment variables in Vercel dashboard
# Push to main branch - auto-deploys!
```

### Deploy to Railway

```bash
# Install Railway CLI
npm install -g @railway/cli

# Login and deploy
railway login
railway link
railway up
```

---

## Environment Variables

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `APP_PASSWORD` | Yes | - | Login password |
| `SESSION_SECRET` | Yes | - | Session signing secret |
| `DATABASE_URL` | No | `./database/sukuun.db` | SQLite database path |
| `NEXT_PUBLIC_SITE_NAME` | No | `Project Sukuun` | Website title |

---

## Next Steps

1. ✅ Read [ARCHITECTURE.md](./ARCHITECTURE.md) to understand the project structure
2. 📝 Create your first memories in `content/memories/`
3. 🎨 Customize theme in `src/config/theme.ts`
4. 📸 Add your images to `public/images/`
5. 🚀 Deploy to Vercel or Railway

---

## Support & Documentation

- **Architecture**: See [docs/ARCHITECTURE.md](./ARCHITECTURE.md)
- **Adding Memories**: See [docs/ADD_MEMORY.md](./ADD_MEMORY.md) (coming soon)
- **Configuration**: See `src/config/` files for detailed options

---

**Last Updated**: 2026-07-13  
**Project Sukuun** - A private memory preservation platform

# Personal Resume Chatbot + Portfolio Site 🌌

A stunning, futuristic chatbot platform with **Star Wars-inspired themes** that serves as an interactive resume and portfolio showcase.

![Galactic Empire](https://img.shields.io/badge/Theme-Galactic%20Empire%20🟥-DC143C)
![Jedi Temple](https://img.shields.io/badge/Theme-Jedi%20Temple%20🪶-FFD700)
![Outer Rim](https://img.shields.io/badge/Theme-Outer%20Rim%20🛠️-FF8C42)
![Hyperspace](https://img.shields.io/badge/Theme-Hyperspace%20🌠-00D9FF)

## ✨ Features

### 🤖 AI-Powered Chatbot
- Interactive chat interface powered by **Hugging Face Space**
- Direct connection to `abhati27/Career_Conversation_Anmol`
- AI assistant trained on your resume and professional history
- Contextual responses about experience, projects, and skills
- Smart suggested prompts to guide conversations
- **No backend required** - calls API directly from frontend

### 🎨 Star Wars Theme System
**4 Epic Themes with unique personalities:**

#### 🟥 **Galactic Empire** — Dark Futurism
- Sleek black backgrounds with crimson red accents
- Holographic effects and scanline overlays
- Starfield animations with floating ship emojis
- Perfect for: Bold, authoritative, commanding presence

#### 🪶 **Jedi Temple** — Peaceful & Mystic
- Ivory and gold color scheme with sky blue highlights
- Floating light particles and sweeping rays
- Elegant serif typography with soft glows
- Perfect for: Calm, balanced, professional elegance

#### 🛠️ **Outer Rim** — Rebel Industrial
- Rust orange and navy blue with steel gray textures
- Gritty, worn metal aesthetic
- Asteroid and debris animations
- Perfect for: Adventurous, hands-on, technical vibe

#### 🌠 **Hyperspace** — Futuristic Energy
- Deep blue with cyan neon glows and purple accents
- Light-speed streak animations
- Glassmorphism effects on UI panels
- Perfect for: Fast-paced, cutting-edge, energetic

### 📂 Professional Portfolio
- Clean project showcase with detailed cards
- Work experience timeline
- Skills overview with interactive tags
- Education section
- Downloadable resume

### 🎭 Advanced Animations
- **Framer Motion** powered interactions
- Theme-specific particle systems
- Holographic text effects
- Laser sweep transitions
- Responsive hover states

## 🚀 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + Custom CSS animations
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **AI**: Hugging Face Space (via @gradio/client)
- **Architecture**: 100% Frontend - No backend required!

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd Website
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

> **Note**: No API keys or environment variables needed! The chatbot connects directly to the public Hugging Face Space `abhati27/Career_Conversation_Anmol`.

## 🎨 Customization

### Update Your Information

Edit `/lib/resume-data.ts` to customize with your own information:
- Name and title
- Professional summary
- Work experience
- Projects
- Skills
- Education
- Contact information

### Customize Themes

Modify `/lib/themes.ts` to adjust theme colors and gradients:
```typescript
empire: {
  name: 'Galactic Empire',
  colors: {
    primary: '#DC143C',  // Crimson red
    background: '#0A0A0A',  // Deep black
    // ... more colors
  }
}
```

### Add Your Photo

Place your profile photo in the `/public` directory and update the reference in the pages.

### Add Resume PDF

Place your resume PDF at `/public/resume.pdf` to enable downloads.

## 📁 Project Structure

```
Website/
├── app/
│   ├── chat/              # Chat page (with Hugging Face integration)
│   ├── portfolio/         # Portfolio landing page
│   ├── globals.css        # Global styles + theme effects
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Redirects to portfolio
├── components/
│   ├── ChatMessage.tsx    # Chat message component
│   ├── ProjectCard.tsx    # Project card component
│   ├── SeasonalBackground.tsx  # Animated particle systems
│   ├── SeasonSlider.tsx   # Theme selector
│   ├── ThemeEffects.tsx   # Theme-specific overlays
│   └── TypingIndicator.tsx
├── contexts/
│   └── ThemeContext.tsx   # Theme state management
├── lib/
│   ├── resume-data.ts     # Your professional data
│   ├── themes.ts          # Theme configurations
│   └── utils.ts           # Utility functions
├── types/
│   └── index.ts           # TypeScript types
└── public/                # Static assets (portfolio.png, resume.pdf)
```

## 🎯 Usage

### Portfolio Page (Landing - `/`)
- **First page visitors see**
- View profile picture, name, and professional summary
- Enter questions in the chat input box or click suggested prompts
- Questions automatically route to chat page with AI responses
- Browse featured projects with interactive cards
- View work experience timeline
- Access GitHub and LinkedIn via floating icons (bottom left)
- **Switch themes** using the theme selector

### Chat Page (`/chat`)
- Real-time AI responses powered by Hugging Face Space
- Interactive conversation about your professional background
- Use suggested prompts for quick navigation
- Download resume from the bottom bar
- Return to portfolio with "Back to Portfolio" button

### Theme Switching
- Use the theme selector in the header
- Themes persist across page navigation
- Each theme has unique colors, animations, and effects

## 🌟 Theme Details

### Particle Animations
- **Galactic Empire**: Twinkling stars + floating UFOs, stars, and alert dots
- **Jedi Temple**: Light dust particles + sweeping golden rays
- **Outer Rim**: Asteroids and satellites drifting across
- **Hyperspace**: Light-speed streaks + shooting stars

### Special Effects
- **Empire**: Scanlines, vignette overlay, holographic text flicker
- **Jedi**: Soft light particles, elegant fade-ins
- **Outer Rim**: Metal textures, mechanical button presses
- **Hyperspace**: Glassmorphism, neon glows, motion trails

### Typography Styles
- **Empire**: Thin sans-serif, all caps, high contrast
- **Jedi**: Elegant serif with golden highlights
- **Outer Rim**: Bold condensed sans-serif, distressed
- **Hyperspace**: Geometric sans-serif with neon glow

## 🔧 Development

### Build for production
```bash
npm run build
```

### Start production server
```bash
npm start
```

### Lint code
```bash
npm run lint
```

## 🚀 Deployment

### Deploy to GitHub Pages (Easy & Free!) 🆓
**Your site is now configured for GitHub Pages!**

1. Push your code to GitHub
2. Enable GitHub Pages in Settings → Pages
3. Select "GitHub Actions" as the source
4. Automatic deployment on every push! ✨

See [GITHUB_PAGES_DEPLOYMENT.md](./GITHUB_PAGES_DEPLOYMENT.md) for detailed instructions.

### Deploy to Vercel (Alternative)
1. Push your code to GitHub
2. Import project to Vercel
3. Deploy! ✨ (No environment variables needed)

### Other Platforms
This Next.js application can be deployed to any platform that supports static sites:
- Netlify
- AWS Amplify
- Railway
- Render
- Cloudflare Pages

**Note**: Since the chatbot runs entirely on the frontend with no backend API routes, deployment is super simple - just deploy as a static site!

## 🎨 Custom CSS Classes

The project includes special CSS classes for theme effects:

```css
.holographic-glow        /* Text glow effect */
.holographic-flicker     /* Flickering animation */
.laser-border           /* Animated laser sweep */
.control-panel-pulse    /* Pulsing glow */
.hyperspace-trail       /* Motion trail on hover */
.glassmorphism          /* Frosted glass effect */
.metal-texture          /* Industrial texture */
```

## 📝 Environment Variables

**No environment variables needed!** 🎉

The chatbot connects directly to the public Hugging Face Space from the frontend. No API keys, no backend, no configuration required.

## 🎮 Keyboard Shortcuts

- **Enter**: Send message in chat
- **Shift + Enter**: New line in chat input

## 🌐 Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

## 📊 Performance

- **Lighthouse Score**: 95+
- **First Contentful Paint**: < 1.5s
- **Time to Interactive**: < 3s
- **Optimized animations**: 60fps on modern devices

## 🤝 Contributing

Feel free to fork this project and customize it for your own portfolio!

## 📝 License

MIT License - feel free to use this for your own portfolio!

## 🙋‍♂️ About

Created by **Anmol Vijay Bhatia**
- Experienced Software Engineer with 2 years in GenAI
- Passionate about building intelligent, user-friendly applications

## 🎉 Features Roadmap

- [ ] Sound effects per theme (ambient sounds)
- [ ] Page transition animations (lightspeed jump)
- [ ] Dark/Light mode toggle
- [ ] Theme customizer panel
- [ ] More interactive particle effects
- [ ] 3D elements with Three.js

---

**May the Force be with your portfolio!** 🌟

Made with ❤️ and lots of ☕ (and Star Wars inspiration)

# Customization Guide

This guide will help you personalize your Resume Chatbot + Portfolio site with your own information.

## 📝 Essential Customizations

### 1. Personal Information

**File**: `lib/resume-data.ts`

Update the `resumeData` object with your information:

```typescript
export const resumeData: ResumeData = {
  name: 'Your Full Name',
  title: 'Your Professional Title',
  email: 'your.email@example.com',
  linkedin: 'https://linkedin.com/in/yourprofile',
  github: 'https://github.com/yourusername',
  summary: `Your professional summary here...`,
  // ... rest of the data
}
```

### 2. Work Experience

Add your work history in the `experience` array:

```typescript
experience: [
  {
    id: '1',
    title: 'Your Job Title',
    company: 'Company Name',
    period: '2023 - Present',
    description: 'What you did and achieved...',
    skills: ['Skill1', 'Skill2', 'Skill3'],
  },
  // Add more experiences...
]
```

### 3. Projects

Showcase your work in the `projects` array:

```typescript
projects: [
  {
    id: '1',
    title: 'Project Name',
    description: 'What the project does...',
    image: '/projects/project-image.jpg', // Add image to public/projects/
    tags: ['React', 'Node.js', 'MongoDB'],
    github: 'https://github.com/yourusername/project',
    link: 'https://yourproject.com', // Optional live demo
    highlights: [
      'Achievement 1',
      'Achievement 2',
      'Achievement 3',
    ],
  },
  // Add more projects...
]
```

### 4. Skills

List all your technical skills:

```typescript
skills: [
  'JavaScript',
  'TypeScript',
  'React',
  'Node.js',
  // Add all your skills...
]
```

### 5. Education

Add your educational background:

```typescript
education: [
  {
    degree: 'Bachelor of Science in Computer Science',
    school: 'Your University',
    year: '2022',
  },
  // Add more degrees...
]
```

## 🎨 Visual Customizations

### Add Your Profile Photo

1. **Prepare your photo**:
   - Recommended: Square aspect ratio (e.g., 400x400px)
   - Format: PNG or JPG
   - Keep file size under 500KB

2. **Add to project**:
   - Place in `public/profile.jpg`

3. **Update the code**:

In `app/page.tsx`, replace the placeholder icon:

```typescript
// Replace this:
<div
  className="w-12 h-12 rounded-full flex items-center justify-center shadow-lg"
  style={{ background: theme.buttonGradient }}
>
  <Sparkles className="w-6 h-6 text-white" />
</div>

// With this:
<Image
  src="/profile.jpg"
  alt="Anmol Vijay Bhatia"
  width={48}
  height={48}
  className="rounded-full shadow-lg"
/>
```

Don't forget to import Image:
```typescript
import Image from 'next/image';
```

### Add Project Images

1. Create folder: `public/projects/`
2. Add project images (recommended: 800x450px)
3. Update image paths in `resume-data.ts`

### Customize Themes

**File**: `lib/themes.ts`

Modify colors for each season:

```typescript
spring: {
  name: 'Spring',
  icon: '🌸',
  colors: {
    primary: '#YourColor',
    secondary: '#YourColor',
    accent: '#YourColor',
    // ... more colors
  },
  gradient: 'linear-gradient(135deg, #Color1 0%, #Color2 100%)',
  // ... more settings
}
```

**Color Palette Generators**:
- [Coolors.co](https://coolors.co/)
- [Adobe Color](https://color.adobe.com/)
- [ColorHunt](https://colorhunt.co/)

## 🤖 Chatbot Customization

### Update Chatbot Context

**File**: `lib/resume-data.ts`

Modify the `chatContext` string to change how the AI responds:

```typescript
export const chatContext = `You are an AI assistant representing [Your Name]...

Your role is to answer questions about [Your Name]'s:
- Professional experience...
- Technical skills...
- Projects...

Guidelines:
- Be friendly and professional
- Speak in first person
- Provide specific examples
- ...
`;
```

### Change Welcome Message

**File**: `app/page.tsx`

Update the initial message in the `useState`:

```typescript
const [messages, setMessages] = useState<Message[]>([
  {
    id: generateId(),
    role: 'assistant',
    content: "Your custom welcome message here! 👋",
    timestamp: new Date(),
  },
]);
```

### Modify Suggested Prompts

**File**: `app/page.tsx`

Update the `SUGGESTED_PROMPTS` array:

```typescript
const SUGGESTED_PROMPTS = [
  "Your custom prompt 1",
  "Your custom prompt 2",
  "Your custom prompt 3",
  "Your custom prompt 4",
];
```

## 🎭 Animation Customizations

### Adjust Particle Count

**File**: `components/SeasonalBackground.tsx`

Change the number in the array to increase/decrease particles:

```typescript
// Spring petals (currently 15)
{[...Array(15)].map((_, i) => ( // Change this number
  <motion.div>🌸</motion.div>
))}

// For better mobile performance, use fewer particles:
{[...Array(8)].map((_, i) => ( // Reduced for mobile
  <motion.div>🌸</motion.div>
))}
```

### Change Animation Speed

Modify the `duration` in motion animations:

```typescript
transition={{
  duration: 10, // Make slower (higher) or faster (lower)
  repeat: Infinity,
  // ...
}}
```

### Different Seasonal Icons

Replace the emoji particles with your preferred ones:

```typescript
// In SeasonalBackground.tsx
const SpringParticles = () => {
  return (
    <>
      {[...Array(15)].map((_, i) => (
        <motion.div>
          {['🌸', '🌼', '🌺'][i % 3]} {/* Alternate between icons */}
        </motion.div>
      ))}
    </>
  );
};
```

## 📄 Resume PDF

### Add Your Resume

1. **Export your resume as PDF**
2. **Rename to**: `resume.pdf`
3. **Place in**: `public/` folder
4. **Replace the placeholder file**

### Custom Resume Name

If you want a different filename:

1. Rename your PDF (e.g., `anmol-bhatia-resume.pdf`)
2. Update the download links:

**In `app/page.tsx`**:
```typescript
<motion.a
  href="/anmol-bhatia-resume.pdf"  // Update this
  download
>
```

**In `app/portfolio/page.tsx`**:
```typescript
<motion.a
  href="/anmol-bhatia-resume.pdf"  // Update this
  download
>
```

## 🔧 Advanced Customizations

### Add New Sections

Want to add certifications, awards, or publications?

1. **Update types** (`types/index.ts`):
```typescript
export interface ResumeData {
  // ... existing fields
  certifications?: {
    name: string;
    issuer: string;
    date: string;
  }[];
}
```

2. **Add data** (`lib/resume-data.ts`):
```typescript
certifications: [
  {
    name: 'AWS Solutions Architect',
    issuer: 'Amazon Web Services',
    date: '2023',
  },
]
```

3. **Display in portfolio** (`app/portfolio/page.tsx`):
```typescript
<motion.section>
  <h2>Certifications</h2>
  {resumeData.certifications?.map(cert => (
    <div key={cert.name}>
      <h3>{cert.name}</h3>
      <p>{cert.issuer} - {cert.date}</p>
    </div>
  ))}
</motion.section>
```

### Change Fonts

1. **Update** `app/layout.tsx`:
```typescript
import { Inter, Poppins } from 'next/font/google';

const poppins = Poppins({ 
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'] 
});
```

2. **Apply**:
```typescript
<body className={poppins.className}>
```

### SEO Optimization

**File**: `app/layout.tsx`

Update metadata:

```typescript
export const metadata: Metadata = {
  title: 'Your Name - Your Title',
  description: 'Your custom description for search engines',
  keywords: ['Your', 'Keywords', 'Here'],
  openGraph: {
    title: 'Your Name',
    description: 'Your Description',
    images: ['/og-image.jpg'], // Add OG image
  },
};
```

## 🎨 Design Tips

### Color Psychology for Seasons

- **Spring** 🌸: Fresh, new beginnings (pastels, light greens, pinks)
- **Summer** ☀️: Energy, warmth (yellows, oranges, bright blues)
- **Autumn** 🍂: Maturity, reliability (browns, deep oranges, reds)
- **Winter** ❄️: Clean, professional (blues, whites, grays)

### Maintaining Accessibility

When customizing colors, ensure good contrast:
- Text on background: at least 4.5:1 ratio
- Use tools like [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)

### Responsive Design

Test your customizations on:
- Mobile (320px - 768px)
- Tablet (768px - 1024px)
- Desktop (1024px+)

## 📱 Social Media Integration

### Add Social Links

Update `lib/resume-data.ts`:

```typescript
social: {
  linkedin: 'https://linkedin.com/in/yourprofile',
  github: 'https://github.com/yourusername',
  twitter: 'https://twitter.com/yourhandle',
  website: 'https://yourwebsite.com',
}
```

Then add social icons to your pages using Lucide React icons.

## 🚀 Performance Tips

### Optimize Images

```bash
# Install sharp for automatic optimization
npm install sharp
```

Next.js will automatically optimize images with the `Image` component.

### Reduce Bundle Size

Keep only the icons you use:

```typescript
// Instead of:
import * as Icons from 'lucide-react';

// Use:
import { Sparkles, Send, Briefcase } from 'lucide-react';
```

---

## 🆘 Need Help?

If you get stuck:
1. Check the main `README.md`
2. Review `SETUP.md` for basics
3. Examine the code comments
4. Look at the TypeScript types for structure

Happy customizing! 🎨✨



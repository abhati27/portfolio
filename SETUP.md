# Quick Setup Guide

Welcome to your Personal Resume Chatbot + Portfolio Site! 🎉

## 🚀 Getting Started in 5 Minutes

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Customize Your Information

Open `lib/resume-data.ts` and update with your information:
- ✏️ Name and title
- 📧 Contact information (email, LinkedIn, GitHub)
- 💼 Work experience
- 🚀 Projects
- 🛠️ Skills
- 🎓 Education

### Step 3: Add Your Resume PDF (Optional)

Replace `public/resume.pdf` with your actual resume PDF file.

### Step 4: Add Your Profile Photo (Optional)

1. Add your photo to the `public/` directory (e.g., `public/profile.jpg`)
2. Update the image references in:
   - `app/page.tsx` (chat page header)
   - `app/portfolio/page.tsx` (portfolio page)

### Step 5: Set Up OpenAI API (Optional)

The chatbot works without an API key using intelligent mock responses. For full AI capabilities:

1. Get an API key from [OpenAI Platform](https://platform.openai.com/api-keys)
2. Open `.env.local`
3. Uncomment the line and add your key:
   ```
   OPENAI_API_KEY=sk-your-actual-key-here
   ```

### Step 6: Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser! 🎊

## 🎨 Customization Tips

### Change Theme Colors

Edit `lib/themes.ts` to customize the colors for each season:
- Spring 🌸: Pastels (pink, mint)
- Summer ☀️: Warm (yellows, oranges)
- Autumn 🍂: Earth tones (browns, deep oranges)
- Winter ❄️: Cool (blues, whites)

### Modify Animations

Adjust animation speeds and effects in:
- `components/SeasonalBackground.tsx` - Particle animations
- Individual component files - Hover effects and transitions

### Add More Projects

In `lib/resume-data.ts`, add more projects to the `projects` array with:
- Title and description
- Technologies used
- GitHub/demo links
- Key highlights

## 📱 Features to Try

1. **Chat with Your AI Assistant**
   - Ask about your experience
   - Inquire about specific projects
   - Request skill information

2. **Switch Seasonal Themes**
   - Use the season slider in the header
   - Each theme has unique animations!

3. **Explore Your Portfolio**
   - Click "View Portfolio" button
   - Browse projects, experience, and skills
   - Download your resume

4. **Mobile Experience**
   - Fully responsive design
   - Touch-friendly interactions
   - Works great on all devices

## 🐛 Troubleshooting

### Dependencies Won't Install
```bash
# Clear npm cache
npm cache clean --force
# Try again
npm install
```

### Port 3000 Already in Use
```bash
# Run on a different port
npm run dev -- -p 3001
```

### OpenAI API Errors
- Check your API key in `.env.local`
- Ensure you have credits in your OpenAI account
- The app works without an API key (uses mock responses)

### Animations Slow on Mobile
- This is normal for complex animations
- Consider reducing particle counts in `SeasonalBackground.tsx`

## 🚀 Deploy Your Site

### Vercel (Recommended - Free)
1. Push your code to GitHub
2. Visit [vercel.com](https://vercel.com)
3. Import your repository
4. Add `OPENAI_API_KEY` in environment variables
5. Deploy! 🎉

### Netlify
1. Push to GitHub
2. Connect repository to Netlify
3. Build command: `npm run build`
4. Publish directory: `.next`
5. Add environment variables

## 💡 Pro Tips

1. **Test Both Themes**: Switch between seasons to ensure your colors work well
2. **Mobile First**: Always test on mobile - most visitors will use it
3. **Keep Content Updated**: Regularly update your projects and experience
4. **Fast Load Times**: Optimize images and keep animations smooth
5. **SEO**: Update metadata in `app/layout.tsx` for better search rankings

## 🎉 You're Ready!

Your personal chatbot portfolio is now set up. Share it with:
- Potential employers
- Recruiters
- Your professional network
- Portfolio showcases

Good luck with your job search! 🚀

---

Need help? Check the main README.md for detailed documentation.



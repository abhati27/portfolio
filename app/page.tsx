'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { MessageCircle, Download, Briefcase, Code, GraduationCap, Award, Send, Github, Linkedin, Mail, Phone, Trophy, Heart, Star, Bot, Sparkles, Brain } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { resumeData, additionalInfo } from '@/lib/resume-data';
import { getImagePath } from '@/lib/utils';
import { track } from '@/lib/analytics';
import { warmUpSpace } from '@/lib/chat-api';
import SeasonalBackground from '@/components/SeasonalBackground';
import ThemeSlider from '@/components/SeasonSlider';
import ProjectCard from '@/components/ProjectCard';
import ThemeEffects from '@/components/ThemeEffects';
import ScrollSpyNav from '@/components/ScrollSpyNav';

export default function PortfolioPage() {
  const router = useRouter();
  const { theme, themeName } = useTheme();
  const [chatInput, setChatInput] = useState('');

  // Wake the chat Space on load so it's warm by the time a visitor opens chat.
  useEffect(() => {
    warmUpSpace();
  }, []);

  const handleSendMessage = () => {
    if (!chatInput.trim()) return;
    track('ai_twin_message_sent', { source: 'home_input', question: chatInput.trim() });
    // Navigate to chat page with the message as a query parameter
    router.push(`/chat?message=${encodeURIComponent(chatInput)}`);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="min-h-screen relative">
      <SeasonalBackground />
      <ThemeEffects />
      <ScrollSpyNav />

      {/* Header */}
      <header 
        className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b"
        style={{
          backgroundColor: `${theme.colors.background}40`,
          borderColor: `${theme.colors.border}40`,
        }}
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-4 py-3 sm:py-4 flex items-center justify-between gap-2">
          <motion.button
            onClick={() => {
              track('ai_twin_opened', { source: 'header' });
              router.push('/chat');
            }}
            className="flex items-center gap-2 px-3 sm:px-6 py-3 rounded-full font-medium shadow-lg text-white flex-shrink-0 whitespace-nowrap"
            style={{ background: theme.buttonGradient }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Ask my AI Twin"
          >
            <Bot className="w-5 h-5" />
            <span className="hidden sm:inline">Ask my AI Twin</span>
          </motion.button>

          <ThemeSlider />

          <motion.a
            href={getImagePath("/resume.pdf")}
            download="Anmol_Bhatia_Resume.pdf"
            onClick={() => track('resume_downloaded', { source: 'header' })}
            className="flex items-center gap-2 px-3 sm:px-6 py-3 rounded-full text-white font-medium shadow-lg flex-shrink-0 whitespace-nowrap"
            style={{ background: theme.buttonGradient }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Download Resume"
          >
            <Download className="w-5 h-5" />
            <span className="hidden sm:inline">Download Resume</span>
          </motion.a>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-24 pb-16 px-4 relative z-10">
        <div className="max-w-7xl mx-auto xl:pr-20">
          {/* Hero Section */}
          <motion.section
            id="about"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-10 sm:mb-16"
          >
            <div className="flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-12">
              {/* Profile Image - Left Side */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="flex-shrink-0"
              >
                <Image
                  src={getImagePath("/portfolio.png")}
                  alt="Anmol Vijay Bhatia"
                  width={280}
                  height={340}
                  className="rounded-2xl w-40 sm:w-56 md:w-[280px] h-auto"
                  priority
                />
              </motion.div>

              {/* Text Content - Right Side */}
              <div className="flex-1 min-w-0 text-center md:text-left w-full md:w-auto">
                <h1
                  className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4"
                  style={{
                    color: theme.colors.primary,
                    textShadow: `0 0 30px ${theme.colors.primary}40`,
                  }}
                >
                  {resumeData.name}
                </h1>
                <p
                  className="text-lg md:text-xl lg:text-2xl font-medium mb-6"
                  style={{ color: theme.colors.foreground }}
                >
                  {resumeData.title}
                </p>
                <p 
                  className="leading-relaxed text-base md:text-lg mb-8"
                  style={{ 
                    color: theme.colors.foreground, 
                    opacity: themeName === 'empire' || themeName === 'hyperspace' ? 0.95 : (themeName === 'outerrim' ? 0.95 : 0.8)
                  }}
                >
                  {resumeData.summary}
                </p>

                {/* Chat Input Box - Below Text */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="w-full relative z-10"
                >
                  {/* AI twin label */}
                  <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
                    <Bot className="w-4 h-4" style={{ color: theme.colors.primary }} />
                    <span
                      className="text-sm font-semibold"
                      style={{ color: theme.colors.primary }}
                    >
                      Chat with my AI twin
                    </span>
                    <span
                      className="text-xs"
                      style={{ color: theme.colors.foreground, opacity: 0.6 }}
                    >
                      trained on my real background, ask it anything
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="flex-1 min-w-0">
                      <input
                        type="text"
                        value={chatInput}
                        onChange={(e) => setChatInput(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Ask my AI twin about my experience, projects, anything..."
                        className="w-full px-4 py-3 rounded-full backdrop-blur-sm shadow-lg outline-none transition-all text-base"
                        style={{
                          background: theme.colors.cardBg,
                          borderColor: theme.colors.border,
                          borderWidth: 2,
                          color: theme.colors.foreground,
                        }}
                      />
                    </div>
                    
                    <motion.button
                      onClick={handleSendMessage}
                      disabled={!chatInput.trim()}
                      className="w-11 h-11 rounded-full flex items-center justify-center shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0"
                      style={{ background: theme.buttonGradient }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Send className="w-4 h-4 text-white" />
                    </motion.button>
                  </div>

                  {/* Suggested Prompts - Horizontal Scroll */}
                  <div className="flex gap-2 mt-3 overflow-x-auto scrollbar-hide pb-2">
                    {[
                      { label: 'Excellence Award', icon: Trophy, question: 'Tell me about your R&R Awards at Incedo' },
                      { label: 'AI Projects', icon: Bot, question: 'What AI solutions have you built?' },
                      { label: 'AI/ML Enablement Role', icon: Brain, question: 'Tell me about your AI/ML Enablement role' },
                      { label: 'Tech Stack', icon: Code, question: 'What are your technical skills and certifications?' },
                    ].map(({ label, icon: PromptIcon, question }) => (
                      <motion.button
                        key={label}
                        onClick={() => {
                          track('ai_twin_prompt_clicked', { prompt: question, source: 'home' });
                          router.push(`/chat?message=${encodeURIComponent(question)}`);
                        }}
                        className="px-3.5 py-2.5 min-h-[44px] flex items-center gap-1.5 rounded-full text-xs backdrop-blur-sm shadow-sm hover:shadow-md transition-all whitespace-nowrap flex-shrink-0"
                        style={{
                          background: theme.colors.cardBg,
                          borderColor: theme.colors.border,
                          borderWidth: 1,
                        }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <PromptIcon className="w-3.5 h-3.5 flex-shrink-0" style={{ color: theme.colors.primary }} />
                        <span style={{ color: theme.colors.foreground }}>{label}</span>
                      </motion.button>
                    ))}
                  </div>
                </motion.div>

                {/* Social links — inline on mobile/tablet (the floating column is lg+ only) */}
                <div className="flex lg:hidden items-center justify-center md:justify-start gap-3 mt-6">
                  <a
                    href={resumeData.github || 'https://github.com/abhati27'}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub"
                    onClick={() => track('social_clicked', { network: 'github' })}
                    className="w-11 h-11 rounded-full flex items-center justify-center shadow-lg text-white"
                    style={{ background: theme.buttonGradient }}
                  >
                    <Github className="w-5 h-5" />
                  </a>
                  <a
                    href={resumeData.linkedin || 'https://linkedin.com/in/anmol-vb'}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn"
                    onClick={() => track('social_clicked', { network: 'linkedin' })}
                    className="w-11 h-11 rounded-full flex items-center justify-center shadow-lg text-white"
                    style={{ background: theme.buttonGradient }}
                  >
                    <Linkedin className="w-5 h-5" />
                  </a>
                  <a
                    href={`mailto:${resumeData.email}`}
                    aria-label="Email"
                    onClick={() => track('social_clicked', { network: 'email' })}
                    className="w-11 h-11 rounded-full flex items-center justify-center shadow-lg text-white"
                    style={{ background: theme.buttonGradient }}
                  >
                    <Mail className="w-5 h-5" />
                  </a>
                  {resumeData.phone && (
                    <a
                      href={`tel:${resumeData.phone}`}
                      aria-label="Phone"
                      onClick={() => track('social_clicked', { network: 'phone' })}
                      className="w-11 h-11 rounded-full flex items-center justify-center shadow-lg text-white"
                      style={{ background: theme.buttonGradient }}
                    >
                      <Phone className="w-5 h-5" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </motion.section>

          {/* Skills Section */}
          <motion.section
            id="skills"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-10 sm:mb-16"
          >
            <div className="flex items-center gap-3 mb-4 sm:mb-6">
              <Code className="w-6 h-6 sm:w-8 sm:h-8" style={{ color: theme.colors.primary }} />
              <h2
                className="text-2xl sm:text-3xl font-bold"
                style={{ color: theme.colors.foreground }}
              >
                Technical Skills
              </h2>
            </div>
            <div className="flex flex-wrap gap-3">
              {resumeData.skills.map((skill, index) => (
                <motion.span
                  key={skill}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.02 }}
                  className="px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-sm sm:text-base font-medium shadow-md backdrop-blur-sm"
                  style={{
                    background: theme.colors.cardBg,
                    color: theme.colors.foreground,
                    borderColor: theme.colors.border,
                    borderWidth: 1,
                  }}
                  whileHover={{ scale: 1.05, y: -2 }}
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </motion.section>

          {/* Experience Section */}
          <motion.section
            id="experience"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-10 sm:mb-16"
          >
            <div className="flex items-center gap-3 mb-4 sm:mb-6">
              <Briefcase className="w-6 h-6 sm:w-8 sm:h-8" style={{ color: theme.colors.primary }} />
              <h2
                className="text-2xl sm:text-3xl font-bold"
                style={{ color: theme.colors.foreground }}
              >
                Work Experience
              </h2>
            </div>
            <div className="space-y-6">
              {resumeData.experience.map((exp, index) => (
                <motion.div
                  key={exp.id}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-6 rounded-2xl shadow-lg backdrop-blur-sm"
                  style={{ background: theme.colors.cardBg }}
                  whileHover={{ x: 10 }}
                >
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3
                        className="text-xl font-bold"
                        style={{ color: theme.colors.foreground }}
                      >
                        {exp.title}
                      </h3>
                      <p className="text-lg" style={{ color: theme.colors.primary }}>
                        {exp.company}
                      </p>
                    </div>
                    <span 
                      className="text-sm font-medium"
                      style={{ 
                        color: themeName === 'empire' || themeName === 'hyperspace' ? '#CCCCCC' : (themeName === 'outerrim' ? '#2D3748' : '#718096')
                      }}
                    >
                      {exp.period}
                    </span>
                  </div>
                  <p 
                    className="mb-4"
                    style={{ 
                      color: themeName === 'empire' || themeName === 'hyperspace' ? '#CCCCCC' : (themeName === 'outerrim' ? '#2D3748' : '#718096'),
                      opacity: 0.95
                    }}
                  >
                    {exp.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {exp.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1 rounded-full text-xs font-medium"
                        style={{
                          background: `${theme.colors.primary}20`,
                          color: theme.colors.foreground,
                        }}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Projects Section */}
          <motion.section
            id="projects"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-10 sm:mb-16"
          >
            <div className="flex items-center gap-3 mb-4 sm:mb-6">
              <Award className="w-6 h-6 sm:w-8 sm:h-8" style={{ color: theme.colors.primary }} />
              <h2
                className="text-2xl sm:text-3xl font-bold"
                style={{ color: theme.colors.foreground }}
              >
                Featured Projects
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {resumeData.projects.map((project, index) => (
                <ProjectCard key={project.id} project={project} index={index} />
              ))}
            </div>
          </motion.section>

          {/* Education Section */}
          <motion.section
            id="education"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className="flex items-center gap-3 mb-4 sm:mb-6">
              <GraduationCap className="w-6 h-6 sm:w-8 sm:h-8" style={{ color: theme.colors.primary }} />
              <h2
                className="text-2xl sm:text-3xl font-bold"
                style={{ color: theme.colors.foreground }}
              >
                Education
              </h2>
            </div>
            <div className="space-y-4">
              {resumeData.education.map((edu, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-6 rounded-2xl shadow-lg backdrop-blur-sm"
                  style={{ background: theme.colors.cardBg }}
                >
                  <h3
                    className="text-xl font-bold mb-1"
                    style={{ color: theme.colors.foreground }}
                  >
                    {edu.degree}
                  </h3>
                  <p style={{ color: theme.colors.primary }}>{edu.school}</p>
                  <p 
                    className="text-sm"
                    style={{ 
                      color: themeName === 'empire' || themeName === 'hyperspace' ? '#CCCCCC' : (themeName === 'outerrim' ? '#2D3748' : '#718096')
                    }}
                  >
                    {edu.year}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Awards & Certifications Section */}
          <motion.section
            id="awards"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mb-10 sm:mb-16 mt-10 sm:mt-16"
          >
            <div className="flex items-center gap-3 mb-4 sm:mb-6">
              <Trophy className="w-6 h-6 sm:w-8 sm:h-8" style={{ color: theme.colors.primary }} />
              <h2
                className="text-2xl sm:text-3xl font-bold"
                style={{ color: theme.colors.foreground }}
              >
                Awards & Certifications
              </h2>
            </div>
            <div className="space-y-4">
              {additionalInfo.awards.map((award, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-6 rounded-2xl shadow-lg backdrop-blur-sm border-2"
                  style={{ 
                    background: theme.colors.cardBg,
                    borderColor: theme.colors.primary,
                  }}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className="p-3 rounded-full"
                      style={{ background: `${theme.colors.primary}20` }}
                    >
                      <Star className="w-6 h-6" style={{ color: theme.colors.primary }} />
                    </div>
                    <div className="flex-1">
                      <h3
                        className="text-xl font-bold mb-2"
                        style={{ color: theme.colors.primary }}
                      >
                        {award.name}
                      </h3>
                      <p 
                        className="font-medium mb-2"
                        style={{ color: theme.colors.foreground }}
                      >
                        {award.organization} • {award.date}
                      </p>
                      <p 
                        className="text-sm mb-2"
                        style={{ 
                          color: themeName === 'empire' || themeName === 'hyperspace' ? '#CCCCCC' : (themeName === 'outerrim' ? '#2D3748' : '#718096'),
                          opacity: 0.95
                        }}
                      >
                        {award.description}
                      </p>
                      {award.quote && (
                        <p 
                          className="text-sm italic mt-3 pt-3 border-t"
                          style={{ 
                            color: theme.colors.primary,
                            borderColor: `${theme.colors.primary}30`,
                          }}
                        >
                          {award.quote}
                        </p>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
              {additionalInfo.certifications.map((cert, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: (additionalInfo.awards.length + index) * 0.1 }}
                  className="p-6 rounded-2xl shadow-lg backdrop-blur-sm"
                  style={{ background: theme.colors.cardBg }}
                >
                  <h3
                    className="text-lg font-bold mb-1"
                    style={{ color: theme.colors.foreground }}
                  >
                    {cert.name}
                  </h3>
                  <p 
                    className="text-sm font-medium mb-2"
                    style={{ color: theme.colors.primary }}
                  >
                    {cert.issuer} • {cert.date}
                  </p>
                  <p 
                    className="text-sm"
                    style={{ 
                      color: themeName === 'empire' || themeName === 'hyperspace' ? '#CCCCCC' : (themeName === 'outerrim' ? '#2D3748' : '#718096'),
                      opacity: 0.95
                    }}
                  >
                    {cert.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Volunteering Section */}
          <motion.section
            id="volunteering"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mb-10 sm:mb-16"
          >
            <div className="flex items-center gap-3 mb-4 sm:mb-6">
              <Heart className="w-6 h-6 sm:w-8 sm:h-8" style={{ color: theme.colors.primary }} />
              <h2
                className="text-2xl sm:text-3xl font-bold"
                style={{ color: theme.colors.foreground }}
              >
                Volunteering & Leadership
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {additionalInfo.volunteering.map((vol, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-6 rounded-2xl shadow-lg backdrop-blur-sm"
                  style={{ background: theme.colors.cardBg }}
                  whileHover={{ y: -4, scale: 1.02 }}
                >
                  <h3
                    className="text-lg font-bold mb-1"
                    style={{ color: theme.colors.foreground }}
                  >
                    {vol.role}
                  </h3>
                  <p 
                    className="text-sm font-medium mb-2"
                    style={{ color: theme.colors.primary }}
                  >
                    {vol.organization}
                    {vol.location && ` • ${vol.location}`}
                  </p>
                  {vol.period && (
                    <p 
                      className="text-xs mb-2"
                      style={{ 
                        color: themeName === 'empire' || themeName === 'hyperspace' ? '#CCCCCC' : (themeName === 'outerrim' ? '#2D3748' : '#718096')
                      }}
                    >
                      {vol.period}
                    </p>
                  )}
                  <p 
                    className="text-sm"
                    style={{ 
                      color: themeName === 'empire' || themeName === 'hyperspace' ? '#CCCCCC' : (themeName === 'outerrim' ? '#2D3748' : '#718096'),
                      opacity: 0.95
                    }}
                  >
                    {vol.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.section>
        </div>
      </main>

      {/* Floating Social Icons - Bottom Left (lg+ only; mobile/tablet use the inline row in the hero) */}
      <motion.div
        className="fixed bottom-8 left-8 hidden lg:flex flex-col gap-4 z-50"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5 }}
      >
        <div className="relative group">
          <motion.a
            href={resumeData.github || 'https://github.com/abhati27'}
            target="_blank"
            rel="noopener noreferrer"
            className="w-14 h-14 rounded-full flex items-center justify-center shadow-2xl text-white backdrop-blur-sm"
            style={{ background: theme.buttonGradient }}
            whileHover={{ scale: 1.15, rotate: 5 }}
            whileTap={{ scale: 0.9 }}
          >
            <Github className="w-6 h-6" />
          </motion.a>
          <div className="absolute left-16 top-1/2 -translate-y-1/2 px-3 py-2 rounded-lg text-sm font-medium text-white whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-xl backdrop-blur-sm z-50"
            style={{ background: theme.colors.cardBg }}
          >
            <span style={{ color: theme.colors.foreground }}>GitHub</span>
          </div>
        </div>
        
        <div className="relative group">
          <motion.a
            href={resumeData.linkedin || 'https://linkedin.com/in/anmol-bhatia'}
            target="_blank"
            rel="noopener noreferrer"
            className="w-14 h-14 rounded-full flex items-center justify-center shadow-2xl text-white backdrop-blur-sm"
            style={{ background: theme.buttonGradient }}
            whileHover={{ scale: 1.15, rotate: 5 }}
            whileTap={{ scale: 0.9 }}
          >
            <Linkedin className="w-6 h-6" />
          </motion.a>
          <div className="absolute left-16 top-1/2 -translate-y-1/2 px-3 py-2 rounded-lg text-sm font-medium text-white whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-xl backdrop-blur-sm z-50"
            style={{ background: theme.colors.cardBg }}
          >
            <span style={{ color: theme.colors.foreground }}>LinkedIn</span>
          </div>
        </div>
        
        <div className="relative group">
          <motion.a
            href={`mailto:${resumeData.email}`}
            className="w-14 h-14 rounded-full flex items-center justify-center shadow-2xl text-white backdrop-blur-sm"
            style={{ background: theme.buttonGradient }}
            whileHover={{ scale: 1.15, rotate: 5 }}
            whileTap={{ scale: 0.9 }}
          >
            <Mail className="w-6 h-6" />
          </motion.a>
          <div className="absolute left-16 top-1/2 -translate-y-1/2 px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-xl backdrop-blur-sm z-50"
            style={{ background: theme.colors.cardBg }}
          >
            <span style={{ color: theme.colors.foreground }}>{resumeData.email}</span>
          </div>
        </div>
        
        {resumeData.phone && (
          <div className="relative group">
            <motion.a
              href={`tel:${resumeData.phone}`}
              className="w-14 h-14 rounded-full flex items-center justify-center shadow-2xl text-white backdrop-blur-sm"
              style={{ background: theme.buttonGradient }}
              whileHover={{ scale: 1.15, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
            >
              <Phone className="w-6 h-6" />
            </motion.a>
            <div className="absolute left-16 top-1/2 -translate-y-1/2 px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-xl backdrop-blur-sm z-50"
              style={{ background: theme.colors.cardBg }}
            >
              <span style={{ color: theme.colors.foreground }}>{resumeData.phone}</span>
            </div>
          </div>
        )}
      </motion.div>

      {/* Floating Chat Button - Bottom Right */}
      <motion.div
        className="fixed bottom-8 right-8 z-50 group"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5 }}
      >
        {/* Tooltip */}
        <div
          className="absolute right-20 top-1/2 -translate-y-1/2 px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-xl backdrop-blur-sm"
          style={{ background: theme.colors.cardBg }}
        >
          <span style={{ color: theme.colors.foreground }}>Ask my AI twin</span>
        </div>

        <motion.button
          onClick={() => {
            track('ai_twin_opened', { source: 'floating' });
            router.push('/chat');
          }}
          className="w-16 h-16 rounded-full flex items-center justify-center shadow-2xl text-white relative"
          style={{ background: theme.buttonGradient }}
          whileHover={{ scale: 1.1, rotate: 5 }}
          whileTap={{ scale: 0.9 }}
        >
          <Bot className="w-7 h-7" />
          {/* AI badge */}
          <span
            className="absolute -top-1 -right-1 px-1.5 py-0.5 rounded-full text-[10px] font-bold shadow-md"
            style={{ background: theme.colors.foreground, color: theme.colors.background }}
          >
            AI
          </span>
        </motion.button>
      </motion.div>
    </div>
  );
}



/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
// Copyright 2024 Google LLC

// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at

//     https://www.apache.org/licenses/LICENSE-2.0

// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import {useState, useEffect} from 'react';

// Translations for UI elements
const translations = {
  en: {
    siteTitle: 'The Modern Dev',
    navHome: 'Home',
    navAbout: 'About',
    navContact: 'Contact',
    toggleTheme: 'Toggle theme',
    toggleLanguage: 'Toggle language',
    byAuthor: 'By',
    footerTwitter: 'Twitter',
    footerGitHub: 'GitHub',
    footerLinkedIn: 'LinkedIn',
    footerRights: '© 2024 The Modern Dev. All rights reserved.',
  },
  zh: {
    siteTitle: '现代开发者',
    navHome: '首页',
    navAbout: '关于',
    navContact: '联系我',
    toggleTheme: '切换主题',
    toggleLanguage: '切换语言',
    byAuthor: '作者：',
    footerTwitter: '推特',
    footerGitHub: '代码仓库',
    footerLinkedIn: '领英',
    footerRights: '© 2024 The Modern Dev. 版权所有。',
  },
};

// Mock data for blog posts with bilingual content
const mockPosts = [
  {
    id: 1,
    category: { en: 'Technology', zh: '技术' },
    title: { en: 'The Future of Frontend Development', zh: '前端开发的未来' },
    excerpt: { en: 'Exploring the latest trends and tools that are shaping the future of web development, from new JavaScript frameworks to the rise of serverless.', zh: '探索塑造 Web 开发未来的最新趋势和工具，从新的 JavaScript 框架到无服务器的兴起。' },
    author: { en: 'Jane Doe', zh: '张三' },
    date: 'Oct 26, 2023',
    imageUrl: 'data:image/svg+xml,%3Csvg width="600" height="400" xmlns="http://www.w3.org/2000/svg"%3E%3Crect width="600" height="400" fill="%23e2e8f0"/%3E%3C/svg%3E',
    featured: true,
  },
  {
    id: 2,
    category: { en: 'Design', zh: '设计' },
    title: { en: 'UI/UX Principles for Modern Apps', zh: '现代应用的 UI/UX 原则' },
    excerpt: { en: 'A deep dive into the core principles of great user interface and user experience design that can make your applications stand out.', zh: '深入探讨优秀用户界面和用户体验设计的核心原则，这些原则可以让您的应用程序脱颖而出。' },
    author: { en: 'John Smith', zh: '李四' },
    date: 'Oct 22, 2023',
    imageUrl: 'data:image/svg+xml,%3Csvg width="400" height="250" xmlns="http://www.w3.org/2000/svg"%3E%3Crect width="400" height="250" fill="%23e2e8f0"/%3E%3C/svg%3E',
  },
  {
    id: 3,
    category: { en: 'Productivity', zh: '效率' },
    title: { en: '10 Tips for Staying Productive as a Developer', zh: '作为开发者保持高效的 10 个技巧' },
    excerpt: { en: 'Practical advice and strategies to help developers maintain focus, manage their time effectively, and avoid burnout.', zh: '为开发者提供的实用建议和策略，帮助他们保持专注、有效管理时间并避免职业倦怠。' },
    author: { en: 'Emily White', zh: '王五' },
    date: 'Oct 18, 2023',
    imageUrl: 'data:image/svg+xml,%3Csvg width="400" height="250" xmlns="http://www.w3.org/2000/svg"%3E%3Crect width="400" height="250" fill="%23e2e8f0"/%3E%3C/svg%3E',
  },
  {
    id: 4,
    category: { en: 'Career', zh: '职业' },
    title: { en: 'Navigating Your Tech Career Path', zh: '规划你的技术职业道路' },
    excerpt: { en: 'Insights on how to grow as a software engineer, from choosing a specialization to preparing for technical interviews.', zh: '关于如何作为一名软件工程师成长的见解，从选择专业到准备技术面试。' },
    author: { en: 'Michael Brown', zh: '赵六' },
    date: 'Oct 15, 2023',
    imageUrl: 'data:image/svg+xml,%3Csvg width="400" height="250" xmlns="http://www.w3.org/2000/svg"%3E%3Crect width="400" height="250" fill="%23e2e8f0"/%3E%3C/svg%3E',
  },
];

export default function App() {
  const [theme, setTheme] = useState('light');
  const [language, setLanguage] = useState('en');

  // Set initial theme based on user's system preference
  useEffect(() => {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setTheme(prefersDark ? 'dark' : 'light');
  }, []);
  
  // Set initial language based on browser preference
  useEffect(() => {
    const browserLang = navigator.language || (navigator as any).userLanguage;
    setLanguage(browserLang.startsWith('zh') ? 'zh' : 'en');
  }, []);

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  const toggleLanguage = () => {
    setLanguage(prevLang => (prevLang === 'en' ? 'zh' : 'en'));
  };
  
  const t = translations[language];
  const featuredPost = mockPosts.find(p => p.featured);
  const regularPosts = mockPosts.filter(p => !p.featured);

  return (
    <div className={`blog-app ${theme}`}>
      <div className="container">
        <header className="site-header">
          <h1 className="site-title">{t.siteTitle}</h1>
          <nav className="main-nav">
            <a href="#">{t.navHome}</a>
            <a href="#">{t.navAbout}</a>
            <a href="#">{t.navContact}</a>
          </nav>
          <div className="header-actions">
            <button onClick={toggleLanguage} className="language-toggle" aria-label={t.toggleLanguage}>
              {language === 'en' ? '中文' : 'EN'}
            </button>
            <button onClick={toggleTheme} className="theme-toggle" aria-label={t.toggleTheme}>
              <span className="icon">{theme === 'light' ? 'dark_mode' : 'light_mode'}</span>
            </button>
          </div>
        </header>

        <main className="main-content">
          {featuredPost && (
            <article className="featured-post">
              <div className="featured-post-image">
                <img src={featuredPost.imageUrl} alt={featuredPost.title[language]} />
              </div>
              <div className="featured-post-content">
                <span className="post-category">{featuredPost.category[language]}</span>
                <h2 className="post-title">{featuredPost.title[language]}</h2>
                <p className="post-excerpt">{featuredPost.excerpt[language]}</p>
                <div className="post-meta">
                  <span>{t.byAuthor} {featuredPost.author[language]}</span>
                  <time dateTime={featuredPost.date}>{featuredPost.date}</time>
                </div>
              </div>
            </article>
          )}

          <div className="post-grid">
            {regularPosts.map(post => (
              <article key={post.id} className="post-card">
                <div className="post-card-image">
                    <img src={post.imageUrl} alt={post.title[language]} />
                </div>
                <div className="post-card-content">
                  <span className="post-category">{post.category[language]}</span>
                  <h3 className="post-title">{post.title[language]}</h3>
                  <p className="post-excerpt">{post.excerpt[language]}</p>
                  <div className="post-meta">
                    <time dateTime={post.date}>{post.date}</time>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </main>

        <footer className="site-footer">
          <div className="social-links">
            <a href="#">{t.footerTwitter}</a>
            <a href="#">{t.footerGitHub}</a>
            <a href="#">{t.footerLinkedIn}</a>
          </div>
          <p>{t.footerRights}</p>
        </footer>
      </div>
    </div>
  );
}
import React, { useState, useEffect } from 'react';
import { Menu, X, Phone, MapPin, Facebook, Trophy, Calendar, Star } from 'lucide-react';
import './App.css';
import logoImage from './gallery/logo.png';
import posterImage from './gallery/poster-1433.png';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setIsMenuOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  return (
    <div className="app-root">
      {/* Announcement Banner */}
      <div className="announcement-banner">
        <div className="banner-track">
          <span>🎊&nbsp; রেজিস্ট্রেশন শুরু হয়েছে! &nbsp;|&nbsp; এখনই যোগাযোগ করুন: +91 6289 492 935 &nbsp;|&nbsp; সেরা পুজো ১৪৩৩ &nbsp;|&nbsp; স্বপ্নতরী পরিবারের উদ্যোগে &nbsp;|&nbsp; চুঁচুড়া ও ব্যান্ডেল এলাকার পুজো &nbsp;|&nbsp; প্রবেশমূল্য ₹৫০০ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
          <span>🎊&nbsp; রেজিস্ট্রেশন শুরু হয়েছে! &nbsp;|&nbsp; এখনই যোগাযোগ করুন: +91 6289 492 935 &nbsp;|&nbsp; সেরা পুজো ১৪৩৩ &nbsp;|&nbsp; স্বপ্নতরী পরিবারের উদ্যোগে &nbsp;|&nbsp; চুঁচুড়া ও ব্যান্ডেল এলাকার পুজো &nbsp;|&nbsp; প্রবেশমূল্য ₹৫০০ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
        </div>
      </div>

      {/* Header */}
      <header className="glass-header">
        <nav className="nav-inner">
          <div className="nav-logo-container" onClick={() => scrollToSection('home')}>
            <img src={logoImage} alt="স্বপ্নতরী Logo" className="nav-logo" />
            <div className="logo-text">স্বপ্নতরী</div>
          </div>
          <div className="desktop-nav">
            <button onClick={() => scrollToSection('home')} className="nav-button">হোম</button>
            <button onClick={() => scrollToSection('competition')} className="nav-button">প্রতিযোগিতা</button>
            <button onClick={() => scrollToSection('prizes')} className="nav-button">পুরস্কার</button>
            <button onClick={() => scrollToSection('contact')} className="nav-button">যোগাযোগ</button>
          </div>
          <button className="mobile-nav-toggle" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </nav>
        {isMenuOpen && (
          <div className="mobile-menu">
            <button onClick={() => scrollToSection('home')} className="mobile-menu-item">হোম</button>
            <button onClick={() => scrollToSection('competition')} className="mobile-menu-item">প্রতিযোগিতা</button>
            <button onClick={() => scrollToSection('prizes')} className="mobile-menu-item">পুরস্কার</button>
            <button onClick={() => scrollToSection('contact')} className="mobile-menu-item">যোগাযোগ</button>
          </div>
        )}
      </header>

      <main>
        {/* Hero Section */}
        <section id="home" className="hero-section">
          <div className="hero-overlay" />
          <div className="hero-content animate-fade-in-up">
            <p className="hero-organizer">স্বপ্নতরী পরিবারের উদ্যোগে</p>
            <h1 className="hero-title">সেরা পুজো</h1>
            <h1 className="hero-year">১৪৩৩</h1>
            <div className="hero-badge animate-float">রেজিস্ট্রেশন শুরু হয়েছে!</div>
            <div className="hero-stats">
              <div className="hero-stat">
                <span className="stat-value">১৬+</span>
                <span className="stat-label">পুরস্কার</span>
              </div>
              <div className="stat-divider" />
              <div className="hero-stat">
                <span className="stat-value">₹৫০০</span>
                <span className="stat-label">প্রবেশমূল্য</span>
              </div>
              <div className="stat-divider" />
              <div className="hero-stat">
                <span className="stat-value">৩</span>
                <span className="stat-label">বিভাগ</span>
              </div>
            </div>
            <div className="hero-buttons">
              <a href="https://forms.gle/B46FtamY4rJNJf8UA" target="_blank" rel="noopener noreferrer" className="hero-cta-button animate-pulse-slow">
                এখনই রেজিস্ট্রেশন করুন
              </a>
              <a href="tel:+916289492935" className="hero-secondary-button">
                <Phone size={18} />
                অথবা কল করুন
              </a>
            </div>
          </div>
        </section>

        {/* Schedule Cards */}
        <section className="schedule-section">
          <div className="schedule-grid">
            <div className="schedule-card animate-fade-in-left">
              <div className="schedule-icon"><Calendar size={28} /></div>
              <div>
                <div className="schedule-label">অফলাইন ভিজিট</div>
                <div className="schedule-value">পঞ্চমী ও ষষ্ঠীর দিন</div>
              </div>
            </div>
            <div className="schedule-card schedule-card-gold animate-fade-in-up">
              <div className="schedule-icon"><Trophy size={28} /></div>
              <div>
                <div className="schedule-label">পুরস্কার প্রদান</div>
                <div className="schedule-value">সপ্তমী ও অষ্টমীর দিন</div>
              </div>
            </div>
            <div className="schedule-card animate-fade-in-right">
              <div className="schedule-icon"><MapPin size={28} /></div>
              <div>
                <div className="schedule-label">এলাকা</div>
                <div className="schedule-value">চুঁচুড়া ও ব্যান্ডেল</div>
              </div>
            </div>
          </div>
        </section>

        {/* Poster Section */}
        <section className="poster-section">
          <div className="poster-container">
            <img src={posterImage} alt="সেরা পুজো ১৪৩৩ পোস্টার" className="poster-image" />
          </div>
        </section>

        {/* Competition Details */}
        <section id="competition" className="competition-section">
          <div className="section-container">
            <h2 className="section-title animate-fade-in-up">প্রতিযোগিতার বিবরণ</h2>

            <div className="info-card animate-scale-in">
              <div className="info-card-header">
                <span className="info-icon">🎊</span>
                <h3>সেরা পুজো ১৪৩৩ সম্পর্কে</h3>
              </div>
              <p className="info-text">
                শারদোৎসবকে আরও আনন্দময় ও প্রতিযোগিতামূলক করে তুলতে আমাদের স্বপ্নতরী পরিবারের পক্ষ থেকে আবারও আয়োজন করা হয়েছে <strong>"সেরা পুজো ১৪৩৩"</strong> প্রতিযোগিতার।
              </p>

              <div className="details-grid">
                <div className="detail-pill">
                  <span className="detail-icon">🔥</span>
                  <div>
                    <div className="detail-title">অংশগ্রহণকারী</div>
                    <div className="detail-desc">বারোয়ারি / ক্লাবের পুজো কমিটি এবং বাড়ির পুজো</div>
                  </div>
                </div>
                <div className="detail-pill detail-pill-gold">
                  <span className="detail-icon">💰</span>
                  <div>
                    <div className="detail-title">প্রবেশমূল্য</div>
                    <div className="detail-desc">₹৫০০ প্রতি পুজো</div>
                  </div>
                </div>
                <div className="detail-pill">
                  <span className="detail-icon">📍</span>
                  <div>
                    <div className="detail-title">প্রযোজ্য এলাকা</div>
                    <div className="detail-desc">চুঁচুড়া ও ব্যান্ডেল এলাকার পুজো</div>
                  </div>
                </div>
                <div className="detail-pill detail-pill-gold">
                  <span className="detail-icon">🎁</span>
                  <div>
                    <div className="detail-title">মোট পুরস্কার</div>
                    <div className="detail-desc">১৬টি পুরস্কার (বৃদ্ধি হতে পারে)</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Rules */}
            <div className="rules-card animate-fade-in-up">
              <h3 className="rules-title">
                <span>📋</span> নিয়মাবলী ও বিবরণ
              </h3>
              <ul className="rules-list">
                <li>বিচারকমণ্ডলী নির্ধারিত দিনে (<strong>পঞ্চমী ও ষষ্ঠী</strong>) সরাসরি পুজো পরিদর্শন করবেন</li>
                <li>প্রতিযোগীর সংখ্যা ও অংশগ্রহণের ভিত্তিতে পুরস্কারের সংখ্যা আরও বৃদ্ধি করা হতে পারে</li>
                <li>পুরস্কার বিতরণ হবে <strong>সপ্তমী ও অষ্টমীর দিন</strong></li>
                <li>ফর্ম পূরণ হয়ে গেলে WhatsApp গ্রুপে যোগ করা হবে — সমস্ত তথ্য সেখানেই দেওয়া হবে</li>
                <li>শুধুমাত্র <strong>চুঁচুড়া ও ব্যান্ডেল</strong> এলাকার পুজো কমিটি এবং বাড়ির পুজোর জন্য প্রযোজ্য</li>
                <li className="rules-important">বিচারকমণ্ডলীর সিদ্ধান্তই চূড়ান্ত সিদ্ধান্ত হিসেবে গণ্য হবে</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Prizes Section */}
        <section id="prizes" className="prizes-section">
          <div className="section-container">
            <h2 className="section-title section-title-light animate-fade-in-up">পুরস্কারের বিভাগসমূহ</h2>
            <p className="prizes-subtitle">মোট ১৬টি পুরস্কার • সেরার সেরা ১৪৩৩</p>

            <div className="prizes-grid">
              {/* বিভাগ ক */}
              <div className="prize-category-card animate-fade-in-left">
                <div className="category-header">
                  <div className="category-badge">বিভাগ 'ক'</div>
                  <p className="category-budget">বাজেট ₹৫ লক্ষের বেশি</p>
                </div>
                <div className="award-group">
                  <div className="award-type">
                    <span className="award-type-icon">🏅</span>
                    <span className="award-type-name">মণ্ডপ</span>
                  </div>
                  <div className="medal-list">
                    <div className="medal-item gold">🥇 প্রথম</div>
                    <div className="medal-item silver">🥈 দ্বিতীয়</div>
                    <div className="medal-item bronze">🥉 তৃতীয়</div>
                  </div>
                </div>
                <div className="award-divider" />
                <div className="award-group">
                  <div className="award-type">
                    <span className="award-type-icon">🪔</span>
                    <span className="award-type-name">প্রতিমা</span>
                  </div>
                  <div className="medal-list">
                    <div className="medal-item gold">🥇 প্রথম</div>
                    <div className="medal-item silver">🥈 দ্বিতীয়</div>
                    <div className="medal-item bronze">🥉 তৃতীয়</div>
                  </div>
                </div>
              </div>

              {/* বিভাগ খ */}
              <div className="prize-category-card animate-fade-in-up">
                <div className="category-header">
                  <div className="category-badge">বিভাগ 'খ'</div>
                  <p className="category-budget">বাজেট ₹৫ লক্ষের কম</p>
                </div>
                <div className="award-group">
                  <div className="award-type">
                    <span className="award-type-icon">🏅</span>
                    <span className="award-type-name">মণ্ডপ</span>
                  </div>
                  <div className="medal-list">
                    <div className="medal-item gold">🥇 প্রথম</div>
                    <div className="medal-item silver">🥈 দ্বিতীয়</div>
                    <div className="medal-item bronze">🥉 তৃতীয়</div>
                  </div>
                </div>
                <div className="award-divider" />
                <div className="award-group">
                  <div className="award-type">
                    <span className="award-type-icon">🪔</span>
                    <span className="award-type-name">প্রতিমা</span>
                  </div>
                  <div className="medal-list">
                    <div className="medal-item gold">🥇 প্রথম</div>
                    <div className="medal-item silver">🥈 দ্বিতীয়</div>
                    <div className="medal-item bronze">🥉 তৃতীয়</div>
                  </div>
                </div>
              </div>

              {/* বাড়ির পুজো */}
              <div className="prize-category-card animate-fade-in-right">
                <div className="category-header">
                  <div className="category-badge category-badge-alt">বাড়ির পুজো</div>
                  <p className="category-budget">গৃহস্থ পুজো বিভাগ</p>
                </div>
                <div className="award-group">
                  <div className="award-type">
                    <span className="award-type-icon">🏠</span>
                    <span className="award-type-name">বাড়ির পুজো</span>
                  </div>
                  <div className="medal-list">
                    <div className="medal-item gold">🥇 প্রথম</div>
                    <div className="medal-item silver">🥈 দ্বিতীয়</div>
                    <div className="medal-item bronze">🥉 তৃতীয়</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Grand Prize */}
            <div className="grand-prize-card animate-scale-in">
              <div className="grand-prize-glow" />
              <div className="grand-prize-content">
                <div className="grand-prize-crown">👑</div>
                <h3 className="grand-prize-title">সর্বোচ্চ সম্মান</h3>
                <h2 className="grand-prize-name">সেরার সেরা ১৪৩৩</h2>
                <p className="grand-prize-desc">
                  সমস্ত প্রতিযোগী পুজোর মধ্যে থেকে নির্বাচন করা হবে এবারের "সেরার সেরা ১৪৩৩"
                </p>
                <div className="grand-prize-stars">
                  <Star size={16} fill="currentColor" />
                  <Star size={20} fill="currentColor" />
                  <Star size={24} fill="currentColor" />
                  <Star size={20} fill="currentColor" />
                  <Star size={16} fill="currentColor" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="contact-section">
          <div className="section-container">
            <h2 className="section-title animate-fade-in-up">যোগাযোগ করুন</h2>
            <div className="contact-card animate-scale-in">
              <div className="contact-grid">
                <div className="contact-info-block animate-fade-in-left">
                  <div className="contact-logo-wrap animate-float">
                    <img src={logoImage} alt="স্বপ্নতরী" className="contact-logo" />
                  </div>
                  <h3 className="contact-brand">স্বপ্নতরী</h3>
                  <p className="contact-tagline">সেরা পুজো ১৪৩৩ আয়োজক</p>
                  <a
                    href="https://www.facebook.com/groups/766326619283876"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="facebook-button"
                  >
                    <Facebook size={20} />
                    আমাদের ফেসবুক গ্রুপ
                  </a>
                </div>

                <div className="contact-details-block animate-fade-in-right">
                  <h3 className="contact-cta-title">তাহলে আর দেরি কেন?</h3>
                  <p className="contact-cta-text">
                    আপনার পুজোকে অংশগ্রহণ করান "সেরা পুজো ১৪৩৩"-এ এবং হয়ে উঠুন এবারের সেরাদের সেরা!
                  </p>

                  <div className="contact-items">
                    <a href="https://forms.gle/B46FtamY4rJNJf8UA" target="_blank" rel="noopener noreferrer" className="contact-item contact-item-register">
                      <div className="contact-item-icon contact-item-icon-gold">📋</div>
                      <div>
                        <div className="contact-item-label">অনলাইন রেজিস্ট্রেশন</div>
                        <div className="contact-item-value">ফর্ম পূরণ করুন এখানে</div>
                      </div>
                    </a>
                    <a href="tel:+916289492935" className="contact-item contact-item-phone">
                      <div className="contact-item-icon"><Phone size={22} /></div>
                      <div>
                        <div className="contact-item-label">অথবা কল করুন</div>
                        <div className="contact-item-value">+91 6289 492 935</div>
                      </div>
                    </a>
                    <div className="contact-item">
                      <div className="contact-item-icon"><MapPin size={22} /></div>
                      <div>
                        <div className="contact-item-label">অবস্থান</div>
                        <div className="contact-item-value">চুঁচুড়া ও ব্যান্ডেল, হুগলি</div>
                      </div>
                    </div>
                  </div>

                  <div className="contact-note">
                    🎯 প্রতিযোগীর সংখ্যার ভিত্তিতে পুরস্কারের সংখ্যা আরও বৃদ্ধি করা হতে পারে
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="footer-inner">
          <img src={logoImage} alt="স্বপ্নতরী" className="footer-logo" />
          <p className="footer-text">সেরা পুজো ১৪৩৩ • স্বপ্নতরী পরিবার</p>
          <p className="footer-copy">&copy; {new Date().getFullYear()} স্বপ্নতরী। সর্বস্বত্ব সংরক্ষিত।</p>
        </div>
      </footer>
    </div>
  );
}

export default App;

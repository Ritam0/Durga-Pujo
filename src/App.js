import React, { useState, useEffect } from 'react';
import { Menu, X, Mail, Phone, MapPin, Facebook } from 'lucide-react';
import './App.css';
import logoImage from './gallery/logo.png';

// Main App Component
function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    pujaName: '',
    contactName: '',
    mobile: '',
    email: '',
    address: '',
  });
  const [status, setStatus] = useState('');

  // Function to handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('পাঠানো হচ্ছে...'); // Submitting...

    // IMPORTANT: Replace this URL with your Google Apps Script Web App URL
    const googleAppsScriptUrl = 'https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec';

    try {
      const response = await fetch(googleAppsScriptUrl, {
        method: 'POST',
        body: new URLSearchParams(formData).toString(),
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });

      if (response.ok) {
        setStatus('সফলভাবে জমা দেওয়া হয়েছে! ধন্যবাদ।'); // Submitted successfully! Thank you.
        setFormData({
          pujaName: '',
          contactName: '',
          mobile: '',
          email: '',
          address: '',
        });
      } else {
        setStatus('জমা দিতে ব্যর্থ। আবার চেষ্টা করুন।'); // Failed to submit. Try again.
      }
    } catch (error) {
      console.error('Submission error:', error);
      setStatus('নেটওয়ার্ক ত্রুটি। আবার চেষ্টা করুন।'); // Network error. Try again.
    }
  };

  // Close modal on 'Escape' key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsModalOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Smooth scroll function
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  return (
    <div style={{ backgroundColor: '#FFF8E8', color: '#6B5B47', fontFamily: 'Noto Sans Bengali, Inter, sans-serif' }}>
      {/* Header */}
      <header className="glass-header" style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50 }}>
        <nav style={{ maxWidth: '1200px', margin: '0 auto', padding: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div className="nav-logo-container" onClick={() => scrollToSection('home')}>
            <img 
              src={logoImage} 
              alt="স্বপ্নতরী Logo" 
              className="nav-logo"
              style={{ 
                width: '45px', 
                height: '45px',
                borderRadius: '50%',
                objectFit: 'cover',
                boxShadow: '0 2px 8px rgba(107, 91, 71, 0.2)'
              }} 
            />
            <div className="logo-text" style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>স্বপ্নতরী</div>
          </div>
          <div style={{ display: 'none' }} className="desktop-nav">
            <button onClick={() => scrollToSection('home')} className="nav-button">হোম</button>
            <button onClick={() => scrollToSection('competition')} className="nav-button">প্রতিযোগিতা</button>
            {/* <button onClick={() => scrollToSection('gallery')} className="nav-button">গ্যালারি</button> */}
            <button onClick={() => scrollToSection('contact')} className="nav-button">যোগাযোগ</button>
          </div>
          <button
            style={{ 
              display: 'flex',
              alignItems: 'center', 
              justifyContent: 'center',
              padding: '0.5rem',
              borderRadius: '0.75rem',
              color: '#BB6653',
              backgroundColor: 'transparent',
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="mobile-nav-toggle"
          >
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </nav>
        {isMenuOpen && (
          <div className="mobile-menu">
            <button onClick={() => scrollToSection('home')} className="mobile-menu-item">হোম</button>
            <button onClick={() => scrollToSection('competition')} className="mobile-menu-item">প্রতিযোগিতা</button>
            {/* <button onClick={() => scrollToSection('gallery')} className="mobile-menu-item">গ্যালারি</button> */}
            <button onClick={() => scrollToSection('contact')} className="mobile-menu-item">যোগাযোগ</button>
          </div>
        )}
      </header>

      <main style={{ paddingTop: '5rem' }}>
        {/* Hero Section */}
        <section id="home" className="hero-section animate-fade-in-up">
          <div className="hero-content">
            <h1 className="hero-title">সেরা পুজো ১৪৩২ 🎊</h1>
            <p className="hero-subtitle">স্বপ্নতরী ফেসবুক গ্রুপ কর্তৃক আয়োজিত</p>
            <a
              href="https://forms.gle/EHY52H8XfguJTm8d7"
              target="_blank"
              rel="noopener noreferrer"
              className="hero-cta-button animate-float"
            >
              এখনই অংশগ্রহণ করুন
            </a>
          </div>
        </section>

        {/* Competition Details Section */}
        <section id="competition" className="competition-section" style={{ padding: '6rem 2rem' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <h2 className="section-title animate-fade-in-up">সেরা পুজো ১৪৩২ 🎊</h2>
            <div className="glass-card animate-scale-in" style={{ padding: '3rem' }}>
              <p style={{ fontSize: '1.25rem', lineHeight: '1.7', color: '#4B5563', marginBottom: '2rem', textAlign: 'center', fontWeight: '600' }}>
                আমাদের স্বপ্নতরী ফেসবুক গ্রুপ এর পক্ষ থেকে আয়োজন করা হয়েছে - "সেরা পুজো ১৪৩২" 🎊<br/>
                🔥এই প্রতিযোগিতাটি শুধু মাত্র বারোয়ারি বা ক্লাব এর পুজোর জন্য প্রযোজ্য
              </p>
              
              {/* Entry Fee and Contact */}
              <div style={{ backgroundColor: '#FFF0E0', borderRadius: '1rem', padding: '2rem', marginBottom: '3rem', textAlign: 'center' }}>
                <h3 style={{ color: '#BB6653', marginBottom: '1rem', fontSize: '1.5rem' }}>প্রবেশমূল্য ও যোগাযোগ</h3>
                <p style={{ fontSize: '1.1rem', marginBottom: '1rem' }}>✅ আমাদের প্রতিযোগিতায় অংশগ্রহণ করতে <strong>৩০০/- টাকা</strong> প্রবেশমূল্য লাগছে</p>
                <p style={{ fontSize: '1.1rem', marginBottom: '1rem' }}>📍পুরস্কারে থাকছে চমক</p>
                <p style={{ fontSize: '1.1rem', marginBottom: '1rem' }}>📲 অংশগ্রহণ করতে যোগাযোগ করুন — <strong>+91 62894 92935</strong> এই নম্বরে</p>
                <p style={{ fontSize: '1.1rem' }}>অথবা click করুন আমাদের registration form এ - <a href="https://forms.gle/EHY52H8XfguJTm8d7" target="_blank" rel="noopener noreferrer" style={{ color: '#BB6653', textDecoration: 'underline' }}>https://forms.gle/EHY52H8XfguJTm8d7</a></p>
              </div>

              {/* Awards Section */}
              <div className="competition-grid" style={{ marginBottom: '3rem' }}>
                <div className="competition-card animate-fade-in-left">
                  <h3 style={{ color: '#BB6653', marginBottom: '1.5rem' }}>🏆 মুখ্য পুরস্কার বিভাগ</h3>
                  <ul className="competition-list" style={{ fontSize: '1.1rem', lineHeight: '1.8' }}>
                    <li>⭐ <strong>সেরা প্রতিমা</strong></li>
                    <li>⭐ প্রতিমায় প্রথম, দ্বিতীয়, তৃতীয়</li>
                    <li>⭐ <strong>সেরা মণ্ডপসজ্জা</strong></li>
                    <li>⭐ মণ্ডপসজ্জায় প্রথম, দ্বিতীয়, তৃতীয়</li>
                    <li>⭐ <strong>সেরার সেরা</strong></li>
                  </ul>
                </div>
                <div className="competition-card animate-fade-in-right">
                  <h3 style={{ color: '#BB6653', marginBottom: '1.5rem' }}>🌟 বিশেষ পুরস্কার</h3>
                  <ul className="competition-list" style={{ fontSize: '1.1rem', lineHeight: '1.8' }}>
                    <li>⭐ <strong>৪ টি বিশেষ পুরস্কার</strong></li>
                    <li>⭐ সেরা উদীয়মান</li>
                    <li>⭐ সেরা প্রস্তুতি</li>
                    <li>⭐ সেরা ভাবনা</li>
                    <li>⭐ সেরা মুখশ্রী</li>
                    <li>⭐ সেরা মণ্ডপ শিল্পী</li>
                    <li>⭐ সেরা প্রতিমা শিল্পী</li>
                  </ul>
                </div>
              </div>

              {/* Additional Info */}
              <div style={{ backgroundColor: '#E8F4F8', borderRadius: '1rem', padding: '2rem', marginBottom: '3rem' }}>
                <p style={{ fontSize: '1.1rem', textAlign: 'center', marginBottom: '1rem', fontWeight: '600' }}>🎯 প্রতিযোগী বেশি হলে পুরস্কারের সংখ্যা বাড়ানো হবে</p>
                <p style={{ fontSize: '1.1rem', textAlign: 'center', fontWeight: '600', color: '#BB6653' }}>💯 বিচারকের সিদ্ধান্ত চূড়ান্ত সিদ্ধান্ত হিসাবে গ্রহণ করতে হবে</p>
              </div>

              {/* Rules Section */}
              <div className="competition-card" style={{ marginBottom: '0' }}>
                <h3 style={{ color: '#BB6653', marginBottom: '1.5rem', textAlign: 'center' }}>নিয়মাবলী</h3>
                <ul className="competition-list" style={{ fontSize: '1.1rem', lineHeight: '1.8' }}>
                  <li><strong>১.</strong> প্রতিযোগিতা হবে অনলাইন এ</li>
                  <li><strong>২.</strong> ছবি ভিডিও submit করতে হবে পঞ্চমী সকাল থেকে রাতের মধ্যে</li>
                  <li><strong>৩.</strong> মণ্ডপের ও প্রতিমার ছবি ভিডিও submit করতে হবে (কোথায় কিভাবে করতে হবে সেটা জানিয়ে দেওয়া হবে)</li>
                  <li><strong>৪.</strong> Form fillup হয়ে গেলে whatsapp group এ add করা হবে যাবতীয় তথ্য ওখানেই দেওয়া হবে</li>
                  <li><strong>৫.</strong> Winner ঘোষণা হবে ষষ্ঠি রাতের মধ্যে</li>
                  <li><strong>৬.</strong> সপ্তমী তে পুরস্কার বিতরণী হবে</li>
                  <li><strong>৭.</strong> "সেরা প্রস্তুতি" বিভাগের জন্য আমাদের ফেসবুক গ্রুপ এ প্রস্তুতির ছবি পোস্ট করতে হবে, মহালয়ার আগে অবধি এই বিভাগের ছবি নেওয়া হবে</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Photo Gallery Section - Commented out for now, will add images later */}
        {/* 
        <section id="gallery" className="gallery-section" style={{ padding: '6rem 2rem' }}>
          <h2 className="section-title animate-fade-in-up">গ্যালারি</h2>
          <div className="gallery-grid">
            {Array.from({ length: 8 }).map((_, index) => (
              <div key={index} className={`gallery-item hover-lift animate-fade-in-up`} style={{ animationDelay: `${index * 0.1}s` }}>
                <img
                  src={`https://placehold.co/600x400/E74C3C/FFFFFF?text=Puja+Photo+${index + 1}`}
                  alt={`Durga Puja photo ${index + 1}`}
                  loading="lazy"
                />
                <div className="gallery-overlay">
                  <p>Puja {index + 1}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
        */}

        {/* Contact Section */}
        <section id="contact" className="contact-section" style={{ padding: '6rem 2rem' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <h2 className="section-title animate-fade-in-up">যোগাযোগ</h2>
            <div className="glass-card">
              <div className="contact-grid">
                <div className="contact-info animate-fade-in-left">
                  <h3>আমাদের সাথে যোগাযোগ করুন</h3>
                  <p>আপনার যেকোনো জিজ্ঞাসা বা তথ্যের জন্য আমাদের সাথে যোগাযোগ করতে পারেন।</p>
                  <div className="contact-details">
                    <div className="contact-item">
                      <Mail />
                      <span>swapnatari.contact@gmail.com</span>
                    </div>
                    <div className="contact-item">
                      <Phone />
                      <span>+91 6289 492 935</span>
                    </div>
                    <div className="contact-item">
                      <MapPin />
                      <span>Hooghly, West Bengal, India</span>
                    </div>
                  </div>
                </div>
                <div className="contact-visual animate-fade-in-right">
                  <div className="logo-container animate-float">
                    <img 
                      src={logoImage} 
                      alt="logo" 
                      style={{ 
                        borderRadius: '50%', 
                        width: '120px', 
                        height: '120px',
                        objectFit: 'cover'
                      }} 
                    />
                  </div>
                  <a
                    href="https://www.facebook.com/share/g/19nstYkUAP/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="facebook-button"
                  >
                    <Facebook size={20} />
                    <span>আমাদের ফেসবুক গ্রুপ</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="footer" style={{ color: 'white', padding: '2rem', textAlign: 'center' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <p>&copy; {new Date().getFullYear()} স্বপ্নতরী। সর্বস্বত্ব সংরক্ষিত।</p>
        </div>
      </footer>

      {/* Modal Form */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <button
                onClick={() => { setIsModalOpen(false); setStatus(''); }}
                className="modal-close"
              >
                <X size={24} />
              </button>
              <h3 className="modal-title">সেরা পুজো ২০২৫</h3>
              <p className="modal-subtitle">ফর্মটি পূরণ করে আপনার পুজো কমিটি নিবন্ধন করুন।</p>
            </div>

            <form onSubmit={handleSubmit} className="modal-form">
              <div className="form-group">
                <label className="form-label" htmlFor="pujaName">পূজা কমিটির নাম</label>
                <input
                  type="text"
                  id="pujaName"
                  name="pujaName"
                  value={formData.pujaName}
                  onChange={handleChange}
                  required
                  className="form-input"
                />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="contactName">যোগাযোগের নাম</label>
                <input
                  type="text"
                  id="contactName"
                  name="contactName"
                  value={formData.contactName}
                  onChange={handleChange}
                  required
                  className="form-input"
                />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="mobile">মোবাইল নম্বর</label>
                <input
                  type="tel"
                  id="mobile"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                  required
                  className="form-input"
                />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="email">ইমেল</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="form-input"
                />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="address">পূজা কমিটির ঠিকানা</label>
                <textarea
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  rows="3"
                  required
                  className="form-input form-textarea"
                ></textarea>
              </div>
              <button
                type="submit"
                className="form-submit"
              >
                জমা দিন
              </button>
            </form>
            {status && (
              <div className={`form-status ${status.includes('সফলভাবে') ? 'success' : 'error'}`}>
                {status}
              </div>
            )}
          </div>
        </div>
      )}

      <style jsx>{`
        .desktop-nav {
          display: flex !important;
          gap: 1.5rem;
        }
        
        .mobile-nav-toggle {
          display: none !important;
        }
        
        @media (max-width: 768px) {
          .desktop-nav {
            display: none !important;
          }
          
          .mobile-nav-toggle {
            display: flex !important;
          }
        }
      `}</style>
    </div>
  );
}

export default App;

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { X, ChevronLeft, ChevronRight, ZoomIn, Images } from 'lucide-react';

// Auto-load all images from the sera-pujo-1432 folder
function loadGalleryImages() {
  try {
    const ctx = require.context('./gallery/sera-pujo-1432', false, /\.(png|jpe?g|webp|gif)$/i);
    return ctx.keys().map((key, idx) => ({
      src: ctx(key),
      id: idx,
      alt: key.replace('./', '').replace(/\.[^.]+$/, '').replace(/[-_]/g, ' '),
    }));
  } catch {
    return [];
  }
}

const IMAGES = loadGalleryImages();
const SWIPE_THRESHOLD = 45;
const AUTOPLAY_SPEED = 0.14; // px per ms (~14.4px per frame @60fps)
const RESUME_DELAY = 1600; // ms of stillness before auto-scroll resumes after interaction

export default function PhotoGallery() {
  const [lightbox, setLightbox] = useState(null); // index or null
  const [loaded, setLoaded] = useState({});
  const [isVisible, setIsVisible] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const trackRef = useRef(null);
  const wrapRef = useRef(null);
  const resumeTimer = useRef(null);
  const touchStartX = useRef(null);
  const touchDeltaX = useRef(0);

  const openLightbox = (idx) => setLightbox(idx);
  const closeLightbox = useCallback(() => setLightbox(null), []);

  const prev = useCallback(() => {
    setLightbox((i) => (i - 1 + IMAGES.length) % IMAGES.length);
  }, []);

  const next = useCallback(() => {
    setLightbox((i) => (i + 1) % IMAGES.length);
  }, []);

  useEffect(() => {
    if (lightbox === null) return;
    const onKey = (e) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [lightbox, closeLightbox, prev, next]);

  const markLoaded = (key) => setLoaded((prevState) => ({ ...prevState, [key]: true }));

  // Pause on interaction, then resume automatic movement after a short pause
  const pauseThenResume = () => {
    setIsPaused(true);
    if (resumeTimer.current) clearTimeout(resumeTimer.current);
    resumeTimer.current = setTimeout(() => setIsPaused(false), RESUME_DELAY);
  };

  // For press-and-hold style interactions (touch drag, hover): pause immediately
  // on start, only start the resume countdown once the interaction ends.
  const handleInteractionStart = () => {
    if (resumeTimer.current) clearTimeout(resumeTimer.current);
    setIsPaused(true);
  };
  const handleInteractionEnd = () => {
    if (resumeTimer.current) clearTimeout(resumeTimer.current);
    resumeTimer.current = setTimeout(() => setIsPaused(false), RESUME_DELAY);
  };

  const scrollByCard = (dir) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector('.gallery-card');
    const cardWidth = card ? card.getBoundingClientRect().width : 300;
    const gap = 16;
    track.scrollBy({ left: dir * (cardWidth + gap), behavior: 'smooth' });
    pauseThenResume();
  };

  useEffect(() => () => {
    if (resumeTimer.current) clearTimeout(resumeTimer.current);
  }, []);

  // Track visibility so the carousel only animates while on screen
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Continuous, seamless auto-scroll (marquee-style, loops through a duplicated track)
  useEffect(() => {
    if (IMAGES.length <= 1) return;
    let frameId;
    let lastTime = null;

    const step = (time) => {
      frameId = requestAnimationFrame(step);
      const track = trackRef.current;
      if (!track) return;
      if (lastTime === null) lastTime = time;
      const delta = time - lastTime;
      lastTime = time;

      if (isPaused || !isVisible || lightbox !== null) return;

      // Exact wrap point: where the duplicated (second) set of cards begins
      const resetPoint = track.children[IMAGES.length]?.offsetLeft ?? track.scrollWidth / 2;
      let nextLeft = track.scrollLeft + AUTOPLAY_SPEED * delta;
      if (nextLeft >= resetPoint) nextLeft -= resetPoint;
      track.scrollLeft = nextLeft;
    };

    frameId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frameId);
  }, [isPaused, isVisible, lightbox]);

  // Lightbox swipe handling (mobile)
  const onTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
    touchDeltaX.current = 0;
  };
  const onTouchMove = (e) => {
    if (touchStartX.current === null) return;
    touchDeltaX.current = e.touches[0].clientX - touchStartX.current;
  };
  const onTouchEnd = () => {
    if (touchDeltaX.current > SWIPE_THRESHOLD) prev();
    else if (touchDeltaX.current < -SWIPE_THRESHOLD) next();
    touchStartX.current = null;
    touchDeltaX.current = 0;
  };

  if (IMAGES.length === 0) {
    return (
      <section id="gallery" className="gallery-section">
        <div className="section-container">
          <div className="gallery-header animate-fade-in-up">
            <span className="gallery-year-badge">১৪৩২</span>
            <h2 className="section-title">গত বছরের স্মৃতি</h2>
          </div>
          <div className="gallery-empty animate-scale-in">
            <Images size={64} strokeWidth={1.2} />
            <p>শীঘ্রই ছবি আসছে…</p>
            <p className="gallery-empty-hint">
              <code>src/gallery/sera-pujo-1432/</code> ফোল্ডারে ছবি যোগ করুন
            </p>
          </div>
        </div>
      </section>
    );
  }

  // Duplicate the set so the marquee can loop seamlessly
  const trackImages = [...IMAGES, ...IMAGES];

  return (
    <section id="gallery" className="gallery-section">
      <div className="gallery-header animate-fade-in-up">
        <span className="gallery-year-badge">১৪৩২</span>
        <h2 className="section-title">গত বছরের স্মৃতি</h2>
      </div>

      {/* Carousel */}
      <div
        className="gallery-carousel-wrap"
        ref={wrapRef}
        onMouseEnter={handleInteractionStart}
        onMouseLeave={handleInteractionEnd}
      >
        <button
          type="button"
          className="gallery-arrow gallery-arrow--prev"
          onClick={() => scrollByCard(-1)}
          aria-label="আগের ছবি"
        >
          <ChevronLeft size={22} />
        </button>

        <div
          className="gallery-track"
          ref={trackRef}
          onTouchStart={handleInteractionStart}
          onTouchEnd={handleInteractionEnd}
          onWheel={pauseThenResume}
        >
          {trackImages.map((img, idx) => {
            const key = `${img.id}-${idx < IMAGES.length ? 'a' : 'b'}`;
            return (
              <div
                key={key}
                className={`gallery-card${loaded[key] ? ' gallery-card--loaded' : ''}`}
                onClick={() => openLightbox(img.id)}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  loading="lazy"
                  onLoad={() => markLoaded(key)}
                />
                <span className="gallery-card-zoom">
                  <ZoomIn size={16} />
                </span>
              </div>
            );
          })}
        </div>

        <button
          type="button"
          className="gallery-arrow gallery-arrow--next"
          onClick={() => scrollByCard(1)}
          aria-label="পরের ছবি"
        >
          <ChevronRight size={22} />
        </button>
      </div>

      {/* Lightbox */}
      {lightbox !== null && (
        <div className="lightbox-backdrop" onClick={closeLightbox}>
          <button className="lightbox-close" onClick={closeLightbox} aria-label="বন্ধ করুন">
            <X size={24} />
          </button>

          <button className="lightbox-nav lightbox-nav--prev" onClick={(e) => { e.stopPropagation(); prev(); }} aria-label="আগের ছবি">
            <ChevronLeft size={32} />
          </button>

          <div
            className="lightbox-content"
            onClick={(e) => e.stopPropagation()}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >
            <img
              src={IMAGES[lightbox].src}
              alt={IMAGES[lightbox].alt}
              className="lightbox-img"
              draggable={false}
            />
            <div className="lightbox-counter">{lightbox + 1} / {IMAGES.length}</div>
          </div>

          <button className="lightbox-nav lightbox-nav--next" onClick={(e) => { e.stopPropagation(); next(); }} aria-label="পরের ছবি">
            <ChevronRight size={32} />
          </button>
        </div>
      )}
    </section>
  );
}

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { ArrowLeft, FileImage, FileText, Loader2 } from 'lucide-react';
import './BannerPage.css';
import logoImage from './gallery/logo.png';
import durgaHeroImage from './gallery/durga-hero.png';
import { fetchCommittees, SHEET_CSV_URL } from './sheetService';

const EXPORT_SCALE = 3;

function BannerPage() {
  const [committees, setCommittees] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState('');
  const [status, setStatus] = useState('loading'); // loading | ready | error | unconfigured
  const [errorMessage, setErrorMessage] = useState('');
  const [isExporting, setIsExporting] = useState(false);
  const bannerRef = useRef(null);

  useEffect(() => {
    if (!SHEET_CSV_URL) {
      setStatus('unconfigured');
      return;
    }

    fetchCommittees()
      .then((rows) => {
        setCommittees(rows);
        setStatus('ready');
        if (rows.length > 0) setSelectedIndex('0');
      })
      .catch((err) => {
        setErrorMessage(err.message || 'কমিটির তালিকা লোড করা যায়নি');
        setStatus('error');
      });
  }, []);

  const selected =
    selectedIndex !== '' && committees[Number(selectedIndex)]
      ? committees[Number(selectedIndex)]
      : null;

  const renderCanvas = useCallback(async () => {
    if (!bannerRef.current) return null;
    return html2canvas(bannerRef.current, {
      scale: EXPORT_SCALE,
      useCORS: true,
      backgroundColor: null,
    });
  }, []);

  const fileBaseName = selected
    ? `gorbito-protijogi-${selected.name.replace(/\s+/g, '-')}`
    : 'gorbito-protijogi';

  const handleDownloadPng = async () => {
    if (!selected) return;
    setIsExporting(true);
    try {
      const canvas = await renderCanvas();
      if (!canvas) return;
      const link = document.createElement('a');
      link.download = `${fileBaseName}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } finally {
      setIsExporting(false);
    }
  };

  const handleDownloadPdf = async () => {
    if (!selected) return;
    setIsExporting(true);
    try {
      const canvas = await renderCanvas();
      if (!canvas) return;
      const pdf = new jsPDF({
        orientation: canvas.width >= canvas.height ? 'landscape' : 'portrait',
        unit: 'px',
        format: [canvas.width, canvas.height],
      });
      pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, 0, canvas.width, canvas.height);
      pdf.save(`${fileBaseName}.pdf`);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="banner-page">
      <header className="banner-page-header">
        <Link to="/" className="banner-back-link">
          <ArrowLeft size={18} />
          হোমে ফিরুন
        </Link>
        <div className="banner-page-title">
          <img src={logoImage} alt="স্বপ্নতরী" className="banner-page-logo" />
          <span>গর্বিত প্রতিযোগী ব্যানার</span>
        </div>
      </header>

      <main className="banner-main">
        <section className="banner-controls">
          <h1 className="banner-heading">আপনার কমিটির ব্যানার তৈরি করুন</h1>
          <p className="banner-subheading">
            নিচে থেকে আপনার কমিটির নাম নির্বাচন করুন, তারপর PNG বা PDF হিসেবে ডাউনলোড করুন।
          </p>

          {status === 'loading' && (
            <div className="banner-status banner-status-loading">
              <Loader2 size={18} className="spin" />
              কমিটির তালিকা লোড হচ্ছে...
            </div>
          )}

          {status === 'unconfigured' && (
            <div className="banner-status banner-status-error">
              গুগল শিট এখনও যুক্ত করা হয়নি। <code>src/sheetService.js</code> ফাইলে{' '}
              <code>SHEET_CSV_URL</code> বসিয়ে দিলেই তালিকা এখানে দেখা যাবে।
            </div>
          )}

          {status === 'error' && (
            <div className="banner-status banner-status-error">{errorMessage}</div>
          )}

          {status === 'ready' && (
            <label className="banner-select-label">
              কমিটির নাম নির্বাচন করুন
              <select
                className="banner-select"
                value={selectedIndex}
                onChange={(e) => setSelectedIndex(e.target.value)}
              >
                {committees.map((c, i) => (
                  <option key={`${c.serial}-${c.name}`} value={i}>
                    {c.serial ? `${c.serial}. ` : ''}
                    {c.name}
                  </option>
                ))}
              </select>
            </label>
          )}

          <div className="banner-download-buttons">
            <button
              className="banner-download-button"
              onClick={handleDownloadPng}
              disabled={!selected || isExporting}
            >
              {isExporting ? <Loader2 size={18} className="spin" /> : <FileImage size={18} />}
              PNG ডাউনলোড করুন
            </button>
            <button
              className="banner-download-button banner-download-button-alt"
              onClick={handleDownloadPdf}
              disabled={!selected || isExporting}
            >
              {isExporting ? <Loader2 size={18} className="spin" /> : <FileText size={18} />}
              PDF ডাউনলোড করুন
            </button>
          </div>
        </section>

        <section className="banner-preview-wrap">
          <div className="banner-card" ref={bannerRef}>
            <div className="banner-corner banner-corner-tl" />
            <div className="banner-art">
              <img src={durgaHeroImage} alt="মা দুর্গা" />
            </div>
            <div className="banner-corner banner-corner-br" />
            {selected && selected.serial && (
              <div className="banner-serial-badge">ক্রমিক নং {selected.serial}</div>
            )}

            <div className="banner-content">
              <div className="banner-emblem-row">
                <div className="banner-emblem">
                  <img src={logoImage} alt="স্বপ্নতরী" />
                </div>
                <span className="banner-tagline">স্বপ্নতরী পরিবারের উদ্যোগে</span>
              </div>

              <div className="banner-divider">
                <span className="banner-divider-line" />
                <span className="banner-divider-icon">❖</span>
                <span className="banner-divider-line" />
              </div>

              <h1 className="banner-title-main">সেরা পুজো</h1>
              <div className="banner-title-year">১৪৩৩</div>

              <div className="banner-ribbon">গর্বিত প্রতিযোগী</div>

              <div className="banner-name-box">
                {selected ? selected.name : 'কমিটির নাম নির্বাচন করুন'}
              </div>

              <div className="banner-contact">যোগাযোগ: +91 6289 492 935</div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default BannerPage;

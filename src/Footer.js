import React from 'react';
import './footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-col">
          <h3>Stratcom</h3>
          <p>We build digital experiences with strategy, motion, and modern design.</p>
        </div>

        <div className="footer-col">
          <h3>Services</h3>
          <ul>
            <li><a href="/services">Web Design</a></li>
            <li><a href="/services">UX Strategy</a></li>
            <li><a href="/services">Brand Identity</a></li>
            <li><a href="/services">Digital Marketing</a></li>
          </ul>
        </div>

        <div className="footer-col">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/aboutus">About Us</a></li>
            <li><a href="/services">Services</a></li>
            <li><a href="/">Contact</a></li>
          </ul>
        </div>

        <div className="footer-col">
          <h3>Connect</h3>
          <p>Reach us on social media or send a quick message.</p>
          <div className="footer-social">
            <a href="https://wa.me/1234567890" target="_blank" rel="noreferrer" aria-label="WhatsApp">
              <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M20.52 3.48A11.8 11.8 0 0012 .2C5.7.2.88 5.03.88 11.34c0 2.01.53 3.97 1.53 5.71L.38 23.2l6.31-1.65a11.95 11.95 0 005.28 1.19h.03c6.3 0 11.12-4.84 11.12-10.8 0-2.89-1.12-5.6-3.55-7.24zM12 20.73h-.01c-1.7 0-3.36-.44-4.82-1.27l-.35-.21-3.75.98.99-3.66-.23-.38A8.93 8.93 0 013.08 11.3c0-4.91 4.05-8.9 8.92-8.9 2.38 0 4.63.93 6.32 2.62a8.83 8.83 0 012.6 6.28c0 4.91-4.05 8.85-8.92 8.85zm4.45-6.12c-.24-.12-1.44-.7-1.66-.78-.22-.09-.38-.13-.54.13-.16.26-.6.78-.74.94-.14.17-.28.19-.52.07-.24-.12-1.02-.38-1.94-1.2-.72-.64-1.2-1.44-1.34-1.68-.14-.24-.02-.37.1-.49.1-.1.24-.26.36-.39.12-.13.16-.22.24-.37.08-.14.04-.27-.02-.39-.06-.12-.54-1.3-.74-1.78-.2-.47-.4-.4-.54-.41-.14-.01-.3-.01-.46-.01s-.39.06-.59.27c-.2.21-.78.76-.78 1.85s.8 2.15.91 2.3c.12.15 1.58 2.4 3.82 3.37.53.23.94.37 1.26.48.53.17 1.01.14 1.39.09.42-.05 1.44-.58 1.64-1.14.2-.56.2-1.04.14-1.14-.05-.1-.2-.16-.44-.28z"/>
              </svg>
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" aria-label="Twitter">
              <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M22.46 6c-.77.34-1.6.56-2.46.66a4.28 4.28 0 001.88-2.36 8.35 8.35 0 01-2.71 1.03 4.18 4.18 0 00-7.11 3.81A11.85 11.85 0 013 4.92a4.16 4.16 0 001.29 5.58 4.16 4.16 0 01-1.9-.52v.05a4.18 4.18 0 003.35 4.1 4.22 4.22 0 01-1.89.07 4.18 4.18 0 003.9 2.9A8.4 8.4 0 012 19.54a11.85 11.85 0 006.29 1.84c7.55 0 11.68-6.26 11.68-11.68 0-.18-.01-.35-.02-.53A8.35 8.35 0 0022.46 6z"/>
              </svg>
            </a>
            <a href="https://www.linkedin.com" target="_blank" rel="noreferrer" aria-label="LinkedIn">
              <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M4.98 3.5a2.88 2.88 0 11.01 5.76 2.88 2.88 0 01-.01-5.76zM3 8.89h3.98V21H3V8.89zM8.75 8.89h3.82v1.62h.05c.53-1 1.83-2.06 3.77-2.06 4.03 0 4.77 2.65 4.77 6.09V21h-4V15.4c0-1.34-.02-3.06-1.86-3.06-1.86 0-2.15 1.45-2.15 2.95V21h-4V8.89z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">© {new Date().getFullYear()} Choltech. All rights reserved.</div>
    </footer>
  );
}

export default Footer;

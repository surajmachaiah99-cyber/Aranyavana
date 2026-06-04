/* Udyana enquiry endpoint.
 * POST /api/enquire { name, email, phone, message } -> { success: true } | { error }
 * Also serves the static site so `npm start` runs the full thing.
 */

require('dotenv').config();

const path = require('path');
const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json({ limit: '32kb' }));

// Static site — serve everything one level up from /server
const ROOT = path.resolve(__dirname, '..');
app.use(express.static(ROOT));

// Lazy transporter — built on first send so the server boots even
// without SMTP credentials configured (useful for local dev).
let transporter = null;
function getTransporter() {
  if (transporter) return transporter;
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env;
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) return null;
  transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT) || 587,
    secure: Number(SMTP_PORT) === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });
  return transporter;
}

const isEmail = (v) => typeof v === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
const clip = (v, n) => (typeof v === 'string' ? v.slice(0, n) : '');

// Tiny in-memory rate limiter — 5 requests / 10 min / IP
const hits = new Map();
function rateLimit(ip) {
  const now = Date.now();
  const window = 10 * 60 * 1000;
  const arr = (hits.get(ip) || []).filter((t) => now - t < window);
  arr.push(now);
  hits.set(ip, arr);
  return arr.length <= 5;
}

app.post('/api/enquire', async (req, res) => {
  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'unknown';
  if (!rateLimit(String(ip))) {
    return res.status(429).json({ error: 'Too many requests. Please try again later.' });
  }

  const name = clip(req.body && req.body.name, 120).trim();
  const email = clip(req.body && req.body.email, 200).trim();
  const phone = clip(req.body && req.body.phone, 40).trim();
  const message = clip(req.body && req.body.message, 4000).trim();

  if (!name) return res.status(400).json({ error: 'Name is required.' });
  if (!isEmail(email)) return res.status(400).json({ error: 'A valid email is required.' });
  if (message.length < 4) return res.status(400).json({ error: 'Please tell us a little more.' });

  const to = process.env.TO_EMAIL || 'hello@aranyavana.com';
  const subject = `Udyana enquiry — ${name}`;

  const text =
    `New enquiry via the Udyana site\n\n` +
    `Name:    ${name}\n` +
    `Email:   ${email}\n` +
    `Phone:   ${phone || '—'}\n\n` +
    `Message:\n${message}\n\n` +
    `IP: ${ip}\n` +
    `When: ${new Date().toISOString()}\n`;

  const t = getTransporter();
  if (!t) {
    // No SMTP configured — log to console so dev can verify the form works.
    console.log('[enquiry] (no SMTP configured) would send:\n' + text);
    return res.json({ success: true, delivered: false });
  }

  try {
    await t.sendMail({
      from: process.env.SMTP_USER,
      to,
      replyTo: email,
      subject,
      text,
    });
    return res.json({ success: true, delivered: true });
  } catch (err) {
    console.error('[enquiry] mail failed:', err);
    return res.status(500).json({ error: 'Could not send. Please email hello@aranyavana.com directly.' });
  }
});

app.get('/api/health', (_req, res) => res.json({ ok: true }));

app.listen(PORT, () => {
  console.log(`Udyana site running on http://localhost:${PORT}`);
});

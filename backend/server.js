// ============================================================
//  SHAMBHU DECORATION — Backend Server
//  Tech: Node.js + Express + MongoDB + JWT + Twilio/Nodemailer
// ============================================================
require('dotenv').config();
const express     = require('express');
const mongoose    = require('mongoose');
const cors        = require('cors');
const helmet      = require('helmet');
const rateLimit   = require('express-rate-limit');
const path        = require('path');

const app = express();

// ── Middleware ──────────────────────────────────────────────
app.use(helmet());
app.use(cors({ origin: process.env.CLIENT_URL || '*', credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rate limiting
const limiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 100 });
app.use('/api/', limiter);

const otpLimiter = rateLimit({ windowMs: 60 * 1000, max: 5, message: { error: 'Too many OTP requests, wait 1 minute.' } });

// ── MongoDB Connection ──────────────────────────────────────
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/shambhu', {
  useNewUrlParser: true, useUnifiedTopology: true
}).then(() => console.log('✅  MongoDB connected'))
  .catch(err => console.error('❌  MongoDB error:', err));

// ── Routes ──────────────────────────────────────────────────
app.use('/api/auth',     otpLimiter, require('./routes/auth'));
app.use('/api/enquiry',  require('./routes/enquiry'));
app.use('/api/admin',    require('./routes/admin'));
app.use('/api/booking',  require('./routes/booking'));

// ── Serve Frontend (production) ─────────────────────────────
app.use(express.static(path.join(__dirname, '../frontend')));
app.get('*', (req, res) => res.sendFile(path.join(__dirname, '../frontend/index.html')));

// ── Start ───────────────────────────────────────────────────
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀  Shambhu server running on port ${PORT}`));

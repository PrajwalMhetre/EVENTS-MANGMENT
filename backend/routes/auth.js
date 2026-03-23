// routes/auth.js  — Send OTP + Verify OTP + JWT
const router  = require('express').Router();
const jwt     = require('jsonwebtoken');
const crypto  = require('crypto');
const User    = require('../models/User');
const { sendSmsOtp, sendEmailOtp } = require('../config/otp');

// ── Helper: generate 4-digit OTP ─────────────────────────────
const genOtp = () => String(Math.floor(1000 + Math.random() * 9000));

// ── POST /api/auth/send-otp ──────────────────────────────────
router.post('/send-otp', async (req, res) => {
  try {
    const { mobile, email, name, method } = req.body;

    if (method === 'mobile' && !mobile)
      return res.status(400).json({ error: 'Mobile number required' });
    if (method === 'email' && !email)
      return res.status(400).json({ error: 'Email required' });

    const otp      = genOtp();
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 min

    // Find or create user
    const query  = method === 'mobile' ? { mobile } : { email };
    let user = await User.findOne(query);
    if (!user) user = new User({ ...query, method, name });

    user.otp         = otp;   // will be hashed by pre-save hook
    user.otpExpiry   = otpExpiry;
    user.otpAttempts = 0;
    if (name) user.name = name;
    await user.save();

    // Send OTP
    if (method === 'mobile') {
      await sendSmsOtp(mobile, otp);
    } else {
      await sendEmailOtp(email, otp, name);
    }

    res.json({ success: true, message: `OTP sent to your ${method}` });
  } catch (err) {
    console.error('send-otp error:', err);
    res.status(500).json({ error: 'Failed to send OTP. Try again.' });
  }
});

// ── POST /api/auth/verify-otp ────────────────────────────────
router.post('/verify-otp', async (req, res) => {
  try {
    const { mobile, email, otp, method } = req.body;
    if (!otp) return res.status(400).json({ error: 'OTP required' });

    const query = method === 'mobile' ? { mobile } : { email };
    const user  = await User.findOne(query);
    if (!user) return res.status(404).json({ error: 'User not found. Please request a new OTP.' });

    const result = await user.verifyOtp(otp);
    if (!result.valid) return res.status(400).json({ error: result.reason });

    // OTP correct — mark verified, clear OTP
    user.isVerified  = true;
    user.otp         = undefined;
    user.otpExpiry   = undefined;
    user.otpAttempts = 0;
    user.lastLogin   = new Date();
    await user.save();

    // Issue JWT
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
    );

    res.json({
      success: true,
      token,
      user: {
        id:    user._id,
        name:  user.name,
        email: user.email,
        mobile:user.mobile,
        role:  user.role,
      }
    });
  } catch (err) {
    console.error('verify-otp error:', err);
    res.status(500).json({ error: 'Verification failed. Try again.' });
  }
});

// ── GET /api/auth/me  (protected) ───────────────────────────
router.get('/me', require('../middleware/auth'), async (req, res) => {
  const user = await User.findById(req.user.id).select('-otp -otpExpiry');
  res.json(user);
});

module.exports = router;

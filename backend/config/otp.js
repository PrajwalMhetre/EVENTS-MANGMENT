// config/otp.js — Real SMS via Twilio + Real Email via Nodemailer

const nodemailer = require('nodemailer');
const twilio = require('twilio');

// ── TWILIO SMS ────────────────────────────────────────────────
const sendSmsOtp = async (mobile, otp) => {
  try {
    const to = mobile.startsWith('+') ? mobile : `+91${mobile}`;

    const accountSid = process.env.TWILIO_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;

    if (!accountSid || !authToken) {
      throw new Error('Twilio credentials missing in .env');
    }

    const client = twilio(accountSid, authToken);

    await client.messages.create({
      body: `Your Shambhu Decoration OTP is: ${otp}. Valid for 10 minutes. Do not share with anyone.`,
      from: process.env.TWILIO_PHONE,
      to,
    });

    console.log(`📱 OTP ${otp} sent to ${to}`);
  } catch (err) {
    console.error('SMS Error:', err.message);
    throw err;
  }
};

// ── NODEMAILER EMAIL ──────────────────────────────────────────
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.EMAIL_PORT) || 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendEmailOtp = async (email, otp, name = 'Valued Customer') => {
  try {
    const html = `...YOUR SAME HTML (no change needed)...`;

    await transporter.sendMail({
      from: process.env.EMAIL_FROM || '"Shambhu Decoration" <noreply@shambhu.com>',
      to: email,
      subject: `${otp} — Your Shambhu Decoration OTP`,
      html,
    });

    console.log(`📧 OTP ${otp} emailed to ${email}`);
  } catch (err) {
    console.error('Email Error:', err.message);
    throw err;
  }
};

module.exports = { sendSmsOtp, sendEmailOtp };
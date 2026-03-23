// config/otp.js  — Real SMS via Twilio + Real Email via Nodemailer
const nodemailer = require('nodemailer');

// ── TWILIO SMS ────────────────────────────────────────────────
const sendSmsOtp = async (mobile, otp) => {
  // Ensure +91 prefix for Indian numbers
  const to = mobile.startsWith('+') ? mobile : `+91${mobile}`;

  const client = require('twilio')(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_AUTH_TOKEN
  );

  await client.messages.create({
    body: `Your Shambhu Decoration OTP is: ${otp}. Valid for 10 minutes. Do not share with anyone. - Team Shambhu`,
    from: process.env.TWILIO_PHONE,
    to,
  });

  console.log(`📱 OTP ${otp} sent to ${to}`);
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
  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    body { font-family: 'Georgia', serif; background: #0a0a0a; margin: 0; padding: 0; }
    .wrap { max-width: 520px; margin: 0 auto; background: #111; border: 1px solid rgba(201,168,76,0.3); }
    .top-bar { height: 4px; background: linear-gradient(90deg, #9A7A2E, #C9A84C, #E8C96A, #C9A84C); }
    .header { padding: 32px 40px 20px; text-align: center; border-bottom: 1px solid rgba(201,168,76,0.15); }
    .brand { font-size: 18px; letter-spacing: 6px; color: #C9A84C; }
    .body { padding: 36px 40px; color: #FDFAF4; }
    h1 { font-size: 28px; font-weight: 300; color: #FDFAF4; margin-bottom: 8px; }
    p { font-size: 14px; color: #A0947A; line-height: 1.8; margin-bottom: 20px; }
    .otp-box { background: rgba(201,168,76,0.1); border: 1px solid rgba(201,168,76,0.4);
      padding: 20px; text-align: center; margin: 24px 0; }
    .otp-num { font-size: 42px; letter-spacing: 16px; color: #C9A84C; font-family: monospace; }
    .note { font-size: 12px; color: #6b6055; letter-spacing: 1px; margin-top: 24px; }
    .footer { padding: 20px 40px; border-top: 1px solid rgba(201,168,76,0.1);
      text-align: center; font-size: 11px; color: #6b6055; letter-spacing: 2px; }
  </style>
</head>
<body>
  <div class="wrap">
    <div class="top-bar"></div>
    <div class="header">
      <div class="brand">SHAMBHU DECORATION</div>
      <div style="font-size:11px;color:#A0947A;letter-spacing:2px;margin-top:4px;">& EVENT MANAGEMENT</div>
    </div>
    <div class="body">
      <h1>Hello, ${name} ✦</h1>
      <p>Use the OTP below to verify your identity. It is valid for <strong style="color:#C9A84C;">10 minutes</strong> only.</p>
      <div class="otp-box">
        <div style="font-size:10px;letter-spacing:4px;color:#A0947A;margin-bottom:12px;">YOUR ONE-TIME PASSWORD</div>
        <div class="otp-num">${otp}</div>
      </div>
      <p>If you did not request this, please ignore this email or contact us immediately.</p>
      <p class="note">📞 +91 9146620490 &nbsp;|&nbsp; Pan India Services</p>
    </div>
    <div class="footer">© 2025 SHAMBHU DECORATION & EVENT MANAGEMENT — PAN INDIA</div>
  </div>
</body>
</html>`;

  await transporter.sendMail({
    from: process.env.EMAIL_FROM || '"Shambhu Decoration" <noreply@shambhu.com>',
    to: email,
    subject: `${otp} — Your Shambhu Decoration OTP`,
    html,
  });

  console.log(`📧 OTP ${otp} emailed to ${email}`);
};

module.exports = { sendSmsOtp, sendEmailOtp };

# 🎉 Shambhu Decoration & Event Management
## Complete Full-Stack Website

---

## 📁 Project Structure

```
shambhu/
├── frontend/
│   └── index.html          ← Complete animated website (open in browser directly)
├── backend/
│   ├── server.js           ← Main Express server
│   ├── package.json        ← Dependencies
│   ├── .env.example        ← Copy to .env and fill values
│   ├── models/
│   │   ├── User.js         ← User model (mobile/email + OTP)
│   │   └── Enquiry.js      ← Enquiry + Booking models
│   ├── routes/
│   │   ├── auth.js         ← Send OTP + Verify OTP + JWT
│   │   ├── enquiry.js      ← Contact form submissions
│   │   ├── admin.js        ← Admin dashboard API
│   │   └── booking.js      ← User bookings
│   ├── middleware/
│   │   └── auth.js         ← JWT middleware
│   └── config/
│       └── otp.js          ← Twilio SMS + Nodemailer Email
└── README.md
```

---

## 🚀 STEP 1 — Run Frontend Only (Works Right Now!)

Just open `frontend/index.html` in any browser.
- ✅ Full animations work
- ✅ Login/Signup modal with OTP (demo mode — shows OTP on screen)
- ✅ Contact form shows success message
- ✅ All images load from Unsplash

---

## 🔧 STEP 2 — Setup Backend (For Real OTP + Database)

### Install Node.js
Download from: https://nodejs.org (LTS version)

### Install MongoDB
- Local: https://www.mongodb.com/try/download/community
- Cloud (recommended): https://www.mongodb.com/atlas (free tier)

### Install dependencies
```bash
cd backend
npm install
```

### Configure environment
```bash
cp .env.example .env
```
Then edit `.env` with your values:

---

## 📱 STEP 3 — Setup Real SMS OTP (Twilio)

1. Go to https://www.twilio.com → Sign up free
2. Get free trial credits ($15 USD)
3. From dashboard, copy:
   - `ACCOUNT SID`
   - `AUTH TOKEN`
   - Get a phone number (free trial)
4. Paste into `.env`:
```
TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
TWILIO_AUTH_TOKEN=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
TWILIO_PHONE=+1XXXXXXXXXX
```

---

## 📧 STEP 4 — Setup Real Email OTP (Gmail)

1. Go to https://myaccount.google.com → Security → App Passwords
2. Create app password for "Mail"
3. Paste into `.env`:
```
EMAIL_USER=youremail@gmail.com
EMAIL_PASS=xxxx xxxx xxxx xxxx   ← 16-char app password
EMAIL_FROM="Shambhu Decoration <youremail@gmail.com>"
```

---

## 🗄️ STEP 5 — Setup MongoDB Atlas (Free Cloud Database)

1. Go to https://www.mongodb.com/atlas → Create free account
2. Create a cluster (free M0 tier)
3. Get connection string, add to `.env`:
```
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/shambhu
```

---

## ▶️ STEP 6 — Start the Server

```bash
cd backend
npm run dev      # Development (auto-restart)
# OR
npm start        # Production
```

Server runs at: http://localhost:5000

---

## 🌐 STEP 7 — Update Frontend API URL

Open `frontend/index.html`, find this line near the top of the `<script>`:
```javascript
const API_BASE = 'http://localhost:5000';
```
Change to your live server URL when deploying.

---

## 🚀 STEP 8 — Deploy Live (Go Online)

### Recommended Free Hosting:

**Frontend (HTML file):**
- Netlify: https://netlify.com → drag & drop frontend folder
- Vercel: https://vercel.com

**Backend (Node.js):**
- Railway: https://railway.app (free, easy)
- Render: https://render.com (free tier)
- Heroku: https://heroku.com

**Domain (optional):**
- GoDaddy or Namecheap
- Example: www.shambhudecoration.com (~₹500-800/year)

---

## 🔑 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/auth/send-otp | Send OTP to mobile/email |
| POST | /api/auth/verify-otp | Verify OTP, returns JWT |
| GET  | /api/auth/me | Get current user (protected) |
| POST | /api/enquiry | Submit contact form |
| GET  | /api/admin/enquiries | Get all enquiries (admin) |
| GET  | /api/admin/stats | Dashboard stats (admin) |
| POST | /api/booking | Create booking (user) |
| GET  | /api/booking/mine | User's bookings |

---

## 👨‍💼 Admin Panel

Login at: `POST /api/admin/login`
```json
{ "email": "admin@shambhudecoration.com", "password": "Admin@12345" }
```
Change password in `.env` before going live!

---

## 📞 Support

Phone: +91 9146620490
Built with ❤️ for Shambhu Decoration & Event Management

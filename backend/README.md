# Backend API - Contact Form

Express.js backend with MongoDB database for contact form submissions.

## Quick Setup

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment
Create `.env` file (copy from `.env.example`):
```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/vastorn-ots
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-gmail-app-password
ADMIN_EMAIL=your-email@gmail.com
```

### 3. Get Gmail App Password
1. Go to https://myaccount.google.com/security
2. Enable 2-Step Verification
3. Click "App passwords"
4. Generate password for "Mail"
5. Copy 16-character password to `.env`

### 4. Choose Database

**Option A: MongoDB Atlas (Cloud - FREE)**
1. Sign up at https://www.mongodb.com/cloud/atlas
2. Create free cluster
3. Get connection string
4. Update `.env`:
   ```env
   MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/vastorn-ots
   ```

**Option B: Local MongoDB**
1. Install MongoDB
2. Start: `mongod`
3. Keep default `.env` setting

### 5. Start Server
```bash
npm start
```
Or double-click `start-server.bat` (Windows)

Server runs on http://localhost:3000

## API Endpoints

### Public

**Submit Contact Form**
```http
POST /api/contact
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "message": "Hello..."
}
```

**Health Check**
```http
GET /api/health
```

### Admin

**Get All Submissions**
```http
GET /api/contacts?status=new&page=1&limit=20
```

**Get Single Submission**
```http
GET /api/contacts/:id
```

**Update Status**
```http
PATCH /api/contacts/:id/status
Body: { "status": "read" }
```
Status: `new`, `read`, `replied`, `archived`

**Delete Submission**
```http
DELETE /api/contacts/:id
```

**Get Statistics**
```http
GET /api/stats
```

## Features

✅ MongoDB database storage
✅ Email notifications to admin
✅ Auto-reply to users
✅ Status tracking
✅ IP address logging
✅ Browser info tracking
✅ Validation & error handling

## What Happens on Form Submit

1. Data validated
2. Saved to MongoDB
3. Email sent to admin
4. Auto-reply sent to user
5. Success response returned

## View Submissions

**Browser:** http://localhost:3000/api/contacts

**MongoDB Compass:** Connect and browse `vastorn-ots` database

**Command Line:**
```bash
mongo
use vastorn-ots
db.contacts.find().pretty()
```

## Production Deployment

### Heroku
```bash
heroku create vastorn-ots-api
heroku config:set MONGODB_URI="your-atlas-uri"
heroku config:set EMAIL_USER="your-email"
heroku config:set EMAIL_PASSWORD="your-password"
git push heroku main
```

### Update Frontend
Change API URL in `js/contact-form.js`:
```javascript
const API_URL = 'https://your-app.herokuapp.com/api/contact';
```

## Troubleshooting

**MongoDB connection error?**
- Check MONGODB_URI in `.env`
- For local: ensure `mongod` is running
- For Atlas: check IP whitelist

**Email not sending?**
- Use Gmail App Password (not regular password)
- Check spam folder
- Verify EMAIL_USER and EMAIL_PASSWORD

**Port already in use?**
- Change PORT in `.env`
- Or kill process: `lsof -ti:3000 | xargs kill`

## Security (Production)

Add these for production:
- Rate limiting
- Authentication for admin endpoints
- Input sanitization
- HTTPS/SSL
- CORS restrictions

## Support

Contact: support@vastorn.com

# Vastorn OTS Extension Website

Modern, responsive website for the Vastorn OTS (One Time Save) Extension with glassy purple design and working contact form.

## Features

✅ **Modern Glassy Design** - Purple/violet theme with frosted-glass effects
✅ **Fully Responsive** - Mobile, tablet, and desktop optimized
✅ **Working Contact Form** - Backend with MongoDB database storage
✅ **Email Notifications** - Auto-send emails to admin and users
✅ **Interactive Components** - FAQ accordion, smooth scrolling, animations
✅ **Accessibility** - WCAG AA compliant, keyboard navigation

## Quick Start

### Frontend (Website)

1. Open `index.html` in your browser
2. Or use a local server:
   ```bash
   # Python
   python -m http.server 8000
   
   # Node.js
   npx http-server
   ```

### Backend (Contact Form)

1. **Install dependencies:**
   ```bash
   cd backend
   npm install
   ```

2. **Configure `.env` file:**
   ```env
   PORT=3000
   MONGODB_URI=mongodb://localhost:27017/vastorn-ots
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASSWORD=your-gmail-app-password
   ADMIN_EMAIL=your-email@gmail.com
   ```

3. **Start server:**
   ```bash
   npm start
   ```
   Or double-click `backend/start-server.bat` (Windows)

4. **Test:** Open http://localhost:3000/api/health

See `backend/README.md` for detailed setup instructions.

## Project Structure

```
├── index.html              # Main website
├── css/                    # Stylesheets
│   ├── main.css           # Core styles
│   ├── glassy-theme.css   # Glassy UI theme
│   └── responsive.css     # Mobile responsive
├── js/                     # JavaScript
│   ├── navigation.js      # Navigation & scroll
│   ├── animations.js      # Scroll animations
│   ├── faq.js            # FAQ accordion
│   └── contact-form.js   # Form validation
├── backend/               # Contact form API
│   ├── server.js         # Express server
│   ├── package.json      # Dependencies
│   └── .env              # Configuration
└── assets/               # Images & videos
```

## Technology Stack

**Frontend:**
- HTML5, CSS3, Vanilla JavaScript
- CSS Grid, Flexbox, Custom Properties
- Intersection Observer API

**Backend:**
- Node.js + Express
- MongoDB (database)
- Nodemailer (emails)

## Customization

### Colors
Edit `css/glassy-theme.css`:
```css
:root {
    --color-primary: #8b5cf6;
    --color-primary-light: #a78bfa;
    --color-primary-dark: #7c3aed;
}
```

### Content
Edit `index.html` sections:
- Hero section
- Features
- How to Use
- FAQ
- Privacy Policy
- Developer info

### Chrome Web Store Link
Update in `js/navigation.js`:
```javascript
window.open('YOUR_CHROME_WEB_STORE_URL', '_blank');
```

## Deployment

### Frontend
Deploy to:
- Netlify (drag & drop)
- Vercel (Git integration)
- GitHub Pages
- Cloudflare Pages

### Backend
Deploy to:
- Heroku (free tier)
- Railway (free tier)
- Render (free tier)

Update API URL in `js/contact-form.js`:
```javascript
const API_URL = 'https://your-domain.com/api/contact';
```

## Browser Support

- Chrome/Edge (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)

## Performance

- Lighthouse Score: 90+
- First Contentful Paint: < 1.5s
- Fully accessible (WCAG AA)

## License

© 2025 Vastorn. All rights reserved.

## Support

Contact: support@vastorn.com

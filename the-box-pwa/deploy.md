# The Box PWA - Deployment Guide

This guide covers deploying The Box PWA to various platforms and environments.

## 🚀 Quick Deploy Options

### 1. Vercel (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Or deploy to production
vercel --prod
```

### 2. Netlify
```bash
# Build the project
npm run build

# Deploy the build folder to Netlify
# Drag and drop the 'build' folder to Netlify dashboard
# Or use Netlify CLI:
npm install -g netlify-cli
netlify deploy --dir=build --prod
```

### 3. GitHub Pages
```bash
# Add homepage to package.json
{
  "homepage": "https://yourusername.github.io/the-box-pwa"
}

# Install gh-pages
npm install --save-dev gh-pages

# Add deploy script to package.json
{
  "scripts": {
    "deploy": "gh-pages -d build"
  }
}

# Deploy
npm run build
npm run deploy
```

## 🛠️ Manual Deployment

### Prerequisites
- Node.js 18+ installed
- Git repository set up
- Domain name (optional)

### Build Process
```bash
# Install dependencies
npm install

# Build for production
npm run build

# The build folder contains all production files
```

### Environment Variables
Create a `.env` file in the root directory:
```env
REACT_APP_API_URL=https://api.thebox.edu
REACT_APP_ENVIRONMENT=production
REACT_APP_ANALYTICS_ID=your-analytics-id
```

## 🌐 Domain Configuration

### Custom Domain Setup
1. **DNS Configuration**
   ```
   Type: A
   Name: @
   Value: [Your hosting provider's IP]
   
   Type: CNAME
   Name: www
   Value: yourdomain.com
   ```

2. **SSL Certificate**
   - Most hosting providers offer free SSL certificates
   - Enable HTTPS for PWA functionality

### PWA Configuration
Update `public/manifest.json`:
```json
{
  "name": "The Box - AI-Powered Learning Platform",
  "short_name": "The Box",
  "description": "Advanced EdTech platform with AI tutoring",
  "start_url": "/",
  "display": "standalone",
  "theme_color": "#3B82F6",
  "background_color": "#ffffff"
}
```

## 📱 PWA Features

### Service Worker
The service worker (`public/sw.js`) provides:
- Offline functionality
- Push notifications
- Background sync
- Cache management

### Installation
Users can install the PWA by:
1. Visiting the website
2. Clicking the install prompt
3. Or using browser menu: "Add to Home Screen"

## 🔧 Performance Optimization

### Build Optimization
```bash
# Analyze bundle size
npm run build
npx serve -s build

# Use Lighthouse for performance audit
```

### Caching Strategy
- Static assets cached for 1 year
- API responses cached for 5 minutes
- Dynamic content cached for 1 hour

## 🔒 Security Considerations

### HTTPS Required
- PWA features require HTTPS
- Service worker only works over HTTPS
- Push notifications require HTTPS

### Content Security Policy
Add to `public/index.html`:
```html
<meta http-equiv="Content-Security-Policy" 
      content="default-src 'self'; 
               script-src 'self' 'unsafe-inline' 'unsafe-eval';
               style-src 'self' 'unsafe-inline';
               img-src 'self' data: https:;
               connect-src 'self' https:;">
```

## 📊 Analytics & Monitoring

### Google Analytics
```javascript
// Add to index.html
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

### Error Monitoring
```javascript
// Add error boundary and monitoring
window.addEventListener('error', (event) => {
  // Send to monitoring service
  console.error('Application error:', event.error);
});
```

## 🚀 Production Checklist

- [ ] Build completes without errors
- [ ] All environment variables set
- [ ] HTTPS enabled
- [ ] Service worker registered
- [ ] PWA manifest configured
- [ ] Analytics tracking enabled
- [ ] Error monitoring set up
- [ ] Performance optimized
- [ ] Security headers configured
- [ ] Domain and SSL configured

## 🔄 Continuous Deployment

### GitHub Actions
Create `.github/workflows/deploy.yml`:
```yaml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run build
      - run: npm run deploy
```

## 📞 Support

For deployment issues:
- Check browser console for errors
- Verify service worker registration
- Test PWA installation
- Monitor performance metrics

## 🎯 Next Steps

After deployment:
1. Test PWA installation on mobile devices
2. Verify offline functionality
3. Test push notifications
4. Monitor user engagement
5. Optimize based on analytics

---

**The Box PWA** - Empowering the future of education through technology. 
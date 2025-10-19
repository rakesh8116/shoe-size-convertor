# 📦 Deployment Guide - SoleMate

## Publishing Options

### Option 1: Expo Go (Development/Testing) - Easiest
Perfect for: Testing, sharing with friends, development

```bash
# Login to Expo
npx expo login

# Publish to Expo
npx expo publish
```

Your app will be accessible via Expo Go app using a QR code or link.

---

### Option 2: Expo Application Services (EAS) - Recommended
Perfect for: Production apps, app store submission

#### Initial Setup
```bash
# Install EAS CLI
npm install -g eas-cli

# Login to Expo
eas login

# Configure your project
eas build:configure
```

#### Build for iOS
```bash
# Development build
eas build --platform ios --profile development

# Production build for App Store
eas build --platform ios --profile production
```

#### Build for Android
```bash
# Development build
eas build --platform android --profile development

# Production build for Play Store
eas build --platform android --profile production
```

#### Submit to Stores
```bash
# Submit to App Store
eas submit --platform ios

# Submit to Play Store
eas submit --platform android
```

---

### Option 3: Standalone Builds - Classic Expo
Perfect for: Self-hosting, direct distribution

#### iOS Build
```bash
npx expo build:ios
```

Requirements:
- Apple Developer Account ($99/year)
- Mac computer for final steps
- Xcode installed

#### Android Build
```bash
# APK for testing
npx expo build:android -t apk

# AAB for Play Store
npx expo build:android -t app-bundle
```

Requirements:
- Google Play Developer Account ($25 one-time)
- Keystore for signing

---

## Pre-Deployment Checklist

### 1. Update App Configuration
Edit `app.json`:

```json
{
  "expo": {
    "name": "SoleMate",
    "slug": "sole-mate",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/icon.png",
    "splash": {
      "image": "./assets/splash.png",
      "resizeMode": "contain",
      "backgroundColor": "#6366f1"
    },
    "updates": {
      "fallbackToCacheTimeout": 0
    },
    "assetBundlePatterns": ["**/*"],
    "ios": {
      "supportsTablet": true,
      "bundleIdentifier": "com.yourcompany.solemate",
      "buildNumber": "1.0.0"
    },
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/adaptive-icon.png",
        "backgroundColor": "#6366f1"
      },
      "package": "com.yourcompany.solemate",
      "versionCode": 1
    },
    "web": {
      "favicon": "./assets/favicon.png"
    }
  }
}
```

### 2. Create Required Assets
Must have these files in `assets/` folder:
- ✅ icon.png (1024x1024)
- ✅ splash.png (1242x2436)
- ✅ adaptive-icon.png (1024x1024)
- ✅ favicon.png (48x48)

### 3. Test Thoroughly
```bash
# Test on iOS
npx expo start --ios

# Test on Android
npx expo start --android

# Test on web
npx expo start --web
```

### 4. Optimize Bundle Size
```bash
# Analyze bundle
npx expo export --output-dir dist

# Check bundle size
du -sh dist
```

### 5. Update Version Numbers
Before each release:
- Increment `version` in app.json
- Increment `buildNumber` (iOS) / `versionCode` (Android)

---

## Environment-Specific Configurations

### Development
```javascript
// config.js
export default {
  ENV: 'development',
  API_URL: 'http://localhost:3000',
};
```

### Production
```javascript
// config.js
export default {
  ENV: 'production',
  API_URL: 'https://api.solemate.com',
};
```

---

## App Store Guidelines

### iOS App Store
1. **Screenshots Required**: 
   - 6.5" iPhone (1242 x 2688)
   - 5.5" iPhone (1242 x 2208)
   - iPad Pro (2048 x 2732)

2. **App Information**:
   - Name: SoleMate
   - Subtitle: Shoe Size Converter
   - Description: (200 words max)
   - Keywords: shoe, size, converter, fit, international
   - Category: Utilities or Shopping

3. **Pricing**: Free

4. **Privacy Policy**: Required (even if no data collection)

### Google Play Store
1. **Screenshots Required**:
   - Phone: 16:9 or 9:16
   - 7" Tablet: Optional
   - 10" Tablet: Optional

2. **Feature Graphic**: 1024 x 500 px

3. **Store Listing**:
   - Title: SoleMate - Shoe Size Converter
   - Short description: (80 chars)
   - Full description: (4000 chars)
   - Category: Tools or Shopping

4. **Content Rating**: Everyone

5. **Privacy Policy**: URL required

---

## Over-The-Air (OTA) Updates

Expo allows pushing updates without app store review:

```bash
# Publish update
npx expo publish

# Target specific release channel
npx expo publish --release-channel production
```

Updates work for:
- JavaScript changes
- Asset updates
- Configuration changes

Doesn't work for:
- Native code changes
- SDK version updates

---

## Web Deployment

### Option 1: Netlify
```bash
# Build for web
npx expo export:web

# Deploy to Netlify
cd web-build
netlify deploy --prod
```

### Option 2: Vercel
```bash
# Install Vercel CLI
npm i -g vercel

# Build and deploy
npx expo export:web
cd web-build
vercel --prod
```

### Option 3: GitHub Pages
```bash
# Build
npx expo export:web

# Add to git
cd web-build
git init
git add .
git commit -m "Deploy"

# Push to gh-pages branch
git push origin master:gh-pages
```

---

## Continuous Integration/Deployment

### GitHub Actions Example

Create `.github/workflows/build.yml`:

```yaml
name: Build App

on:
  push:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      
      - name: Setup Node
        uses: actions/setup-node@v2
        with:
          node-version: '16'
      
      - name: Install dependencies
        run: npm install
      
      - name: Run tests
        run: npm test
      
      - name: Build
        run: npx expo export:web
```

---

## Monitoring & Analytics

### Recommended Tools

1. **Expo Analytics** (Built-in)
   - User counts
   - Crash reports
   - Performance metrics

2. **Sentry** (Error Tracking)
```bash
npm install @sentry/react-native
```

3. **Google Analytics** (User Behavior)
```bash
npm install expo-firebase-analytics
```

---

## Post-Launch Checklist

- [ ] App published to stores
- [ ] Web version deployed
- [ ] Analytics configured
- [ ] Error tracking set up
- [ ] Social media announced
- [ ] README updated with links
- [ ] User feedback channels created
- [ ] Support email set up
- [ ] Monitor reviews daily
- [ ] Plan for updates

---

## Version Update Process

1. Make changes locally
2. Test thoroughly
3. Update version numbers
4. Commit changes
5. Build new version
6. Submit to stores
7. Publish OTA update (if applicable)
8. Monitor for issues

---

## Troubleshooting Deployment

### Build Fails
- Clear cache: `npx expo start -c`
- Update dependencies: `npm update`
- Check Expo SDK compatibility

### Upload Fails
- Check file sizes
- Verify credentials
- Check internet connection
- Try again later

### App Rejected
- Review store guidelines
- Address feedback
- Resubmit with changes

---

## Cost Breakdown

### Free Tier (Development)
- Expo Go: Free
- Expo hosting: Free
- Web hosting (Netlify): Free

### Paid Requirements (Production)
- iOS Developer: $99/year
- Google Play: $25 one-time
- EAS Build (optional): $29/month
- Domain (optional): ~$12/year

---

## Support & Resources

- [Expo Docs](https://docs.expo.dev/)
- [App Store Guidelines](https://developer.apple.com/app-store/review/guidelines/)
- [Play Store Policies](https://play.google.com/console/about/guides/)
- [EAS Documentation](https://docs.expo.dev/eas/)

---

**Good luck with your launch! 🚀**

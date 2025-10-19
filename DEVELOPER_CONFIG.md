# 👤 FitRight - Developer Configuration

## Developer Information

### Apple Developer Account
- **Apple ID**: ruhan.pianist@gmail.com
- **Team ID**: (Will be assigned after enrolling in Apple Developer Program)
- **Developer Name**: Rakesh Singh

### Google Play Developer Account
- **Email**: (To be set up)
- **Developer Name**: Rakesh Singh

---

## iOS Configuration

### Apple Developer Program
**Status**: Needs enrollment
**Cost**: $99/year
**Link**: https://developer.apple.com/programs/enroll/

### Steps to Complete:
1. Visit https://developer.apple.com/
2. Sign in with: ruhan.pianist@gmail.com
3. Enroll in Apple Developer Program ($99/year)
4. Wait for approval (usually 24-48 hours)
5. Get your Team ID from the membership page

### After Enrollment:
Update `app.json` with your Team ID:
```json
"ios": {
  "supportsTablet": true,
  "bundleIdentifier": "com.fitright.app",
  "buildNumber": "1.0.0",
  "appleTeamId": "YOUR_TEAM_ID_HERE"
}
```

---

## Android Configuration

### Google Play Console
**Link**: https://play.google.com/console/signup
**Cost**: $25 one-time fee

### Steps to Complete:
1. Visit Google Play Console
2. Create developer account
3. Pay $25 one-time fee
4. Complete account setup
5. Ready to publish!

---

## App Store Connect Setup

### Once Apple Developer Enrollment is Complete:

1. **Create App in App Store Connect**
   - Go to: https://appstoreconnect.apple.com/
   - Sign in with: ruhan.pianist@gmail.com
   - Click "My Apps" → "+" → "New App"

2. **App Information**
   - Name: FitRight
   - Bundle ID: com.fitright.app
   - SKU: fitright-app
   - Primary Language: English (U.S.)

3. **App Privacy**
   - Privacy Policy URL: (You'll need to create one)
   - Data Collection: No data collected (we use local storage only)

---

## Expo Account Configuration

### Expo Account Setup
```bash
# Install Expo CLI globally (if not already installed)
npm install -g expo-cli

# Login to Expo (or create account)
expo login
```

**Recommended Email**: ruhan.pianist@gmail.com (or create expo-specific account)

### Link Project to Expo Account
```bash
cd /Users/rakeshsingh/work/personal/shoe-size-convertor
expo login
expo whoami  # Verify you're logged in
```

---

## Build Configuration

### EAS (Expo Application Services) Build

#### Setup EAS
```bash
# Install EAS CLI
npm install -g eas-cli

# Login with your Expo account
eas login

# Configure EAS for your project
eas build:configure
```

#### Build for iOS
```bash
# Development build
eas build --platform ios --profile development

# Production build (requires Apple Developer enrollment)
eas build --platform ios --profile production
```

#### Build for Android
```bash
# Development build
eas build --platform android --profile development

# Production build
eas build --platform android --profile production
```

---

## Environment Setup

### For iOS Development (Mac Required)
- ✅ Xcode (from Mac App Store)
- ✅ Xcode Command Line Tools
- ✅ CocoaPods (for native dependencies)
- ✅ Apple Developer Account

### For Android Development
- ✅ Android Studio
- ✅ Android SDK
- ✅ Android Emulator
- ✅ Java Development Kit (JDK)

---

## Signing Configuration

### iOS Signing (After Apple Developer Enrollment)

**Automatic Signing** (Recommended):
```json
// In app.json
"ios": {
  "bundleIdentifier": "com.fitright.app",
  "appleTeamId": "YOUR_TEAM_ID",
  "buildNumber": "1.0.0"
}
```

EAS will handle certificates and provisioning profiles automatically.

### Android Signing

**Generate Keystore**:
```bash
# Generate upload keystore
keytool -genkeypair -v -storetype PKCS12 \
  -keystore fitright-upload-key.keystore \
  -alias fitright-key \
  -keyalg RSA -keysize 2048 -validity 10000
```

**Important**: 
- Store this keystore file safely!
- Never commit it to git
- Back it up securely
- You'll need the password for every release

---

## Privacy Policy & Support

### Privacy Policy (Required for App Store)

**Simple Template** (since we don't collect data):

```markdown
# FitRight Privacy Policy

Last updated: October 2025

## Data Collection
FitRight does not collect, store, or share any personal data. All size conversions and saved favorites are stored locally on your device only.

## Local Storage
- Size conversions: Stored locally
- Saved favorites: Stored locally
- No cloud sync
- No analytics
- No tracking

## Contact
Email: ruhan.pianist@gmail.com

## Changes
We may update this policy. Changes will be posted in the app.
```

**Hosting Options**:
1. Create a GitHub Pages site
2. Use Google Sites (free)
3. Add to your personal website

**Example URL**: https://yourusername.github.io/fitright-privacy

### Support Email
- **Support**: ruhan.pianist@gmail.com
- **Contact**: ruhan.pianist@gmail.com

---

## Quick Setup Commands

### Initial Setup
```bash
# Navigate to project
cd /Users/rakeshsingh/work/personal/shoe-size-convertor

# Install dependencies
npm install

# Login to Expo
npx expo login
# Email: ruhan.pianist@gmail.com

# Install EAS CLI
npm install -g eas-cli

# Login to EAS
eas login

# Configure EAS builds
eas build:configure
```

### Development Testing
```bash
# Start development server
npm start

# Run on iOS (requires Mac + Xcode)
npm run ios

# Run on Android (requires Android Studio)
npm run android

# Run on Web
npm run web
```

---

## App Store Credentials Summary

### Apple
- **Apple ID**: ruhan.pianist@gmail.com
- **Bundle ID**: com.fitright.app
- **App Name**: FitRight
- **Category**: Utilities
- **Support Email**: ruhan.pianist@gmail.com

### Google Play
- **Developer Email**: (To be created)
- **Package Name**: com.fitright.app
- **App Name**: FitRight
- **Category**: Tools
- **Support Email**: ruhan.pianist@gmail.com

---

## Next Steps Checklist

### Immediate (Before Building)
- [ ] Enroll in Apple Developer Program ($99)
- [ ] Wait for Apple Developer approval (24-48 hours)
- [ ] Get Team ID from Apple Developer portal
- [ ] Update app.json with Team ID
- [ ] Set up Google Play Developer account ($25)

### For Building
- [ ] Install EAS CLI: `npm install -g eas-cli`
- [ ] Login to Expo: `eas login`
- [ ] Configure builds: `eas build:configure`
- [ ] Create privacy policy page
- [ ] Get privacy policy URL

### For Submission
- [ ] Create App Store Connect listing
- [ ] Create Google Play Console listing
- [ ] Prepare screenshots (6+ per platform)
- [ ] Write app descriptions
- [ ] Submit for review

---

## Important Notes

### Apple Developer Account
⚠️ **Must enroll before building for iOS**
- Visit: https://developer.apple.com/programs/
- Sign in with: ruhan.pianist@gmail.com
- Pay $99/year
- Wait for approval (usually 24-48 hours)

### Keystore Security
⚠️ **Never lose your Android keystore!**
- Back it up in multiple secure locations
- Store password in password manager
- If lost, you can't update your app

### Email for Everything
✅ **Using ruhan.pianist@gmail.com for:**
- Apple Developer account
- Expo account (recommended)
- Support email
- Privacy policy contact
- App Store Connect

---

## Helpful Links

### Apple
- Developer Portal: https://developer.apple.com/
- App Store Connect: https://appstoreconnect.apple.com/
- Enrollment: https://developer.apple.com/programs/enroll/

### Google
- Play Console: https://play.google.com/console/
- Developer Help: https://support.google.com/googleplay/android-developer/

### Expo
- Dashboard: https://expo.dev/
- Documentation: https://docs.expo.dev/
- EAS Docs: https://docs.expo.dev/eas/

---

## Questions?

For issues with:
- **Apple Developer**: https://developer.apple.com/support/
- **Google Play**: https://support.google.com/googleplay/android-developer/
- **Expo/EAS**: https://expo.dev/support

---

**Account Configured!** ✅

Your Apple ID (ruhan.pianist@gmail.com) is ready to be used for:
- Apple Developer Program enrollment
- App Store Connect
- iOS app distribution
- Support and contact email

**Next step**: Enroll in Apple Developer Program to start building for iOS!

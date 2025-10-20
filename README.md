# FitRight - Shoe Size Converter 👟

<div align="center">
  <h3>Get Your Fit Right Globally 🌍</h3>
  <p><strong>Developed by Ruhan Singh</strong></p>
  <p>A beautiful React Native app for converting shoe sizes across different sizing systems worldwide</p>
</div>

---

## 📱 About

FitRight is a comprehensive shoe size converter app that helps you find the perfect fit no matter where you're shopping. Convert between US, UK, EU, Japanese, and Centimeter sizing systems instantly with gender-specific accuracy.

**Developer**: Ruhan Singh (Age 13)
**App Version**: 1.0.0
**Privacy**: 100% offline - no data collection

---

## ✨ Features

### 🎯 Core Features
- **Country-Based Conversion** - Convert from/to specific countries (US 🇺🇸, UK 🇬🇧, EU 🇪🇺, JP 🇯🇵, CM 📏)
- **Gender-Specific Sizing** - Accurate conversions for Men's, Women's, and Kids' shoes with color-coded buttons
  - Men: Blue
  - Women: Pink
  - Kids: Yellow
- **Quick Swap** - Instantly reverse your conversion direction with haptic feedback
- **Save Favorites** - Quick access to frequently used size conversions with heart icon
- **Interactive Size Charts** - Complete reference tables for all sizing systems
- **Conversion History** - Track your last 10 conversions with timestamps
- **Onboarding Tutorial** - 4-step guide for first-time users

### 🎨 Beautiful UI
- Modern gradient design (purple to blue)
- Dark mode support with theme switching
- Smooth animations and haptic feedback
- Clean, intuitive interface
- Responsive layout for all screen sizes
- Color-coded gender selection

### 📊 Additional Features
- **Fit Recommendations** - Tips for different shoe types (running, dress, boots, etc.)
- **Offline Capability** - Works without internet connection
- **Fast Performance** - Instant conversions with smooth animations
- **Developer Credit** - Prominently displays "Developed by Ruhan Singh"

---

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Expo CLI

### Installation

1. **Navigate to the project directory**
```bash
cd /Users/rakeshsingh/work/personal/fit-right
```

2. **Install dependencies**
```bash
npm install
```

3. **Start the development server**
```bash
npm start
# or
npx expo start
```

4. **Run on your device**
- **iOS**: Press `i` in terminal or scan QR with Camera app
- **Android**: Press `a` in terminal or scan QR with Expo Go app
- **Web**: Press `w` in terminal

### Troubleshooting

**"Too many open files" error?**
```bash
# Solution 1: Restart your computer
# Solution 2: Clear Metro bundler cache
npx expo start --clear
# Solution 3: Increase file descriptor limit (Mac)
ulimit -n 4096
```

**Module not found errors?**
```bash
rm -rf node_modules package-lock.json
npm install
```

---

## 📁 Project Structure

```
fit-right/
├── App.js                          # Main app with navigation & theme provider
├── src/
│   ├── screens/
│   │   ├── ConverterScreen.js      # Main conversion interface
│   │   ├── FavoritesScreen.js      # Saved conversions
│   │   ├── ChartScreen.js          # Size charts and guides
│   │   └── SettingsScreen.js       # App settings & dark mode
│   ├── components/
│   │   ├── OnboardingModal.js      # First-time user tutorial
│   │   └── HistoryModal.js         # Conversion history viewer
│   ├── context/
│   │   └── ThemeContext.js         # Dark mode theme management
│   └── data/
│       └── conversionData.js       # Size conversion logic
├── app.json                        # Expo configuration
├── package.json                    # Dependencies
└── README.md                       # This file
```

---

## 🎨 Screens Overview

### 1. **Converter Screen** (Main)
- Select gender (Men/Women/Kids) with color-coded buttons
- Choose FROM country with flags
- Enter your shoe size
- Tap swap button to reverse direction
- Choose TO country
- Tap convert to see results
- Save to favorites with heart icon
- Access conversion history via clock icon
- View fit recommendations (collapsible)

### 2. **Favorites Screen**
- View all saved size conversions
- Quick reference for frequently used sizes
- Delete individual favorites
- Clear all favorites option
- Shows: Gender, From→To countries, sizes

### 3. **Charts Screen**
- Gender selection (Men/Women/Kids)
- Complete size conversion tables
- Width sizing guide
- Foot measurement instructions
- Pro tips for perfect fit

### 4. **Settings Screen**
- Dark mode toggle (fully functional)
- About FitRight modal
  - App description
  - Developer credit: Ruhan Singh
- Tutorial modal (replayable)
- App version display

---

## 🔧 Technical Details

### Technologies Used
- **React Native** - Cross-platform mobile framework
- **Expo SDK 50** - Development platform
- **React Navigation** - Bottom tab navigation
- **Expo Linear Gradient** - Beautiful gradients
- **AsyncStorage** - Local data persistence
- **Expo Vector Icons** - Ionicons icon set
- **Expo Haptics** - Tactile feedback
- **Context API** - Theme management

### Dependencies
```json
{
  "expo": "~50.0.17",
  "react-native": "0.73.6",
  "@react-navigation/native": "^6.1.18",
  "@react-navigation/bottom-tabs": "^6.6.1",
  "expo-linear-gradient": "~12.7.2",
  "expo-haptics": "~12.8.1",
  "expo-font": "~11.10.3",
  "react-native-screens": "~3.29.0"
}
```

### Supported Platforms
- ✅ iOS (iPhone & iPad)
- ✅ Android
- ✅ Web (Progressive Web App)

### Sizing Systems
- **US** 🇺🇸 - United States standard
- **UK** 🇬🇧 - United Kingdom standard
- **EU** 🇪🇺 - European standard
- **JP** 🇯🇵 - Japanese standard
- **CM** 📏 - Centimeter measurements

---

## 💡 How to Use

### Basic Conversion
1. Select gender (Men/Women/Kids)
2. Choose FROM country (e.g., US)
3. Enter your size (e.g., 10)
4. Choose TO country (e.g., UK)
5. Tap "Convert"
6. See your converted size

### Using Swap Feature
1. After selecting FROM and TO countries
2. Tap the "Swap" button in the middle
3. Countries reverse instantly
4. Previous conversion automatically swaps

### Saving Favorites
1. After converting a size
2. Tap the heart icon ❤️ in results
3. Access in "Saved" tab

### Viewing History
1. Tap clock icon ⏱️ in header
2. See last 10 conversions with timestamps
3. Tap any item to reload that conversion

---

## 🎯 Features Breakdown

### Engagement Features
1. **Haptic Feedback** - Vibrations on:
   - Swap button press
   - Convert button press
   - Save to favorites
   - History item selection

2. **Conversion History**
   - Last 10 conversions saved
   - Relative timestamps ("5m ago", "2h ago")
   - Tap to reload previous conversion
   - Automatic cleanup (keeps 10 most recent)

3. **Onboarding Tutorial**
   - Shows on first launch
   - 4 interactive steps
   - Can be skipped
   - Replayable from Settings

4. **Dark Mode**
   - Toggle in Settings
   - Persists across sessions
   - All screens themed
   - Smooth transitions

---

## 🚀 Deployment

### Option 1: Expo Go (Testing)
```bash
npx expo publish
```
Access via QR code in Expo Go app

### Option 2: Build Standalone Apps
```bash
# iOS
npx expo build:ios

# Android APK
npx expo build:android -t apk

# Android App Bundle (Play Store)
npx expo build:android -t app-bundle
```

### Option 3: Web Deployment
```bash
npx expo export:web
# Deploy web-build folder to Netlify/Vercel/GitHub Pages
```

### Pre-Deployment Checklist
- [ ] Test all features on iOS
- [ ] Test all features on Android
- [ ] Update version in app.json
- [ ] Create app icons (1024x1024)
- [ ] Create splash screen
- [ ] Review Privacy Policy
- [ ] Test dark mode thoroughly

---

## 🔒 Privacy Policy

**FitRight is 100% private and offline.**

### We DO NOT Collect:
- ❌ Personal information
- ❌ Location data
- ❌ Usage analytics
- ❌ Device information
- ❌ Any tracking data

### Local Storage Only:
- ✅ Conversions calculated locally
- ✅ Favorites stored on device
- ✅ Preferences stored on device
- ✅ No cloud sync
- ✅ No data transmission

**Contact**: ruhan.pianist@gmail.com

---

## 👨‍💻 Developer

**Ruhan Singh** - Age 13

This is my first mobile app! I designed and built FitRight to help people find the perfect shoe size when shopping internationally.

**Father's Account**: Rakesh Singh (rakeshsingh@192.168.1.3)

---

## 🎉 What Makes FitRight Special

1. **Youth Innovation** - Built by a 13-year-old developer
2. **Privacy First** - Zero data collection, 100% offline
3. **Beautiful Design** - Modern gradient UI with dark mode
4. **Comprehensive** - 5 sizing systems, 3 genders
5. **Smart Features** - Haptics, history, swap, favorites
6. **Educational** - Complete size charts and fit guides
7. **Free & Open Source** - No hidden costs

---

## 📊 Changelog

### Version 1.0.0 (Current)
- ✅ Country-based conversion (FROM → TO)
- ✅ Gender-specific sizing with color coding
- ✅ Dark mode support
- ✅ Haptic feedback
- ✅ Conversion history (last 10)
- ✅ Onboarding tutorial
- ✅ Quick swap feature
- ✅ Save favorites
- ✅ Size charts with gender filtering
- ✅ Developer credit display
- ✅ About & Tutorial modals
- ✅ Removed brand selection
- ✅ Rebrand from SoleMate to FitRight

---

## 🐛 Known Issues

- **macOS File Watcher Limit** - May need to restart computer or increase `ulimit -n` if Metro bundler shows "too many open files"

---

## 🛠️ Development

### Useful Commands
```bash
# Start with cache clear
npx expo start --clear

# Check for updates
npm outdated

# Install expo packages
npx expo install expo-font expo-haptics

# Kill Metro bundler
pkill -f "expo start"

# Check bundle size
npx expo export --output-dir dist
du -sh dist
```

### Code Style
- Functional components with hooks
- Context API for theme
- AsyncStorage for persistence
- Modular file structure
- Clear naming conventions

---

## 🤝 Contributing

This is primarily a learning project for a young developer, but suggestions and feedback are welcome!

To contribute:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

---

## 📄 License

MIT License - Feel free to use this code for learning or building your own projects!

---

## 🙏 Acknowledgments

- **Expo Team** - For the amazing development platform
- **React Native Community** - For comprehensive documentation
- **Ionicons** - For beautiful icon set
- **Dad (Rakesh Singh)** - For supporting this project
- **Sizing Data** - Compiled from official brand charts

---

## 📞 Support

**Developer Email**: ruhan.pianist@gmail.com
**GitHub Issues**: [Open an issue](https://github.com/rakesh8116/shoe-size-convertor/issues)
**App Name**: FitRight
**Tagline**: Get Your Fit Right Globally

---

## 🔗 Links

- [Expo Documentation](https://docs.expo.dev/)
- [React Native Docs](https://reactnative.dev/)
- [React Navigation](https://reactnavigation.org/)

---

<div align="center">
  <p><strong>Made with ❤️ by a 13-year-old developer</strong></p>
  <p>Get Your Fit Right! 👟✨</p>
  <p><em>Developed by Ruhan Singh</em></p>
</div>

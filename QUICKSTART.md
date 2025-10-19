# 🚀 Quick Start Guide - SoleMate

## Prerequisites Check
Before starting, ensure you have:
- [ ] Node.js installed (check with `node --version`)
- [ ] npm or yarn installed
- [ ] Expo CLI installed globally

## First Time Setup

### 1. Install Expo CLI (if not already installed)
```bash
npm install -g expo-cli
```

### 2. Navigate to Project Directory
```bash
cd /Users/rakeshsingh/work/personal/shoe-size-convertor
```

### 3. Install All Dependencies
```bash
npm install
```

This will install:
- React Native & React
- Expo framework and libraries
- Navigation libraries
- AsyncStorage for data persistence
- Vector icons and gradients

### 4. Start the Development Server
```bash
npx expo start
```

or simply:
```bash
npm start
```

## Running on Different Platforms

### 📱 iOS (Mac only)
1. Press `i` in the terminal after starting the dev server
2. iOS Simulator will launch automatically
3. App will load in the simulator

### 🤖 Android
1. Start your Android emulator first
2. Press `a` in the terminal after starting the dev server
3. App will install and launch in the emulator

### 🌐 Web Browser
1. Press `w` in the terminal after starting the dev server
2. App will open in your default web browser

### 📲 Physical Device
1. Install "Expo Go" app from App Store (iOS) or Play Store (Android)
2. Start the dev server with `npm start`
3. Scan the QR code shown in terminal with:
   - iOS: Camera app
   - Android: Expo Go app
4. App will load on your device

## Common Issues & Solutions

### Issue: "expo-cli not found"
**Solution:**
```bash
npm install -g expo-cli
```

### Issue: "Module not found" errors
**Solution:**
```bash
rm -rf node_modules
npm install
```

### Issue: Metro bundler cache issues
**Solution:**
```bash
npx expo start -c
```

### Issue: iOS build fails
**Solution:**
```bash
cd ios && pod install && cd ..
npx expo start
```

## Project Structure Quick Reference

```
📁 shoe-size-convertor/
├── 📄 App.js                    # Entry point with navigation
├── 📁 src/
│   ├── 📁 screens/
│   │   ├── ConverterScreen.js   # Main conversion UI
│   │   ├── FavoritesScreen.js   # Saved sizes
│   │   └── ChartScreen.js       # Reference charts
│   └── 📁 data/
│       └── conversionData.js    # Conversion logic
├── 📄 app.json                  # Expo config
├── 📄 package.json              # Dependencies
└── 📄 README.md                 # Full documentation
```

## Development Tips

### 1. Hot Reload
- Changes to JS files will auto-reload
- Shake device or press `R` to manually reload

### 2. Debug Menu
- iOS Simulator: Cmd + D
- Android Emulator: Cmd + M (Mac) or Ctrl + M (Windows/Linux)
- Physical Device: Shake the device

### 3. Clear Cache
If you encounter weird issues:
```bash
npx expo start -c
```

### 4. View Logs
Development logs appear in the terminal where you ran `npm start`

## Next Steps

1. ✅ Run the app successfully
2. 📖 Read the full README.md for features
3. 🎨 Explore the three main screens
4. 🔧 Customize brand adjustments if needed
5. 📱 Test on multiple devices

## Useful Commands

```bash
# Start development server
npm start

# Start with cache cleared
npx expo start -c

# Build for production
npx expo build:android
npx expo build:ios

# Publish update
npx expo publish

# Check for outdated packages
npm outdated

# Update all packages
npm update
```

## Need Help?

- 📚 Check the full README.md
- 🌐 Visit [Expo Documentation](https://docs.expo.dev/)
- 💬 Open an issue on GitHub

---

Happy coding! 🎉👟

# FitRight - Shoe Size Converter

<div align="center">
  <h3>✅ Get Your Fit Right Globally 🌍</h3>
  <p>A beautiful React Native app for converting shoe sizes across different sizing systems worldwide</p>
</div>

## ✨ Features

### 🎯 Core Features
- **Universal Size Conversion** - Convert between US, UK, EU, Japanese (JP), and Centimeter (CM) sizing systems
- **Gender-Specific Sizing** - Accurate conversions for Men's, Women's, and Kids' shoes
- **Brand-Specific Adjustments** - Accounts for brand variations (Nike, Adidas, Converse, etc.)
- **Save Favorites** - Quick access to your frequently used size conversions
- **Interactive Size Charts** - Complete reference tables for all sizing systems
- **Measurement Guide** - Step-by-step instructions on measuring your feet

### 🎨 Beautiful UI
- Modern gradient design with smooth animations
- Clean, intuitive interface
- Responsive layout for all screen sizes
- Dark-themed gradients with vibrant accents
- Eye-catching visual feedback

### 📊 Additional Features
- **Fit Recommendations** - Tips for different shoe types (running, dress, boots, etc.)
- **Width Guide** - Information on narrow, medium, wide, and extra-wide fits
- **Pro Tips** - Expert advice for finding the perfect fit
- **Offline Capability** - Works without internet connection
- **Fast Performance** - Instant conversions with smooth animations

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Expo CLI
- iOS Simulator (for Mac) or Android Emulator

### Installation

1. **Navigate to the repository**
```bash
cd /Users/rakeshsingh/work/personal/shoe-size-convertor
```

2. **Install dependencies**
```bash
npm install
# or
yarn install
```

3. **Start the development server**
```bash
npm start
# or
yarn start
# or
npx expo start
```

4. **Run on your device**
- **iOS**: Press `i` in the terminal or scan QR code with Camera app
- **Android**: Press `a` in the terminal or scan QR code with Expo Go app
- **Web**: Press `w` in the terminal

## 📱 App Structure

```
shoe-size-convertor/
├── App.js                          # Main app component with navigation
├── src/
│   ├── screens/
│   │   ├── ConverterScreen.js      # Main conversion interface
│   │   ├── FavoritesScreen.js      # Saved conversions
│   │   ├── ChartScreen.js          # Size charts and guides
│   │   └── SettingsScreen.js       # App settings
│   └── data/
│       └── conversionData.js       # Size conversion logic and data
├── app.json                        # Expo configuration
├── package.json                    # Dependencies
└── README.md                       # This file
```

## 🎨 Screens Overview

### 1. Converter Screen
The main screen where users can:
- Select gender (Men, Women, Kids)
- Choose their size system (US, UK, EU, JP, CM)
- Enter their shoe size
- Optionally select a brand for adjusted sizing
- View instant conversions to all other systems
- Save favorite conversions
- Access fit recommendations

### 2. Favorites Screen
- View all saved size conversions
- Quick reference for frequently used sizes
- Delete individual favorites or clear all
- Visual organization by gender

### 3. Charts Screen
- Complete size conversion charts for all genders
- Width sizing guide
- Step-by-step foot measurement instructions
- Pro tips for perfect fit
- Reference for offline use

### 4. Settings Screen
- App preferences and configuration
- Notifications settings
- About and help information
- Legal information

## 🔧 Technical Details

### Technologies Used
- **React Native** - Cross-platform mobile framework
- **Expo** - Development platform
- **React Navigation** - Navigation library
- **Expo Linear Gradient** - Gradient backgrounds
- **AsyncStorage** - Local data persistence
- **Vector Icons** - Beautiful iconography

### Supported Platforms
- ✅ iOS (iPhone & iPad)
- ✅ Android
- ✅ Web (Progressive Web App)

### Sizing Systems Supported
- **US Sizing** - United States standard
- **UK Sizing** - United Kingdom standard
- **EU Sizing** - European standard
- **JP Sizing** - Japanese standard (same as CM)
- **CM Sizing** - Centimeter measurements

### Brands with Size Adjustments
- Nike (true to size)
- Adidas (runs large +0.5)
- Puma (true to size)
- New Balance (runs large +0.5)
- Converse (runs small -0.5)
- Vans (true to size)
- Reebok (true to size)
- Asics (runs large +0.5)
- Under Armour (true to size)
- Skechers (true to size)

## 🎯 Usage Examples

### Basic Conversion
1. Open the app
2. Select your gender
3. Choose your size system (e.g., US)
4. Enter your size (e.g., 10)
5. Tap the convert button
6. View conversions to all other systems

### Brand-Specific Conversion
1. Follow steps 1-4 above
2. Select your brand (e.g., Adidas)
3. Tap convert
4. See adjusted sizes based on brand fit

### Saving Favorites
1. After converting a size
2. Tap the heart icon in the results
3. Access saved sizes in the Favorites tab

## 🛠️ Customization

### Adding New Brands
Edit `src/data/conversionData.js` and add to `brandAdjustments`:
```javascript
export const brandAdjustments = {
  'YourBrand': { men: 0.5, women: 0.5 },
  // ...
};
```

### Adding Fit Recommendations
Edit `src/data/conversionData.js` and add to `fitRecommendations`:
```javascript
export const fitRecommendations = {
  'Shoe Type': 'Your recommendation here',
  // ...
};
```

## 🐛 Known Issues

- None currently reported

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👨‍💻 Developer

Created by Rakesh Singh

## 🙏 Acknowledgments

- Sizing data compiled from official brand size charts
- Icons by Expo Vector Icons
- UI inspiration from modern mobile design trends

## 📞 Support

For issues or questions, please open an issue on the GitHub repository.

---

<div align="center">
  <p>Made with ❤️ and ☕</p>
  <p>Get Your Fit Right! ✅👟</p>
</div>

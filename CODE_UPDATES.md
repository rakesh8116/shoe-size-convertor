# 🔧 FitRight - Ready-to-Use Code Updates

## Quick Copy-Paste Updates for Screen Files

---

## 1. ConverterScreen.js Header Update

**Location:** Line ~104 in the `return` statement

**Replace this:**
```javascript
        <View style={styles.header}>
          <Ionicons name="footsteps" size={48} color="#fff" />
          <Text style={styles.title}>SoleMate</Text>
          <Text style={styles.subtitle}>Your Perfect Fit, Worldwide</Text>
        </View>
```

**With this:**
```javascript
        <View style={styles.header}>
          <Ionicons name="checkmark-circle" size={48} color="#fff" />
          <Text style={styles.title}>FitRight</Text>
          <Text style={styles.subtitle}>Get Your Fit Right Globally</Text>
        </View>
```

---

## 2. FavoritesScreen.js Header Update

**Location:** Around line 40-45

**Replace this:**
```javascript
      <View style={styles.header}>
        <Ionicons name="heart" size={48} color="#fff" />
        <Text style={styles.title}>Saved Sizes</Text>
```

**With this:**
```javascript
      <View style={styles.header}>
        <Ionicons name="checkmark-circle" size={48} color="#fff" />
        <Text style={styles.title}>FitRight - Saved</Text>
```

---

## 3. ChartScreen.js Header Update

**Location:** Around line 80-85

**Replace this:**
```javascript
      <View style={styles.header}>
        <Ionicons name="grid" size={48} color="#fff" />
        <Text style={styles.title}>Size Charts</Text>
        <Text style={styles.subtitle}>Complete Reference Guide</Text>
      </View>
```

**With this:**
```javascript
      <View style={styles.header}>
        <Ionicons name="checkmark-circle" size={48} color="#fff" />
        <Text style={styles.title}>FitRight - Charts</Text>
        <Text style={styles.subtitle}>Get Your Fit Right Globally</Text>
      </View>
```

---

## 4. SettingsScreen.js Updates

### Update 1: Header (Around line 70)

**Replace this:**
```javascript
      <View style={styles.header}>
        <Ionicons name="settings" size={48} color="#fff" />
        <Text style={styles.title}>Settings</Text>
      </View>
```

**With this:**
```javascript
      <View style={styles.header}>
        <Ionicons name="checkmark-circle" size={48} color="#fff" />
        <Text style={styles.title}>FitRight - Settings</Text>
      </View>
```

### Update 2: Version Text (Around line 135-140)

**Replace this:**
```javascript
          <View style={styles.versionContainer}>
            <Text style={styles.versionText}>SoleMate v1.0.0</Text>
            <Text style={styles.copyrightText}>© 2025 All rights reserved</Text>
          </View>
```

**With this:**
```javascript
          <View style={styles.versionContainer}>
            <Text style={styles.versionText}>FitRight v1.0.0</Text>
            <Text style={styles.copyrightText}>© 2025 All rights reserved</Text>
          </View>
```

---

## Alternative: Use Find & Replace

If you're using VS Code, Sublime, or another editor:

### Step-by-Step:
1. Open **Find & Replace** (Cmd/Ctrl + Shift + F)
2. Set scope to `src/screens/` folder
3. Apply these replacements:

### Replacement 1:
```
Find:    name="footsteps"
Replace: name="checkmark-circle"
Files:   src/screens/ConverterScreen.js
```

### Replacement 2:
```
Find:    SoleMate
Replace: FitRight
Files:   All .js files in src/screens/
```

### Replacement 3:
```
Find:    Your Perfect Fit, Worldwide
Replace: Get Your Fit Right Globally
Files:   All .js files in src/screens/
```

### Replacement 4:
```
Find:    Saved Sizes
Replace: FitRight - Saved
Files:   src/screens/FavoritesScreen.js
```

### Replacement 5:
```
Find:    Size Charts
Replace: FitRight - Charts
Files:   src/screens/ChartScreen.js
```

### Replacement 6:
```
Find:    name="heart" size={48}
Replace: name="checkmark-circle" size={48}
Files:   src/screens/FavoritesScreen.js
```

### Replacement 7:
```
Find:    name="grid" size={48}
Replace: name="checkmark-circle" size={48}
Files:   src/screens/ChartScreen.js
```

### Replacement 8:
```
Find:    name="settings" size={48}
Replace: name="checkmark-circle" size={48}
Files:   src/screens/SettingsScreen.js
```

---

## Verification Script

After making changes, run this to verify:

```bash
# Check for any remaining "SoleMate" references
grep -r "SoleMate" src/

# Should only return comments or none
# If you see actual code, update those lines too

# Check for old icon references
grep -r "footsteps" src/

# Should return none (unless in comments)
```

---

## Testing After Updates

### 1. Start the app
```bash
cd /Users/rakeshsingh/work/personal/shoe-size-convertor
npm start
```

### 2. Visual checks
- [ ] Main screen shows "FitRight" title
- [ ] Checkmark icon appears (not footsteps)
- [ ] Tagline reads "Get Your Fit Right Globally"
- [ ] Favorites tab shows "FitRight - Saved"
- [ ] Charts tab shows "FitRight - Charts"
- [ ] Settings shows "FitRight - Settings"
- [ ] Settings version shows "FitRight v1.0.0"

### 3. Functional checks
- [ ] Size conversion works
- [ ] Saving favorites works
- [ ] Charts load correctly
- [ ] Navigation smooth between tabs
- [ ] All icons display properly

---

## Complete File Paths

For reference, here are the exact file locations:

```
/Users/rakeshsingh/work/personal/shoe-size-convertor/
├── src/
│   └── screens/
│       ├── ConverterScreen.js    ← Update header (line ~104)
│       ├── FavoritesScreen.js    ← Update header (line ~40)
│       ├── ChartScreen.js        ← Update header (line ~80)
│       └── SettingsScreen.js     ← Update header & version (lines ~70 & ~135)
```

---

## Quick Test Command

After updates, test immediately:

```bash
# Clear any cached builds
rm -rf .expo
rm -rf node_modules/.cache

# Start fresh
npm start -- --clear
```

Then press:
- `i` for iOS simulator
- `a` for Android emulator  
- `w` for web browser

---

## 🎉 That's It!

After these updates, your app will be fully rebranded to **FitRight**!

**Summary of Changes:**
- ✅ 4 header updates (title + icon)
- ✅ 1 version text update
- ✅ Total: ~8 lines of code changed

**Time Required:** 5-10 minutes

**Impact:** Complete rebrand from SoleMate to FitRight

---

**Ready to Get Your Fit Right?** ✅👟

*Copy the code snippets above and paste them into your files, or use find & replace for speed!*

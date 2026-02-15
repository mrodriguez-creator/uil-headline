# Mental Math Challenge App - Setup Guide

## 🚀 Quick Start

### Prerequisites
- Install Node.js (https://nodejs.org/)
- Install Expo CLI: `npm install -g expo-cli`

### Installation Steps

1. **Create a new Expo project:**
   ```bash
   npx create-expo-app MentalMathApp
   cd MentalMathApp
   ```

2. **Replace the App.js file with the MathChallengeApp.jsx code**

3. **Install dependencies:**
   ```bash
   npm install
   ```

4. **Run the app:**
   ```bash
   npx expo start
   ```

5. **Test on your device:**
   - Download "Expo Go" app on your phone (iOS/Android)
   - Scan the QR code that appears in your terminal
   - The app will load on your phone!

## 📱 Features Included

### Current Features:
- ✅ Three difficulty levels (Easy, Medium, Hard)
- ✅ Timed challenges (30 seconds, +5s bonus for correct answers)
- ✅ Score tracking with streak bonuses
- ✅ Mental math operations: addition, subtraction, multiplication, division
- ✅ Real-time feedback
- ✅ Responsive UI design

### Future Ideas to Add:
1. **Progress Tracking**
   - Save high scores locally
   - Track improvement over time
   - Daily challenges

2. **More Question Types**
   - Percentages (15% of 80 = ?)
   - Fractions (3/4 + 1/2 = ?)
   - Square roots
   - Exponents
   - Order of operations

3. **Customization**
   - Custom time limits
   - Focus on specific operations
   - Practice mode (no timer)

4. **Multiplayer**
   - Challenge friends
   - Leaderboards
   - Head-to-head battles

5. **Learning Mode**
   - Show step-by-step solutions
   - Tips and tricks for mental math
   - Adaptive difficulty

## 🛠️ Next Steps for Development

### To build for production:

**iOS:**
```bash
npx expo build:ios
```
(Requires Apple Developer account - $99/year)

**Android:**
```bash
npx expo build:android
```
(Free to publish on Google Play - one-time $25 fee)

### Alternative: Build locally
```bash
npx expo prebuild
npx expo run:ios
npx expo run:android
```

## 📚 Learning Resources

- **Expo Documentation:** https://docs.expo.dev/
- **React Native Docs:** https://reactnative.dev/
- **React Hooks Guide:** https://react.dev/reference/react

## 🎨 Customization Tips

Want to change the look? Edit the `styles` object:
- Colors: Change hex codes like `#e94560` (pink), `#1a1a2e` (dark blue)
- Fonts: Adjust `fontSize` values
- Spacing: Modify `padding` and `margin` values

## 💡 Code Structure

The app uses React hooks:
- `useState` - Manages game state (score, time, questions)
- `useEffect` - Handles the countdown timer
- Functions handle game logic (generating questions, checking answers)

Feel free to modify any part to fit your vision!

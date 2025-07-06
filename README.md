# 🎮 Tic Tac Toe - Progressive Web App

A modern, feature-rich Tic Tac Toe game built with React, TypeScript, and Material-UI. This Progressive Web App (PWA) supports multiple languages, offline play, and provides an excellent user experience across all devices.

## ✨ Features

### 🎯 Core Game Features
- **Single Player Mode** - Play against AI with intelligent move selection
- **Multiplayer Mode** - Play with friends on the same device
- **Smart AI** - Unbeatable AI using the minimax algorithm
- **Game Statistics** - Track wins, losses, draws, and streaks
- **Sound Effects** - Immersive audio feedback for moves and game events

### 🌍 Internationalization (i18n)
- **5 Languages Supported**:
  - 🇺🇸 English
  - 🇪🇸 Spanish (Español)
  - 🇫🇷 French (Français)
  - 🇮🇳 Hindi (हिंदी)
  - 🇮🇳 Bhojpuri (भोजपुरी)
- **Dynamic Language Switching** - Change languages on the fly
- **Persistent Language Selection** - Remembers your language preference
- **Complete UI Translation** - Every text element is translated

### 📱 Progressive Web App (PWA)
- **Offline Support** - Play without internet connection
- **Installable** - Add to home screen on mobile and desktop
- **Service Worker** - Background updates and caching
- **Push Notifications** - Stay updated with game notifications
- **App-like Experience** - Native app feel with web technology

### 🎨 Modern UI/UX
- **Dark/Light Theme** - Toggle between themes
- **Responsive Design** - Works perfectly on all screen sizes
- **Material Design** - Beautiful, consistent interface
- **Smooth Animations** - Engaging user interactions
- **Accessibility** - Screen reader and keyboard navigation support

### 🔧 Advanced Features
- **PWA Settings Panel** - Manage cache, service worker, and app settings
- **Sound Controls** - Mute/unmute game sounds
- **Statistics Tracking** - Detailed game analytics
- **Auto-save** - Game state persistence
- **Performance Optimized** - Fast loading and smooth gameplay

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/tic-tac-toe.git
   cd tic-tac-toe
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

### Building for Production

```bash
npm run build
```

The build files will be created in the `build/` directory, ready for deployment.

## 🎮 How to Play

### Single Player Mode
1. Click "Single Player (vs AI)" on the landing page
2. Choose your symbol (X or O)
3. Make your moves by clicking on empty squares
4. The AI will respond with intelligent moves
5. Try to get three in a row to win!

### Multiplayer Mode
1. Click "Multiplayer (2 Players)" on the landing page
2. Player 1 chooses their symbol
3. Players take turns making moves
4. First to get three in a row wins!

### Language Switching
1. Click the language icon (🌐) in the header
2. Select your preferred language from the menu
3. The entire interface will update immediately

## 🛠️ Technology Stack

- **Frontend Framework**: React 19.1.0
- **Language**: TypeScript 4.9.5
- **UI Library**: Material-UI (MUI) 7.1.0
- **Internationalization**: react-i18next
- **Build Tool**: Create React App 5.0.1
- **PWA**: Service Worker with offline support
- **Testing**: Jest with React Testing Library

## 📁 Project Structure

```
src/
├── components/          # React components
│   ├── Board.tsx       # Game board component
│   ├── ChooseSymbol.tsx # Symbol selection
│   ├── GameBoard.tsx   # Main game interface
│   ├── GameInfo.tsx    # Game status display
│   ├── Header.tsx      # App header with controls
│   ├── LandingPage.tsx # Welcome screen
│   ├── LanguageSelector.tsx # Language switcher
│   └── ...
├── constants/          # App constants
│   ├── gameConstants.ts # Game-related constants
│   └── strings.ts      # Legacy string system
├── hooks/              # Custom React hooks
│   ├── useInstallPrompt.ts
│   ├── useOffline.ts
│   └── useServiceWorker.ts
├── i18n/               # Internationalization
│   ├── index.ts        # i18n configuration
│   └── locales/        # Language files
│       ├── en.json     # English
│       ├── es.json     # Spanish
│       ├── fr.json     # French
│       ├── hi.json     # Hindi
│       └── bho.json    # Bhojpuri
├── logic/              # Game logic
│   ├── GameLogic.ts    # Main game logic
│   └── ai.ts          # AI implementation
├── theme/              # Theme configuration
├── utils/              # Utility functions
└── __tests__/          # Test files
```

## 🧪 Testing

Run the test suite:

```bash
# Run all tests
npm test

# Run tests with coverage
npm run test:coverage

# Run specific test file
npm test -- i18n.test.tsx
```

### Test Coverage
- **i18n System**: Language switching, translation accuracy
- **Components**: UI rendering and user interactions
- **Game Logic**: AI moves, win detection, game state
- **PWA Features**: Service worker, offline functionality

## 🌐 Adding New Languages

To add a new language:

1. **Create a new locale file** in `src/i18n/locales/`
   ```json
   {
     "landing": {
       "title": "Your translated title",
       "subtitle": "Your translated subtitle"
     }
   }
   ```

2. **Update the i18n configuration** in `src/i18n/index.ts`
   ```typescript
   import newLang from './locales/newlang.json';
   
   const resources = {
     // ... existing languages
     newlang: { translation: newLang },
   };
   ```

3. **Add to LanguageSelector** in `src/components/LanguageSelector.tsx`
   ```typescript
   const languages = [
     // ... existing languages
     { code: 'newlang', name: 'Language Name', flag: '🏳️' },
   ];
   ```

## 📱 PWA Features

### Installation
- **Mobile**: Use "Add to Home Screen" from browser menu
- **Desktop**: Click the install prompt or use browser install option

### Offline Play
- Game works completely offline after first load
- Service worker caches all necessary resources
- Automatic updates when connection is restored

### Settings Management
Access PWA settings through the header icon to:
- View service worker status
- Clear cache
- Update service worker
- Monitor offline status

## 🎨 Customization

### Themes
The app supports dark and light themes. Toggle using the theme switch in the header.

### Styling
Customize the appearance by modifying:
- `src/theme/ThemeContext.tsx` - Theme configuration
- `src/index.css` - Global styles
- Component-specific styles in each component

## 🚀 Deployment

### Netlify
1. Connect your GitHub repository
2. Set build command: `npm run build`
3. Set publish directory: `build`

### Vercel
1. Import your GitHub repository
2. Vercel will auto-detect React settings
3. Deploy with default settings

### GitHub Pages
1. Add `"homepage": "https://yourusername.github.io/tic-tac-toe"` to package.json
2. Run `npm run build`
3. Deploy the `build` folder to GitHub Pages

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow TypeScript best practices
- Write tests for new features
- Maintain i18n support for all new text
- Ensure responsive design
- Follow Material Design principles

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Material-UI** for the beautiful component library
- **react-i18next** for internationalization support
- **Create React App** for the excellent development experience
- **React Testing Library** for comprehensive testing utilities

## 📞 Support

If you encounter any issues or have questions:
- Open an issue on GitHub
- Check the troubleshooting guide
- Review the documentation

---

**Enjoy playing Tic Tac Toe! 🎮**

*Built with ❤️ using React, TypeScript, and Material-UI*


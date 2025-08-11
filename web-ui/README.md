# 🌐 HoyoLab Auto Web UI Setup

This directory contains the web-based setup wizard and settings interface for HoyoLab Auto.

## 🚀 Quick Start

### Option 1: Web Setup Wizard (Recommended for new users)
```bash
npm run web-setup
```
Then open http://localhost:3001 in your browser.

### Option 2: Web UI Only (For configuration management)
```bash
npm run web-ui
```
Then open http://localhost:3000 in your browser.

### Option 3: Docker (Coming soon)
```bash
docker-compose up web-ui
```
Access at http://localhost:3001

## 📱 Features

### Setup Wizard (`/setup`)
- **🎮 Game Selection**: Choose which HoyoVerse games to automate
- **🔑 Account Configuration**: Easy cookie input with validation
- **📱 Notification Setup**: Configure Discord, Telegram, or custom webhooks
- **✅ One-click Setup**: Complete configuration in minutes

### Settings Panel (`/settings`)
- **📊 Dashboard**: Overview of active accounts and statistics
- **🎮 Account Management**: Add, edit, or remove game accounts
- **📱 Notification Settings**: Manage notification platforms
- **📜 Live Logs**: Real-time application logs
- **⚡ Quick Actions**: Manual check-ins and testing

## 🔧 Configuration

The web UI automatically detects your configuration state:
- **New users**: Redirected to setup wizard
- **Existing users**: Redirected to settings panel

## 🛠️ Development

To modify the web UI:

1. Edit files in `web-ui/` directory:
   - `setup.html` - Setup wizard interface
   - `settings.html` - Settings panel interface

2. Modify server logic:
   - `web-setup.js` - Setup wizard server
   - `web-ui.js` - Settings panel server

3. Test locally:
   ```bash
   npm run web-ui
   ```

## 🔒 Security

- All cookies and configuration are stored locally
- No data is sent to external services
- Browser storage is used for temporary state only

## 📚 API Endpoints

- `GET /api/config` - Load configuration
- `POST /api/config` - Save configuration
- `POST /api/test-cookies` - Validate HoyoLab cookies
- `GET /api/health` - Health check

## 🎯 Usage Tips

1. **First Time Setup**: Use the web setup wizard for guided configuration
2. **Existing Users**: Access the settings panel to modify your setup
3. **Cookie Updates**: Use the settings panel to update cookies when they expire
4. **Testing**: Always test cookies and notifications before saving

## 🆘 Troubleshooting

- **Port conflicts**: Change ports in `web-setup.js` or `web-ui.js`
- **Configuration issues**: Delete `config.json5` to restart setup
- **Cookie problems**: Use the built-in cookie tester in the web UI

## 🌟 Coming Soon

- [ ] Real-time log streaming
- [ ] Advanced notification customization  
- [ ] Configuration import/export
- [ ] Multi-language support
- [ ] Mobile app interface

# 🐳 HoyoLab Auto - Docker Setup

HoyoLab Auto now includes a built-in web UI for easy setup and configuration management.

## 🚀 Quick Start

### Using Docker Compose (Recommended)

1. **Start the container:**
   ```bash
   docker-compose up -d
   ```

2. **Access the web interface:**
   - Open your browser and go to `http://localhost:3090`
   - First-time users will see the setup wizard
   - Existing users will see the settings panel

3. **Complete setup through the web UI:**
   - Select your games (Genshin, Star Rail, etc.)
   - Add your HoyoLab cookies
   - Configure notifications (Discord, Telegram, etc.)
   - Save and the container will use your new configuration

### Manual Docker Run

```bash
docker run -d \
  --name hoyolab-auto \
  --restart on-failure:5 \
  -p 3090:3000 \
  -v /your/config/path:/app \
  -e TZ=Asia/Bahrain \
  -e WEB_UI_ENABLED=true \
  -e WEB_UI_PORT=3000 \
  theinfamoustoto/hoyolab-auto:latest
```

## 🌐 Web UI Features

### Setup Wizard (`/setup`)
- **🎮 Game Selection**: Choose which HoyoVerse games to automate
- **🔑 Account Configuration**: Easy cookie input with validation  
- **📱 Notification Setup**: Configure Discord, Telegram, or webhooks
- **✅ Complete Setup**: All configuration in one place

### Settings Panel (`/settings`)  
- **📊 Dashboard**: Overview of active accounts and statistics
- **🎮 Account Management**: Add, edit, or remove game accounts
- **📱 Notification Settings**: Manage notification platforms
- **📜 Live Logs**: Real-time application logs
- **⚡ Quick Actions**: Manual check-ins and testing

## ⚙️ Configuration

### Environment Variables
- `WEB_UI_ENABLED`: Set to `"true"` to enable web interface
- `WEB_UI_PORT`: Port for web interface (default: 3000)
- `TZ`: Timezone for the container

### Volume Mounts
- **Config**: `/app/config.json5` - Main configuration file
- **Data**: `/app/data` - Application data and cache
- **Logs**: `/app/logs` - Log files

## 🔄 Workflow Integration

The repository includes GitHub Actions for automatic Docker image building:

### Automatic Builds
- **On push to main**: Builds and pushes `latest` tag
- **On version tags**: Builds and pushes version-specific tags
- **Pull requests**: Builds for testing (no push)

### Creating Releases
1. Update `version` file in repository root
2. Commit and push changes
3. Create a Git tag: `git tag v1.0.0 && git push origin v1.0.0`
4. GitHub Actions will automatically build and push the Docker image

## 🛠️ Development

### Building Locally
```bash
docker build -t hoyolab-auto .
```

### Running with Local Build
```bash
docker-compose -f docker-compose.local.yml up -d
```

## 📋 Migration from NPM Setup

If you were previously using npm scripts:

1. **Stop any running npm processes**
2. **Use docker-compose to start the container**
3. **Access the web UI to reconfigure if needed**
4. **Your existing config.json5 will be automatically detected**

## 🆘 Troubleshooting

### Web UI not accessible
- Check if port 3090 is available
- Verify `WEB_UI_ENABLED=true` is set
- Check container logs: `docker-compose logs -f`

### Configuration not saving
- Ensure volume mounts are correct
- Check file permissions on mounted directories
- Verify the container has write access to config directory

### Container won't start
- Check Docker daemon is running
- Verify image exists: `docker images | grep hoyolab-auto`
- Check for port conflicts

## 🔒 Security

- All configuration is stored locally in your mounted volumes
- Cookies and sensitive data never leave your system
- Web UI is only accessible from your local network
- No external dependencies for configuration management

---

**🎯 Docker-Only Approach**: This setup uses Docker exclusively - no npm or local Node.js installation required!

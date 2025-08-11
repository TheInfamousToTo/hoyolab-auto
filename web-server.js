const express = require('express');
const path = require('path');
const fs = require('fs').promises;
const JSON5 = require('json5');

let webServer = null;

async function startWebUI() {
    const app = express();
    const port = process.env.WEB_UI_PORT || 3000;

    // Middleware
    app.use(express.static(path.join(__dirname, 'web-ui')));
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    // Store setup state
    let configExists = false;
    let configData = {};

    async function checkConfigExists() {
        try {
            await fs.access('./config.json5');
            configExists = true;
            const configContent = await fs.readFile('./config.json5', 'utf8');
            configData = JSON5.parse(configContent);
            return true;
        } catch {
            configExists = false;
            return false;
        }
    }

    // Routes
    app.get('/', async (req, res) => {
        const hasConfig = await checkConfigExists();
        
        if (hasConfig) {
            res.redirect('/settings');
        } else {
            res.redirect('/setup');
        }
    });

    app.get('/setup', (req, res) => {
        res.sendFile(path.join(__dirname, 'web-ui', 'setup.html'));
    });

    app.get('/settings', async (req, res) => {
        const hasConfig = await checkConfigExists();
        if (!hasConfig) {
            res.redirect('/setup');
            return;
        }
        res.sendFile(path.join(__dirname, 'web-ui', 'settings.html'));
    });

    app.get('/api/config', async (req, res) => {
        try {
            const hasConfig = await checkConfigExists();
            if (hasConfig) {
                res.json({ config: configData, exists: true });
            } else {
                // Load default config
                const defaultConfig = await fs.readFile('./default.config.json5', 'utf8');
                res.json({ config: JSON5.parse(defaultConfig), exists: false });
            }
        } catch (error) {
            console.error('Error loading config:', error);
            res.status(500).json({ error: 'Failed to load configuration' });
        }
    });

    app.post('/api/config', async (req, res) => {
        try {
            const { config } = req.body;
            
            // Validate required fields
            if (!config.accounts || config.accounts.length === 0) {
                return res.status(400).json({ error: 'At least one account must be configured' });
            }

            if (!config.platforms || config.platforms.length === 0) {
                return res.status(400).json({ error: 'At least one platform must be configured' });
            }

            // Save config
            const configString = JSON5.stringify(config, null, 4);
            await fs.writeFile('./config.json5', configString);
            
            configData = config;
            configExists = true;
            
            res.json({ success: true, message: 'Configuration saved successfully!' });
        } catch (error) {
            console.error('Error saving config:', error);
            res.status(500).json({ error: 'Failed to save configuration' });
        }
    });

    app.post('/api/test-cookies', async (req, res) => {
        try {
            const { cookies, game } = req.body;
            
            // Basic cookie validation
            if (!cookies || typeof cookies !== 'string') {
                return res.status(400).json({ error: 'Invalid cookies format' });
            }

            // Check if cookies contain required fields
            const requiredFields = ['account_id', 'cookie_token'];
            const hasRequired = requiredFields.every(field => cookies.includes(field));
            
            if (!hasRequired) {
                return res.status(400).json({ 
                    error: 'Cookies appear to be invalid. Make sure they contain account_id and cookie_token.' 
                });
            }

            // For now, just validate format - actual testing would require HoyoLab API calls
            res.json({ 
                success: true, 
                message: 'Cookies format appears valid. Full validation will occur when the bot starts.' 
            });
        } catch (error) {
            console.error('Error testing cookies:', error);
            res.status(500).json({ error: 'Failed to test cookies' });
        }
    });

    app.post('/api/restart-app', async (req, res) => {
        try {
            res.json({ success: true, message: 'Configuration saved. Please restart the container to apply changes.' });
        } catch (error) {
            console.error('Error with restart request:', error);
            res.status(500).json({ error: 'Failed to process restart request' });
        }
    });

    // Health check
    app.get('/api/health', (req, res) => {
        res.json({ 
            status: 'ok', 
            configExists, 
            timestamp: new Date().toISOString(),
            webUIEnabled: true
        });
    });

    await checkConfigExists();
    
    return new Promise((resolve) => {
        webServer = app.listen(port, () => {
            console.log(`\n🌐 HoyoLab Auto Web UI started`);
            console.log(`🔗 Access at: http://localhost:${port}`);
            console.log(`📱 ${configExists ? 'Settings Panel' : 'Setup Wizard'} is ready!`);
            resolve();
        });
    });
}

function stopWebUI() {
    if (webServer) {
        webServer.close();
        webServer = null;
    }
}

module.exports = { startWebUI, stopWebUI };

import React, { useState } from 'react';
import {
  Box,
  Typography,
  Tabs,
  Tab,
  Card,
  CardContent,
  TextField,
  Button,
  Grid,
  Switch,
  FormControlLabel,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Divider,
  Alert,
  IconButton,
  Avatar,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Chip,
  Paper,
} from '@mui/material';
import {
  Settings,
  Palette,
  Storage,
  Api,
  Search,
  Psychology,
  Info,
  Upload,
  Delete,
  Edit,
  Save,
  Add,
} from '@mui/icons-material';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [settings, setSettings] = useState({
    general: {
      appName: 'Car Keeper',
      appDescription: 'Professional Vehicle Fleet Management System',
      defaultLanguage: 'en',
      timezone: 'UTC',
    },
    database: {
      provider: 'supabase',
      supabaseUrl: '',
      supabaseKey: '',
      mysqlHost: '',
      mysqlPort: 3306,
      mysqlDatabase: '',
      mysqlUsername: '',
      mysqlPassword: '',
      postgresHost: '',
      postgresPort: 5432,
      postgresDatabase: '',
      postgresUsername: '',
      postgresPassword: '',
      mongodbConnectionString: '',
    },
    theme: {
      primaryColor: '#1976d2',
      secondaryColor: '#dc004e',
      logoUrl: '',
      faviconUrl: '',
      darkMode: false,
    },
    api: {
      googleSearchKey: '',
      bingSearchKey: '',
      openaiKey: '',
      geminiKey: '',
      grok3Key: '',
      carApiKey: '',
    },
    search: {
      enableAiSearch: true,
      defaultSearchEngine: 'google',
      maxResults: 20,
    },
    ai: {
      preferenceOrder: ['openai', 'gemini', 'grok3'],
      defaultModel: 'gpt-4',
      maxTokens: 2000,
    },
    about: {
      content: '<h1>About Car Keeper</h1><p>Car Keeper is a comprehensive vehicle fleet management system designed to help you track, maintain, and optimize your vehicle fleet operations.</p>',
    },
  });

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleSettingChange = (category, field, value) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [field]: value,
      },
    }));
  };

  const handleSave = () => {
    // Save settings to localStorage or API
    localStorage.setItem('carkeeper_settings', JSON.stringify(settings));
    alert('Settings saved successfully!');
  };

  const handleFileUpload = (category, field) => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          handleSettingChange(category, field, e.target.result);
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();
  };

  const tabs = [
    { label: 'General', icon: <Settings /> },
    { label: 'Database', icon: <Storage /> },
    { label: 'Theme', icon: <Palette /> },
    { label: 'API Keys', icon: <Api /> },
    { label: 'Search', icon: <Search /> },
    { label: 'AI Settings', icon: <Psychology /> },
    { label: 'About App', icon: <Info /> },
  ];

  const TabPanel = ({ children, value, index }) => (
    <div hidden={value !== index}>
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Settings
      </Typography>
      
      <Alert severity="info" sx={{ mb: 3 }}>
        Admin settings allow you to configure the application's behavior, appearance, and integrations.
      </Alert>

      <Card>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={activeTab} onChange={handleTabChange} variant="scrollable" scrollButtons="auto">
            {tabs.map((tab, index) => (
              <Tab key={index} label={tab.label} icon={tab.icon} iconPosition="start" />
            ))}
          </Tabs>
        </Box>

        {/* General Settings */}
        <TabPanel value={activeTab} index={0}>
          <Typography variant="h6" gutterBottom>
            General Settings
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Application Name"
                value={settings.general.appName}
                onChange={(e) => handleSettingChange('general', 'appName', e.target.value)}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Default Language</InputLabel>
                <Select
                  value={settings.general.defaultLanguage}
                  onChange={(e) => handleSettingChange('general', 'defaultLanguage', e.target.value)}
                >
                  <MenuItem value="en">English</MenuItem>
                  <MenuItem value="es">Spanish</MenuItem>
                  <MenuItem value="fr">French</MenuItem>
                  <MenuItem value="de">German</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={3}
                label="Application Description"
                value={settings.general.appDescription}
                onChange={(e) => handleSettingChange('general', 'appDescription', e.target.value)}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Timezone</InputLabel>
                <Select
                  value={settings.general.timezone}
                  onChange={(e) => handleSettingChange('general', 'timezone', e.target.value)}
                >
                  <MenuItem value="UTC">UTC</MenuItem>
                  <MenuItem value="America/New_York">Eastern Time</MenuItem>
                  <MenuItem value="America/Los_Angeles">Pacific Time</MenuItem>
                  <MenuItem value="Europe/London">GMT</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </TabPanel>

        {/* Database Settings */}
        <TabPanel value={activeTab} index={1}>
          <Typography variant="h6" gutterBottom>
            Database Configuration
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Database Provider</InputLabel>
                <Select
                  value={settings.database.provider}
                  onChange={(e) => handleSettingChange('database', 'provider', e.target.value)}
                >
                  <MenuItem value="supabase">Supabase</MenuItem>
                  <MenuItem value="mysql">MySQL</MenuItem>
                  <MenuItem value="postgresql">PostgreSQL</MenuItem>
                  <MenuItem value="mongodb">MongoDB</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            {settings.database.provider === 'supabase' && (
              <>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Supabase URL"
                    value={settings.database.supabaseUrl}
                    onChange={(e) => handleSettingChange('database', 'supabaseUrl', e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Supabase Anon Key"
                    type="password"
                    value={settings.database.supabaseKey}
                    onChange={(e) => handleSettingChange('database', 'supabaseKey', e.target.value)}
                  />
                </Grid>
              </>
            )}

            {settings.database.provider === 'mysql' && (
              <>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="MySQL Host"
                    value={settings.database.mysqlHost}
                    onChange={(e) => handleSettingChange('database', 'mysqlHost', e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="MySQL Port"
                    type="number"
                    value={settings.database.mysqlPort}
                    onChange={(e) => handleSettingChange('database', 'mysqlPort', e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    label="Database Name"
                    value={settings.database.mysqlDatabase}
                    onChange={(e) => handleSettingChange('database', 'mysqlDatabase', e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    label="Username"
                    value={settings.database.mysqlUsername}
                    onChange={(e) => handleSettingChange('database', 'mysqlUsername', e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    label="Password"
                    type="password"
                    value={settings.database.mysqlPassword}
                    onChange={(e) => handleSettingChange('database', 'mysqlPassword', e.target.value)}
                  />
                </Grid>
              </>
            )}
          </Grid>
        </TabPanel>

        {/* Theme Settings */}
        <TabPanel value={activeTab} index={2}>
          <Typography variant="h6" gutterBottom>
            Theme and Branding
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Primary Color"
                type="color"
                value={settings.theme.primaryColor}
                onChange={(e) => handleSettingChange('theme', 'primaryColor', e.target.value)}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Secondary Color"
                type="color"
                value={settings.theme.secondaryColor}
                onChange={(e) => handleSettingChange('theme', 'secondaryColor', e.target.value)}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Box>
                <Typography variant="subtitle2" gutterBottom>
                  Logo Upload
                </Typography>
                <Box display="flex" alignItems="center" gap={2}>
                  {settings.theme.logoUrl && (
                    <Avatar
                      src={settings.theme.logoUrl}
                      sx={{ width: 60, height: 60 }}
                    />
                  )}
                  <Button
                    variant="outlined"
                    startIcon={<Upload />}
                    onClick={() => handleFileUpload('theme', 'logoUrl')}
                  >
                    Upload Logo
                  </Button>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box>
                <Typography variant="subtitle2" gutterBottom>
                  Favicon Upload
                </Typography>
                <Box display="flex" alignItems="center" gap={2}>
                  {settings.theme.faviconUrl && (
                    <Avatar
                      src={settings.theme.faviconUrl}
                      sx={{ width: 32, height: 32 }}
                    />
                  )}
                  <Button
                    variant="outlined"
                    startIcon={<Upload />}
                    onClick={() => handleFileUpload('theme', 'faviconUrl')}
                  >
                    Upload Favicon
                  </Button>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Switch
                    checked={settings.theme.darkMode}
                    onChange={(e) => handleSettingChange('theme', 'darkMode', e.target.checked)}
                  />
                }
                label="Enable Dark Mode"
              />
            </Grid>
          </Grid>
        </TabPanel>

        {/* API Settings */}
        <TabPanel value={activeTab} index={3}>
          <Typography variant="h6" gutterBottom>
            API Connections
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Google Search API Key"
                type="password"
                value={settings.api.googleSearchKey}
                onChange={(e) => handleSettingChange('api', 'googleSearchKey', e.target.value)}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Bing Search API Key"
                type="password"
                value={settings.api.bingSearchKey}
                onChange={(e) => handleSettingChange('api', 'bingSearchKey', e.target.value)}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="OpenAI API Key"
                type="password"
                value={settings.api.openaiKey}
                onChange={(e) => handleSettingChange('api', 'openaiKey', e.target.value)}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Google Gemini API Key"
                type="password"
                value={settings.api.geminiKey}
                onChange={(e) => handleSettingChange('api', 'geminiKey', e.target.value)}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Grok3 API Key"
                type="password"
                value={settings.api.grok3Key}
                onChange={(e) => handleSettingChange('api', 'grok3Key', e.target.value)}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Car Data API Key"
                type="password"
                value={settings.api.carApiKey}
                onChange={(e) => handleSettingChange('api', 'carApiKey', e.target.value)}
              />
            </Grid>
          </Grid>
        </TabPanel>

        {/* Search Settings */}
        <TabPanel value={activeTab} index={4}>
          <Typography variant="h6" gutterBottom>
            Search Configuration
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Default Search Engine</InputLabel>
                <Select
                  value={settings.search.defaultSearchEngine}
                  onChange={(e) => handleSettingChange('search', 'defaultSearchEngine', e.target.value)}
                >
                  <MenuItem value="google">Google</MenuItem>
                  <MenuItem value="bing">Bing</MenuItem>
                  <MenuItem value="duckduckgo">DuckDuckGo</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Max Search Results"
                type="number"
                value={settings.search.maxResults}
                onChange={(e) => handleSettingChange('search', 'maxResults', e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Switch
                    checked={settings.search.enableAiSearch}
                    onChange={(e) => handleSettingChange('search', 'enableAiSearch', e.target.checked)}
                  />
                }
                label="Enable AI-Powered Search"
              />
            </Grid>
          </Grid>
        </TabPanel>

        {/* AI Settings */}
        <TabPanel value={activeTab} index={5}>
          <Typography variant="h6" gutterBottom>
            AI Configuration
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="subtitle2" gutterBottom>
                AI Service Preference Order
              </Typography>
              <Paper sx={{ p: 2 }}>
                <List>
                  {settings.ai.preferenceOrder.map((service, index) => (
                    <ListItem key={service}>
                      <ListItemText
                        primary={`${index + 1}. ${service.charAt(0).toUpperCase() + service.slice(1)}`}
                      />
                      <ListItemSecondaryAction>
                        <Chip label={`Priority ${index + 1}`} size="small" />
                      </ListItemSecondaryAction>
                    </ListItem>
                  ))}
                </List>
              </Paper>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Default AI Model</InputLabel>
                <Select
                  value={settings.ai.defaultModel}
                  onChange={(e) => handleSettingChange('ai', 'defaultModel', e.target.value)}
                >
                  <MenuItem value="gpt-4">GPT-4</MenuItem>
                  <MenuItem value="gpt-3.5-turbo">GPT-3.5 Turbo</MenuItem>
                  <MenuItem value="gemini-pro">Gemini Pro</MenuItem>
                  <MenuItem value="grok-3">Grok 3</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Max Tokens"
                type="number"
                value={settings.ai.maxTokens}
                onChange={(e) => handleSettingChange('ai', 'maxTokens', e.target.value)}
              />
            </Grid>
          </Grid>
        </TabPanel>

        {/* About App */}
        <TabPanel value={activeTab} index={6}>
          <Typography variant="h6" gutterBottom>
            About App Content
          </Typography>
          <Box sx={{ '& .ql-editor': { minHeight: 300 } }}>
            <ReactQuill
              value={settings.about.content}
              onChange={(value) => handleSettingChange('about', 'content', value)}
              modules={{
                toolbar: [
                  [{ 'header': [1, 2, 3, false] }],
                  ['bold', 'italic', 'underline', 'strike'],
                  [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                  ['link', 'image'],
                  ['clean']
                ],
              }}
            />
          </Box>
        </TabPanel>

        <CardContent>
          <Divider sx={{ mb: 2 }} />
          <Box display="flex" justifyContent="flex-end">
            <Button
              variant="contained"
              startIcon={<Save />}
              onClick={handleSave}
              size="large"
            >
              Save Settings
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default SettingsPage;
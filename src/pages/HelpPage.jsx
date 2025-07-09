import React, { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  TextField,
  InputAdornment,
  Chip,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Button,
} from '@mui/material';
import {
  ExpandMore,
  Search,
  Help,
  DirectionsCar,
  Build,
  LocalGasStation,
  People,
  Settings,
  QuestionAnswer,
  VideoLibrary,
  MenuBook,
  ContactSupport,
} from '@mui/icons-material';

const HelpPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', label: 'All Topics', icon: <Help /> },
    { id: 'vehicles', label: 'Vehicles', icon: <DirectionsCar /> },
    { id: 'service', label: 'Service Logs', icon: <Build /> },
    { id: 'fuel', label: 'Fuel Logs', icon: <LocalGasStation /> },
    { id: 'owners', label: 'Owners', icon: <People /> },
    { id: 'settings', label: 'Settings', icon: <Settings /> },
  ];

  const faqData = [
    {
      category: 'vehicles',
      question: 'How do I add a new vehicle to the system?',
      answer: 'To add a new vehicle, navigate to the Vehicles page and click the "Add Vehicle" button. Fill in the required information including make, model, year, registration, and owner details. The system will automatically suggest existing entries as you type.',
      tags: ['add', 'vehicle', 'new', 'registration'],
    },
    {
      category: 'vehicles',
      question: 'Can I edit vehicle information after it\'s been added?',
      answer: 'Yes, you can edit vehicle information at any time. Go to the Vehicles page, find the vehicle you want to edit, and click the edit icon. Make your changes and save.',
      tags: ['edit', 'vehicle', 'update', 'modify'],
    },
    {
      category: 'service',
      question: 'How do I log a service record?',
      answer: 'Navigate to the Service Logs page and click "Add Service Log". Select the vehicle, enter the date, odometer reading, service type, work performed, and any notes. The system will track your service history automatically.',
      tags: ['service', 'log', 'maintenance', 'record'],
    },
    {
      category: 'service',
      question: 'Can I export service history reports?',
      answer: 'Yes, you can export service history as PDF reports. In the Service Logs page, click the download icon next to any service record to generate a comprehensive service history report for that vehicle.',
      tags: ['export', 'pdf', 'report', 'history'],
    },
    {
      category: 'fuel',
      question: 'How is fuel economy calculated?',
      answer: 'Fuel economy is automatically calculated based on the distance traveled between fill-ups and the amount of fuel added. The system uses the formula: (Fuel Added / Distance Traveled) × 100 = L/100km.',
      tags: ['fuel', 'economy', 'calculation', 'mpg'],
    },
    {
      category: 'fuel',
      question: 'What fuel types are supported?',
      answer: 'The system supports Regular, Premium, Diesel, E85, and Electric. You can select the appropriate fuel type when logging each fuel purchase.',
      tags: ['fuel', 'types', 'diesel', 'electric'],
    },
    {
      category: 'owners',
      question: 'How do I manage vehicle owners?',
      answer: 'Go to the Owners page to add, edit, or remove owners. You can assign multiple vehicles to an owner and track their contact information and notes.',
      tags: ['owners', 'manage', 'contact', 'assign'],
    },
    {
      category: 'settings',
      question: 'How do I change the app theme?',
      answer: 'Admin users can access Settings to customize the theme, including colors, logo, and dark mode. Navigate to Settings > Theme and Branding to make changes.',
      tags: ['theme', 'settings', 'admin', 'customize'],
    },
    {
      category: 'settings',
      question: 'How do I configure database connections?',
      answer: 'In the Settings page, go to the Database tab. Select your preferred database provider (Supabase, MySQL, PostgreSQL, MongoDB) and enter the connection details.',
      tags: ['database', 'connection', 'supabase', 'mysql'],
    },
    {
      category: 'vehicles',
      question: 'What information is required for a new vehicle?',
      answer: 'Required fields include Make, Model, Year, and Registration. Optional fields include VIN, Engine Type, Transmission, Odometer, Owner, and Notes.',
      tags: ['required', 'fields', 'information', 'vehicle'],
    },
  ];

  const filteredFAQs = faqData.filter(faq => {
    const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory;
    const matchesSearch = searchQuery === '' || 
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    return matchesCategory && matchesSearch;
  });

  const quickLinks = [
    { title: 'Getting Started Guide', icon: <MenuBook />, description: 'Learn the basics of using Car Keeper' },
    { title: 'Video Tutorials', icon: <VideoLibrary />, description: 'Watch step-by-step video guides' },
    { title: 'Contact Support', icon: <ContactSupport />, description: 'Get help from our support team' },
  ];

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Help & Documentation
      </Typography>

      <Typography variant="body1" color="text.secondary" paragraph>
        Find answers to common questions and learn how to use Car Keeper effectively.
      </Typography>

      {/* Quick Links */}
      <Grid container spacing={2} sx={{ mb: 4 }}>
        {quickLinks.map((link, index) => (
          <Grid item xs={12} md={4} key={index}>
            <Card sx={{ cursor: 'pointer', '&:hover': { elevation: 4 } }}>
              <CardContent>
                <Box display="flex" alignItems="center" gap={2}>
                  {link.icon}
                  <Box>
                    <Typography variant="h6">{link.title}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {link.description}
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Search and Categories */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <TextField
            fullWidth
            placeholder="Search help topics..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
            sx={{ mb: 3 }}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <Box display="flex" flexWrap="wrap" gap={1}>
            {categories.map((category) => (
              <Chip
                key={category.id}
                label={category.label}
                icon={category.icon}
                clickable
                color={selectedCategory === category.id ? 'primary' : 'default'}
                onClick={() => setSelectedCategory(category.id)}
              />
            ))}
          </Box>
        </Grid>
      </Grid>

      {/* FAQ Section */}
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Frequently Asked Questions
          </Typography>
          
          {filteredFAQs.length === 0 ? (
            <Paper sx={{ p: 3, textAlign: 'center' }}>
              <Typography variant="body1" color="text.secondary">
                No help topics found matching your search.
              </Typography>
            </Paper>
          ) : (
            <Box>
              {filteredFAQs.map((faq, index) => (
                <Accordion key={index}>
                  <AccordionSummary expandIcon={<ExpandMore />}>
                    <Box>
                      <Typography variant="subtitle1">{faq.question}</Typography>
                      <Box display="flex" gap={1} mt={1}>
                        {faq.tags.slice(0, 3).map((tag, tagIndex) => (
                          <Chip key={tagIndex} label={tag} size="small" variant="outlined" />
                        ))}
                      </Box>
                    </Box>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography variant="body2" color="text.secondary">
                      {faq.answer}
                    </Typography>
                  </AccordionDetails>
                </Accordion>
              ))}
            </Box>
          )}
        </CardContent>
      </Card>

      {/* Additional Resources */}
      <Card sx={{ mt: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Additional Resources
          </Typography>
          <List>
            <ListItem>
              <ListItemIcon>
                <QuestionAnswer />
              </ListItemIcon>
              <ListItemText
                primary="Community Forum"
                secondary="Join discussions with other Car Keeper users"
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <MenuBook />
              </ListItemIcon>
              <ListItemText
                primary="User Manual"
                secondary="Comprehensive documentation and guides"
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <ContactSupport />
              </ListItemIcon>
              <ListItemText
                primary="Technical Support"
                secondary="Contact our support team for assistance"
              />
            </ListItem>
          </List>
        </CardContent>
      </Card>
    </Box>
  );
};

export default HelpPage;
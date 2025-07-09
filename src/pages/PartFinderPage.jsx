import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  Grid,
  Chip,
  Avatar,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Divider,
  Alert,
  Paper,
  InputAdornment,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import {
  Search,
  Build,
  DirectionsCar,
  LocalGasStation,
  Settings,
  ShoppingCart,
  Info,
  Star,
  Launch,
} from '@mui/icons-material';

const PartFinderPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedVehicle, setSelectedVehicle] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedPart, setSelectedPart] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  const vehicles = [
    '2020 Toyota Camry',
    '2018 Honda Civic',
    '2019 Ford F-150',
    '2017 Mazda CX-5',
  ];

  // Mock AI search results
  const mockSearchResults = {
    'oil filter': [
      {
        id: 1,
        name: 'Engine Oil Filter',
        partNumber: 'OE-90915-YZZD2',
        brand: 'Toyota OEM',
        price: 12.99,
        rating: 4.8,
        description: 'Original Equipment oil filter for Toyota engines',
        specifications: {
          'Thread Size': 'M20 x 1.5',
          'Gasket Diameter': '62mm',
          'Height': '65mm',
          'Compatibility': '2018-2023 Toyota Camry 2.5L',
        },
        availability: 'In Stock',
        supplier: 'Toyota Parts Direct',
        image: 'https://via.placeholder.com/100x100?text=Oil+Filter',
      },
      {
        id: 2,
        name: 'Premium Oil Filter',
        partNumber: 'K&N-HP-1017',
        brand: 'K&N',
        price: 18.99,
        rating: 4.9,
        description: 'High-performance oil filter with superior filtration',
        specifications: {
          'Thread Size': 'M20 x 1.5',
          'Gasket Diameter': '62mm',
          'Height': '65mm',
          'Flow Rate': '99% @ 25 microns',
        },
        availability: 'In Stock',
        supplier: 'K&N Direct',
        image: 'https://via.placeholder.com/100x100?text=K%26N+Filter',
      },
    ],
    'brake pads': [
      {
        id: 3,
        name: 'Ceramic Brake Pads - Front',
        partNumber: 'AKE-D1092',
        brand: 'Akebono',
        price: 89.99,
        rating: 4.7,
        description: 'Ceramic brake pads for quiet, clean braking',
        specifications: {
          'Position': 'Front',
          'Material': 'Ceramic',
          'Thickness': '12.5mm',
          'Length': '156mm',
          'Width': '69mm',
        },
        availability: 'In Stock',
        supplier: 'Brake Parts Inc',
        image: 'https://via.placeholder.com/100x100?text=Brake+Pads',
      },
    ],
    'spark plugs': [
      {
        id: 4,
        name: 'Iridium Spark Plugs',
        partNumber: 'NGK-ILZTR6A13G',
        brand: 'NGK',
        price: 24.99,
        rating: 4.9,
        description: 'Long-life iridium spark plugs for optimal performance',
        specifications: {
          'Thread Size': '14mm',
          'Reach': '19mm',
          'Heat Rating': '6',
          'Gap': '1.0mm',
          'Electrode': 'Iridium',
        },
        availability: 'In Stock',
        supplier: 'NGK Direct',
        image: 'https://via.placeholder.com/100x100?text=Spark+Plugs',
      },
    ],
  };

  const handleSearch = () => {
    if (!searchQuery.trim()) return;
    
    setLoading(true);
    // Simulate AI search delay
    setTimeout(() => {
      const query = searchQuery.toLowerCase();
      const results = mockSearchResults[query] || [];
      setSearchResults(results);
      setLoading(false);
    }, 1000);
  };

  const handlePartClick = (part) => {
    setSelectedPart(part);
    setOpenDialog(true);
  };

  const getVehicleSpecs = (vehicle) => {
    const specs = {
      '2020 Toyota Camry': {
        engine: '2.5L 4-Cylinder',
        oilCapacity: '4.8L',
        oilType: '0W-20 Full Synthetic',
        fuelCapacity: '60L',
        coolantCapacity: '6.9L',
      },
      '2018 Honda Civic': {
        engine: '1.5L Turbo 4-Cylinder',
        oilCapacity: '3.7L',
        oilType: '0W-20 Full Synthetic',
        fuelCapacity: '46L',
        coolantCapacity: '5.7L',
      },
      '2019 Ford F-150': {
        engine: '5.0L V8',
        oilCapacity: '8.5L',
        oilType: '5W-30 Full Synthetic',
        fuelCapacity: '98L',
        coolantCapacity: '19.9L',
      },
      '2017 Mazda CX-5': {
        engine: '2.5L 4-Cylinder',
        oilCapacity: '4.2L',
        oilType: '0W-20 Full Synthetic',
        fuelCapacity: '58L',
        coolantCapacity: '7.5L',
      },
    };
    return specs[vehicle] || {};
  };

  const quickSearches = [
    { label: 'Oil Filter', query: 'oil filter', icon: <Settings /> },
    { label: 'Brake Pads', query: 'brake pads', icon: <Build /> },
    { label: 'Spark Plugs', query: 'spark plugs', icon: <Settings /> },
    { label: 'Air Filter', query: 'air filter', icon: <Settings /> },
  ];

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        AI Part Finder
      </Typography>
      
      <Alert severity="info" sx={{ mb: 3 }}>
        <Typography variant="body2">
          <strong>AI-Powered Part Search:</strong> Enter part names or descriptions to find compatible parts for your vehicles. 
          The system uses vehicle context to provide accurate recommendations.
        </Typography>
      </Alert>

      <Grid container spacing={3}>
        {/* Search Section */}
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Search for Parts
              </Typography>
              
              <Box display="flex" gap={2} mb={3}>
                <TextField
                  fullWidth
                  label="Search for parts..."
                  placeholder="e.g., oil filter, brake pads, spark plugs"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Search />
                      </InputAdornment>
                    ),
                  }}
                />
                <TextField
                  select
                  label="Vehicle"
                  value={selectedVehicle}
                  onChange={(e) => setSelectedVehicle(e.target.value)}
                  SelectProps={{ native: true }}
                  sx={{ minWidth: 200 }}
                >
                  <option value="">All Vehicles</option>
                  {vehicles.map((vehicle) => (
                    <option key={vehicle} value={vehicle}>
                      {vehicle}
                    </option>
                  ))}
                </TextField>
                <Button
                  variant="contained"
                  onClick={handleSearch}
                  disabled={loading}
                  sx={{ minWidth: 120 }}
                >
                  {loading ? 'Searching...' : 'Search'}
                </Button>
              </Box>

              {/* Quick Search Buttons */}
              <Box mb={3}>
                <Typography variant="subtitle2" gutterBottom>
                  Quick Searches:
                </Typography>
                <Box display="flex" gap={1} flexWrap="wrap">
                  {quickSearches.map((item) => (
                    <Chip
                      key={item.label}
                      label={item.label}
                      icon={item.icon}
                      onClick={() => {
                        setSearchQuery(item.query);
                        setTimeout(() => handleSearch(), 100);
                      }}
                      clickable
                      variant="outlined"
                    />
                  ))}
                </Box>
              </Box>

              {/* Search Results */}
              {searchResults.length > 0 && (
                <Box>
                  <Typography variant="h6" gutterBottom>
                    Search Results ({searchResults.length})
                  </Typography>
                  <List>
                    {searchResults.map((part, index) => (
                      <React.Fragment key={part.id}>
                        <ListItem
                          button
                          onClick={() => handlePartClick(part)}
                          sx={{ 
                            border: '1px solid #e0e0e0',
                            borderRadius: 1,
                            mb: 1,
                            '&:hover': {
                              backgroundColor: 'action.hover',
                            },
                          }}
                        >
                          <ListItemAvatar>
                            <Avatar
                              src={part.image}
                              alt={part.name}
                              sx={{ width: 60, height: 60 }}
                            />
                          </ListItemAvatar>
                          <ListItemText
                            primary={
                              <Box display="flex" alignItems="center" gap={1}>
                                <Typography variant="h6">{part.name}</Typography>
                                <Chip
                                  label={part.brand}
                                  size="small"
                                  color="primary"
                                />
                                <Box display="flex" alignItems="center" gap={0.5}>
                                  <Star sx={{ color: '#ffc107', fontSize: 16 }} />
                                  <Typography variant="body2">{part.rating}</Typography>
                                </Box>
                              </Box>
                            }
                            secondary={
                              <Box>
                                <Typography variant="body2" color="text.secondary">
                                  Part #: {part.partNumber} • {part.availability}
                                </Typography>
                                <Typography variant="body2" gutterBottom>
                                  {part.description}
                                </Typography>
                                <Box display="flex" justifyContent="space-between" alignItems="center">
                                  <Typography variant="h6" color="primary">
                                    ${part.price}
                                  </Typography>
                                  <Typography variant="body2" color="text.secondary">
                                    {part.supplier}
                                  </Typography>
                                </Box>
                              </Box>
                            }
                          />
                        </ListItem>
                        {index < searchResults.length - 1 && <Divider sx={{ my: 1 }} />}
                      </React.Fragment>
                    ))}
                  </List>
                </Box>
              )}

              {searchQuery && searchResults.length === 0 && !loading && (
                <Alert severity="info">
                  No parts found for "{searchQuery}". Try different search terms or check the spelling.
                </Alert>
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* Vehicle Info Panel */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Vehicle Information
              </Typography>
              
              {selectedVehicle ? (
                <Box>
                  <Box display="flex" alignItems="center" gap={2} mb={2}>
                    <Avatar sx={{ bgcolor: 'primary.main' }}>
                      <DirectionsCar />
                    </Avatar>
                    <Typography variant="h6">{selectedVehicle}</Typography>
                  </Box>
                  
                  <Typography variant="subtitle2" gutterBottom>
                    Specifications:
                  </Typography>
                  
                  {Object.entries(getVehicleSpecs(selectedVehicle)).map(([key, value]) => (
                    <Box key={key} display="flex" justifyContent="space-between" mb={1}>
                      <Typography variant="body2" color="text.secondary">
                        {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}:
                      </Typography>
                      <Typography variant="body2">{value}</Typography>
                    </Box>
                  ))}
                </Box>
              ) : (
                <Box textAlign="center" py={3}>
                  <DirectionsCar sx={{ fontSize: 48, color: 'text.secondary', mb: 2 }} />
                  <Typography variant="body2" color="text.secondary">
                    Select a vehicle to see specifications and get more accurate part recommendations.
                  </Typography>
                </Box>
              )}
            </CardContent>
          </Card>

          {/* AI Tips */}
          <Card sx={{ mt: 2 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                <Info sx={{ mr: 1, verticalAlign: 'middle' }} />
                AI Search Tips
              </Typography>
              <List dense>
                <ListItem>
                  <ListItemText 
                    primary="Be specific"
                    secondary="Use exact part names like 'oil filter' instead of 'filter'"
                  />
                </ListItem>
                <ListItem>
                  <ListItemText 
                    primary="Include symptoms"
                    secondary="Describe issues like 'squeaking brakes' or 'rough idle'"
                  />
                </ListItem>
                <ListItem>
                  <ListItemText 
                    primary="Select your vehicle"
                    secondary="Get more accurate results by choosing your specific vehicle"
                  />
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Part Details Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="md" fullWidth>
        {selectedPart && (
          <>
            <DialogTitle>
              <Box display="flex" alignItems="center" gap={2}>
                <Avatar src={selectedPart.image} alt={selectedPart.name} />
                <Box>
                  <Typography variant="h6">{selectedPart.name}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {selectedPart.brand} • Part #{selectedPart.partNumber}
                  </Typography>
                </Box>
              </Box>
            </DialogTitle>
            <DialogContent>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Box mb={2}>
                    <Typography variant="h6" gutterBottom>
                      Description
                    </Typography>
                    <Typography variant="body2" paragraph>
                      {selectedPart.description}
                    </Typography>
                  </Box>

                  <Box mb={2}>
                    <Typography variant="h6" gutterBottom>
                      Specifications
                    </Typography>
                    {Object.entries(selectedPart.specifications).map(([key, value]) => (
                      <Box key={key} display="flex" justifyContent="space-between" mb={1}>
                        <Typography variant="body2" color="text.secondary">
                          {key}:
                        </Typography>
                        <Typography variant="body2">{value}</Typography>
                      </Box>
                    ))}
                  </Box>
                </Grid>

                <Grid item xs={12} md={6}>
                  <Paper sx={{ p: 2, bgcolor: 'background.default' }}>
                    <Typography variant="h6" gutterBottom>
                      Pricing & Availability
                    </Typography>
                    
                    <Box display="flex" alignItems="center" gap={1} mb={2}>
                      <Typography variant="h4" color="primary">
                        ${selectedPart.price}
                      </Typography>
                      <Chip
                        label={selectedPart.availability}
                        color="success"
                        size="small"
                      />
                    </Box>

                    <Box display="flex" alignItems="center" gap={0.5} mb={2}>
                      <Star sx={{ color: '#ffc107' }} />
                      <Typography variant="body2">
                        {selectedPart.rating} rating
                      </Typography>
                    </Box>

                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      Supplied by: {selectedPart.supplier}
                    </Typography>

                    <Box display="flex" gap={1} mt={2}>
                      <Button
                        variant="contained"
                        startIcon={<ShoppingCart />}
                        fullWidth
                      >
                        Add to Cart
                      </Button>
                      <Button
                        variant="outlined"
                        startIcon={<Launch />}
                        onClick={() => window.open(`https://example.com/part/${selectedPart.partNumber}`, '_blank')}
                      >
                        View Details
                      </Button>
                    </Box>
                  </Paper>
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setOpenDialog(false)}>Close</Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Box>
  );
};

export default PartFinderPage;
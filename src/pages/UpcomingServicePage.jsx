import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Grid,
  Chip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Avatar,
  LinearProgress,
  Alert,
} from '@mui/material';
import {
  Add,
  Edit,
  Delete,
  Schedule,
  Warning,
  CheckCircle,
  DirectionsCar,
  Speed,
  CalendarToday,
} from '@mui/icons-material';
import { format, addDays, differenceInDays } from 'date-fns';

const UpcomingServicePage = () => {
  const [upcomingServices, setUpcomingServices] = useState([
    {
      id: 1,
      vehicle: '2020 Toyota Camry',
      serviceType: 'Major Service',
      dueDate: new Date('2024-02-15'),
      dueOdometer: 65000,
      currentOdometer: 62800,
      description: 'Comprehensive inspection and maintenance',
      priority: 'high',
      estimatedCost: 350,
      notes: 'Includes oil change, filter replacement, and full inspection',
    },
    {
      id: 2,
      vehicle: '2018 Honda Civic',
      serviceType: 'Oil Change',
      dueDate: new Date('2024-02-20'),
      dueOdometer: 45000,
      currentOdometer: 43450,
      description: 'Regular oil and filter change',
      priority: 'medium',
      estimatedCost: 85,
      notes: 'Due every 5,000km or 6 months',
    },
    {
      id: 3,
      vehicle: '2019 Ford F-150',
      serviceType: 'Brake Inspection',
      dueDate: new Date('2024-03-01'),
      dueOdometer: 82000,
      currentOdometer: 79200,
      description: 'Brake system inspection and service',
      priority: 'medium',
      estimatedCost: 150,
      notes: 'Check brake pads and fluid level',
    },
    {
      id: 4,
      vehicle: '2017 Mazda CX-5',
      serviceType: 'Tire Rotation',
      dueDate: new Date('2024-01-25'),
      dueOdometer: 55000,
      currentOdometer: 54800,
      description: 'Rotate tires and check alignment',
      priority: 'low',
      estimatedCost: 60,
      notes: 'Overdue - schedule immediately',
    },
  ]);

  const [openDialog, setOpenDialog] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [formData, setFormData] = useState({
    vehicle: '',
    serviceType: '',
    dueDate: '',
    dueOdometer: '',
    currentOdometer: '',
    description: '',
    priority: '',
    estimatedCost: '',
    notes: '',
  });

  const serviceTypes = [
    'Oil Change',
    'Major Service',
    'Minor Service',
    'Brake Inspection',
    'Tire Rotation',
    'Transmission Service',
    'Coolant Service',
    'Belt Replacement',
    'Other',
  ];

  const vehicles = [
    '2020 Toyota Camry',
    '2018 Honda Civic',
    '2019 Ford F-150',
    '2017 Mazda CX-5',
  ];

  const handleOpenDialog = (service = null) => {
    if (service) {
      setEditingService(service);
      setFormData({
        ...service,
        dueDate: format(service.dueDate, 'yyyy-MM-dd'),
      });
    } else {
      setEditingService(null);
      setFormData({
        vehicle: '',
        serviceType: '',
        dueDate: format(addDays(new Date(), 30), 'yyyy-MM-dd'),
        dueOdometer: '',
        currentOdometer: '',
        description: '',
        priority: 'medium',
        estimatedCost: '',
        notes: '',
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingService(null);
  };

  const handleSubmit = () => {
    const serviceData = {
      ...formData,
      dueDate: new Date(formData.dueDate),
      dueOdometer: parseInt(formData.dueOdometer),
      currentOdometer: parseInt(formData.currentOdometer),
      estimatedCost: parseFloat(formData.estimatedCost),
    };

    if (editingService) {
      setUpcomingServices(upcomingServices.map(service => 
        service.id === editingService.id ? { ...serviceData, id: editingService.id } : service
      ));
    } else {
      setUpcomingServices([...upcomingServices, { ...serviceData, id: Date.now() }]);
    }
    handleCloseDialog();
  };

  const handleDelete = (id) => {
    setUpcomingServices(upcomingServices.filter(service => service.id !== id));
  };

  const markAsCompleted = (id) => {
    setUpcomingServices(upcomingServices.filter(service => service.id !== id));
  };

  const getPriorityColor = (priority) => {
    const colors = {
      'high': 'error',
      'medium': 'warning',
      'low': 'info',
    };
    return colors[priority] || 'default';
  };

  const getServiceStatus = (service) => {
    const daysUntilDue = differenceInDays(service.dueDate, new Date());
    const odometerDifference = service.dueOdometer - service.currentOdometer;
    
    if (daysUntilDue < 0 || odometerDifference <= 0) {
      return { status: 'overdue', color: 'error', icon: <Warning /> };
    } else if (daysUntilDue <= 7 || odometerDifference <= 500) {
      return { status: 'due_soon', color: 'warning', icon: <Schedule /> };
    } else {
      return { status: 'scheduled', color: 'success', icon: <CheckCircle /> };
    }
  };

  const getProgressPercentage = (service) => {
    const totalKm = service.dueOdometer - (service.currentOdometer - 5000); // Assuming 5000km interval
    const completedKm = service.currentOdometer - (service.currentOdometer - 5000);
    return Math.min((completedKm / totalKm) * 100, 100);
  };

  const sortedServices = [...upcomingServices].sort((a, b) => {
    const priorityOrder = { high: 3, medium: 2, low: 1 };
    if (priorityOrder[a.priority] !== priorityOrder[b.priority]) {
      return priorityOrder[b.priority] - priorityOrder[a.priority];
    }
    return differenceInDays(a.dueDate, b.dueDate);
  });

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4" component="h1">
          Upcoming Service
        </Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => handleOpenDialog()}
        >
          Schedule Service
        </Button>
      </Box>

      {/* Alert for overdue services */}
      {upcomingServices.some(service => differenceInDays(service.dueDate, new Date()) < 0) && (
        <Alert severity="error" sx={{ mb: 3 }}>
          You have overdue services that require immediate attention!
        </Alert>
      )}

      <Grid container spacing={3}>
        {sortedServices.map((service) => {
          const status = getServiceStatus(service);
          const progress = getProgressPercentage(service);
          const daysUntilDue = differenceInDays(service.dueDate, new Date());
          
          return (
            <Grid item xs={12} md={6} key={service.id}>
              <Card>
                <CardContent>
                  <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={2}>
                    <Box display="flex" alignItems="center" gap={2}>
                      <Avatar sx={{ bgcolor: 'primary.main' }}>
                        <DirectionsCar />
                      </Avatar>
                      <Box>
                        <Typography variant="h6">
                          {service.serviceType}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {service.vehicle}
                        </Typography>
                      </Box>
                    </Box>
                    <Box display="flex" alignItems="center" gap={1}>
                      <Chip
                        label={service.priority}
                        color={getPriorityColor(service.priority)}
                        size="small"
                      />
                      {status.icon}
                    </Box>
                  </Box>

                  <Box mb={2}>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      {service.description}
                    </Typography>
                  </Box>

                  <Box mb={2}>
                    <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                      <Typography variant="body2">
                        Progress to next service
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {progress.toFixed(0)}%
                      </Typography>
                    </Box>
                    <LinearProgress
                      variant="determinate"
                      value={progress}
                      color={status.color}
                      sx={{ height: 8, borderRadius: 4 }}
                    />
                  </Box>

                  <Grid container spacing={2} mb={2}>
                    <Grid item xs={6}>
                      <Box display="flex" alignItems="center" gap={1}>
                        <CalendarToday fontSize="small" color="action" />
                        <Box>
                          <Typography variant="body2" color="text.secondary">
                            Due Date
                          </Typography>
                          <Typography variant="body2">
                            {format(service.dueDate, 'MMM dd, yyyy')}
                          </Typography>
                          <Typography variant="caption" color={status.color}>
                            {daysUntilDue < 0 
                              ? `${Math.abs(daysUntilDue)} days overdue`
                              : `${daysUntilDue} days left`
                            }
                          </Typography>
                        </Box>
                      </Box>
                    </Grid>
                    <Grid item xs={6}>
                      <Box display="flex" alignItems="center" gap={1}>
                        <Speed fontSize="small" color="action" />
                        <Box>
                          <Typography variant="body2" color="text.secondary">
                            Due Odometer
                          </Typography>
                          <Typography variant="body2">
                            {service.dueOdometer.toLocaleString()} km
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            Current: {service.currentOdometer.toLocaleString()} km
                          </Typography>
                        </Box>
                      </Box>
                    </Grid>
                  </Grid>

                  <Box display="flex" justifyContent="between" alignItems="center">
                    <Typography variant="h6" color="primary">
                      Est. Cost: ${service.estimatedCost}
                    </Typography>
                    <Box>
                      <IconButton onClick={() => handleOpenDialog(service)}>
                        <Edit />
                      </IconButton>
                      <IconButton onClick={() => markAsCompleted(service.id)} color="success">
                        <CheckCircle />
                      </IconButton>
                      <IconButton onClick={() => handleDelete(service.id)} color="error">
                        <Delete />
                      </IconButton>
                    </Box>
                  </Box>

                  {service.notes && (
                    <Box mt={2}>
                      <Typography variant="body2" color="text.secondary">
                        Notes: {service.notes}
                      </Typography>
                    </Box>
                  )}
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>

      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
        <DialogTitle>
          {editingService ? 'Edit Scheduled Service' : 'Schedule New Service'}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                select
                label="Vehicle"
                value={formData.vehicle}
                onChange={(e) => setFormData({ ...formData, vehicle: e.target.value })}
                required
              >
                {vehicles.map((vehicle) => (
                  <MenuItem key={vehicle} value={vehicle}>
                    {vehicle}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                select
                label="Service Type"
                value={formData.serviceType}
                onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
                required
              >
                {serviceTypes.map((type) => (
                  <MenuItem key={type} value={type}>
                    {type}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Due Date"
                type="date"
                value={formData.dueDate}
                onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                required
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                select
                label="Priority"
                value={formData.priority}
                onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                required
              >
                <MenuItem value="high">High</MenuItem>
                <MenuItem value="medium">Medium</MenuItem>
                <MenuItem value="low">Low</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Due Odometer (km)"
                type="number"
                value={formData.dueOdometer}
                onChange={(e) => setFormData({ ...formData, dueOdometer: e.target.value })}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Current Odometer (km)"
                type="number"
                value={formData.currentOdometer}
                onChange={(e) => setFormData({ ...formData, currentOdometer: e.target.value })}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Estimated Cost ($)"
                type="number"
                step="0.01"
                value={formData.estimatedCost}
                onChange={(e) => setFormData({ ...formData, estimatedCost: e.target.value })}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={3}
                label="Notes"
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained">
            {editingService ? 'Update' : 'Schedule'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default UpcomingServicePage;
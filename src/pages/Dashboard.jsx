import React from 'react';
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  LinearProgress,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
} from '@mui/material';
import {
  DirectionsCar,
  Build,
  LocalGasStation,
  AttachMoney,
  Warning,
  Schedule,
} from '@mui/icons-material';
import { format } from 'date-fns';

const Dashboard = () => {
  // Mock data - in real app, this would come from API
  const stats = {
    totalVehicles: 4,
    totalServiceCosts: 2850,
    totalFuelCosts: 1200,
    upcomingServices: 2,
  };

  const recentServices = [
    {
      id: 1,
      vehicle: '2020 Toyota Camry',
      type: 'Oil Change',
      date: new Date('2024-01-15'),
      cost: 85,
    },
    {
      id: 2,
      vehicle: '2018 Honda Civic',
      type: 'Brake Repair',
      date: new Date('2024-01-10'),
      cost: 450,
    },
    {
      id: 3,
      vehicle: '2019 Ford F-150',
      type: 'Tire Rotation',
      date: new Date('2024-01-08'),
      cost: 60,
    },
  ];

  const upcomingServices = [
    {
      id: 1,
      vehicle: '2020 Toyota Camry',
      type: 'Major Service',
      dueDate: new Date('2024-02-15'),
      dueOdometer: 65000,
      priority: 'high',
    },
    {
      id: 2,
      vehicle: '2018 Honda Civic',
      type: 'Oil Change',
      dueDate: new Date('2024-02-20'),
      dueOdometer: 45000,
      priority: 'medium',
    },
  ];

  const StatCard = ({ title, value, icon, color = 'primary' }) => (
    <Card>
      <CardContent>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Box>
            <Typography color="text.secondary" gutterBottom>
              {title}
            </Typography>
            <Typography variant="h4" component="div">
              {value}
            </Typography>
          </Box>
          <Box color={`${color}.main`}>
            {icon}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Dashboard
      </Typography>

      <Grid container spacing={3}>
        {/* Stats Cards */}
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Total Vehicles"
            value={stats.totalVehicles}
            icon={<DirectionsCar sx={{ fontSize: 40 }} />}
            color="primary"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Service Costs"
            value={`$${stats.totalServiceCosts.toLocaleString()}`}
            icon={<Build sx={{ fontSize: 40 }} />}
            color="secondary"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Fuel Costs"
            value={`$${stats.totalFuelCosts.toLocaleString()}`}
            icon={<LocalGasStation sx={{ fontSize: 40 }} />}
            color="success"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Upcoming Services"
            value={stats.upcomingServices}
            icon={<Schedule sx={{ fontSize: 40 }} />}
            color="warning"
          />
        </Grid>

        {/* Recent Services */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Recent Services
              </Typography>
              <List>
                {recentServices.map((service, index) => (
                  <React.Fragment key={service.id}>
                    <ListItem>
                      <ListItemIcon>
                        <Build color="primary" />
                      </ListItemIcon>
                      <ListItemText
                        primary={`${service.vehicle} - ${service.type}`}
                        secondary={`${format(service.date, 'MMM dd, yyyy')} • $${service.cost}`}
                      />
                    </ListItem>
                    {index < recentServices.length - 1 && <Divider />}
                  </React.Fragment>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* Upcoming Services */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Upcoming Services
              </Typography>
              <List>
                {upcomingServices.map((service, index) => (
                  <React.Fragment key={service.id}>
                    <ListItem>
                      <ListItemIcon>
                        <Warning 
                          color={service.priority === 'high' ? 'error' : 'warning'} 
                        />
                      </ListItemIcon>
                      <ListItemText
                        primary={
                          <Box display="flex" alignItems="center" gap={1}>
                            <Typography variant="body1">
                              {service.vehicle} - {service.type}
                            </Typography>
                            <Chip
                              label={service.priority}
                              size="small"
                              color={service.priority === 'high' ? 'error' : 'warning'}
                            />
                          </Box>
                        }
                        secondary={`Due: ${format(service.dueDate, 'MMM dd, yyyy')} • ${service.dueOdometer.toLocaleString()} km`}
                      />
                    </ListItem>
                    {index < upcomingServices.length - 1 && <Divider />}
                  </React.Fragment>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* Vehicle Health Overview */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Vehicle Health Overview
              </Typography>
              <Grid container spacing={2}>
                {[
                  { name: '2020 Toyota Camry', health: 85, color: 'success' },
                  { name: '2018 Honda Civic', health: 72, color: 'warning' },
                  { name: '2019 Ford F-150', health: 90, color: 'success' },
                  { name: '2017 Mazda CX-5', health: 65, color: 'error' },
                ].map((vehicle) => (
                  <Grid item xs={12} sm={6} md={3} key={vehicle.name}>
                    <Box>
                      <Typography variant="body2" gutterBottom>
                        {vehicle.name}
                      </Typography>
                      <LinearProgress
                        variant="determinate"
                        value={vehicle.health}
                        color={vehicle.color}
                        sx={{ height: 8, borderRadius: 4 }}
                      />
                      <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                        {vehicle.health}% Health
                      </Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
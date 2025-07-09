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
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Avatar,
} from '@mui/material';
import {
  Add,
  Edit,
  Delete,
  LocalGasStation,
  Speed,
  AttachMoney,
  DirectionsCar,
} from '@mui/icons-material';
import { format } from 'date-fns';

const FuelLogsPage = () => {
  const [fuelLogs, setFuelLogs] = useState([
    {
      id: 1,
      vehicle: '2020 Toyota Camry',
      date: new Date('2024-01-20'),
      odometer: 62800,
      litres: 45.2,
      cost: 72.50,
      fuelType: 'Regular',
      notes: 'Full tank',
      fuelEconomy: 8.2,
    },
    {
      id: 2,
      vehicle: '2018 Honda Civic',
      date: new Date('2024-01-18'),
      odometer: 43450,
      litres: 38.5,
      cost: 61.80,
      fuelType: 'Regular',
      notes: 'Highway driving',
      fuelEconomy: 6.8,
    },
    {
      id: 3,
      vehicle: '2019 Ford F-150',
      date: new Date('2024-01-16'),
      odometer: 79200,
      litres: 85.0,
      cost: 136.00,
      fuelType: 'Premium',
      notes: 'Towing trailer',
      fuelEconomy: 12.5,
    },
  ]);

  const [openDialog, setOpenDialog] = useState(false);
  const [editingLog, setEditingLog] = useState(null);
  const [formData, setFormData] = useState({
    vehicle: '',
    date: '',
    odometer: '',
    litres: '',
    cost: '',
    fuelType: '',
    notes: '',
  });

  const fuelTypes = [
    'Regular',
    'Premium',
    'Diesel',
    'E85',
    'Electric',
  ];

  const vehicles = [
    '2020 Toyota Camry',
    '2018 Honda Civic',
    '2019 Ford F-150',
    '2017 Mazda CX-5',
  ];

  const calculateFuelEconomy = (currentOdometer, previousOdometer, litres) => {
    const distance = currentOdometer - previousOdometer;
    return distance > 0 ? (litres / distance * 100).toFixed(1) : 0;
  };

  const handleOpenDialog = (log = null) => {
    if (log) {
      setEditingLog(log);
      setFormData({
        ...log,
        date: format(log.date, 'yyyy-MM-dd'),
      });
    } else {
      setEditingLog(null);
      setFormData({
        vehicle: '',
        date: format(new Date(), 'yyyy-MM-dd'),
        odometer: '',
        litres: '',
        cost: '',
        fuelType: '',
        notes: '',
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingLog(null);
  };

  const handleSubmit = () => {
    const logData = {
      ...formData,
      date: new Date(formData.date),
      odometer: parseInt(formData.odometer),
      litres: parseFloat(formData.litres),
      cost: parseFloat(formData.cost),
    };

    // Calculate fuel economy (simplified - in real app, would use previous fill-up)
    const vehicleLogs = fuelLogs.filter(log => log.vehicle === formData.vehicle);
    if (vehicleLogs.length > 0) {
      const lastLog = vehicleLogs[vehicleLogs.length - 1];
      logData.fuelEconomy = parseFloat(calculateFuelEconomy(
        logData.odometer,
        lastLog.odometer,
        logData.litres
      ));
    } else {
      logData.fuelEconomy = 0;
    }

    if (editingLog) {
      setFuelLogs(fuelLogs.map(log => 
        log.id === editingLog.id ? { ...logData, id: editingLog.id } : log
      ));
    } else {
      setFuelLogs([...fuelLogs, { ...logData, id: Date.now() }]);
    }
    handleCloseDialog();
  };

  const handleDelete = (id) => {
    setFuelLogs(fuelLogs.filter(log => log.id !== id));
  };

  const getFuelTypeColor = (type) => {
    const colors = {
      'Regular': 'primary',
      'Premium': 'secondary',
      'Diesel': 'warning',
      'E85': 'success',
      'Electric': 'info',
    };
    return colors[type] || 'default';
  };

  const getTotalStats = () => {
    const totalLitres = fuelLogs.reduce((sum, log) => sum + log.litres, 0);
    const totalCost = fuelLogs.reduce((sum, log) => sum + log.cost, 0);
    const avgEconomy = fuelLogs.reduce((sum, log) => sum + log.fuelEconomy, 0) / fuelLogs.length;
    
    return {
      totalLitres: totalLitres.toFixed(1),
      totalCost: totalCost.toFixed(2),
      avgEconomy: avgEconomy.toFixed(1),
    };
  };

  const stats = getTotalStats();

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4" component="h1">
          Fuel Logs
        </Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => handleOpenDialog()}
        >
          Add Fuel Log
        </Button>
      </Box>

      {/* Stats Cards */}
      <Grid container spacing={3} mb={3}>
        <Grid item xs={12} sm={4}>
          <Card>
            <CardContent>
              <Box display="flex" alignItems="center" justifyContent="space-between">
                <Box>
                  <Typography color="text.secondary" gutterBottom>
                    Total Litres
                  </Typography>
                  <Typography variant="h5">
                    {stats.totalLitres}L
                  </Typography>
                </Box>
                <LocalGasStation color="primary" sx={{ fontSize: 40 }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card>
            <CardContent>
              <Box display="flex" alignItems="center" justifyContent="space-between">
                <Box>
                  <Typography color="text.secondary" gutterBottom>
                    Total Cost
                  </Typography>
                  <Typography variant="h5">
                    ${stats.totalCost}
                  </Typography>
                </Box>
                <AttachMoney color="secondary" sx={{ fontSize: 40 }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card>
            <CardContent>
              <Box display="flex" alignItems="center" justifyContent="space-between">
                <Box>
                  <Typography color="text.secondary" gutterBottom>
                    Avg Economy
                  </Typography>
                  <Typography variant="h5">
                    {stats.avgEconomy}L/100km
                  </Typography>
                </Box>
                <Speed color="success" sx={{ fontSize: 40 }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Card>
        <CardContent>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Vehicle</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Odometer</TableCell>
                  <TableCell>Litres</TableCell>
                  <TableCell>Cost</TableCell>
                  <TableCell>Fuel Type</TableCell>
                  <TableCell>Economy</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {fuelLogs.map((log) => (
                  <TableRow key={log.id}>
                    <TableCell>
                      <Box display="flex" alignItems="center" gap={1}>
                        <Avatar sx={{ width: 32, height: 32, bgcolor: 'primary.main' }}>
                          <DirectionsCar fontSize="small" />
                        </Avatar>
                        {log.vehicle}
                      </Box>
                    </TableCell>
                    <TableCell>{format(log.date, 'MMM dd, yyyy')}</TableCell>
                    <TableCell>
                      <Box display="flex" alignItems="center" gap={1}>
                        <Speed fontSize="small" color="action" />
                        {log.odometer.toLocaleString()} km
                      </Box>
                    </TableCell>
                    <TableCell>{log.litres}L</TableCell>
                    <TableCell>
                      <Box display="flex" alignItems="center" gap={1}>
                        <AttachMoney fontSize="small" color="action" />
                        ${log.cost}
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={log.fuelType}
                        color={getFuelTypeColor(log.fuelType)}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>{log.fuelEconomy}L/100km</TableCell>
                    <TableCell>
                      <IconButton onClick={() => handleOpenDialog(log)}>
                        <Edit />
                      </IconButton>
                      <IconButton onClick={() => handleDelete(log.id)} color="error">
                        <Delete />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>

      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>
          {editingLog ? 'Edit Fuel Log' : 'Add Fuel Log'}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
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
                label="Date"
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                required
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Odometer (km)"
                type="number"
                value={formData.odometer}
                onChange={(e) => setFormData({ ...formData, odometer: e.target.value })}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Litres"
                type="number"
                step="0.1"
                value={formData.litres}
                onChange={(e) => setFormData({ ...formData, litres: e.target.value })}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Cost ($)"
                type="number"
                step="0.01"
                value={formData.cost}
                onChange={(e) => setFormData({ ...formData, cost: e.target.value })}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                select
                label="Fuel Type"
                value={formData.fuelType}
                onChange={(e) => setFormData({ ...formData, fuelType: e.target.value })}
                required
              >
                {fuelTypes.map((type) => (
                  <MenuItem key={type} value={type}>
                    {type}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={2}
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
            {editingLog ? 'Update' : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default FuelLogsPage;
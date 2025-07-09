import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Grid,
  Chip,
  Avatar,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Fab,
} from '@mui/material';
import {
  Add,
  Edit,
  Delete,
  DirectionsCar,
  Speed,
  Person,
} from '@mui/icons-material';
import { useState as useStateHook } from 'react';

const VehiclesPage = () => {
  const [vehicles, setVehicles] = useState([
    {
      id: 1,
      make: 'Toyota',
      model: 'Camry',
      year: 2020,
      rego: 'ABC123',
      vin: '1HGBH41JXMN109186',
      engineType: 'V6 3.5L',
      transmission: 'Automatic',
      odometer: 62500,
      owner: 'John Doe',
      notes: 'Family car, well maintained',
      photo: null,
    },
    {
      id: 2,
      make: 'Honda',
      model: 'Civic',
      year: 2018,
      rego: 'XYZ789',
      vin: '2HGFC2F59JH123456',
      engineType: '4-Cyl 1.5L Turbo',
      transmission: 'Manual',
      odometer: 43200,
      owner: 'Jane Smith',
      notes: 'Commuter car',
      photo: null,
    },
    {
      id: 3,
      make: 'Ford',
      model: 'F-150',
      year: 2019,
      rego: 'DEF456',
      vin: '1FTFW1ET5KFC12345',
      engineType: 'V8 5.0L',
      transmission: 'Automatic',
      odometer: 78900,
      owner: 'Mike Johnson',
      notes: 'Work truck',
      photo: null,
    },
  ]);

  const [openDialog, setOpenDialog] = useState(false);
  const [editingVehicle, setEditingVehicle] = useState(null);
  const [formData, setFormData] = useState({
    make: '',
    model: '',
    year: '',
    rego: '',
    vin: '',
    engineType: '',
    transmission: '',
    odometer: '',
    owner: '',
    notes: '',
  });

  const handleOpenDialog = (vehicle = null) => {
    if (vehicle) {
      setEditingVehicle(vehicle);
      setFormData(vehicle);
    } else {
      setEditingVehicle(null);
      setFormData({
        make: '',
        model: '',
        year: '',
        rego: '',
        vin: '',
        engineType: '',
        transmission: '',
        odometer: '',
        owner: '',
        notes: '',
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingVehicle(null);
  };

  const handleSubmit = () => {
    if (editingVehicle) {
      setVehicles(vehicles.map(v => 
        v.id === editingVehicle.id ? { ...formData, id: editingVehicle.id } : v
      ));
    } else {
      setVehicles([...vehicles, { ...formData, id: Date.now() }]);
    }
    handleCloseDialog();
  };

  const handleDelete = (id) => {
    setVehicles(vehicles.filter(v => v.id !== id));
  };

  const VehicleCard = ({ vehicle }) => (
    <Card>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={2}>
          <Box display="flex" alignItems="center" gap={2}>
            <Avatar sx={{ bgcolor: 'primary.main' }}>
              <DirectionsCar />
            </Avatar>
            <Box>
              <Typography variant="h6">
                {vehicle.year} {vehicle.make} {vehicle.model}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {vehicle.rego}
              </Typography>
            </Box>
          </Box>
          <Box>
            <IconButton onClick={() => handleOpenDialog(vehicle)}>
              <Edit />
            </IconButton>
            <IconButton onClick={() => handleDelete(vehicle.id)} color="error">
              <Delete />
            </IconButton>
          </Box>
        </Box>

        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Box display="flex" alignItems="center" gap={1} mb={1}>
              <Speed fontSize="small" color="action" />
              <Typography variant="body2">
                {vehicle.odometer?.toLocaleString()} km
              </Typography>
            </Box>
            <Box display="flex" alignItems="center" gap={1} mb={1}>
              <Person fontSize="small" color="action" />
              <Typography variant="body2">
                {vehicle.owner}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              Engine: {vehicle.engineType}
            </Typography>
            <Chip
              label={vehicle.transmission}
              size="small"
              variant="outlined"
              sx={{ mb: 1 }}
            />
          </Grid>
        </Grid>

        {vehicle.notes && (
          <Box mt={2}>
            <Typography variant="body2" color="text.secondary">
              Notes: {vehicle.notes}
            </Typography>
          </Box>
        )}
      </CardContent>
    </Card>
  );

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4" component="h1">
          Vehicles
        </Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => handleOpenDialog()}
        >
          Add Vehicle
        </Button>
      </Box>

      <Grid container spacing={3}>
        {vehicles.map((vehicle) => (
          <Grid item xs={12} md={6} lg={4} key={vehicle.id}>
            <VehicleCard vehicle={vehicle} />
          </Grid>
        ))}
      </Grid>

      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
        <DialogTitle>
          {editingVehicle ? 'Edit Vehicle' : 'Add Vehicle'}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Make"
                value={formData.make}
                onChange={(e) => setFormData({ ...formData, make: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Model"
                value={formData.model}
                onChange={(e) => setFormData({ ...formData, model: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Year"
                type="number"
                value={formData.year}
                onChange={(e) => setFormData({ ...formData, year: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Registration"
                value={formData.rego}
                onChange={(e) => setFormData({ ...formData, rego: e.target.value })}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="VIN"
                value={formData.vin}
                onChange={(e) => setFormData({ ...formData, vin: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Engine Type"
                value={formData.engineType}
                onChange={(e) => setFormData({ ...formData, engineType: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                select
                label="Transmission"
                value={formData.transmission}
                onChange={(e) => setFormData({ ...formData, transmission: e.target.value })}
              >
                <MenuItem value="Manual">Manual</MenuItem>
                <MenuItem value="Automatic">Automatic</MenuItem>
                <MenuItem value="CVT">CVT</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Odometer (km)"
                type="number"
                value={formData.odometer}
                onChange={(e) => setFormData({ ...formData, odometer: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Owner"
                value={formData.owner}
                onChange={(e) => setFormData({ ...formData, owner: e.target.value })}
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
            {editingVehicle ? 'Update' : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default VehiclesPage;
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
  Paper,
  Avatar,
} from '@mui/material';
import {
  Add,
  Edit,
  Delete,
  Build,
  AttachMoney,
  Speed,
  GetApp,
  DirectionsCar,
} from '@mui/icons-material';
import { format } from 'date-fns';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const ServiceLogsPage = () => {
  const [serviceLogs, setServiceLogs] = useState([
    {
      id: 1,
      vehicle: '2020 Toyota Camry',
      date: new Date('2024-01-15'),
      odometer: 62500,
      type: 'Oil Change',
      workDone: 'Changed engine oil and filter',
      partsReplaced: 'Oil filter, Engine oil (5L)',
      cost: 85,
      notes: 'Next oil change due at 67,500km',
    },
    {
      id: 2,
      vehicle: '2018 Honda Civic',
      date: new Date('2024-01-10'),
      odometer: 43200,
      type: 'Brake Repair',
      workDone: 'Replaced front brake pads and rotors',
      partsReplaced: 'Front brake pads, Brake rotors (2)',
      cost: 450,
      notes: 'Brake fluid level checked, no issues',
    },
    {
      id: 3,
      vehicle: '2019 Ford F-150',
      date: new Date('2024-01-08'),
      odometer: 78900,
      type: 'Tire Rotation',
      workDone: 'Rotated all four tires, checked tire pressure',
      partsReplaced: 'None',
      cost: 60,
      notes: 'All tires in good condition',
    },
  ]);

  const [openDialog, setOpenDialog] = useState(false);
  const [editingLog, setEditingLog] = useState(null);
  const [formData, setFormData] = useState({
    vehicle: '',
    date: '',
    odometer: '',
    type: '',
    workDone: '',
    partsReplaced: '',
    cost: '',
    notes: '',
  });

  const serviceTypes = [
    'Oil Change',
    'Brake Repair',
    'Tire Rotation',
    'Major Service',
    'Minor Service',
    'Repair',
    'Inspection',
    'Other',
  ];

  const vehicles = [
    '2020 Toyota Camry',
    '2018 Honda Civic',
    '2019 Ford F-150',
    '2017 Mazda CX-5',
  ];

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
        type: '',
        workDone: '',
        partsReplaced: '',
        cost: '',
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
      cost: parseFloat(formData.cost),
    };

    if (editingLog) {
      setServiceLogs(serviceLogs.map(log => 
        log.id === editingLog.id ? { ...logData, id: editingLog.id } : log
      ));
    } else {
      setServiceLogs([...serviceLogs, { ...logData, id: Date.now() }]);
    }
    handleCloseDialog();
  };

  const handleDelete = (id) => {
    setServiceLogs(serviceLogs.filter(log => log.id !== id));
  };

  const exportToPDF = (vehicle) => {
    const vehicleLogs = serviceLogs.filter(log => log.vehicle === vehicle);
    const doc = new jsPDF();
    
    doc.setFontSize(20);
    doc.text('Service History Report', 14, 22);
    doc.setFontSize(12);
    doc.text(`Vehicle: ${vehicle}`, 14, 32);
    doc.text(`Generated: ${format(new Date(), 'MMM dd, yyyy')}`, 14, 42);

    const tableData = vehicleLogs.map(log => [
      format(log.date, 'MMM dd, yyyy'),
      log.odometer.toLocaleString(),
      log.type,
      log.workDone,
      log.partsReplaced,
      `$${log.cost}`,
    ]);

    doc.autoTable({
      head: [['Date', 'Odometer', 'Type', 'Work Done', 'Parts', 'Cost']],
      body: tableData,
      startY: 50,
    });

    doc.save(`${vehicle.replace(/\s+/g, '_')}_service_history.pdf`);
  };

  const getServiceTypeColor = (type) => {
    const colors = {
      'Oil Change': 'primary',
      'Brake Repair': 'error',
      'Tire Rotation': 'info',
      'Major Service': 'warning',
      'Minor Service': 'success',
      'Repair': 'error',
      'Inspection': 'secondary',
      'Other': 'default',
    };
    return colors[type] || 'default';
  };

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4" component="h1">
          Service Logs
        </Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => handleOpenDialog()}
        >
          Add Service Log
        </Button>
      </Box>

      <Card>
        <CardContent>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Vehicle</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Odometer</TableCell>
                  <TableCell>Type</TableCell>
                  <TableCell>Work Done</TableCell>
                  <TableCell>Cost</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {serviceLogs.map((log) => (
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
                    <TableCell>
                      <Chip
                        label={log.type}
                        color={getServiceTypeColor(log.type)}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>{log.workDone}</TableCell>
                    <TableCell>
                      <Box display="flex" alignItems="center" gap={1}>
                        <AttachMoney fontSize="small" color="action" />
                        ${log.cost}
                      </Box>
                    </TableCell>
                    <TableCell>
                      <IconButton onClick={() => handleOpenDialog(log)}>
                        <Edit />
                      </IconButton>
                      <IconButton onClick={() => handleDelete(log.id)} color="error">
                        <Delete />
                      </IconButton>
                      <IconButton onClick={() => exportToPDF(log.vehicle)}>
                        <GetApp />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>

      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
        <DialogTitle>
          {editingLog ? 'Edit Service Log' : 'Add Service Log'}
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
                select
                label="Service Type"
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                required
              >
                {serviceTypes.map((type) => (
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
                rows={3}
                label="Work Done"
                value={formData.workDone}
                onChange={(e) => setFormData({ ...formData, workDone: e.target.value })}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={2}
                label="Parts Replaced"
                value={formData.partsReplaced}
                onChange={(e) => setFormData({ ...formData, partsReplaced: e.target.value })}
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

export default ServiceLogsPage;
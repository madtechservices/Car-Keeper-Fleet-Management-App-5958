import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Grid,
  Avatar,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  List,
  ListItem,
  ListItemText,
  Divider,
} from '@mui/material';
import {
  Add,
  Edit,
  Delete,
  Person,
  Email,
  Phone,
  DirectionsCar,
} from '@mui/icons-material';

const OwnersPage = () => {
  const [owners, setOwners] = useState([
    {
      id: 1,
      name: 'John Doe',
      email: 'john.doe@example.com',
      phone: '+1 (555) 123-4567',
      notes: 'Primary contact for family vehicles',
      vehicles: ['2020 Toyota Camry'],
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      phone: '+1 (555) 987-6543',
      notes: 'Commuter, prefers scheduled maintenance',
      vehicles: ['2018 Honda Civic'],
    },
    {
      id: 3,
      name: 'Mike Johnson',
      email: 'mike.johnson@example.com',
      phone: '+1 (555) 456-7890',
      notes: 'Business owner, heavy vehicle usage',
      vehicles: ['2019 Ford F-150'],
    },
  ]);

  const [openDialog, setOpenDialog] = useState(false);
  const [editingOwner, setEditingOwner] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    notes: '',
  });

  const handleOpenDialog = (owner = null) => {
    if (owner) {
      setEditingOwner(owner);
      setFormData({
        name: owner.name,
        email: owner.email,
        phone: owner.phone,
        notes: owner.notes,
      });
    } else {
      setEditingOwner(null);
      setFormData({
        name: '',
        email: '',
        phone: '',
        notes: '',
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingOwner(null);
  };

  const handleSubmit = () => {
    if (editingOwner) {
      setOwners(owners.map(o => 
        o.id === editingOwner.id 
          ? { ...formData, id: editingOwner.id, vehicles: editingOwner.vehicles }
          : o
      ));
    } else {
      setOwners([...owners, { ...formData, id: Date.now(), vehicles: [] }]);
    }
    handleCloseDialog();
  };

  const handleDelete = (id) => {
    setOwners(owners.filter(o => o.id !== id));
  };

  const OwnerCard = ({ owner }) => (
    <Card>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={2}>
          <Box display="flex" alignItems="center" gap={2}>
            <Avatar sx={{ bgcolor: 'primary.main' }}>
              <Person />
            </Avatar>
            <Box>
              <Typography variant="h6">
                {owner.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {owner.vehicles.length} vehicle{owner.vehicles.length !== 1 ? 's' : ''}
              </Typography>
            </Box>
          </Box>
          <Box>
            <IconButton onClick={() => handleOpenDialog(owner)}>
              <Edit />
            </IconButton>
            <IconButton onClick={() => handleDelete(owner.id)} color="error">
              <Delete />
            </IconButton>
          </Box>
        </Box>

        <Box mb={2}>
          <Box display="flex" alignItems="center" gap={1} mb={1}>
            <Email fontSize="small" color="action" />
            <Typography variant="body2">
              {owner.email}
            </Typography>
          </Box>
          <Box display="flex" alignItems="center" gap={1} mb={1}>
            <Phone fontSize="small" color="action" />
            <Typography variant="body2">
              {owner.phone}
            </Typography>
          </Box>
        </Box>

        {owner.vehicles.length > 0 && (
          <Box mb={2}>
            <Typography variant="subtitle2" gutterBottom>
              Vehicles:
            </Typography>
            <List dense>
              {owner.vehicles.map((vehicle, index) => (
                <React.Fragment key={index}>
                  <ListItem>
                    <DirectionsCar fontSize="small" color="action" sx={{ mr: 1 }} />
                    <ListItemText primary={vehicle} />
                  </ListItem>
                  {index < owner.vehicles.length - 1 && <Divider />}
                </React.Fragment>
              ))}
            </List>
          </Box>
        )}

        {owner.notes && (
          <Box>
            <Typography variant="body2" color="text.secondary">
              Notes: {owner.notes}
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
          Owners
        </Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => handleOpenDialog()}
        >
          Add Owner
        </Button>
      </Box>

      <Grid container spacing={3}>
        {owners.map((owner) => (
          <Grid item xs={12} md={6} lg={4} key={owner.id}>
            <OwnerCard owner={owner} />
          </Grid>
        ))}
      </Grid>

      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>
          {editingOwner ? 'Edit Owner' : 'Add Owner'}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Phone"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
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
            {editingOwner ? 'Update' : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default OwnersPage;
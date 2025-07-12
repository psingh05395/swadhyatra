import React, { useState } from "react";
import {
  Container,
  Typography,
  Box,
  Paper,
  Grid,
  TextField,
  Button,
  Avatar,
  Divider,
  Alert,
} from "@mui/material";
import { Edit, Save, Cancel } from "@mui/icons-material";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store/store";
import { updateProfile } from "../store/slices/authSlice";
import { useNavigate } from "react-router-dom";

const Profile: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useSelector(
    (state: RootState) => state.auth
  );

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    address: user?.address || "",
  });
  const [success, setSuccess] = useState(false);

  if (!isAuthenticated || !user) {
    navigate("/login");
    return null;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = () => {
    dispatch(updateProfile(formData));
    setIsEditing(false);
    setSuccess(true);
    setTimeout(() => setSuccess(false), 3000);
  };

  const handleCancel = () => {
    setFormData({
      name: user?.name || "",
      email: user?.email || "",
      phone: user?.phone || "",
      address: user?.address || "",
    });
    setIsEditing(false);
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h3" component="h1" gutterBottom>
        My Profile
      </Typography>

      {success && (
        <Alert severity="success" sx={{ mb: 3 }}>
          Profile updated successfully!
        </Alert>
      )}

      <Paper sx={{ p: 4 }}>
        {/* Profile Header */}
        <Box sx={{ display: "flex", alignItems: "center", mb: 4 }}>
          <Avatar
            sx={{
              width: 100,
              height: 100,
              mr: 3,
              bgcolor: "primary.main",
              fontSize: "2rem",
            }}
          >
            {user.name.charAt(0).toUpperCase()}
          </Avatar>
          <Box sx={{ flex: 1 }}>
            <Typography variant="h4" gutterBottom>
              {user.name}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Member since {new Date().getFullYear()}
            </Typography>
          </Box>
          <Button
            variant={isEditing ? "outlined" : "contained"}
            startIcon={isEditing ? <Cancel /> : <Edit />}
            onClick={isEditing ? handleCancel : () => setIsEditing(true)}
          >
            {isEditing ? "Cancel" : "Edit Profile"}
          </Button>
        </Box>

        <Divider sx={{ mb: 4 }} />

        {/* Profile Form */}
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              fullWidth
              label="Full Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              disabled={!isEditing}
              variant={isEditing ? "outlined" : "filled"}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              fullWidth
              label="Email Address"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              disabled={!isEditing}
              variant={isEditing ? "outlined" : "filled"}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              fullWidth
              label="Phone Number"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              disabled={!isEditing}
              variant={isEditing ? "outlined" : "filled"}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              fullWidth
              label="Address"
              name="address"
              multiline
              rows={3}
              value={formData.address}
              onChange={handleChange}
              disabled={!isEditing}
              variant={isEditing ? "outlined" : "filled"}
            />
          </Grid>
        </Grid>

        {isEditing && (
          <Box
            sx={{ display: "flex", gap: 2, mt: 4, justifyContent: "flex-end" }}
          >
            <Button
              variant="outlined"
              onClick={handleCancel}
              startIcon={<Cancel />}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              onClick={handleSave}
              startIcon={<Save />}
            >
              Save Changes
            </Button>
          </Box>
        )}
      </Paper>

      {/* Quick Actions */}
      <Paper sx={{ p: 3, mt: 4 }}>
        <Typography variant="h5" gutterBottom>
          Quick Actions
        </Typography>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Button
              fullWidth
              variant="outlined"
              onClick={() => navigate("/orders")}
              sx={{ py: 1.5 }}
            >
              View Orders
            </Button>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Button
              fullWidth
              variant="outlined"
              onClick={() => navigate("/favorites")}
              sx={{ py: 1.5 }}
            >
              My Favorites
            </Button>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Button
              fullWidth
              variant="outlined"
              onClick={() => navigate("/categories")}
              sx={{ py: 1.5 }}
            >
              Browse Menu
            </Button>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Button
              fullWidth
              variant="outlined"
              onClick={() => navigate("/cart")}
              sx={{ py: 1.5 }}
            >
              View Cart
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default Profile;

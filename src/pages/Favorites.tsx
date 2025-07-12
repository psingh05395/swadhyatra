import React from "react";
import { Container, Typography, Box, Grid, Button } from "@mui/material";
import { Favorite as FavoriteIcon, Restaurant } from "@mui/icons-material";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { useNavigate } from "react-router-dom";
import FoodCard from "../components/common/FoodCard";

const Favorites: React.FC = () => {
  const navigate = useNavigate();
  const { favorites } = useSelector((state: RootState) => state.favorites);
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  if (!isAuthenticated) {
    return (
      <Container maxWidth="lg" sx={{ py: 8, textAlign: "center" }}>
        <Typography variant="h4" gutterBottom>
          Please login to view your favorites
        </Typography>
        <Button variant="contained" onClick={() => navigate("/login")}>
          Login
        </Button>
      </Container>
    );
  }

  if (favorites.length === 0) {
    return (
      <Container maxWidth="lg" sx={{ py: 8, textAlign: "center" }}>
        <FavoriteIcon sx={{ fontSize: 100, color: "text.secondary", mb: 2 }} />
        <Typography variant="h4" gutterBottom>
          No favorites yet
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          Start adding your favorite dishes by clicking the heart icon
        </Typography>
        <Button variant="contained" onClick={() => navigate("/categories")}>
          Browse Menu
        </Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ display: "flex", alignItems: "center", mb: 4 }}>
        <FavoriteIcon sx={{ fontSize: 40, color: "error.main", mr: 2 }} />
        <Typography variant="h3" component="h1">
          Your Favorites
        </Typography>
      </Box>

      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        {favorites.length} favorite dish{favorites.length !== 1 ? "es" : ""}
      </Typography>

      <Grid container spacing={3}>
        {favorites.map((food) => (
          <Grid size={{ xs: 12, md: 4 }} key={food.id}>
            <FoodCard food={food} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Favorites;

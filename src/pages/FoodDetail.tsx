import React, { useEffect, useState } from "react";
import {
  Container,
  Grid,
  Typography,
  Box,
  Button,
  Paper,
  Chip,
  Rating,
  IconButton,
  TextField,
} from "@mui/material";
import {
  Favorite,
  FavoriteBorder,
  Add,
  Remove,
  AccessTime,
  LocalOffer,
  Restaurant,
} from "@mui/icons-material";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { addToCart } from "../store/slices/cartSlice";
import { toggleFavorite } from "../store/slices/favoriteSlice";
import { setFoods } from "../store/slices/foodSlice";
import { foods } from "../data/dummyData";
import FoodCard from "../components/common/FoodCard";

const FoodDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { foods: allFoods } = useSelector((state: RootState) => state.food);
  const { favorites } = useSelector((state: RootState) => state.favorites);
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  const [quantity, setQuantity] = useState(1);
  const [specialInstructions, setSpecialInstructions] = useState("");

  useEffect(() => {
    if (allFoods.length === 0) {
      dispatch(setFoods(foods));
    }
  }, [dispatch, allFoods.length]);

  const food = allFoods.find((f) => f.id === id);
  const isFavorite = favorites.some((fav) => fav.id === id);

  if (!food) {
    return (
      <Container maxWidth="lg" sx={{ py: 8, textAlign: "center" }}>
        <Typography variant="h4" gutterBottom>
          Food item not found
        </Typography>
        <Button variant="contained" onClick={() => navigate("/categories")}>
          Browse Menu
        </Button>
      </Container>
    );
  }

  const discountedPrice = food.discount
    ? food.price * (1 - food.discount / 100)
    : food.price;

  const relatedFoods = allFoods
    .filter((f) => f.category === food.category && f.id !== food.id)
    .slice(0, 4);

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }
    dispatch(addToCart({ food, quantity, specialInstructions }));
    // Show success message or redirect to cart
  };

  const handleToggleFavorite = () => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }
    dispatch(toggleFavorite(food));
  };

  const handleQuantityChange = (change: number) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Grid container spacing={4}>
        {/* Food Image */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Box sx={{ position: "relative" }}>
            <Box
              component="img"
              src={food.image}
              alt={food.name}
              sx={{
                width: "100%",
                height: 400,
                objectFit: "cover",
                borderRadius: 2,
              }}
            />
            {food.discount && (
              <Chip
                icon={<LocalOffer />}
                label={`${food.discount}% OFF`}
                color="error"
                sx={{
                  position: "absolute",
                  top: 16,
                  left: 16,
                  fontWeight: "bold",
                }}
              />
            )}
          </Box>
        </Grid>

        {/* Food Details */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              mb: 2,
            }}
          >
            <Typography variant="h3" component="h1" gutterBottom>
              {food.name}
            </Typography>
            <IconButton onClick={handleToggleFavorite} size="large">
              {isFavorite ? (
                <Favorite sx={{ color: "error.main", fontSize: 32 }} />
              ) : (
                <FavoriteBorder sx={{ fontSize: 32 }} />
              )}
            </IconButton>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
            <Rating value={food.rating} precision={0.1} readOnly />
            <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
              ({food.reviews} reviews)
            </Typography>
          </Box>

          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ mb: 3, lineHeight: 1.6 }}
          >
            {food.description}
          </Typography>

          {/* Tags */}
          <Box sx={{ display: "flex", gap: 1, mb: 3, flexWrap: "wrap" }}>
            <Chip
              icon={<Restaurant />}
              label={food.category}
              color="primary"
              variant="outlined"
            />
            {food.isVegetarian && (
              <Chip label="Vegetarian" color="success" variant="outlined" />
            )}
            {food.isSpicy && (
              <Chip label="Spicy" color="warning" variant="outlined" />
            )}
            <Chip
              icon={<AccessTime />}
              label={`${food.preparationTime} min`}
              variant="outlined"
            />
          </Box>

          {/* Price */}
          <Box sx={{ mb: 3 }}>
            <Typography
              variant="h4"
              color="primary"
              sx={{ fontWeight: "bold" }}
            >
              ₹{discountedPrice.toFixed(0)}
            </Typography>
            {food.discount && (
              <Typography
                variant="h6"
                color="text.secondary"
                sx={{ textDecoration: "line-through" }}
              >
                ₹{food.price}
              </Typography>
            )}
          </Box>

          {/* Quantity Selector */}
          <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
            <Typography variant="h6" sx={{ mr: 2 }}>
              Quantity:
            </Typography>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                border: 1,
                borderColor: "divider",
                borderRadius: 1,
              }}
            >
              <IconButton
                onClick={() => handleQuantityChange(-1)}
                disabled={quantity <= 1}
              >
                <Remove />
              </IconButton>
              <Typography
                sx={{ px: 2, py: 1, minWidth: 40, textAlign: "center" }}
              >
                {quantity}
              </Typography>
              <IconButton onClick={() => handleQuantityChange(1)}>
                <Add />
              </IconButton>
            </Box>
          </Box>

          {/* Special Instructions */}
          <TextField
            fullWidth
            label="Special Instructions (Optional)"
            multiline
            rows={3}
            value={specialInstructions}
            onChange={(e) => setSpecialInstructions(e.target.value)}
            sx={{ mb: 3 }}
            placeholder="Any special requests for preparation..."
          />

          {/* Add to Cart Button */}
          <Button
            variant="contained"
            size="large"
            fullWidth
            onClick={handleAddToCart}
            sx={{ py: 1.5, fontSize: "1.1rem" }}
          >
            Add to Cart - ₹{(discountedPrice * quantity).toFixed(0)}
          </Button>
        </Grid>
      </Grid>

      {/* Ingredients */}
      <Paper sx={{ p: 3, mt: 4 }}>
        <Typography variant="h5" gutterBottom>
          Ingredients
        </Typography>
        <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
          {food.ingredients.map((ingredient, index) => (
            <Chip key={index} label={ingredient} variant="outlined" />
          ))}
        </Box>
      </Paper>

      {/* Related Foods */}
      {relatedFoods.length > 0 && (
        <Box sx={{ mt: 6 }}>
          <Typography variant="h4" gutterBottom>
            More from {food.category}
          </Typography>
          <Grid container spacing={3}>
            {relatedFoods.map((relatedFood) => (
              <Grid size={{ xs: 12, md: 4 }} key={relatedFood.id}>
                <FoodCard food={relatedFood} />
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
    </Container>
  );
};

export default FoodDetail;

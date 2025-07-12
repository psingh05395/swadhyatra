import React from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  Chip,
  IconButton,
  Button,
  Rating,
} from "@mui/material";
import {
  Favorite,
  FavoriteBorder,
  Add,
  AccessTime,
  LocalOffer,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { addToCart } from "../../store/slices/cartSlice";
import { toggleFavorite } from "../../store/slices/favoriteSlice";
import { Food } from "../../store/slices/foodSlice";
import { useNavigate } from "react-router-dom";

interface FoodCardProps {
  food: Food;
}

const FoodCard: React.FC<FoodCardProps> = ({ food }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { favorites } = useSelector((state: RootState) => state.favorites);
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  const isFavorite = favorites.some((fav) => fav.id === food.id);
  const discountedPrice = food.discount
    ? food.price * (1 - food.discount / 100)
    : food.price;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }
    dispatch(addToCart({ food, quantity: 1 }));
  };

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }
    dispatch(toggleFavorite(food));
  };

  const handleCardClick = () => {
    navigate(`/food/${food.id}`);
  };

  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        cursor: "pointer",
        position: "relative",
        boxShadow: 1,
        borderRadius: "8px",
        "&:hover": {
          transform: "scale(1.05)",
          transition: "transform 0.5s ease-in-out",
          boxShadow: 2,
          "& img": {
            transform: "scale(1.1)",
            transition: "transform 0.5s ease-in-out",
          },
        },
        transition: "all 0.5s ease-in-out",
      }}
      onClick={handleCardClick}
    >
      {food.discount && (
        <Chip
          icon={<LocalOffer />}
          label={`${food.discount}% OFF`}
          color="error"
          size="small"
          sx={{
            position: "absolute",
            top: 8,
            left: 8,
            zIndex: 1,
            fontWeight: "bold",
          }}
        />
      )}

      <IconButton
        sx={{
          position: "absolute",
          top: 8,
          right: 8,
          zIndex: 1,
          bgcolor: "rgba(255,255,255,0.9)",
          "&:hover": {
            bgcolor: "rgba(255,255,255,1)",
          },
        }}
        onClick={handleToggleFavorite}
      >
        {isFavorite ? (
          <Favorite sx={{ color: "error.main" }} />
        ) : (
          <FavoriteBorder />
        )}
      </IconButton>

      <CardMedia
        component="img"
        image={food.image}
        alt={food.name}
        sx={{ objectFit: "cover", width: "100%", height: "280px" }}
      />

      <CardContent
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          minHeight: "250px",
        }}
      >
        <Typography
          variant="h5"
          component="h3"
          sx={{ fontWeight: "600" }}
          gutterBottom
          noWrap
        >
          {food.name}
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            mb: 2,
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            minHeight: "42px",
          }}
        >
          {food.description}
        </Typography>

        <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
          <Rating value={food.rating} precision={0.1} size="small" readOnly />
          <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
            ({food.reviews})
          </Typography>
        </Box>

        <Box sx={{ display: "flex", gap: 1, mb: 2, flexWrap: "wrap" }}>
          {food.isVegetarian && (
            <Chip label="Veg" size="small" color="success" variant="outlined" />
          )}
          {food.isSpicy && (
            <Chip
              label="Spicy"
              size="small"
              color="warning"
              variant="outlined"
            />
          )}
          <Chip
            icon={<AccessTime />}
            label={`${food.preparationTime} min`}
            size="small"
            variant="outlined"
          />
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mt: "auto",
          }}
        >
          <Box>
            <Typography
              variant="h6"
              color="primary"
              sx={{ fontWeight: "bold" }}
            >
              ₹{discountedPrice.toFixed(0)}
            </Typography>
            {food.discount && (
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ textDecoration: "line-through" }}
              >
                ₹{food.price}
              </Typography>
            )}
          </Box>

          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={handleAddToCart}
            size="small"
            sx={{ minWidth: "auto" }}
          >
            Add
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default FoodCard;

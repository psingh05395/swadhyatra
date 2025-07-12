import React from "react";
import {
  Container,
  Typography,
  Box,
  Paper,
  Grid,
  Button,
  IconButton,
  Divider,
  Card,
  CardContent,
  CardMedia,
  Chip,
} from "@mui/material";
import { Add, Remove, Delete, ShoppingCartOutlined } from "@mui/icons-material";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store/store";
import {
  updateQuantity,
  removeFromCart,
  clearCart,
} from "../store/slices/cartSlice";
import { useNavigate } from "react-router-dom";

const Cart: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items, total, deliveryFee, tax } = useSelector(
    (state: RootState) => state.cart
  );
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  if (!isAuthenticated) {
    return (
      <Container maxWidth="lg" sx={{ py: 8, textAlign: "center" }}>
        <Typography variant="h4" gutterBottom>
          Please login to view your cart
        </Typography>
        <Button variant="contained" onClick={() => navigate("/login")}>
          Login
        </Button>
      </Container>
    );
  }

  if (items.length === 0) {
    return (
      <Container maxWidth="lg" sx={{ py: 8, textAlign: "center" }}>
        <ShoppingCartOutlined
          sx={{ fontSize: 100, color: "text.secondary", mb: 2 }}
        />
        <Typography variant="h4" gutterBottom>
          Your cart is empty
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          Add some delicious items to get started
        </Typography>
        <Button variant="contained" onClick={() => navigate("/categories")}>
          Browse Menu
        </Button>
      </Container>
    );
  }

  const subtotal = items.reduce((sum, item) => {
    const itemPrice = item.food.discount
      ? item.food.price * (1 - item.food.discount / 100)
      : item.food.price;
    return sum + itemPrice * item.quantity;
  }, 0);

  const handleQuantityChange = (foodId: string, newQuantity: number) => {
    dispatch(updateQuantity({ foodId, quantity: newQuantity }));
  };

  const handleRemoveItem = (foodId: string) => {
    dispatch(removeFromCart(foodId));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const handleCheckout = () => {
    navigate("/checkout");
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 4,
        }}
      >
        <Typography variant="h3" component="h1">
          Your Cart
        </Typography>
        <Button
          variant="outlined"
          color="error"
          onClick={handleClearCart}
          startIcon={<Delete />}
        >
          Clear Cart
        </Button>
      </Box>

      <Grid container spacing={4}>
        {/* Cart Items */}
        <Grid size={{ xs: 12, md: 8 }}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {items.map((item) => {
              const itemPrice = item.food.discount
                ? item.food.price * (1 - item.food.discount / 100)
                : item.food.price;

              return (
                <Card key={item.food.id} sx={{ display: "flex", p: 2 }}>
                  <CardMedia
                    component="img"
                    sx={{
                      width: 120,
                      height: 120,
                      objectFit: "cover",
                      borderRadius: 1,
                    }}
                    image={item.food.image}
                    alt={item.food.name}
                  />

                  <CardContent
                    sx={{ flex: 1, display: "flex", flexDirection: "column" }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                      }}
                    >
                      <Box>
                        <Typography variant="h6" gutterBottom>
                          {item.food.name}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{ mb: 1 }}
                        >
                          {item.food.description}
                        </Typography>
                        <Box sx={{ display: "flex", gap: 1, mb: 2 }}>
                          <Chip
                            label={item.food.category}
                            size="small"
                            variant="outlined"
                          />
                          {item.food.isVegetarian && (
                            <Chip
                              label="Veg"
                              size="small"
                              color="success"
                              variant="outlined"
                            />
                          )}
                        </Box>
                      </Box>

                      <IconButton
                        onClick={() => handleRemoveItem(item.food.id)}
                        color="error"
                        size="small"
                      >
                        <Delete />
                      </IconButton>
                    </Box>

                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        mt: "auto",
                      }}
                    >
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <IconButton
                          onClick={() =>
                            handleQuantityChange(
                              item.food.id,
                              item.quantity - 1
                            )
                          }
                          disabled={item.quantity <= 1}
                          size="small"
                        >
                          <Remove />
                        </IconButton>
                        <Typography
                          sx={{ mx: 2, minWidth: 30, textAlign: "center" }}
                        >
                          {item.quantity}
                        </Typography>
                        <IconButton
                          onClick={() =>
                            handleQuantityChange(
                              item.food.id,
                              item.quantity + 1
                            )
                          }
                          size="small"
                        >
                          <Add />
                        </IconButton>
                      </Box>

                      <Box sx={{ textAlign: "right" }}>
                        <Typography variant="h6" color="primary">
                          ₹{(itemPrice * item.quantity).toFixed(0)}
                        </Typography>
                        {item.food.discount && (
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{ textDecoration: "line-through" }}
                          >
                            ₹{(item.food.price * item.quantity).toFixed(0)}
                          </Typography>
                        )}
                      </Box>
                    </Box>

                    {item.specialInstructions && (
                      <Box
                        sx={{
                          mt: 2,
                          p: 1,
                          bgcolor: "grey.50",
                          borderRadius: 1,
                        }}
                      >
                        <Typography variant="body2" color="text.secondary">
                          <strong>Special Instructions:</strong>{" "}
                          {item.specialInstructions}
                        </Typography>
                      </Box>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </Box>
        </Grid>

        {/* Order Summary */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Paper sx={{ p: 3, position: "sticky", top: 100 }}>
            <Typography variant="h5" gutterBottom>
              Order Summary
            </Typography>

            <Box
              sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}
            >
              <Typography>Subtotal ({items.length} items)</Typography>
              <Typography>₹{subtotal.toFixed(0)}</Typography>
            </Box>

            <Box
              sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}
            >
              <Typography>Delivery Fee</Typography>
              <Typography>₹{deliveryFee}</Typography>
            </Box>

            <Box
              sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}
            >
              <Typography>Tax (GST 18%)</Typography>
              <Typography>₹{tax.toFixed(0)}</Typography>
            </Box>

            <Divider sx={{ my: 2 }} />

            <Box
              sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}
            >
              <Typography variant="h6">Total</Typography>
              <Typography variant="h6" color="primary">
                ₹{total.toFixed(0)}
              </Typography>
            </Box>

            <Button
              variant="contained"
              fullWidth
              size="large"
              onClick={handleCheckout}
              sx={{ py: 1.5 }}
            >
              Proceed to Checkout
            </Button>

            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ mt: 2, textAlign: "center" }}
            >
              Estimated delivery time: 30-45 minutes
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Cart;

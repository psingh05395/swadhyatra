import React, { useState } from "react";
import {
  Container,
  Typography,
  Box,
  Paper,
  Grid,
  Button,
  TextField,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormControl,
  FormLabel,
  Divider,
  Alert,
  Card,
  CardContent,
} from "@mui/material";
import { CreditCard, AccountBalance, Money } from "@mui/icons-material";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store/store";
import { addOrder } from "../store/slices/orderSlice";
import { clearCart } from "../store/slices/cartSlice";
import { useNavigate } from "react-router-dom";

const Checkout: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items, total, deliveryFee, tax } = useSelector(
    (state: RootState) => state.cart
  );
  const { user, isAuthenticated } = useSelector(
    (state: RootState) => state.auth
  );

  const [deliveryAddress, setDeliveryAddress] = useState(user?.address || "");
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (!isAuthenticated) {
    navigate("/login");
    return null;
  }

  if (items.length === 0) {
    navigate("/cart");
    return null;
  }

  const subtotal = items.reduce((sum, item) => {
    const itemPrice = item.food.discount
      ? item.food.price * (1 - item.food.discount / 100)
      : item.food.price;
    return sum + itemPrice * item.quantity;
  }, 0);

  const handlePlaceOrder = async () => {
    if (!deliveryAddress.trim()) {
      setError("Please enter a delivery address");
      return;
    }

    setLoading(true);
    setError("");

    // Simulate order processing
    setTimeout(() => {
      const order = {
        id: Date.now().toString(),
        items,
        total,
        status: "confirmed" as const,
        orderDate: new Date().toISOString(),
        deliveryAddress,
        paymentMethod,
        estimatedDeliveryTime: new Date(
          Date.now() + 45 * 60 * 1000
        ).toISOString(),
      };

      dispatch(addOrder(order));
      dispatch(clearCart());
      setLoading(false);
      navigate("/order-success", { state: { orderId: order.id } });
    }, 2000);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h3" component="h1" gutterBottom>
        Checkout
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      <Grid container spacing={4}>
        {/* Checkout Form */}
        <Grid size={{ xs: 12, md: 8 }}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
            {/* Delivery Address */}
            <Paper sx={{ p: 3 }}>
              <Typography variant="h5" gutterBottom>
                Delivery Address
              </Typography>
              <TextField
                fullWidth
                label="Delivery Address"
                multiline
                rows={3}
                value={deliveryAddress}
                onChange={(e) => setDeliveryAddress(e.target.value)}
                placeholder="Enter your complete delivery address..."
                required
              />
            </Paper>

            {/* Payment Method */}
            <Paper sx={{ p: 3 }}>
              <FormControl component="fieldset">
                <FormLabel component="legend">
                  <Typography variant="h5" gutterBottom>
                    Payment Method
                  </Typography>
                </FormLabel>
                <RadioGroup
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                >
                  <Card
                    sx={{
                      mb: 2,
                      border: paymentMethod === "card" ? 2 : 1,
                      borderColor:
                        paymentMethod === "card" ? "primary.main" : "divider",
                    }}
                  >
                    <CardContent sx={{ display: "flex", alignItems: "center" }}>
                      <FormControlLabel
                        value="card"
                        control={<Radio />}
                        label=""
                        sx={{ mr: 2 }}
                      />
                      <CreditCard sx={{ mr: 2, color: "primary.main" }} />
                      <Box>
                        <Typography variant="h6">Credit/Debit Card</Typography>
                        <Typography variant="body2" color="text.secondary">
                          Pay securely with your card
                        </Typography>
                      </Box>
                    </CardContent>
                  </Card>

                  <Card
                    sx={{
                      mb: 2,
                      border: paymentMethod === "upi" ? 2 : 1,
                      borderColor:
                        paymentMethod === "upi" ? "primary.main" : "divider",
                    }}
                  >
                    <CardContent sx={{ display: "flex", alignItems: "center" }}>
                      <FormControlLabel
                        value="upi"
                        control={<Radio />}
                        label=""
                        sx={{ mr: 2 }}
                      />
                      <AccountBalance sx={{ mr: 2, color: "primary.main" }} />
                      <Box>
                        <Typography variant="h6">UPI Payment</Typography>
                        <Typography variant="body2" color="text.secondary">
                          Pay using UPI apps like GPay, PhonePe
                        </Typography>
                      </Box>
                    </CardContent>
                  </Card>

                  <Card
                    sx={{
                      border: paymentMethod === "cod" ? 2 : 1,
                      borderColor:
                        paymentMethod === "cod" ? "primary.main" : "divider",
                    }}
                  >
                    <CardContent sx={{ display: "flex", alignItems: "center" }}>
                      <FormControlLabel
                        value="cod"
                        control={<Radio />}
                        label=""
                        sx={{ mr: 2 }}
                      />
                      <Money sx={{ mr: 2, color: "primary.main" }} />
                      <Box>
                        <Typography variant="h6">Cash on Delivery</Typography>
                        <Typography variant="body2" color="text.secondary">
                          Pay when your order arrives
                        </Typography>
                      </Box>
                    </CardContent>
                  </Card>
                </RadioGroup>
              </FormControl>
            </Paper>
          </Box>
        </Grid>

        {/* Order Summary */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Paper sx={{ p: 3, position: "sticky", top: 100 }}>
            <Typography variant="h5" gutterBottom>
              Order Summary
            </Typography>

            {/* Order Items */}
            <Box sx={{ mb: 3 }}>
              {items.map((item) => {
                const itemPrice = item.food.discount
                  ? item.food.price * (1 - item.food.discount / 100)
                  : item.food.price;

                return (
                  <Box
                    key={item.food.id}
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      mb: 1,
                    }}
                  >
                    <Typography variant="body2">
                      {item.food.name} x {item.quantity}
                    </Typography>
                    <Typography variant="body2">
                      ₹{(itemPrice * item.quantity).toFixed(0)}
                    </Typography>
                  </Box>
                );
              })}
            </Box>

            <Divider sx={{ my: 2 }} />

            <Box
              sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}
            >
              <Typography>Subtotal</Typography>
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
              onClick={handlePlaceOrder}
              disabled={loading}
              sx={{ py: 1.5 }}
            >
              {loading ? "Placing Order..." : "Place Order"}
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

export default Checkout;

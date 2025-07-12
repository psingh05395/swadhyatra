import React from "react";
import {
  Container,
  Typography,
  Box,
  Paper,
  Grid,
  Chip,
  Button,
  Card,
  CardContent,
  Divider,
} from "@mui/material";
import {
  AccessTime,
  Restaurant,
  LocalShipping,
  CheckCircle,
  Cancel,
} from "@mui/icons-material";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { useNavigate } from "react-router-dom";

const Orders: React.FC = () => {
  const navigate = useNavigate();
  const { orders } = useSelector((state: RootState) => state.orders);
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  if (!isAuthenticated) {
    return (
      <Container maxWidth="lg" sx={{ py: 8, textAlign: "center" }}>
        <Typography variant="h4" gutterBottom>
          Please login to view your orders
        </Typography>
        <Button variant="contained" onClick={() => navigate("/login")}>
          Login
        </Button>
      </Container>
    );
  }

  if (orders.length === 0) {
    return (
      <Container maxWidth="lg" sx={{ py: 8, textAlign: "center" }}>
        <Restaurant sx={{ fontSize: 100, color: "text.secondary", mb: 2 }} />
        <Typography variant="h4" gutterBottom>
          No orders yet
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          Start exploring our delicious menu and place your first order
        </Typography>
        <Button variant="contained" onClick={() => navigate("/categories")}>
          Browse Menu
        </Button>
      </Container>
    );
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <AccessTime color="warning" />;
      case "confirmed":
        return <Restaurant color="info" />;
      case "preparing":
        return <Restaurant color="primary" />;
      case "out-for-delivery":
        return <LocalShipping color="primary" />;
      case "delivered":
        return <CheckCircle color="success" />;
      case "cancelled":
        return <Cancel color="error" />;
      default:
        return <AccessTime />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "warning";
      case "confirmed":
      case "preparing":
        return "info";
      case "out-for-delivery":
        return "primary";
      case "delivered":
        return "success";
      case "cancelled":
        return "error";
      default:
        return "default";
    }
  };

  const formatStatus = (status: string) => {
    return status
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h3" component="h1" gutterBottom>
        Order History
      </Typography>

      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Track your current and past orders
      </Typography>

      <Grid container spacing={3}>
        {orders.map((order) => (
          <Grid size={12} key={order.id}>
            <Card>
              <CardContent sx={{ p: 3 }}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    mb: 3,
                  }}
                >
                  <Box>
                    <Typography variant="h6" gutterBottom>
                      Order #{order.id}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Placed on{" "}
                      {new Date(order.orderDate).toLocaleDateString("en-IN", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </Typography>
                  </Box>

                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    {getStatusIcon(order.status)}
                    <Chip
                      label={formatStatus(order.status)}
                      color={getStatusColor(order.status) as any}
                      variant="filled"
                    />
                  </Box>
                </Box>

                {/* Order Items */}
                <Box sx={{ mb: 3 }}>
                  <Typography variant="subtitle1" gutterBottom>
                    Items Ordered:
                  </Typography>
                  <Grid container spacing={2}>
                    {order.items.map((item, index) => (
                      <Grid size={{ xs: 12, md: 4 }} key={index}>
                        <Paper
                          sx={{
                            p: 2,
                            display: "flex",
                            alignItems: "center",
                            gap: 2,
                          }}
                        >
                          <Box
                            component="img"
                            src={item.food.image}
                            alt={item.food.name}
                            sx={{
                              width: 60,
                              height: 60,
                              objectFit: "cover",
                              borderRadius: 1,
                            }}
                          />
                          <Box sx={{ flex: 1 }}>
                            <Typography variant="body2" fontWeight="bold">
                              {item.food.name}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              Qty: {item.quantity}
                            </Typography>
                          </Box>
                        </Paper>
                      </Grid>
                    ))}
                  </Grid>
                </Box>

                <Divider sx={{ my: 2 }} />

                {/* Order Details */}
                <Grid container spacing={3}>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <Typography variant="subtitle2" gutterBottom>
                      Delivery Address:
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {order.deliveryAddress}
                    </Typography>
                  </Grid>

                  <Grid size={{ xs: 12, md: 3 }}>
                    <Typography variant="subtitle2" gutterBottom>
                      Payment Method:
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {order.paymentMethod.toUpperCase()}
                    </Typography>
                  </Grid>

                  <Grid size={{ xs: 12, md: 3 }}>
                    <Typography variant="subtitle2" gutterBottom>
                      Total Amount:
                    </Typography>
                    <Typography variant="h6" color="primary">
                      ₹{order.total.toFixed(0)}
                    </Typography>
                  </Grid>
                </Grid>

                {order.status === "out-for-delivery" && (
                  <Box
                    sx={{ mt: 3, p: 2, bgcolor: "primary.50", borderRadius: 1 }}
                  >
                    <Typography variant="body2" color="primary.main">
                      <strong>Your order is on the way!</strong> Expected
                      delivery by{" "}
                      {new Date(order.estimatedDeliveryTime).toLocaleTimeString(
                        "en-IN",
                        {
                          hour: "2-digit",
                          minute: "2-digit",
                        }
                      )}
                    </Typography>
                  </Box>
                )}

                <Box sx={{ display: "flex", gap: 2, mt: 3 }}>
                  <Button variant="outlined" size="small">
                    View Details
                  </Button>
                  {order.status === "delivered" && (
                    <Button variant="outlined" size="small">
                      Reorder
                    </Button>
                  )}
                  {(order.status === "pending" ||
                    order.status === "confirmed") && (
                    <Button variant="outlined" color="error" size="small">
                      Cancel Order
                    </Button>
                  )}
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Orders;

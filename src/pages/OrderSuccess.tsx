import React from 'react';
import {
  Container,
  Typography,
  Box,
  Button,
  Paper,
  Chip,
} from '@mui/material';
import { CheckCircle, Restaurant, AccessTime } from '@mui/icons-material';
import { useLocation, useNavigate } from 'react-router-dom';

const OrderSuccess: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const orderId = location.state?.orderId;
  
  return (
    <Container maxWidth="md" sx={{ py: 8 }}>
      <Paper sx={{ p: 6, textAlign: 'center' }}>
        <CheckCircle sx={{ fontSize: 100, color: 'success.main', mb: 3 }} />
        
        <Typography variant="h3" gutterBottom color="success.main">
          Order Placed Successfully!
        </Typography>
        
        <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
          Thank you for choosing Swadh Yatra
        </Typography>
        
        {orderId && (
          <Box sx={{ mb: 4 }}>
            <Typography variant="body1" sx={{ mb: 2 }}>
              Your order ID is:
            </Typography>
            <Chip
              label={`#${orderId}`}
              color="primary"
              variant="outlined"
              sx={{ fontSize: '1.1rem', py: 2, px: 1 }}
            />
          </Box>
        )}
        
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 4, mb: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Restaurant color="primary" />
            <Typography variant="body1">
              Order Confirmed
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <AccessTime color="primary" />
            <Typography variant="body1">
              30-45 minutes
            </Typography>
          </Box>
        </Box>
        
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          We've received your order and our kitchen is already preparing your delicious meal.
          You'll receive updates about your order status.
        </Typography>
        
        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Button
            variant="contained"
            onClick={() => navigate('/orders')}
            size="large"
          >
            Track Order
          </Button>
          <Button
            variant="outlined"
            onClick={() => navigate('/categories')}
            size="large"
          >
            Continue Shopping
          </Button>
          <Button
            variant="text"
            onClick={() => navigate('/')}
            size="large"
          >
            Go Home
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default OrderSuccess;
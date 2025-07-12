import React from "react";
import {
  Box,
  Container,
  Grid,
  Typography,
  Link,
  IconButton,
  Divider,
} from "@mui/material";
import {
  Facebook,
  Twitter,
  Instagram,
  LinkedIn,
  Phone,
  Email,
  LocationOn,
} from "@mui/icons-material";

const Footer: React.FC = () => {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: "primary.main",
        color: "white",
        py: 6,
        mt: "auto",
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid size={{ xs: 12, md: 3 }}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold" }}>
              Swadh Yatra
            </Typography>
            <Typography variant="body2" sx={{ mb: 2, opacity: 0.9 }}>
              Bringing authentic Indian flavors to your doorstep. Experience the
              taste of tradition with every bite.
            </Typography>
            <Box sx={{ display: "flex", gap: 1 }}>
              <IconButton sx={{ color: "white", p: 0.5 }}>
                <Facebook />
              </IconButton>
              <IconButton sx={{ color: "white", p: 0.5 }}>
                <Twitter />
              </IconButton>
              <IconButton sx={{ color: "white", p: 0.5 }}>
                <Instagram />
              </IconButton>
              <IconButton sx={{ color: "white", p: 0.5 }}>
                <LinkedIn />
              </IconButton>
            </Box>
          </Grid>

          <Grid size={{ xs: 12, md: 3 }}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold" }}>
              Quick Links
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              <Link href="/" color="inherit" underline="hover">
                Home
              </Link>
              <Link href="/categories" color="inherit" underline="hover">
                Menu
              </Link>
              <Link href="/about" color="inherit" underline="hover">
                About Us
              </Link>
              <Link href="/contact" color="inherit" underline="hover">
                Contact
              </Link>
              <Link href="/privacy" color="inherit" underline="hover">
                Privacy Policy
              </Link>
            </Box>
          </Grid>

          <Grid size={{ xs: 12, md: 3 }}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold" }}>
              Categories
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              <Link href="/categories" color="inherit" underline="hover">
                North Indian
              </Link>
              <Link href="/categories" color="inherit" underline="hover">
                South Indian
              </Link>
              <Link href="/categories" color="inherit" underline="hover">
                Chinese
              </Link>
              <Link href="/categories" color="inherit" underline="hover">
                Italian
              </Link>
              <Link href="/categories" color="inherit" underline="hover">
                Desserts
              </Link>
            </Box>
          </Grid>

          <Grid size={{ xs: 12, md: 3 }}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold" }}>
              Contact Info
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Phone sx={{ fontSize: 20 }} />
                <Typography variant="body2">+91 8228966028</Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Email sx={{ fontSize: 20 }} />
                <Typography variant="body2">info@swadhyatra.com</Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1 }}>
                <LocationOn sx={{ fontSize: 20, mt: 0.2 }} />
                <Typography variant="body2">
                  Brigade 7 Garden,
                  <br />
                  Bangalore, Karnataka 560061
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ my: 4, bgcolor: "rgba(255,255,255,0.2)" }} />

        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            justifyContent: "space-between",
            alignItems: "center",
            gap: 2,
          }}
        >
          <Typography variant="body2" sx={{ opacity: 0.9 }}>
            © 2024 Swadh Yatra. All rights reserved.
          </Typography>
          <Typography variant="body2" sx={{ opacity: 0.9 }}>
            Made with ❤️ for food lovers
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;

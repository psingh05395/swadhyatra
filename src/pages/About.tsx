import React from "react";
import {
  Container,
  Typography,
  Box,
  Grid,
  Paper,
  Card,
  CardContent,
  Avatar,
} from "@mui/material";
import {
  Restaurant,
  LocalShipping,
  Star,
  People,
  Timeline,
  EmojiEvents,
} from "@mui/icons-material";

const About: React.FC = () => {
  const stats = [
    { icon: <Restaurant />, value: "10,000+", label: "Happy Customers" },
    { icon: <LocalShipping />, value: "50,000+", label: "Orders Delivered" },
    { icon: <Star />, value: "4.8", label: "Average Rating" },
    { icon: <People />, value: "100+", label: "Team Members" },
  ];

  const team = [
    {
      name: "Rajesh Kumar",
      role: "Founder & CEO",
      image:
        "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg",
      description:
        "Passionate about bringing authentic Indian flavors to every home.",
    },
    {
      name: "Priya Sharma",
      role: "Head Chef",
      image: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg",
      description:
        "Expert in traditional Indian cuisine with 15+ years of experience.",
    },
    {
      name: "Amit Patel",
      role: "Operations Manager",
      image: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg",
      description: "Ensures every order reaches you fresh and on time.",
    },
  ];

  const milestones = [
    {
      year: "2020",
      event:
        "Swadh Yatra was founded with a vision to deliver authentic Indian food",
    },
    { year: "2021", event: "Expanded to 5 cities and launched our mobile app" },
    {
      year: "2022",
      event: "Reached 10,000 happy customers and introduced regional cuisines",
    },
    {
      year: "2023",
      event: "Launched premium dining experiences and eco-friendly packaging",
    },
    {
      year: "2024",
      event: "Became the leading Indian food delivery platform with 50+ cities",
    },
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Hero Section */}
      <Box textAlign="center" sx={{ mb: 8 }}>
        <Typography variant="h2" component="h1" gutterBottom color="primary">
          About Swadh Yatra
        </Typography>
        <Typography
          variant="h5"
          color="text.secondary"
          sx={{ mb: 4, maxWidth: 800, mx: "auto" }}
        >
          A journey through authentic Indian flavors, bringing traditional
          recipes and modern convenience together for food lovers everywhere.
        </Typography>
      </Box>

      {/* Stats Section */}
      <Grid container spacing={4} sx={{ mb: 8 }}>
        {stats.map((stat, index) => (
          <Grid size={{ xs: 6, md: 3 }} key={index}>
            <Paper
              sx={{
                p: 3,
                textAlign: "center",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                transition: "transform 0.3s ease-in-out",
                "&:hover": {
                  transform: "translateY(-8px)",
                },
              }}
            >
              <Box sx={{ color: "primary.main", mb: 2 }}>
                {React.cloneElement(stat.icon, { sx: { fontSize: 50 } })}
              </Box>
              <Typography variant="h3" color="primary" gutterBottom>
                {stat.value}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                {stat.label}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>

      {/* Our Story */}
      <Box sx={{ mb: 8 }}>
        <Typography variant="h3" component="h2" gutterBottom textAlign="center">
          Our Story
        </Typography>
        <Grid container spacing={4} alignItems="center">
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.8 }}>
              Swadh Yatra began as a dream to share the rich culinary heritage
              of India with food enthusiasts everywhere. Founded in 2020, we
              started with a simple mission: to deliver authentic, home-style
              Indian meals that capture the essence of traditional cooking.
            </Typography>
            <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.8 }}>
              Our name "Swadh Yatra" translates to "Journey of Taste,"
              reflecting our commitment to taking you on a flavorful adventure
              through India's diverse regional cuisines. From the spicy curries
              of the South to the rich gravies of the North, we bring you
              recipes passed down through generations.
            </Typography>
            <Typography variant="body1" sx={{ lineHeight: 1.8 }}>
              Today, we're proud to serve thousands of customers across multiple
              cities, maintaining the same passion for quality and authenticity
              that started our journey.
            </Typography>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Box
              component="img"
              src="https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg"
              alt="Traditional Indian Kitchen"
              sx={{
                width: "100%",
                height: 400,
                objectFit: "cover",
                borderRadius: 2,
              }}
            />
          </Grid>
        </Grid>
      </Box>

      {/* Our Mission */}
      <Paper sx={{ p: 6, mb: 8, bgcolor: "primary.50" }}>
        <Typography variant="h3" component="h2" gutterBottom textAlign="center">
          Our Mission
        </Typography>
        <Typography
          variant="h6"
          textAlign="center"
          sx={{ maxWidth: 800, mx: "auto", lineHeight: 1.6 }}
        >
          To preserve and celebrate India's culinary traditions while making
          authentic, high-quality Indian food accessible to everyone through
          innovative technology and exceptional service.
        </Typography>
      </Paper>

      {/* Timeline */}
      <Box sx={{ mb: 8 }}>
        <Typography variant="h3" component="h2" gutterBottom textAlign="center">
          Our Journey
        </Typography>
        <Box sx={{ maxWidth: 800, mx: "auto" }}>
          {milestones.map((milestone, index) => (
            <Box key={index} sx={{ display: "flex", mb: 4 }}>
              <Box
                sx={{
                  minWidth: 80,
                  height: 80,
                  borderRadius: "50%",
                  bgcolor: "primary.main",
                  color: "white",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  mr: 3,
                  flexShrink: 0,
                }}
              >
                <Typography variant="h6" fontWeight="bold">
                  {milestone.year}
                </Typography>
              </Box>
              <Box sx={{ flex: 1, pt: 2 }}>
                <Typography variant="body1" sx={{ lineHeight: 1.6 }}>
                  {milestone.event}
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>

      {/* Team Section */}
      <Box sx={{ mb: 8 }}>
        <Typography variant="h3" component="h2" gutterBottom textAlign="center">
          Meet Our Team
        </Typography>
        <Typography
          variant="body1"
          textAlign="center"
          color="text.secondary"
          sx={{ mb: 6 }}
        >
          The passionate people behind Swadh Yatra
        </Typography>
        <Grid container spacing={4}>
          {team.map((member, index) => (
            <Grid size={{ xs: 12, md: 4 }} key={index}>
              <Card
                sx={{
                  maxWidth: 350,
                  mx: "auto",
                  borderRadius: 1,
                  overflow: "hidden",
                  boxShadow: 1,
                  textAlign: "center",
                  bgcolor: "background.paper",
                  transition: "transform 0.5s ease-in-out",
                  cursor: "pointer",
                  "&:hover": {
                    transform: "scale(1.07)",
                    boxShadow: 3,
                  },
                }}
              >
                {/* Top Banner */}
                <Box
                  sx={{
                    bgcolor: "#0B2C52",
                    color: "white",
                    pb: 5,
                    pt: 2,
                    position: "relative",
                  }}
                >
                  <Typography variant="subtitle2" sx={{ fontSize: 16 }}>
                    Our
                  </Typography>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: "bold",
                      fontSize: 20,
                      mb: 1.5,
                      color: "#FF6B35",
                    }}
                  >
                    Team Member
                  </Typography>

                  {/* Avatar overlapping */}
                  <Avatar
                    src={member.image}
                    alt={member.name}
                    sx={{
                      width: 90,
                      height: 90,
                      position: "absolute",
                      bottom: -45,
                      left: "50%",
                      transform: "translateX(-50%)",
                      border: "4px solid white",
                    }}
                  />
                </Box>

                {/* Content */}
                <CardContent sx={{ pt: 6 }}>
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: "bold", textTransform: "uppercase" }}
                  >
                    {member.name}
                  </Typography>
                  <Typography
                    variant="subtitle2"
                    sx={{ color: "#FF6B35", fontWeight: 600, mb: 2 }}
                  >
                    {member.role}
                  </Typography>

                  <Box
                    sx={{
                      mx: 2,
                      p: 2,
                      borderRadius: "10px",
                      background:
                        "linear-gradient(white, white) padding-box, linear-gradient(135deg, #FF6B35, #0B2C52) border-box",
                      border: "2px solid transparent",
                      minHeight: 110,
                    }}
                  >
                    <Typography
                      variant="body2"
                      sx={{
                        fontStyle: "italic",
                        color: "text.secondary",
                        lineHeight: 1.6,
                      }}
                    >
                      {member.description}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Values */}
      <Paper sx={{ p: 6, bgcolor: "grey.50" }}>
        <Typography variant="h3" component="h2" gutterBottom textAlign="center">
          Our Values
        </Typography>
        <Grid container spacing={4} sx={{ mt: 2 }}>
          {[
            {
              icon: <EmojiEvents />,
              title: "Quality First",
              description:
                "We never compromise on the quality of ingredients and preparation.",
            },
            {
              icon: <Timeline />,
              title: "Authenticity",
              description:
                "Every dish is prepared using traditional recipes and methods.",
            },
            {
              icon: <People />,
              title: "Customer Focus",
              description:
                "Your satisfaction and experience are at the heart of everything we do.",
            },
          ].map((value, index) => (
            <Grid size={{ xs: 12, md: 4 }} key={index}>
              <Box sx={{ textAlign: "center" }}>
                <Box sx={{ color: "primary.main", mb: 2 }}>
                  {React.cloneElement(value.icon, { sx: { fontSize: 60 } })}
                </Box>
                <Typography variant="h5" gutterBottom>
                  {value.title}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  {value.description}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Paper>
    </Container>
  );
};

export default About;

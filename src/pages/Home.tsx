import React, { useEffect } from "react";
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Paper,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import {
  Restaurant,
  DeliveryDining,
  Star,
  LocalOffer,
  ArrowCircleLeft,
  ArrowCircleRight,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { setFoods, setCategories } from "../store/slices/foodSlice";
import { foods, categories, testimonials } from "../data/dummyData";
import FoodCard from "../components/common/FoodCard";
import CategoryCard from "../components/common/CategoryCard";
import TestimonialCard from "../components/common/TestimonialCard";
import Slider from "react-slick";
import { useNavigate } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Thekua from "./../assets/Thekua.png";

const NextArrow = (props: any) => {
  const { onClick } = props;
  return (
    <Box
      onClick={onClick}
      sx={{
        padding: 0,
        borderRadius: "4px",
        position: "absolute",
        bottom: -20,
        right: 10,
        zIndex: 2,
        cursor: "pointer",
      }}
    >
      <ArrowCircleRight sx={{ fontSize: 35, color: "primary.main" }} />
    </Box>
  );
};

const PrevArrow = (props: any) => {
  const { onClick } = props;
  return (
    <Box
      onClick={onClick}
      sx={{
        padding: 0,
        borderRadius: "4px",
        position: "absolute",
        bottom: -20,
        right: 55,
        zIndex: 2,
        cursor: "pointer",
      }}
    >
      <ArrowCircleLeft sx={{ fontSize: 35, color: "primary.main" }} />
    </Box>
  );
};

const Home: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { foods: allFoods, categories: allCategories } = useSelector(
    (state: RootState) => state.food
  );

  useEffect(() => {
    dispatch(setFoods(foods));
    dispatch(setCategories(categories));
  }, [dispatch]);

  const featuredFoods = allFoods.filter((food) => food.discount).slice(0, 6);
  const popularFoods = allFoods
    .filter((food) => food.rating >= 4.5)
    .slice(0, 6);

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: isMobile ? 1 : 3,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 3000,
    pauseOnHover: isMobile ? false : true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 960,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          arrows: false,
        },
      },
    ],
  };

  const categorySliderSettings = {
    ...sliderSettings,
    slidesToShow: isMobile ? 1 : 4,
    responsive: [
      {
        breakpoint: 960,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          arrows: false,
        },
      },
    ],
  };

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          background: "linear-gradient(135deg, #FF6B35 0%, #F7931E 100%)",
          color: "white",
          py: { xs: 8, md: 12 },
          position: "relative",
          overflow: "hidden",
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid size={{ xs: 12, md: 6 }}>
              <Typography
                variant="h2"
                component="h1"
                gutterBottom
                sx={{
                  fontWeight: "bold",
                  fontSize: { xs: "2.5rem", md: "3.5rem" },
                  lineHeight: 1.2,
                }}
              >
                Authentic Indian Flavors
              </Typography>
              <Typography
                variant="h5"
                sx={{
                  mb: 4,
                  opacity: 0.9,
                  fontSize: { xs: "1.2rem", md: "1.5rem" },
                }}
              >
                Delivered Fresh to Your Doorstep
              </Typography>
              <Typography variant="body1" sx={{ mb: 4, fontSize: "1.1rem" }}>
                Experience the rich taste of traditional Indian cuisine with our
                carefully crafted dishes made from the finest ingredients.
              </Typography>
              <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
                <Button
                  variant="contained"
                  size="large"
                  sx={{
                    bgcolor: "white",
                    color: "primary.main",
                    "&:hover": {
                      bgcolor: "grey.100",
                    },
                    px: 4,
                    py: 1.5,
                  }}
                  onClick={() => navigate("/categories")}
                >
                  Order Now
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  sx={{
                    borderColor: "white",
                    color: "white",
                    "&:hover": {
                      borderColor: "white",
                      bgcolor: "rgba(255,255,255,0.1)",
                    },
                    px: 4,
                    py: 1.5,
                  }}
                  onClick={() => navigate("/about")}
                >
                  Learn More
                </Button>
              </Box>
            </Grid>
            <Grid
              size={{ xs: 12, md: 6 }}
              sx={{
                justifyContent: { xs: "center", md: "end" },
                display: "flex",
              }}
            >
              <Box
                component="img"
                src={Thekua}
                alt="Delicious Indian Food"
                sx={{
                  width: "75%",
                  height: "auto",
                  borderRadius: 2,
                  boxShadow: 3,
                }}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Categories Section */}
      <Box sx={{ py: 8 }}>
        <Container maxWidth="lg">
          <Typography
            variant="h3"
            component="h2"
            textAlign="center"
            gutterBottom
            sx={{ mb: 6 }}
          >
            Explore Our Categories
          </Typography>

          <Box sx={{ position: "relative", "& .slick-dots": { bottom: -50 } }}>
            <Slider {...categorySliderSettings}>
              {allCategories.map((category) => (
                <Box key={category.id} sx={{ py: 4, px: 1 }}>
                  <CategoryCard category={category} />
                </Box>
              ))}
            </Slider>
          </Box>
        </Container>
      </Box>

      {/* Featured Foods Section */}
      {featuredFoods.length > 0 && (
        <Container maxWidth="lg" sx={{ py: 8 }}>
          <Typography
            variant="h3"
            component="h2"
            textAlign="center"
            gutterBottom
            sx={{ mb: 6 }}
          >
            Special Offers
          </Typography>

          <Box sx={{ position: "relative", "& .slick-dots": { bottom: -50 } }}>
            <Slider {...sliderSettings}>
              {featuredFoods.map((food) => (
                <Box key={food.id} sx={{ py: 4, px: 1 }}>
                  <FoodCard food={food} />
                </Box>
              ))}
            </Slider>
          </Box>
        </Container>
      )}

      {/* Popular Foods Section */}
      <Box sx={{ bgcolor: "grey.50", py: 8 }}>
        <Container maxWidth="lg">
          <Typography
            variant="h3"
            component="h2"
            textAlign="center"
            gutterBottom
            sx={{ mb: 6 }}
          >
            Most Popular
          </Typography>

          <Box sx={{ position: "relative", "& .slick-dots": { bottom: -50 } }}>
            <Slider {...sliderSettings}>
              {popularFoods.map((food) => (
                <Box key={food.id} sx={{ py: 4, px: 1 }}>
                  <FoodCard food={food} />
                </Box>
              ))}
            </Slider>
          </Box>
        </Container>
      </Box>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography
          variant="h3"
          component="h2"
          textAlign="center"
          gutterBottom
          sx={{ mb: 6 }}
        >
          Why Choose Swadh Yatra?
        </Typography>

        <Grid container spacing={4}>
          {[
            {
              icon: <Restaurant sx={{ fontSize: 60 }} />,
              title: "Authentic Recipes",
              description:
                "Traditional recipes passed down through generations",
            },
            {
              icon: <DeliveryDining sx={{ fontSize: 60 }} />,
              title: "Fast Delivery",
              description: "Hot and fresh food delivered in 30 minutes or less",
            },
            {
              icon: <Star sx={{ fontSize: 60 }} />,
              title: "Quality Assured",
              description: "Premium ingredients and hygienic preparation",
            },
            {
              icon: <LocalOffer sx={{ fontSize: 60 }} />,
              title: "Great Offers",
              description:
                "Regular discounts and special deals for our customers",
            },
          ].map((feature, index) => (
            <Grid size={{ xs: 12, md: 6 }} key={index}>
              <Paper
                sx={{
                  p: 4,
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
                <Box sx={{ color: "primary.main", mb: 2 }}>{feature.icon}</Box>
                <Typography
                  variant="h6"
                  gutterBottom
                  sx={{ fontWeight: "bold" }}
                >
                  {feature.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {feature.description}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Testimonials Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography
          variant="h3"
          component="h2"
          textAlign="center"
          gutterBottom
          sx={{ mb: 6 }}
        >
          What Our Customers Say
        </Typography>

        <Box sx={{ position: "relative", "& .slick-dots": { bottom: -50 } }}>
          <Slider {...sliderSettings}>
            {testimonials.map((testimonial) => (
              <Box key={testimonial.id} sx={{ py: 4, px: 1 }}>
                <TestimonialCard testimonial={testimonial} />
              </Box>
            ))}
          </Slider>
        </Box>
      </Container>
    </Box>
  );
};

export default Home;

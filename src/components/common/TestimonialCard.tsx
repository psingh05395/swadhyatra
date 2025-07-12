import React from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Avatar,
  Rating,
} from "@mui/material";

interface TestimonialCardProps {
  testimonial: {
    id: string;
    name: string;
    rating: number;
    comment: string;
    image: string;
    location: string;
  };
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ testimonial }) => {
  return (
    <Card
      sx={{
        maxWidth: 350,
        mx: "auto",
        borderRadius: 1,
        overflow: "hidden",
        boxShadow: 1,
        textAlign: "center",
        bgcolor: "background.paper",
        "&:hover": {
          boxShadow: 3,
          transform: "scale(1.07)",
          transition: "transform 0.5s ease-in-out",
        },
        cursor: "pointer",
        transition: "transform 0.5s ease-in-out",
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
          Our Client
        </Typography>
        <Typography
          variant="h6"
          sx={{ fontWeight: "bold", fontSize: 20, mb: 1.5, color: "#FF6B35" }}
        >
          Feedback
        </Typography>

        {/* Avatar overlapping */}
        <Avatar
          src={testimonial.image}
          alt={testimonial.name}
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
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          {testimonial.name}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
          {testimonial.location}
        </Typography>

        <Box
          sx={{
            position: "relative",
            minHeight: 130,
            mt: 2,
          }}
        >
          {/* Star rating inside bordered box */}
          <Box
            sx={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              background:
                "linear-gradient(white, white) padding-box, linear-gradient(135deg, #FF6B35, #0B2C52) border-box",
              border: "2px solid transparent",
              borderRadius: "8px",
              px: 2,
              py: 0.5,
              zIndex: 1,
              position: "relative",
            }}
          >
            <Rating
              value={testimonial.rating}
              precision={0.5}
              readOnly
              size="small"
            />
          </Box>

          {/* Comment with dual-color border effect */}
          <Box
            sx={{
              // mt: 2,
              mx: 2,
              p: 2,
              borderRadius: "10px",
              background:
                "linear-gradient(white, white) padding-box, linear-gradient(135deg, #FF6B35, #0B2C52) border-box",
              border: "2px solid transparent",
              minHeight: 110,
              position: "absolute",
              bottom: 6,
            }}
          >
            <Typography
              variant="body2"
              sx={{ fontStyle: "italic", color: "text.secondary", pt: 1 }}
            >
              "{testimonial.comment}"
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default TestimonialCard;

import React from "react";
import { Card, CardMedia, Typography, Box } from "@mui/material";
import { Category } from "../../store/slices/foodSlice";
import { useNavigate } from "react-router-dom";

interface CategoryCardProps {
  category: Category;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ category }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/categories/${category.name.toLowerCase().replace(" ", "-")}`);
  };

  return (
    <Card
      sx={{
        height: "100%",
        cursor: "pointer",
        position: "relative",
        overflow: "hidden",
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
      onClick={handleClick}
    >
      <CardMedia
        component="img"
        image={category.image}
        alt={category.name}
        sx={{ objectFit: "cover", width: "100%", height: "200px" }}
      />

      <Box sx={{ minHeight: "120px" }}>
        <Box sx={{ textAlign: "center", color: "#000", p: 2 }}>
          <Typography
            variant="h5"
            component="h3"
            sx={{ fontWeight: "bold", mb: 1 }}
          >
            {category.name}
          </Typography>
          <Typography variant="body2" component="p">
            {category.description}
          </Typography>
        </Box>
      </Box>
    </Card>
  );
};

export default CategoryCard;

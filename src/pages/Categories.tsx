import React, { useEffect } from "react";
import {
  Container,
  Typography,
  Grid,
  Box,
  Chip,
  TextField,
  InputAdornment,
  Paper,
} from "@mui/material";
import { Search as SearchIcon } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import {
  setFoods,
  setCategories,
  setSelectedCategory,
  setSearchQuery,
} from "../store/slices/foodSlice";
import { foods, categories } from "../data/dummyData";
import FoodCard from "../components/common/FoodCard";
import CategoryCard from "../components/common/CategoryCard";

const Categories: React.FC = () => {
  const dispatch = useDispatch();
  const {
    foods: allFoods,
    categories: allCategories,
    selectedCategory,
    searchQuery,
  } = useSelector((state: RootState) => state.food);

  useEffect(() => {
    dispatch(setFoods(foods));
    dispatch(setCategories(categories));
  }, [dispatch]);

  const filteredFoods = allFoods.filter((food) => {
    const matchesCategory =
      !selectedCategory || food.category === selectedCategory;
    const matchesSearch =
      !searchQuery ||
      food.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      food.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      food.category.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  const handleCategorySelect = (category: string | null) => {
    dispatch(setSelectedCategory(category));
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchQuery(event.target.value));
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Header */}
      <Box textAlign="center" mb={6}>
        <Typography variant="h3" component="h1" gutterBottom color="primary">
          Our Menu
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
          Discover authentic flavors from across India
        </Typography>

        {/* Search Bar */}
        <Paper sx={{ p: 2, maxWidth: 600, mx: "auto", mb: 4 }}>
          <TextField
            fullWidth
            placeholder="Search for dishes, categories..."
            value={searchQuery}
            onChange={handleSearchChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            variant="outlined"
          />
        </Paper>
      </Box>

      {/* Categories Section */}
      <Box mb={6}>
        <Typography variant="h4" gutterBottom sx={{ mb: 3, fontWeight: "600" }}>
          Categories
        </Typography>
        <Grid container spacing={3} sx={{ mb: 4 }}>
          {allCategories.map((category) => (
            <Grid size={{ xs: 12, md: 4 }} key={category.id}>
              <CategoryCard category={category} />
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Category Filter Chips */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" gutterBottom sx={{ fontWeight: "600", mb: 2 }}>
          Filter by Category
        </Typography>
        <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
          <Chip
            label="All"
            onClick={() => handleCategorySelect(null)}
            color={!selectedCategory ? "primary" : "default"}
            variant={!selectedCategory ? "filled" : "outlined"}
          />
          {allCategories.map((category) => (
            <Chip
              key={category.id}
              label={category.name}
              onClick={() => handleCategorySelect(category.name)}
              color={selectedCategory === category.name ? "primary" : "default"}
              variant={
                selectedCategory === category.name ? "filled" : "outlined"
              }
            />
          ))}
        </Box>
      </Box>

      {/* Foods Grid */}
      <Box>
        <Typography variant="h5" gutterBottom sx={{ fontWeight: "600", mb: 3 }}>
          {selectedCategory ? `${selectedCategory} Dishes` : "All Dishes"}
          <Typography
            component="span"
            variant="body2"
            color="text.secondary"
            sx={{ ml: 2 }}
          >
            ({filteredFoods.length} items)
          </Typography>
        </Typography>

        {filteredFoods.length > 0 ? (
          <Grid container spacing={3}>
            {filteredFoods.map((food) => (
              <Grid size={{ xs: 12, md: 4 }} key={food.id}>
                <FoodCard food={food} />
              </Grid>
            ))}
          </Grid>
        ) : (
          <Paper sx={{ p: 6, textAlign: "center" }}>
            <Typography variant="h6" color="text.secondary">
              No dishes found matching your criteria
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              Try adjusting your search or category filter
            </Typography>
          </Paper>
        )}
      </Box>
    </Container>
  );
};

export default Categories;

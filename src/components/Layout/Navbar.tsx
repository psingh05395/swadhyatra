import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Button,
  IconButton,
  Badge,
  Menu,
  MenuItem,
  Box,
  InputBase,
  alpha,
  useTheme,
  useMediaQuery,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  CardMedia,
} from "@mui/material";
import {
  Search as SearchIcon,
  ShoppingCart,
  AccountCircle,
  Menu as MenuIcon,
  Home,
  Restaurant,
  Favorite,
  History,
  Info,
  Logout,
} from "@mui/icons-material";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store/store";
import { logout } from "../../store/slices/authSlice";
import { setSearchQuery } from "../../store/slices/foodSlice";
import { useNavigate, useLocation } from "react-router-dom";
import SwadhYatraLogo from "../../assets/SwadhYatra-logo.png";

const Navbar: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const { isAuthenticated, user } = useSelector(
    (state: RootState) => state.auth
  );
  const { items } = useSelector((state: RootState) => state.cart);
  const { searchQuery } = useSelector((state: RootState) => state.food);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  const cartItemsCount = items.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(logout());
    handleMenuClose();
    navigate("/");
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchQuery(event.target.value));
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const menuItems = [
    { text: "Home", icon: <Home />, path: "/" },
    { text: "Categories", icon: <Restaurant />, path: "/categories" },
    { text: "Favorites", icon: <Favorite />, path: "/favorites" },
    { text: "Order History", icon: <History />, path: "/orders" },
    { text: "About", icon: <Info />, path: "/about" },
  ];

  const drawer = (
    <Box sx={{ width: 250 }}>
      <CardMedia
        component="img"
        image={SwadhYatraLogo}
        alt="Swadh Yatra Logo"
        sx={{
          width: 100,
          cursor: "pointer",
          p: 2,
          objectFit: "contain",
        }}
        onClick={() => navigate("/")}
      />
      <List>
        {menuItems.map((item) => (
          <ListItem
            button
            key={item.text}
            onClick={() => {
              navigate(item.path);
              setMobileOpen(false);
            }}
            selected={location.pathname === item.path}
          >
            <ListItemIcon
              sx={{
                color:
                  location.pathname === item.path ? "primary.main" : "inherit",
              }}
            >
              {item.icon}
            </ListItemIcon>
            <ListItemText
              primary={item.text}
              sx={{
                color:
                  location.pathname === item.path ? "primary.main" : "inherit",
              }}
              primaryTypographyProps={{
                fontWeight: location.pathname === item.path ? "600" : "normal",
              }}
            />
          </ListItem>
        ))}
        {isAuthenticated ? (
          <ListItem button onClick={handleLogout}>
            <ListItemIcon>
              <Logout />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItem>
        ) : (
          <ListItem
            button
            onClick={() => {
              navigate("/login");
              setMobileOpen(false);
            }}
          >
            <ListItemIcon>
              <AccountCircle />
            </ListItemIcon>
            <ListItemText primary="Login" />
          </ListItem>
        )}
      </List>
    </Box>
  );

  return (
    <>
      <AppBar
        position="sticky"
        sx={{ bgcolor: "white", color: "text.primary", boxShadow: 5, p: 1 }}
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            minHeight: "54px !important",
          }}
        >
          {isMobile ? (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
          ) : (
            <CardMedia
              component="img"
              image={SwadhYatraLogo}
              alt="Swadh Yatra Logo"
              sx={{
                width: 75,
                cursor: "pointer",
                flexGrow: isMobile ? 1 : 0,
                objectFit: "contain",
              }}
              onClick={() => navigate("/")}
            />
          )}

          {!isMobile && (
            <Box
              sx={{
                flexGrow: 1,
                display: "flex",
                justifyContent: "end",
                gap: 3,
                mr: 2,
              }}
            >
              {menuItems.map((item) => (
                <Button
                  key={item.text}
                  color="inherit"
                  onClick={() => navigate(item.path)}
                  sx={{
                    position: "relative",
                    padding: 0,
                    fontWeight:
                      location.pathname === item.path ? "bold" : "normal",
                    color:
                      location.pathname === item.path
                        ? "primary.main"
                        : "text.primary",
                    backgroundColor: "transparent",
                    textTransform: "none",
                    transition: "color 0.9s ease",

                    "&::after": {
                      content: '""',
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      width: location.pathname === item.path ? "100%" : "0%",
                      height: location.pathname === item.path ? "0px" : "2px",
                      backgroundColor: "primary.main",
                      transition: "width 0.9s ease",
                    },

                    "&:hover": {
                      color: "primary.main",

                      "&::after": {
                        width: "100%",
                      },
                    },
                  }}
                >
                  {item.text}
                </Button>
              ))}
            </Box>
          )}

          {/* Search Bar */}
          <Box
            sx={{
              position: "relative",
              borderRadius: 1,
              backgroundColor: alpha(theme.palette.common.black, 0.05),
              "&:hover": {
                backgroundColor: alpha(theme.palette.common.black, 0.1),
              },
              marginRight: 2,
              marginLeft: 0,
              width: "100%",
              maxWidth: 300,
              display: { xs: "none", sm: "block" },
            }}
          >
            <Box
              sx={{
                padding: theme.spacing(0, 2),
                height: "100%",
                position: "absolute",
                pointerEvents: "none",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <SearchIcon />
            </Box>
            <InputBase
              placeholder="Search food..."
              value={searchQuery}
              onChange={handleSearchChange}
              sx={{
                color: "inherit",
                "& .MuiInputBase-input": {
                  padding: theme.spacing(1, 1, 1, 0),
                  paddingLeft: `calc(1em + ${theme.spacing(4)})`,
                  transition: theme.transitions.create("width"),
                  width: "100%",
                },
              }}
            />
          </Box>

          <Box>
            {/* Cart Icon */}
            <IconButton
              color="inherit"
              onClick={() => navigate("/cart")}
              sx={{ mr: 1 }}
            >
              <Badge badgeContent={cartItemsCount} color="primary">
                <ShoppingCart />
              </Badge>
            </IconButton>

            {/* Profile Menu */}
            {isAuthenticated ? (
              <>
                <IconButton
                  size="large"
                  edge="end"
                  aria-label="account of current user"
                  aria-controls="primary-search-account-menu"
                  aria-haspopup="true"
                  onClick={handleProfileMenuOpen}
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
                <Menu
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorEl)}
                  onClose={handleMenuClose}
                >
                  <MenuItem
                    onClick={() => {
                      navigate("/profile");
                      handleMenuClose();
                    }}
                  >
                    Profile
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      navigate("/orders");
                      handleMenuClose();
                    }}
                  >
                    My Orders
                  </MenuItem>
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </Menu>
              </>
            ) : (
              <Button
                color="primary"
                variant="outlined"
                onClick={() => navigate("/login")}
                size="small"
                sx={{
                  ml: 2,
                  display: { xs: "none", sm: "block" },
                  padding: "4px 12px",
                }}
              >
                Login
              </Button>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: 250 },
        }}
      >
        {drawer}
      </Drawer>
    </>
  );
};

export default Navbar;

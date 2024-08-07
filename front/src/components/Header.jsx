import {
  AppBar,
  Toolbar,
  Typography,
  Switch,
  Box,
  Button,
} from "@mui/material";
import { useThemeContext } from "../context/ThemeContext";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../api/authApi";

const Header = ({ isAuthenticated, user, setIsAuthenticated, setUser }) => {
  const { isDarkMode, handleToggle } = useThemeContext();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      setIsAuthenticated(false);
      setUser(null);
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          URL Shortener
        </Typography>
        <Box>
          <Button color="inherit" component={Link} to="/">
            Home
          </Button>
          {isAuthenticated ? (
            <>
              <Button color="inherit" component={Link} to="/profile">
                Profile
              </Button>
              <Button color="inherit" onClick={handleLogout}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button color="inherit" component={Link} to="/login">
                Login
              </Button>
              <Button color="inherit" component={Link} to="/register">
                Register
              </Button>
            </>
          )}
          <Switch checked={isDarkMode} onChange={handleToggle} />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;

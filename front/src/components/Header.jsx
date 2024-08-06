import { AppBar, Toolbar, Typography, Switch } from "@mui/material";
import { useThemeContext } from "../context/ThemeContext";

const Header = () => {
  const { isDarkMode, handleToggle } = useThemeContext();

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          <a href="/" style={{ color: "white", textDecoration: "none" }}>URL Shortener</a>
        </Typography>
        <Switch checked={isDarkMode} onChange={handleToggle}/>
      </Toolbar>
    </AppBar>
  );
};

export default Header;


import { useState } from "react";
import { useLocation, Link } from "react-router-dom";
import {
  Box,
  Typography,
  TextField,
  Button,
  Container,
  Snackbar,
} from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

const Result = () => {
  const location = useLocation();
  // const { originalUrl, shortUrl } = location.state;
  const [open, setOpen] = useState(false);
  const originalUrl = "https://www.test-original.com"
  const shortUrl = "https://www.test-short.com"
  const handleCopy = () => {
    navigator.clipboard.writeText(shortUrl).then(() => {
      setOpen(true);
    });
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Your Shortened URL
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <TextField
            fullWidth
            variant="outlined"
            value={shortUrl}
            InputProps={{
              readOnly: true,
            }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleCopy}
            sx={{ ml: 1, minWidth: "auto" }}
          >
            <ContentCopyIcon />
          </Button>
        </Box>
        <Typography variant="body2" color="textSecondary">
          Original URL: {originalUrl}
        </Typography>
      </Box>
      <Snackbar
        open={open}
        autoHideDuration={2000}
        onClose={handleClose}
        message="URL copied to clipboard"
      />
    </Container>
  );
};

export default Result;

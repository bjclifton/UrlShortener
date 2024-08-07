import { Box, Typography, TextField, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { shortenUrl } from "../api/urlApi";
import { createLink } from "../api/linkApi";
import { useState } from "react";

const Search = ({ isAuthenticated }) => {
  const [url, setUrl] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUrl(e.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault(); // Prevent form submission
      handleSubmit();
    }
  };

  const handleSubmit = async (event) => {
    if (event) {
      event.preventDefault(); // Prevent form submission if called from form onSubmit
    }
    if (!url.trim()) return; // Don't submit if URL is empty
    try {
      const response = await shortenUrl(url);
      if (isAuthenticated) {
        await createLink(response.shortCode);
      }
      navigate("/result", {
        state: { shortUrl: response.shortUrl, originalUrl: url },
      });
    } catch (e) {
      console.error("Error while shortening URL", e);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="75vh"
    >
      <Typography variant="h4" gutterBottom>
        URL Shortener
      </Typography>
      <TextField
        label="URL"
        value={url}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        variant="outlined"
        style={{ marginBottom: 16, width: 400 }}
      />
      <Button variant="contained" type="submit">
        Shorten
      </Button>
    </Box>
  );
};

export default Search;

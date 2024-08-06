import { Box, Typography, TextField, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { shortenUrl } from "../api/urlApi";
import { useState } from "react";

const Search = () => {
  const [url, setUrl] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUrl(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      const response = await shortenUrl(url);
      navigate("/result", {
        state: { shortUrl: response.shortUrl, originalUrl: url },
      });
    } catch (e) {
      console.error("Error while shortening URL", e);
    }
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
    >
      <Typography variant="h4" gutterBottom>
        URL Shortener
      </Typography>
      <TextField
        label="URL"
        value={url}
        onChange={handleChange}
        variant="outlined"
        style={{ marginBottom: 16, width: 400 }}
      />
      <Button variant="contained" onClick={handleSubmit}>
        Shorten
      </Button>
    </Box>
  );
};

export default Search;

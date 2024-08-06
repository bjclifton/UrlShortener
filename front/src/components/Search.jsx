import { Box, Typography, TextField, Button } from "@mui/material";
import { useState } from "react";

const Search = () => {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");

  const handleChange = (e) => {
    setUrl(e.target.value);
  };

  const handleSubmit = async () => {};

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
      {shortUrl && (
        <Typography variant="body1" style={{ marginTop: 16 }}>
          Shortened URL:{" "}
          <a href={shortUrl} target="_blank" rel="noreferrer">
            {shortUrl}
          </a>
        </Typography>
      )}
    </Box>
  );
};

export default Search;

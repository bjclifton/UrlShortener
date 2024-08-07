import React, { useState, useEffect } from "react";
import {
  Typography,
  Container,
  Box,
  List,
  ListItem,
  ListItemText,
  Paper,
  Link,
  CircularProgress,
  Tooltip,
  IconButton,
  Snackbar,
  TextField,
} from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import DeleteIcon from "@mui/icons-material/Delete";
import { getLinks, deleteLink } from "../api/linkApi";

const Profile = ({ user }) => {
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  useEffect(() => {
    const fetchLinks = async () => {
      try {
        const fetchedLinks = await getLinks();
        setLinks(fetchedLinks);
      } catch (error) {
        console.error("Error fetching links:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLinks();
  }, []);

  const handleDelete = async (linkId) => {
    try {
      await deleteLink(linkId);
      setLinks(links.filter((link) => link._id !== linkId));
    } catch (e) {
      console.error("Error deleting link:", e);
    }
  };

  const handleCopyClick = (url) => {
    navigator.clipboard.writeText(url).then(() => {
      setOpenSnackbar(true);
    });
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Profile
        </Typography>
        <Typography variant="h6" gutterBottom>
          Welcome, {user ? user.username : "Guest"}!
        </Typography>
      </Box>

      <Typography variant="h5" gutterBottom>
        Your Links
      </Typography>

      <Paper
        elevation={3}
        sx={{
          maxHeight: "400px",
          overflow: "auto",
          bgcolor: "background.default",
        }}
      >
        {loading ? (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="100%"
          >
            <CircularProgress />
          </Box>
        ) : links.length > 0 ? (
          <List
            sx={{
              padding: 0,
            }}
          >
            {links.map((link, index) => (
              <ListItem
                key={index}
                divider
                sx={{
                  flexDirection: "column",
                  alignItems: "flex-start",
                  py: 2,
                }}
              >
                <ListItemText
                  primary={
                    <Link
                      href={link.originalUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {link.originalUrl}
                    </Link>
                  }
                />
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    mt: 1,
                    width: "100%",
                  }}
                >
                  <TextField
                    fullWidth
                    variant="outlined"
                    value={link.shortUrl}
                    InputProps={{
                      readOnly: true,
                    }}
                    size="small"
                  />
                  <Tooltip title="Copy short URL">
                    <IconButton
                      onClick={() => handleCopyClick(link.shortUrl)}
                      sx={{ ml: 1 }}
                    >
                      <ContentCopyIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete link">
                    <IconButton
                      onClick={() => handleDelete(link._id)}
                      sx={{ ml: 1 }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </Box>
              </ListItem>
            ))}
          </List>
        ) : (
          <Box p={2}>
            <Typography>No links found. Start shortening some URLs!</Typography>
          </Box>
        )}
      </Paper>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={2000}
        onClose={handleCloseSnackbar}
        message="URL copied to clipboard"
      />
    </Container>
  );
};

export default Profile;

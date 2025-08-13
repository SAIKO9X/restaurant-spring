import { Box, Button, Typography } from "@mui/material";
import { Add } from "@mui/icons-material";

export const EmptyState = ({ title, message, buttonText, onButtonClick }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: 4,
        border: "2px dashed #333",
        borderRadius: 2,
        height: "100%",
        minHeight: 200,
      }}
    >
      <Typography variant="h5" component="h2" gutterBottom>
        {title}
      </Typography>
      <Typography color="text.secondary" sx={{ mb: 2 }}>
        {message}
      </Typography>
      <Button
        variant="contained"
        color="secondary"
        startIcon={<Add />}
        onClick={onButtonClick}
      >
        {buttonText}
      </Button>
    </Box>
  );
};

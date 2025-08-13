import {
  Avatar,
  Box,
  Card,
  CardContent,
  Rating,
  Typography,
} from "@mui/material";

export const ReviewCard = ({ review }) => {
  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 1 }}>
          <Avatar>{review.customer.fullName[0].toUpperCase()}</Avatar>
          <Typography variant="h6">{review.customer.fullName}</Typography>
        </Box>
        <Rating value={review.rating} readOnly />
        <Typography variant="body2" color="text.secondary">
          {review.comment}
        </Typography>
      </CardContent>
    </Card>
  );
};

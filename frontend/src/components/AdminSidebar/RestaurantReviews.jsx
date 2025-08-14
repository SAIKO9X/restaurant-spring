import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRestaurantReviews } from "../../state/Review/Action";
import { ReviewCard } from "../Restaurant/ReviewCard";
import { Box, Typography, Divider } from "@mui/material";

export const RestaurantReviews = () => {
  const dispatch = useDispatch();
  const { restaurant } = useSelector((store) => store.restaurant);
  const { reviews } = useSelector((store) => store.review);

  useEffect(() => {
    if (restaurant.restaurant?.id) {
      dispatch(getRestaurantReviews(restaurant.restaurant.id));
    }
  }, [restaurant.restaurant, dispatch]);

  return (
    <Box sx={{ p: 3 }}>
      <Typography
        variant="h4"
        sx={{ mb: 2, fontFamily: "Cormorant Upright", color: "secondary.main" }}
      >
        Avaliações Recebidas
      </Typography>
      <Divider sx={{ mb: 3 }} />
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {reviews.length > 0 ? (
          reviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))
        ) : (
          <Typography>
            Ainda não há avaliações para o seu restaurante.
          </Typography>
        )}
      </Box>
    </Box>
  );
};

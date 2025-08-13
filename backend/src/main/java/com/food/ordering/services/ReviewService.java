package com.food.ordering.services;

import com.food.ordering.model.entities.Review;
import com.food.ordering.model.entities.User;
import com.food.ordering.request.ReviewRequest;

import java.util.List;

public interface ReviewService {
  Review submitReview(ReviewRequest reviewRequest, User user) throws Exception;

  void deleteReview(Long reviewId, User user) throws Exception;

  List<Review> getRestaurantReviews(Long restaurantId);
}
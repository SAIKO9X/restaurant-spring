package com.food.ordering.services.implement;

import com.food.ordering.model.entities.Restaurant;
import com.food.ordering.model.entities.Review;
import com.food.ordering.model.entities.User;
import com.food.ordering.repositories.RestaurantRepository;
import com.food.ordering.repositories.ReviewRepository;
import com.food.ordering.request.ReviewRequest;
import com.food.ordering.services.RestaurantService;
import com.food.ordering.services.ReviewService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ReviewServiceImpl implements ReviewService {

  private final ReviewRepository reviewRepository;
  private final RestaurantService restaurantService;

  @Override
  public Review submitReview(ReviewRequest reviewRequest, User user) throws Exception {
    Restaurant restaurant = restaurantService.findRestaurantById(reviewRequest.restaurantId());

    Review review = new Review();
    review.setCustomer(user);
    review.setRestaurant(restaurant);
    review.setRating(reviewRequest.rating());
    review.setComment(reviewRequest.comment());

    return reviewRepository.save(review);
  }

  @Override
  public void deleteReview(Long reviewId, User user) throws Exception {
    Review review = reviewRepository.findById(reviewId)
      .orElseThrow(() -> new Exception("Review not found with id: " + reviewId));

    if (!review.getCustomer().getId().equals(user.getId())) {
      throw new Exception("You are not authorized to delete this review.");
    }
    reviewRepository.deleteById(reviewId);
  }

  @Override
  public List<Review> getRestaurantReviews(Long restaurantId) {
    return reviewRepository.findByRestaurantId(restaurantId);
  }
}
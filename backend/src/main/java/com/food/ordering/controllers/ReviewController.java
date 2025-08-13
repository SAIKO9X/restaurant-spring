package com.food.ordering.controllers;

import com.food.ordering.model.entities.Review;
import com.food.ordering.model.entities.User;
import com.food.ordering.request.ReviewRequest;
import com.food.ordering.services.ReviewService;
import com.food.ordering.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class ReviewController {

  private final ReviewService reviewService;
  private final UserService userService;

  @PostMapping("/reviews")
  public ResponseEntity<Review> submitReview(@RequestBody ReviewRequest reviewRequest, @RequestHeader("Authorization") String jwt) throws Exception {
    User user = userService.findUserByJwtToken(jwt);
    Review review = reviewService.submitReview(reviewRequest, user);
    return new ResponseEntity<>(review, HttpStatus.CREATED);
  }

  @GetMapping("/reviews/restaurant/{restaurantId}")
  public ResponseEntity<List<Review>> getRestaurantReviews(@PathVariable Long restaurantId) {
    List<Review> reviews = reviewService.getRestaurantReviews(restaurantId);
    return new ResponseEntity<>(reviews, HttpStatus.OK);
  }
}
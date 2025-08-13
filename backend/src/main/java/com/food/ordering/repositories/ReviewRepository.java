package com.food.ordering.repositories;

import com.food.ordering.model.entities.Review;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ReviewRepository extends JpaRepository<Review, Long> {
  List<Review> findByRestaurantId(Long restaurantId);
}
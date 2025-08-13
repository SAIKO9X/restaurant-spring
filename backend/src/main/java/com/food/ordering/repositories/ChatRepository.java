package com.food.ordering.repositories;

import com.food.ordering.model.entities.Chat;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ChatRepository extends JpaRepository<Chat, Long> {
  List<Chat> findByCustomerId(Long userId);

  List<Chat> findByRestaurantId(Long restaurantId);
}
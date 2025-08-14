package com.food.ordering.repositories;

import com.food.ordering.model.entities.Chat;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ChatRepository extends JpaRepository<Chat, Long> {
  List<Chat> findByCustomerId(Long userId);

  List<Chat> findByRestaurantId(Long restaurantId);

  Optional<Chat> findByCustomerIdAndRestaurantId(Long customerId, Long restaurantId);
}
package com.food.ordering.repositories;

import com.food.ordering.model.entities.Order;
import com.food.ordering.model.enums.OrderStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Date;
import java.util.List;

public interface OrderRepository extends JpaRepository<Order, Long> {

  public List<Order> findByCustomerId(Long userId);

  public List<Order> findByRestaurantId(Long restaurantId);

  List<Order> findByRestaurantIdAndOrderStatusAndCreatedAtBetween(Long restaurantId, OrderStatus orderStatus, Date startDate, Date endDate);
}

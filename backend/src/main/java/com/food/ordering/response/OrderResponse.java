package com.food.ordering.response;

import com.food.ordering.model.entities.Address;
import com.food.ordering.model.entities.Order;
import com.food.ordering.model.enums.OrderStatus;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

public record OrderResponse(
  Long id,
  UserResponse customer,
  RestaurantResponse restaurant,
  Address deliveryAddress,
  List<OrderItemResponse> items,
  double totalAmount,
  OrderStatus orderStatus,
  int totalItem,
  double totalPrice,
  Date createdAt
) {
  public OrderResponse(Order order) {
    this(
      order.getId(),
      new UserResponse(order.getCustomer().getId(), order.getCustomer().getFullName()),
      new RestaurantResponse(order.getRestaurant().getId(), order.getRestaurant().getName()),
      order.getDeliveryAddress(),
      order.getItems().stream()
        .map(item -> new OrderItemResponse(
          item.getId(),
          new FoodResponse(item.getFood().getId(), item.getFood().getName(), item.getFood().getPrice(), item.getFood().getImages()),
          item.getTotalPrice(),
          item.getQuantity(),
          item.getIngredients()
        ))
        .collect(Collectors.toList()),
      order.getTotalAmount(),
      order.getOrderStatus(),
      order.getTotalItem(),
      order.getTotalPrice(),
      order.getCreatedAt()
    );
  }
}
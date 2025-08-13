package com.food.ordering.model.dto;

import com.food.ordering.model.entities.Category;
import com.food.ordering.model.entities.IngredientsItem;
import com.food.ordering.response.RestaurantResponse;
import com.food.ordering.response.UserResponse;

import java.util.List;

public record FoodDTO(
  Long id,
  Category foodCategory,
  RestaurantResponse restaurant,
  UserResponse owner,
  List<IngredientsItem> ingredients,
  String name,
  String description,
  double price,
  boolean available,
  List<String> images,
  boolean seasonal,
  boolean vegetarian
) {
}

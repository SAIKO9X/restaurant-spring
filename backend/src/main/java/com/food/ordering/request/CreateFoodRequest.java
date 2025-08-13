package com.food.ordering.request;

import com.food.ordering.model.entities.Category;
import com.food.ordering.model.entities.IngredientsItem;

import java.util.List;

public record CreateFoodRequest(
  String name,
  String description,
  double price,
  Category category,
  List<String> images,
  Long restaurantId,
  boolean isVegetarian,
  boolean isSeasonal,
  boolean available,
  List<IngredientsItem> ingredients
) {
}

package com.food.ordering.response;

import java.util.List;

public record FoodResponse(
  Long id,
  String name,
  double price,
  List<String> images
) {
}

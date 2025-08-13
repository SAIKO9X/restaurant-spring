package com.food.ordering.response;

import java.util.List;

public record OrderItemResponse(Long id, FoodResponse food, double totalPrice, int quantity, List<String> ingredients) {
}

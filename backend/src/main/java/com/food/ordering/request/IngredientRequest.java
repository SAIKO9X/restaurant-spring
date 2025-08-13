package com.food.ordering.request;

public record IngredientRequest(String name, Long categoryId, Long restaurantId) {
}

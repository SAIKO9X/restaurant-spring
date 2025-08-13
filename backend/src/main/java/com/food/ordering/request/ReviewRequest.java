package com.food.ordering.request;

public record ReviewRequest(Long restaurantId, int rating, String comment) {
}
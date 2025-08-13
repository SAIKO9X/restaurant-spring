package com.food.ordering.request;

public record UpdateCartItemRequest(Long cartItemId, int quantity) {
}

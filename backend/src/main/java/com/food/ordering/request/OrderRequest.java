package com.food.ordering.request;

import com.food.ordering.model.entities.Address;

public record OrderRequest(Long restaurantId, Address deliveryAddress) {
}

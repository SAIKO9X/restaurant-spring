package com.food.ordering.request;

import com.food.ordering.model.dto.ContactInformation;
import com.food.ordering.model.entities.Address;

import java.util.List;

public record CreateRestaurantRequest(
  Long id,
  String name,
  String description,
  boolean open,
  String cuisineType,
  Address address,
  ContactInformation contact,
  String openingHours,
  List<String> images
) {
}

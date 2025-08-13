package com.food.ordering.controllers;

import com.food.ordering.model.entities.Restaurant;
import com.food.ordering.services.RestaurantService;
import com.food.ordering.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
public class AdminController {

  private final RestaurantService restaurantService;
  private final UserService userService;

  @GetMapping("/restaurants")
  public ResponseEntity<List<Restaurant>> getAllRestaurants() {
    List<Restaurant> restaurants = restaurantService.findAllRestaurantsForAdmin();
    return new ResponseEntity<>(restaurants, HttpStatus.OK);
  }
}
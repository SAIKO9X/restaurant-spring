package com.food.ordering.controllers;

import com.food.ordering.model.dto.RestaurantDTO;
import com.food.ordering.model.entities.Restaurant;
import com.food.ordering.model.entities.User;
import com.food.ordering.services.RestaurantService;
import com.food.ordering.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/restaurants")
public class RestaurantController {

  @Autowired
  private RestaurantService restaurantService;

  @Autowired
  private UserService userService;

  @GetMapping("/search")
  public ResponseEntity<List<Restaurant>> searchRestaurant(@RequestParam String keyword) {
    List<Restaurant> restaurants = restaurantService.searchRestaurant(keyword);
    return new ResponseEntity<>(restaurants, HttpStatus.OK);
  }

  @GetMapping
  public ResponseEntity<List<Restaurant>> getAllRestaurants() {
    List<Restaurant> restaurants = restaurantService.getAllRestaurant();
    return new ResponseEntity<>(restaurants, HttpStatus.OK);
  }

  @GetMapping("/{id}")
  public ResponseEntity<Restaurant> findRestaurantById(@PathVariable Long id) throws Exception {
    Restaurant restaurant = restaurantService.findRestaurantById(id);
    return new ResponseEntity<>(restaurant, HttpStatus.OK);
  }

  @PutMapping("/{id}/favorites")
  public ResponseEntity<RestaurantDTO> addToFavorites(@RequestHeader("Authorization") String jwt, @PathVariable Long id) throws Exception {
    User user = userService.findUserByJwtToken(jwt);
    RestaurantDTO restaurant = restaurantService.addToFavorites(id, user);
    return new ResponseEntity<>(restaurant, HttpStatus.OK);
  }
}

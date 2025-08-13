package com.food.ordering.controllers;

import com.food.ordering.model.entities.Restaurant;
import com.food.ordering.model.entities.User;
import com.food.ordering.request.CreateRestaurantRequest;
import com.food.ordering.response.MessageResponse;
import com.food.ordering.services.RestaurantService;
import com.food.ordering.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin/restaurants")
public class RestaurantAdminController {

  @Autowired
  private RestaurantService restaurantService;

  @Autowired
  private UserService userService;

  @PostMapping
  public ResponseEntity<Restaurant> createRestaurant(@RequestBody CreateRestaurantRequest request, @RequestHeader("Authorization") String jwt) throws Exception {
    User user = userService.findUserByJwtToken(jwt);
    Restaurant restaurant = restaurantService.createRestaurant(request, user);
    return new ResponseEntity<>(restaurant, HttpStatus.CREATED);
  }

  @PutMapping("/{id}")
  public ResponseEntity<Restaurant> updateRestaurant(@RequestBody CreateRestaurantRequest request, @PathVariable Long id) throws Exception {
    Restaurant restaurant = restaurantService.updateRestaurant(id, request);
    return new ResponseEntity<>(restaurant, HttpStatus.OK);
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<MessageResponse> deleteRestaurant(@PathVariable Long id) throws Exception {
    restaurantService.deleteRestaurant(id);
    MessageResponse message = new MessageResponse("restaurant deleted successfully");
    return new ResponseEntity<>(message, HttpStatus.OK);
  }

  @PutMapping("/{id}/status")
  public ResponseEntity<Restaurant> updateRestaurantStatus(@PathVariable Long id) throws Exception {
    Restaurant restaurant = restaurantService.updateRestaurantStatus(id);
    return new ResponseEntity<>(restaurant, HttpStatus.OK);
  }

  @GetMapping("/user")
  public ResponseEntity<Restaurant> findRestaurantByUserId(@RequestHeader("Authorization") String jwt) throws Exception {
    User user = userService.findUserByJwtToken(jwt);
    Restaurant restaurant = restaurantService.findRestaurantByUserId(user.getId());
    return new ResponseEntity<>(restaurant, HttpStatus.OK);
  }
}

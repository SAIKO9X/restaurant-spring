package com.food.ordering.controllers;

import com.food.ordering.model.entities.Restaurant;
import com.food.ordering.model.entities.User;
import com.food.ordering.model.enums.USER_ROLE;
import com.food.ordering.services.RestaurantService;
import com.food.ordering.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

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

  @PutMapping("/restaurants/{id}/approve")
  public ResponseEntity<Restaurant> approveRestaurant(@PathVariable Long id) {
    try {
      Restaurant restaurant = restaurantService.approveRestaurant(id);
      return new ResponseEntity<>(restaurant, HttpStatus.OK);
    } catch (Exception e) {
      return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
    }
  }

  @GetMapping("/users")
  public ResponseEntity<List<User>> getAllUsers() {
    List<User> users = userService.findAllUsers();
    return new ResponseEntity<>(users, HttpStatus.OK);
  }

  @PutMapping("/users/{id}/update-role")
  public ResponseEntity<User> updateUserRole(@PathVariable Long id, @RequestBody Map<String, String> req) {
    try {
      USER_ROLE newRole = USER_ROLE.valueOf(req.get("role"));
      User user = userService.updateUserRole(id, newRole);
      return new ResponseEntity<>(user, HttpStatus.OK);
    } catch (IllegalArgumentException e) {
      return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST); // Se a role enviada for inválida
    } catch (Exception e) {
      return new ResponseEntity<>(null, HttpStatus.NOT_FOUND); // Se o user ID não existir
    }
  }
}
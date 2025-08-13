package com.food.ordering.controllers;

import com.food.ordering.model.dto.FoodDTO;
import com.food.ordering.model.entities.Food;
import com.food.ordering.model.entities.Restaurant;
import com.food.ordering.request.CreateFoodRequest;
import com.food.ordering.response.MessageResponse;
import com.food.ordering.services.FoodService;
import com.food.ordering.services.RestaurantService;
import com.food.ordering.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin/foods")
public class FoodAdminController {

  @Autowired
  private FoodService foodService;

  @Autowired
  private UserService userService;

  @Autowired
  private RestaurantService restaurantService;

  @PostMapping
  public ResponseEntity<FoodDTO> createFood(@RequestBody CreateFoodRequest request) throws Exception {
    Restaurant restaurant = restaurantService.findRestaurantById(request.restaurantId());
    Food food = foodService.createFood(request, request.category(), restaurant);
    FoodDTO foodDTO = foodService.convertToDTO(food);
    return new ResponseEntity<>(foodDTO, HttpStatus.CREATED);
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<MessageResponse> deleteFood(@PathVariable Long id) throws Exception {
    foodService.deleteFood(id);
    MessageResponse message = new MessageResponse("food deleted successfully");
    return new ResponseEntity<>(message, HttpStatus.OK);
  }

  @PutMapping("/{id}")
  public ResponseEntity<FoodDTO> updateFoodAvailabilityStatus(@PathVariable Long id) throws Exception {
    Food food = foodService.updateAvailableStatus(id);
    FoodDTO foodDTO = foodService.convertToDTO(food);
    return new ResponseEntity<>(foodDTO, HttpStatus.OK);
  }

  @PutMapping("/edit/{id}")
  public ResponseEntity<FoodDTO> updateFood(@PathVariable Long id, @RequestBody CreateFoodRequest request) throws Exception {
    Food updatedFood = foodService.updateFood(id, request);
    FoodDTO foodDTO = foodService.convertToDTO(updatedFood);
    return new ResponseEntity<>(foodDTO, HttpStatus.OK);
  }
}

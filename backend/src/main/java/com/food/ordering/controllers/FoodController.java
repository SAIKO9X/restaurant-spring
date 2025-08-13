package com.food.ordering.controllers;

import com.food.ordering.model.dto.FoodDTO;
import com.food.ordering.model.entities.Food;
import com.food.ordering.services.FoodService;
import com.food.ordering.services.RestaurantService;
import com.food.ordering.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/foods")
public class FoodController {

  @Autowired
  private FoodService foodService;

  @Autowired
  private UserService userService;

  @Autowired
  private RestaurantService restaurantService;

  @GetMapping("/search")
  public ResponseEntity<List<FoodDTO>> searchFood(@RequestParam String name) throws Exception {
    List<Food> foods = foodService.searchFood(name);
    List<FoodDTO> foodDTOs = foods.stream().map(foodService::convertToDTO).collect(Collectors.toList());
    return new ResponseEntity<>(foodDTOs, HttpStatus.OK);
  }

  @GetMapping("/restaurant/{restaurantId}")
  public ResponseEntity<List<FoodDTO>> getRestaurantFood(
    @PathVariable Long restaurantId,
    @RequestParam(required = false) String food_category,
    @RequestParam(required = false, defaultValue = "false") boolean vegetarian,
    @RequestParam(required = false, defaultValue = "false") boolean noVegetarian,
    @RequestParam(required = false, defaultValue = "false") boolean seasonal
  ) throws Exception {
    List<Food> foods = foodService.getRestaurantsFood(restaurantId, vegetarian, noVegetarian, seasonal, food_category);
    List<FoodDTO> foodDTOs = foods.stream().map(foodService::convertToDTO).collect(Collectors.toList());
    return new ResponseEntity<>(foodDTOs, HttpStatus.OK);
  }

  @GetMapping("/top-ordered")
  public ResponseEntity<List<FoodDTO>> getTopOrderedFoods(@RequestParam(defaultValue = "5") int limit) {
    List<Food> topFoods = foodService.getTopOrderedFoods(limit);
    List<FoodDTO> foodDTOs = topFoods.stream()
      .map(foodService::convertToDTO)
      .collect(Collectors.toList());
    return new ResponseEntity<>(foodDTOs, HttpStatus.OK);
  }

  @GetMapping("/random")
  public ResponseEntity<List<FoodDTO>> getRandomFoods(@RequestParam(defaultValue = "5") int limit) {
    List<Food> randomFoods = foodService.getRandomFoods(limit);
    List<FoodDTO> foodDTOs = randomFoods.stream()
      .map(foodService::convertToDTO)
      .collect(Collectors.toList());
    return new ResponseEntity<>(foodDTOs, HttpStatus.OK);
  }
}

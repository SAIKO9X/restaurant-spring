package com.food.ordering.controllers;

import com.food.ordering.model.dto.FoodDTO;
import com.food.ordering.model.entities.Food;
import com.food.ordering.model.entities.Restaurant;
import com.food.ordering.response.SearchResponse;
import com.food.ordering.services.FoodService;
import com.food.ordering.services.RestaurantService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/search")
public class SearchController {

  private final RestaurantService restaurantService;
  private final FoodService foodService;

  @GetMapping
  public ResponseEntity<SearchResponse> searchAll(@RequestParam String q) {
    SearchResponse response = new SearchResponse();

    // Busca por restaurantes
    List<Restaurant> restaurants = restaurantService.searchRestaurant(q);
    response.setRestaurants(restaurants);

    // Busca por comidas e converte para DTO
    List<Food> foods = foodService.searchFood(q);
    List<FoodDTO> foodDTOs = foods.stream().map(foodService::convertToDTO).collect(Collectors.toList());
    response.setFoods(foodDTOs);

    return new ResponseEntity<>(response, HttpStatus.OK);
  }
}
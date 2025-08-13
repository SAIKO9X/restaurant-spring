package com.food.ordering.services;

import com.food.ordering.model.dto.FoodDTO;
import com.food.ordering.model.entities.Category;
import com.food.ordering.model.entities.Food;
import com.food.ordering.model.entities.Restaurant;
import com.food.ordering.request.CreateFoodRequest;

import java.util.List;

public interface FoodService {

  Food createFood(CreateFoodRequest request, Category category, Restaurant restaurant);

  void deleteFood(Long foodId) throws Exception;

  List<Food> getRestaurantsFood(Long restaurantId, boolean isVegetarian, boolean noVegetarian, boolean isSeasonal, String foodCategory);

  List<Food> searchFood(String keyword);

  Food findFoodById(Long id) throws Exception;

  Food updateAvailableStatus(Long foodId) throws Exception;

  FoodDTO convertToDTO(Food food);

  Food updateFood(Long foodId, CreateFoodRequest request) throws Exception;

  List<Food> getTopOrderedFoods(int limit);

  List<Food> getRandomFoods(int limit);
}

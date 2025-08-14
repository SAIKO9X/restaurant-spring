package com.food.ordering.response;

import com.food.ordering.model.dto.FoodDTO;
import com.food.ordering.model.entities.Restaurant;
import lombok.Data;

import java.util.List;

@Data
public class SearchResponse {
  private List<Restaurant> restaurants;
  
  private List<FoodDTO> foods;
}
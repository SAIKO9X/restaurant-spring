package com.food.ordering.services;

import com.food.ordering.model.entities.IngredientCategory;
import com.food.ordering.model.entities.IngredientsItem;

import java.util.List;

public interface IngredientsService {

  public IngredientCategory createIngredientCategory(String name, Long restaurantId) throws Exception;

  public IngredientCategory findIngredientCategoryById(Long id) throws Exception;

  public List<IngredientCategory> findIngredientCategoryByRestaurantId(Long restaurantId) throws Exception;

  public IngredientsItem createIngredientItem(Long restaurantId, String ingredientName, Long categoryId) throws Exception;

  public List<IngredientsItem> findRestaurantsIngredients(Long restaurantId);

  public IngredientsItem updateStock(Long id) throws Exception;

  public void deleteIngredient(Long id) throws Exception;

  public void deleteIngredientCategory(Long id) throws Exception;
}

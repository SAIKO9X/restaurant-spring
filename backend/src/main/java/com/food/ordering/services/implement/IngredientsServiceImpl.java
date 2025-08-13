package com.food.ordering.services.implement;

import com.food.ordering.model.entities.IngredientCategory;
import com.food.ordering.model.entities.IngredientsItem;
import com.food.ordering.model.entities.Restaurant;
import com.food.ordering.repositories.IngredientsCategoryRepository;
import com.food.ordering.repositories.IngredientsItemRepository;
import com.food.ordering.services.IngredientsService;
import com.food.ordering.services.RestaurantService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class IngredientsServiceImpl implements IngredientsService {

  @Autowired
  private IngredientsItemRepository itemRepository;

  @Autowired
  private IngredientsCategoryRepository categoryRepository;

  @Autowired
  private RestaurantService restaurantService;

  @Override
  public IngredientCategory createIngredientCategory(String name, Long restaurantId) throws Exception {
    Restaurant restaurant = restaurantService.findRestaurantById(restaurantId);

    IngredientCategory category = new IngredientCategory();
    category.setRestaurant(restaurant);
    category.setName(name);

    return categoryRepository.save(category);
  }

  @Override
  public IngredientCategory findIngredientCategoryById(Long id) throws Exception {
    Optional<IngredientCategory> categories = categoryRepository.findById(id);

    if (categories.isEmpty()) {
      throw new Exception("ingredient category not found");
    }

    return categories.get();
  }

  @Override
  public List<IngredientCategory> findIngredientCategoryByRestaurantId(Long restaurantId) throws Exception {
    restaurantService.findRestaurantById(restaurantId);
    return categoryRepository.findByRestaurantId(restaurantId);
  }

  @Override
  public IngredientsItem createIngredientItem(Long restaurantId, String ingredientName, Long categoryId) throws Exception {
    Restaurant restaurant = restaurantService.findRestaurantById(restaurantId);
    IngredientCategory category = findIngredientCategoryById(categoryId);

    IngredientsItem item = new IngredientsItem();
    item.setName(ingredientName);
    item.setRestaurant(restaurant);
    item.setCategory(category);

    IngredientsItem ingredientsItem = itemRepository.save(item);
    category.getIngredients().add(ingredientsItem);

    return ingredientsItem;
  }

  @Override
  public List<IngredientsItem> findRestaurantsIngredients(Long restaurantId) {
    return itemRepository.findByRestaurantId(restaurantId);
  }

  @Override
  public IngredientsItem updateStock(Long id) throws Exception {
    Optional<IngredientsItem> items = itemRepository.findById(id);

    if (items.isEmpty()) {
      throw new Exception("ingredient not found");
    }

    IngredientsItem ingredientsItem = items.get();
    ingredientsItem.setStoke(!ingredientsItem.isStoke());

    return itemRepository.save(ingredientsItem);
  }

  @Override
  public void deleteIngredient(Long id) throws Exception {
    Optional<IngredientsItem> item = itemRepository.findById(id);

    if (item.isEmpty()) {
      throw new Exception("Ingredient not found");
    }

    itemRepository.delete(item.get());
  }

  @Override
  public void deleteIngredientCategory(Long id) throws Exception {
    Optional<IngredientCategory> category = categoryRepository.findById(id);

    if (category.isEmpty()) {
      throw new Exception("Ingredient category not found");
    }

    categoryRepository.delete(category.get());
  }
}

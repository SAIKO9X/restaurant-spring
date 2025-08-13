package com.food.ordering.services.implement;

import com.food.ordering.model.entities.Category;
import com.food.ordering.model.entities.Restaurant;
import com.food.ordering.repositories.CategoryRepository;
import com.food.ordering.services.CategoryService;
import com.food.ordering.services.RestaurantService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CategoryServiceImpl implements CategoryService {

  @Autowired
  private RestaurantService restaurantService;

  @Autowired
  private CategoryRepository categoryRepository;

  @Override
  public Category createCategory(String name, Long restaurantId) throws Exception {
    Restaurant restaurant = restaurantService.findRestaurantById(restaurantId);

    if (restaurant == null) {
      throw new Exception("Restaurant not found");
    }

    Category category = new Category();
    category.setName(name);
    category.setRestaurant(restaurant);

    return categoryRepository.save(category);
  }

  @Override
  public List<Category> findCategoryByRestaurantId(Long restaurantId) throws Exception {
    Restaurant restaurant = restaurantService.findRestaurantById(restaurantId);
    
    if (restaurant == null) {
      throw new Exception("Restaurant not found");
    }
    return categoryRepository.findByRestaurantId(restaurant.getId());
  }

  @Override
  public Category findCategoryById(Long id) throws Exception {
    Optional<Category> category = categoryRepository.findById(id);

    if (category.isEmpty()) {
      throw new Exception("Category not found");
    }

    return category.get();
  }

  @Override
  public void deleteCategory(Long id) throws Exception {
    Optional<Category> category = categoryRepository.findById(id);

    if (category.isEmpty()) {
      throw new Exception("Category not found");
    }

    categoryRepository.delete(category.get());
  }
}

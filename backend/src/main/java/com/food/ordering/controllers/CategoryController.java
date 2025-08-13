package com.food.ordering.controllers;

import com.food.ordering.model.entities.Category;
import com.food.ordering.services.CategoryService;
import com.food.ordering.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class CategoryController {

  @Autowired
  private CategoryService categoryService;

  @Autowired
  private UserService userService;

  @PostMapping("/admin/categories")
  public ResponseEntity<Category> createCategory(@RequestBody Category category, @RequestParam("restaurantId") Long restaurantId) throws Exception {
    Category createdCategory = categoryService.createCategory(category.getName(), restaurantId);

    return new ResponseEntity<>(createdCategory, HttpStatus.CREATED);
  }

  @GetMapping("/categories/restaurants")
  public ResponseEntity<List<Category>> getRestaurantCategory(@RequestParam("restaurantId") Long restaurantId) throws Exception {
    List<Category> categories = categoryService.findCategoryByRestaurantId(restaurantId);

    return new ResponseEntity<>(categories, HttpStatus.OK);
  }

  @DeleteMapping("/admin/categories/{id}")
  public ResponseEntity<Void> deleteCategory(@PathVariable Long id) throws Exception {
    categoryService.deleteCategory(id);
    return new ResponseEntity<>(HttpStatus.NO_CONTENT);
  }
}


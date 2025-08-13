package com.food.ordering.controllers;

import com.food.ordering.model.entities.IngredientCategory;
import com.food.ordering.model.entities.IngredientsItem;
import com.food.ordering.request.IngredientCategoryRequest;
import com.food.ordering.request.IngredientRequest;
import com.food.ordering.services.IngredientsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/ingredients")
public class IngredientController {

  @Autowired
  private IngredientsService ingredientsService;

  @PostMapping("/category")
  public ResponseEntity<IngredientCategory> createIngredientCategory(@RequestBody IngredientCategoryRequest request) throws Exception {
    IngredientCategory category = ingredientsService.createIngredientCategory(request.name(), request.restaurantId());
    return new ResponseEntity<>(category, HttpStatus.CREATED);
  }

  @PostMapping("/item")
  public ResponseEntity<IngredientsItem> createIngredientItem(@RequestBody IngredientRequest request) throws Exception {
    IngredientsItem item = ingredientsService.createIngredientItem(request.restaurantId(), request.name(), request.categoryId());
    return new ResponseEntity<>(item, HttpStatus.CREATED);
  }

  @PutMapping("/{id}/stoke")
  public ResponseEntity<IngredientsItem> updateIngredientStoke(@PathVariable Long id) throws Exception {
    IngredientsItem item = ingredientsService.updateStock(id);
    return new ResponseEntity<>(item, HttpStatus.OK);
  }

  @GetMapping("/restaurants/{id}")
  public ResponseEntity<List<IngredientsItem>> getRestaurantIngredients(@PathVariable Long id) throws Exception {
    List<IngredientsItem> items = ingredientsService.findRestaurantsIngredients(id);
    return new ResponseEntity<>(items, HttpStatus.OK);
  }

  @GetMapping("/restaurants/{id}/category")
  public ResponseEntity<List<IngredientCategory>> getRestaurantIngredientsCategory(@PathVariable Long id) throws Exception {
    List<IngredientCategory> items = ingredientsService.findIngredientCategoryByRestaurantId(id);
    return new ResponseEntity<>(items, HttpStatus.OK);
  }

  @DeleteMapping("/item/{id}")
  public ResponseEntity<Void> deleteIngredient(@PathVariable Long id) throws Exception {
    ingredientsService.deleteIngredient(id);
    return new ResponseEntity<>(HttpStatus.NO_CONTENT);
  }

  @DeleteMapping("/category/{id}")
  public ResponseEntity<Void> deleteIngredientCategory(@PathVariable Long id) throws Exception {
    ingredientsService.deleteIngredientCategory(id);
    return new ResponseEntity<>(HttpStatus.NO_CONTENT);
  }
}
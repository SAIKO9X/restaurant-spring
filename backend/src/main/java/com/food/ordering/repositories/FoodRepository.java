package com.food.ordering.repositories;

import com.food.ordering.model.entities.Food;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface FoodRepository extends JpaRepository<Food, Long> {

  List<Food> findByRestaurantId(Long restaurantId);

  @Query("SELECT f FROM Food f WHERE f.name LIKE %:keyword% OR f.foodCategory.name LIKE %:keyword%")
  List<Food> searchFood(@Param("keyword") String keyword);

  @Query(value = "SELECT f.*, COUNT(oi.id) as orderCount " +
    "FROM tb_items oi " +
    "JOIN tb_food f ON oi.food_id = f.id " +
    "GROUP BY f.id " +
    "ORDER BY orderCount DESC " +
    "LIMIT :limit", nativeQuery = true)
  List<Food> findTopOrderedFoods(@Param("limit") int limit);

  @Query(value = "SELECT * FROM tb_food ORDER BY RAND() LIMIT :limit", nativeQuery = true)
  List<Food> findRandomFoods(@Param("limit") int limit);
}

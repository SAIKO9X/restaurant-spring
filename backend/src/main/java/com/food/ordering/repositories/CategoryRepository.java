package com.food.ordering.repositories;

import com.food.ordering.model.entities.Category;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CategoryRepository extends JpaRepository<Category, Long> {

  public List<Category> findByRestaurantId(Long id);
}

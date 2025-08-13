package com.food.ordering.repositories;

import com.food.ordering.model.entities.Restaurant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface RestaurantRepository extends JpaRepository<Restaurant, Long> {

  @Query("SELECT r FROM Restaurant r WHERE lower(r.name) LIKE lower(concat('%', :query, '%')) OR lower(r.cuisineType) LIKE lower(concat('%', :query, '%'))")
  List<Restaurant> findBySearchQuery(@Param("query") String query);

  Restaurant findByOwnerId(Long id);

  List<Restaurant> findAllByApprovedTrue();
}

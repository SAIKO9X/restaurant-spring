package com.food.ordering.services;

import com.food.ordering.model.dto.RestaurantDTO;
import com.food.ordering.model.entities.Restaurant;
import com.food.ordering.model.entities.User;
import com.food.ordering.request.CreateRestaurantRequest;

import java.util.List;

public interface RestaurantService {

  public Restaurant createRestaurant(CreateRestaurantRequest request, User user);

  public Restaurant updateRestaurant(Long restaurantId, CreateRestaurantRequest updateRestaurant) throws Exception;

  public void deleteRestaurant(Long restaurantId) throws Exception;

  public List<Restaurant> getAllRestaurant();

  public List<Restaurant> searchRestaurant(String keyword);

  public Restaurant findRestaurantById(Long id) throws Exception;

  public Restaurant findRestaurantByUserId(Long userId) throws Exception;

  public RestaurantDTO addToFavorites(Long restaurantId, User user) throws Exception;

  public Restaurant updateRestaurantStatus(Long id) throws Exception;

  public List<Restaurant> findAllRestaurantsForAdmin();
}
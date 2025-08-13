package com.food.ordering.services.implement;

import com.food.ordering.model.dto.RestaurantDTO;
import com.food.ordering.model.entities.Address;
import com.food.ordering.model.entities.Restaurant;
import com.food.ordering.model.entities.User;
import com.food.ordering.repositories.AddressRepository;
import com.food.ordering.repositories.RestaurantRepository;
import com.food.ordering.repositories.UserRepository;
import com.food.ordering.request.CreateRestaurantRequest;
import com.food.ordering.services.RestaurantService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class RestaurantServiceImpl implements RestaurantService {

  private final RestaurantRepository restaurantRepository;
  private final AddressRepository addressRepository;
  private final UserRepository userRepository;

  @Override
  public Restaurant createRestaurant(CreateRestaurantRequest request, User user) {
    Address address = addressRepository.save(request.address());

    Restaurant restaurant = new Restaurant();
    restaurant.setId(request.id());
    restaurant.setName(request.name());
    restaurant.setDescription(request.description());
    restaurant.setCuisineType(request.cuisineType());
    restaurant.setOpen(request.open());
    restaurant.setAddress(address);
    restaurant.setContact(request.contact());
    restaurant.setOpeningHours(request.openingHours());
    restaurant.setImages(request.images());
    restaurant.setOwner(user);

    return restaurantRepository.save(restaurant);
  }

  @Override
  public Restaurant updateRestaurant(Long restaurantId, CreateRestaurantRequest updateRestaurant) throws Exception {
    Restaurant restaurant = findRestaurantById(restaurantId);

    if (restaurant == null) {
      throw new Exception("Restaurant not found with id: " + restaurantId);
    }

    if (updateRestaurant.cuisineType() != null) {
      restaurant.setCuisineType(updateRestaurant.cuisineType());
    }

    if (updateRestaurant.description() != null) {
      restaurant.setDescription(updateRestaurant.description());
    }

    if (updateRestaurant.name() != null) {
      restaurant.setName(updateRestaurant.name());
    }

    if (updateRestaurant.address() != null) {
      Address updatedAddress = addressRepository.save(updateRestaurant.address());
      restaurant.setAddress(updatedAddress);
    }

    if (updateRestaurant.contact() != null) {
      restaurant.setContact(updateRestaurant.contact());
    }

    if (updateRestaurant.openingHours() != null) {
      restaurant.setOpeningHours(updateRestaurant.openingHours());
    }

    if (updateRestaurant.images() != null) {
      restaurant.setImages(updateRestaurant.images());
    }

    return restaurantRepository.save(restaurant);
  }

  @Override
  public void deleteRestaurant(Long restaurantId) throws Exception {
    Restaurant restaurant = findRestaurantById(restaurantId);
    restaurantRepository.delete(restaurant);
  }

  @Override
  public List<Restaurant> getAllRestaurant() {
    return restaurantRepository.findAll();
  }

  @Override
  public List<Restaurant> searchRestaurant(String keyword) {
    return restaurantRepository.findBySearchQuery(keyword);
  }

  @Override
  public Restaurant findRestaurantById(Long id) throws Exception {
    Optional<Restaurant> optionalRestaurant = restaurantRepository.findById(id);

    if (optionalRestaurant.isEmpty()) {
      throw new Exception("restaurant not found with id: " + id);
    }

    return optionalRestaurant.get();
  }

  @Override
  public Restaurant findRestaurantByUserId(Long userId) throws Exception {
    Restaurant restaurant = restaurantRepository.findByOwnerId(userId);

    if (restaurant == null) {
      throw new Exception("restaurant not found with owner id: " + userId);
    }

    return restaurant;
  }

  @Override
  public RestaurantDTO addToFavorites(Long restaurantId, User user) throws Exception {
    Restaurant restaurant = findRestaurantById(restaurantId);

    RestaurantDTO restaurantDTO = new RestaurantDTO(restaurantId, restaurant.getName(), restaurant.getDescription(), restaurant.getImages());

    boolean isFavorited = false;
    List<RestaurantDTO> favorites = user.getFavorites();

    for (RestaurantDTO favorite : favorites) {
      if (favorite.id().equals(restaurantId)) {
        isFavorited = true;
        break;
      }
    }

    if (isFavorited) {
      favorites.removeIf(favorite -> favorite.id().equals(restaurantId));
    } else {
      favorites.add(restaurantDTO);
    }

    userRepository.save(user);

    return restaurantDTO;
  }

  @Override
  public Restaurant updateRestaurantStatus(Long id) throws Exception {
    Restaurant restaurant = findRestaurantById(id);
    restaurant.setOpen(!restaurant.isOpen());
    return restaurantRepository.save(restaurant);
  }

  @Override
  public List<Restaurant> findAllRestaurantsForAdmin() {
    return restaurantRepository.findAll();
  }
}
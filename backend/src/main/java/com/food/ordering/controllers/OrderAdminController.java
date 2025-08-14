package com.food.ordering.controllers;

import com.food.ordering.model.entities.Order;
import com.food.ordering.model.entities.Restaurant;
import com.food.ordering.model.entities.User;
import com.food.ordering.response.AnalyticsResponse;
import com.food.ordering.services.OrderService;
import com.food.ordering.services.RestaurantService;
import com.food.ordering.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/my-restaurant/order")
public class OrderAdminController {

  private final OrderService orderService;
  private final RestaurantService restaurantService;
  private final UserService userService;

  @GetMapping("/order/restaurant/{id}")
  public ResponseEntity<List<Order>> getRestaurantsOrder(@PathVariable Long id, @RequestParam(required = false) String order_status) throws Exception {
    List<Order> orders = orderService.getRestaurantsOrder(id, order_status);

    return new ResponseEntity<>(orders, HttpStatus.OK);
  }

  @PutMapping("/order/{id}/{orderStatus}")
  public ResponseEntity<Order> updateOrderStatus(@PathVariable Long id, @PathVariable String orderStatus) throws Exception {
    Order order = orderService.updateOrder(id, orderStatus);

    return new ResponseEntity<>(order, HttpStatus.OK);
  }

  @GetMapping("/analytics")
  public ResponseEntity<AnalyticsResponse> getRestaurantAnalytics(
    @RequestHeader("Authorization") String jwt,
    @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) Date startDate,
    @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) Date endDate) throws Exception {

    User user = userService.findUserByJwtToken(jwt);
    Restaurant restaurant = restaurantService.findRestaurantByUserId(user.getId());
    AnalyticsResponse analytics = orderService.getRestaurantAnalytics(restaurant.getId(), startDate, endDate);

    return new ResponseEntity<>(analytics, HttpStatus.OK);
  }
}

package com.food.ordering.controllers;

import com.food.ordering.model.entities.Order;
import com.food.ordering.services.OrderService;
import com.food.ordering.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
public class OrderAdminController {

  @Autowired
  private OrderService orderService;

  @Autowired
  private UserService userService;

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
}

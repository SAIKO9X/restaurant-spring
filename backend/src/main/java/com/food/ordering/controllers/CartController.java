package com.food.ordering.controllers;

import com.food.ordering.model.entities.Cart;
import com.food.ordering.model.entities.CartItem;
import com.food.ordering.model.entities.User;
import com.food.ordering.request.AddCartItemRequest;
import com.food.ordering.request.UpdateCartItemRequest;
import com.food.ordering.services.CartService;
import com.food.ordering.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class CartController {

  @Autowired
  private CartService cartService;

  @Autowired
  private UserService userService;

  @PostMapping("/cart/add")
  public ResponseEntity<CartItem> addItemToCart(@RequestBody AddCartItemRequest request, @RequestHeader("Authorization") String jwt) throws Exception {
    CartItem cartItem = cartService.addItemToCart(request, jwt);

    return new ResponseEntity<>(cartItem, HttpStatus.OK);
  }

  @PutMapping("/cart_item/update")
  public ResponseEntity<CartItem> updateCartQuantity(@RequestBody UpdateCartItemRequest request, @RequestHeader("Authorization") String jwt) throws Exception {
    CartItem cartItem = cartService.updateCartItemQuantity(request.cartItemId(), request.quantity());

    return new ResponseEntity<>(cartItem, HttpStatus.OK);
  }

  @DeleteMapping("/cart_item/{id}/remove")
  public ResponseEntity<Cart> removeCartItem(@PathVariable Long id, @RequestHeader("Authorization") String jwt) throws Exception {
    Cart cart = cartService.removeItemFromCart(id, jwt);

    return new ResponseEntity<>(cart, HttpStatus.OK);
  }

  @PutMapping("/cart/clear")
  public ResponseEntity<Cart> clearCart(@RequestHeader("Authorization") String jwt) throws Exception {
    User user = userService.findUserByJwtToken(jwt);
    Cart cart = cartService.clearCart(user.getId());
    return new ResponseEntity<>(cart, HttpStatus.OK);
  }

  @GetMapping("/cart")
  public ResponseEntity<Cart> findCartByUserId(@RequestHeader("Authorization") String jwt) throws Exception {
    User user = userService.findUserByJwtToken(jwt);

    Cart cart = cartService.findCartByUserId(user.getId());

    return new ResponseEntity<>(cart, HttpStatus.OK);
  }
}
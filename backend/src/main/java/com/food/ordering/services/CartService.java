package com.food.ordering.services;

import com.food.ordering.model.entities.Cart;
import com.food.ordering.model.entities.CartItem;
import com.food.ordering.request.AddCartItemRequest;

public interface CartService {

  public CartItem addItemToCart(AddCartItemRequest request, String jwt) throws Exception;

  public CartItem updateCartItemQuantity(Long cartItemId, int quantity) throws Exception;

  public Cart removeItemFromCart(Long cartItemId, String jwt) throws Exception;

  public double calculateCartTotals(Cart cart) throws Exception;

  public Cart findCartById(Long cartId) throws Exception;

  public Cart findCartByUserId(Long userId) throws Exception;

  public Cart clearCart(Long userId) throws Exception;
}

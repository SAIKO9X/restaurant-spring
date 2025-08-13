package com.food.ordering.services.implement;

import com.food.ordering.model.entities.Cart;
import com.food.ordering.model.entities.CartItem;
import com.food.ordering.model.entities.Food;
import com.food.ordering.model.entities.User;
import com.food.ordering.repositories.CartItemRepository;
import com.food.ordering.repositories.CartRepository;
import com.food.ordering.request.AddCartItemRequest;
import com.food.ordering.services.CartService;
import com.food.ordering.services.FoodService;
import com.food.ordering.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CartServiceImpl implements CartService {

  private final CartRepository cartRepository;
  private final UserService userService;
  private final CartItemRepository cartItemRepository;
  private final FoodService foodService;


  @Override
  public CartItem addItemToCart(AddCartItemRequest request, String jwt) throws Exception {
    User user = userService.findUserByJwtToken(jwt);
    Food food = foodService.findFoodById(request.foodId());
    Cart cart = cartRepository.findByCustomerId(user.getId());

    for (CartItem cartItem : cart.getItems()) {
      if (cartItem.getFood().equals(food)) {
        int newQuantity = cartItem.getQuantity() + request.quantity();
        CartItem updatedItem = updateCartItemQuantity(cartItem.getId(), newQuantity);
        cart.setTotal(calculateCartTotals(cart));
        cartRepository.save(cart);
        return updatedItem;
      }
    }

    CartItem newCartItem = new CartItem();
    newCartItem.setFood(food);
    newCartItem.setCart(cart);
    newCartItem.setQuantity(request.quantity());
    newCartItem.setIngredient(request.ingredients());
    newCartItem.setTotalPrice(request.quantity() * food.getPrice());

    CartItem savedCartItem = cartItemRepository.save(newCartItem);

    cart.getItems().add(savedCartItem);
    cart.setTotal(calculateCartTotals(cart));
    cartRepository.save(cart);

    return savedCartItem;
  }


  @Override
  public CartItem updateCartItemQuantity(Long cartItemId, int quantity) throws Exception {
    Optional<CartItem> cartItem = cartItemRepository.findById(cartItemId);

    if (cartItem.isEmpty()) {
      throw new Exception("cart item not found");
    }

    CartItem item = cartItem.get();
    item.setQuantity(quantity);
    item.setTotalPrice(item.getFood().getPrice() * quantity);

    CartItem updatedItem = cartItemRepository.save(item);

    Cart cart = item.getCart();
    cart.setTotal(calculateCartTotals(cart));
    cartRepository.save(cart);

    return updatedItem;
  }


  @Override
  public Cart removeItemFromCart(Long cartItemId, String jwt) throws Exception {
    User user = userService.findUserByJwtToken(jwt);
    Cart cart = cartRepository.findByCustomerId(user.getId());

    Optional<CartItem> cartItem = cartItemRepository.findById(cartItemId);

    if (cartItem.isEmpty()) {
      throw new Exception("cart item not found");
    }

    CartItem item = cartItem.get();
    cart.getItems().remove(item);
    cart.setTotal(calculateCartTotals(cart));
    return cartRepository.save(cart);
  }


  @Override
  public double calculateCartTotals(Cart cart) throws Exception {
    double total = 0.0;

    for (CartItem cartItem : cart.getItems()) {
      total += cartItem.getFood().getPrice() * cartItem.getQuantity();
    }

    return total;
  }

  @Override
  public Cart findCartById(Long cartId) throws Exception {
    Optional<Cart> cart = cartRepository.findById(cartId);

    if (cart.isEmpty()) {
      throw new Exception("cart not found with id: " + cartId);
    }

    return cart.get();
  }

  @Override
  public Cart findCartByUserId(Long userId) throws Exception {
    return cartRepository.findByCustomerId(userId);
  }

  @Override
  public Cart clearCart(Long userId) throws Exception {
    Cart cart = cartRepository.findByCustomerId(userId);
    cart.getItems().clear();
    cart.setTotal(0.0);
    return cartRepository.save(cart);
  }
}

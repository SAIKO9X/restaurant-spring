package com.food.ordering.services.implement;

import com.food.ordering.model.entities.*;
import com.food.ordering.model.enums.OrderStatus;
import com.food.ordering.repositories.*;
import com.food.ordering.request.OrderRequest;
import com.food.ordering.services.CartService;
import com.food.ordering.services.OrderService;
import com.food.ordering.services.RestaurantService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class OrderServiceImpl implements OrderService {

  @Autowired
  private OrderRepository orderRepository;

  @Autowired
  private OrderItemRepository orderItemRepository;

  @Autowired
  private AddressRepository addressRepository;

  @Autowired
  private UserRepository userRepository;

  @Autowired
  private RestaurantRepository restaurantRepository;

  @Autowired
  private RestaurantService restaurantService;

  @Autowired
  private CartService cartService;

  @Override
  public Order createOrder(OrderRequest request, User user) throws Exception {
    Address savedAddress = user.getAddresses().stream()
      .filter(address -> address.equals(request.deliveryAddress()))
      .findFirst()
      .orElseGet(() -> addressRepository.save(request.deliveryAddress()));

    if (!user.getAddresses().contains(savedAddress)) {
      user.getAddresses().add(savedAddress);
      userRepository.save(user);
    }

    Restaurant restaurant = restaurantService.findRestaurantById(request.restaurantId());

    Order createdOrder = new Order();
    createdOrder.setCustomer(user);
    createdOrder.setOrderStatus(OrderStatus.PENDING);
    createdOrder.setDeliveryAddress(savedAddress);
    createdOrder.setRestaurant(restaurant);

    Cart cart = cartService.findCartByUserId(user.getId());

    List<OrderItem> orderItems = new ArrayList<>();

    for (CartItem cartItem : cart.getItems()) {
      OrderItem orderItem = new OrderItem();
      orderItem.setFood(cartItem.getFood());
      orderItem.setIngredients(cartItem.getIngredient());
      orderItem.setQuantity(cartItem.getQuantity());
      orderItem.setTotalPrice(cartItem.getTotalPrice());

      OrderItem savedOrderItem = orderItemRepository.save(orderItem);
      orderItems.add(savedOrderItem);
    }

    createdOrder.setItems(orderItems);
    createdOrder.setTotalPrice(cart.getTotal());

    Order savedOrder = orderRepository.save(createdOrder);
    restaurant.getOrders().add(savedOrder);

    return savedOrder;
  }

  @Override
  public Order updateOrder(Long orderId, String orderStatus) throws Exception {
    Order order = findOrderById(orderId);

    try {
      OrderStatus status = OrderStatus.valueOf(orderStatus.toUpperCase());
      order.setOrderStatus(status);
      return orderRepository.save(order);
    } catch (IllegalArgumentException e) {
      throw new Exception("Status de pedido inválido: " + orderStatus);
    }
  }

  @Override
  public void cancelOrder(Long orderId) throws Exception {
    Order order = findOrderById(orderId);
    order.setOrderStatus(OrderStatus.CANCELLED);
    orderRepository.save(order);
  }

  @Override
  public List<Order> getUserOrder(Long userId) throws Exception {
    return orderRepository.findByCustomerId(userId);
  }

  @Override
  public List<Order> getRestaurantsOrder(Long restaurantId, String orderStatus) throws Exception {
    List<Order> orders = orderRepository.findByRestaurantId(restaurantId);

    if (orderStatus != null && !orderStatus.equalsIgnoreCase("ALL")) {
      try {
        OrderStatus status = OrderStatus.valueOf(orderStatus.toUpperCase());
        orders = orders.stream()
          .filter(order -> order.getOrderStatus() == status)
          .toList();
      } catch (IllegalArgumentException e) {
        throw new Exception("Status de pedido inválido: " + orderStatus);
      }
    }

    return orders;
  }

  @Override
  public Order findOrderById(Long orderId) throws Exception {
    Optional<Order> order = orderRepository.findById(orderId);

    if (order.isEmpty()) {
      throw new Exception("order not found");
    }

    return order.get();
  }
}

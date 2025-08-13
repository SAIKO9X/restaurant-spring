package com.food.ordering.model.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.food.ordering.model.enums.OrderStatus;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;

import java.util.Date;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@Entity(name = "tb_order")
public class Order {

  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private Long id;

  @ManyToOne
  private User customer;

  @JsonIgnore
  @ManyToOne
  private Restaurant restaurant;

  @ManyToOne
  @JoinColumn(name = "delivery_address_id")
  private Address deliveryAddress;

  @OneToMany
  private List<OrderItem> items;

  @Column(name = "total_amount")
  private double totalAmount;

  @Enumerated(EnumType.STRING)
  @Column(name = "order_status")
  private OrderStatus orderStatus;

  @Column(name = "total_item")
  private int totalItem;

  @Column(name = "total_price")
  private double totalPrice;

  @CreationTimestamp
  @Column(name = "created_at", updatable = false)
  private Date createdAt;
}

package com.food.ordering.model.entities;


import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@Entity(name = "tb_cart_item")
public class CartItem {

  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private Long id;

  @JsonIgnore
  @ManyToOne
  private Cart cart;

  @ManyToOne
  private Food food;

  private int quantity;
  private List<String> ingredient;

  @Column(name = "total_price")
  private double totalPrice;
}

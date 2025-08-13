package com.food.ordering.model.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@Entity(name = "tb_ingredients")
public class IngredientsItem {

  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private Long id;

  @ManyToOne
  private IngredientCategory category;

  @JsonIgnore
  @ManyToOne
  private Restaurant restaurant;

  private String name;
  private boolean stoke = true;
}

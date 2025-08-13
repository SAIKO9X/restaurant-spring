package com.food.ordering.model.entities;

import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "tb_food")
public class Food {

  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private Long id;

  @ManyToOne
  @JoinColumn(name = "food_category_id")
  private Category foodCategory;

  @ManyToOne
  @JoinColumn(name = "restaurant_id")
  private Restaurant restaurant;

  @ManyToMany
  @JoinTable(
    name = "food_ingredients",
    joinColumns = @JoinColumn(name = "food_id"),
    inverseJoinColumns = @JoinColumn(name = "ingredient_id"))
  private List<IngredientsItem> ingredients = new ArrayList<>();

  private String name;
  private String description;
  private double price;
  private boolean available;

  @Column(name = "is_vegetarian")
  private boolean isVegetarian;

  @Column(name = "is_seasonal")
  private boolean isSeasonal;

  @ElementCollection
  @CollectionTable(name = "food_images", joinColumns = @JoinColumn(name = "food_id"))
  @Column(name = "image_url", length = 1000)
  private List<String> images = new ArrayList<>();

  @Column(name = "creation_date")
  @Temporal(TemporalType.TIMESTAMP)
  private Date creationDate;
}

package com.food.ordering.model.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name = "tb_review")
public class Review {

  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private Long id;

  @ManyToOne
  private User customer;

  @JsonIgnore
  @ManyToOne
  private Restaurant restaurant;

  private int rating;

  @Column(length = 500)
  private String comment;

  @CreationTimestamp
  private LocalDateTime createdAt;
}
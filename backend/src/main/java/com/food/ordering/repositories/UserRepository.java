package com.food.ordering.repositories;

import com.food.ordering.model.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {

  public User findByEmail(String email);
}

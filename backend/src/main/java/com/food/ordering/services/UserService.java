package com.food.ordering.services;

import com.food.ordering.model.entities.User;

public interface UserService {

  User findUserByJwtToken(String jwt) throws Exception;

  User findUserByEmail(String email) throws Exception;

  void saveUser(User user) throws Exception;
}
package com.food.ordering.services;

import com.food.ordering.model.entities.User;
import com.food.ordering.model.enums.USER_ROLE;

import java.util.List;

public interface UserService {

  User findUserByJwtToken(String jwt) throws Exception;

  User findUserByEmail(String email) throws Exception;

  void saveUser(User user) throws Exception;

  List<User> findAllUsers();

  User updateUserRole(Long userId, USER_ROLE newRole) throws Exception;
}
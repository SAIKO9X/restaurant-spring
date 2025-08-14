package com.food.ordering.services;

import com.food.ordering.model.entities.User;
import com.food.ordering.request.LoginRequest;
import com.food.ordering.response.AuthResponse;

public interface AuthService {
  AuthResponse registerUser(User user) throws Exception;

  User createUser(User user) throws Exception;

  AuthResponse authenticateUser(LoginRequest request);
}
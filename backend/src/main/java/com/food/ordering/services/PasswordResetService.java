package com.food.ordering.services;

public interface PasswordResetService {

  void createPasswordResetToken(String email) throws Exception;

  void resetPassword(String token, String newPassword) throws Exception;
}
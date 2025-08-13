package com.food.ordering.response;

import com.food.ordering.model.enums.USER_ROLE;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AuthResponse {

  private String jwt;
  private String message;
  private USER_ROLE role;

  public AuthResponse(String message) {
    this.message = message;
  }
}


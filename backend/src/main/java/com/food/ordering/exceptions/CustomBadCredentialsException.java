package com.food.ordering.exceptions;

public class CustomBadCredentialsException extends RuntimeException {
  public CustomBadCredentialsException() {
    super("Invalid Email/Password");
  }
}


package com.food.ordering.controllers;

import com.food.ordering.exceptions.CustomBadCredentialsException;
import com.food.ordering.model.entities.User;
import com.food.ordering.request.LoginRequest;
import com.food.ordering.response.AuthResponse;
import com.food.ordering.services.AuthService;
import com.food.ordering.services.PasswordResetService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/auth")
public class AuthController {

  private final AuthService authService;
  private final PasswordResetService passwordResetService;

  @PostMapping("/register")
  public ResponseEntity<AuthResponse> createUserHandler(@RequestBody User user) {
    try {
      AuthResponse authResponse = authService.registerUser(user);
      return new ResponseEntity<>(authResponse, HttpStatus.CREATED);
    } catch (Exception e) {
      return new ResponseEntity<>(new AuthResponse(e.getMessage()), HttpStatus.BAD_REQUEST);
    }
  }

  @PostMapping("/login")
  public ResponseEntity<AuthResponse> login(@Valid @RequestBody LoginRequest request) {
    try {
      AuthResponse authResponse = authService.authenticateUser(request);
      return new ResponseEntity<>(authResponse, HttpStatus.OK);
    } catch (CustomBadCredentialsException e) {
      return new ResponseEntity<>(new AuthResponse(e.getMessage()), HttpStatus.UNAUTHORIZED);
    }
  }

  @PostMapping("/forgot-password")
  public ResponseEntity<String> forgotPassword(@RequestBody Map<String, String> request) {
    String email = request.get("email");
    try {
      passwordResetService.createPasswordResetToken(email);
      return new ResponseEntity<>("E-mail de redefinição enviado", HttpStatus.OK);
    } catch (Exception e) {
      System.out.println("Erro ao processar recuperação de senha: " + e.getMessage());
      return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
    }
  }

  @PostMapping("/reset-password")
  public ResponseEntity<String> resetPassword(@RequestParam String token, @RequestParam String newPassword) {
    try {
      passwordResetService.resetPassword(token, newPassword);
      return new ResponseEntity<>("Senha redefinida com sucesso", HttpStatus.OK);
    } catch (Exception e) {
      return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
    }
  }
}

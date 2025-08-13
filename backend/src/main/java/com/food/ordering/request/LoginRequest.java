package com.food.ordering.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record LoginRequest(
  @NotBlank(message = "O email não pode ser vazio")
  @Email(message = "Formato de email inválido")
  String email,

  @NotBlank(message = "A senha não pode ser vazia")
  @Size(min = 6, message = "A senha deve ter no mínimo 6 caracteres")
  String password
) {
}
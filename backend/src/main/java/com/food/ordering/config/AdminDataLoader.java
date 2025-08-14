package com.food.ordering.config;

import com.food.ordering.model.entities.User;
import com.food.ordering.model.enums.USER_ROLE;
import com.food.ordering.repositories.UserRepository;
import com.food.ordering.services.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class AdminDataLoader implements CommandLineRunner {

  private final UserRepository userRepository;
  private final AuthService authService;

  @Value("${ADMIN_EMAIL}")
  private String adminEmail;

  @Value("${ADMIN_FULLNAME}")
  private String adminFullName;

  @Value("${ADMIN_PASSWORD}")
  private String adminPassword;

  @Override
  public void run(String... args) throws Exception {
    if (userRepository.findByEmail(adminEmail) == null) {
      System.out.println("---- Criando utilizador ADMIN padrão ----");

      User admin = new User();
      admin.setEmail(adminEmail);
      admin.setFullName(adminFullName);
      admin.setPassword(adminPassword);
      admin.setRole(USER_ROLE.ROLE_ADMIN);

      // Usa o serviço de registo para garantir que a senha é encriptada
      authService.registerUser(admin);

      System.out.println("---- Utilizador ADMIN criado com sucesso ----");
    } else {
      System.out.println("---- Utilizador ADMIN já existe. A pular a criação. ----");
    }
  }
}
package com.food.ordering.services.implement;

import com.food.ordering.model.entities.PasswordResetToken;
import com.food.ordering.model.entities.User;
import com.food.ordering.repositories.PasswordResetTokenRepository;
import com.food.ordering.repositories.UserRepository;
import com.food.ordering.services.PasswordResetService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class PasswordResetServiceImpl implements PasswordResetService {

  private final UserRepository userRepository;
  private final PasswordResetTokenRepository tokenRepository;
  private final PasswordEncoder passwordEncoder;
  private final EmailService emailService;

  @Override
  public void createPasswordResetToken(String email) throws Exception {
    User user = userRepository.findByEmail(email);
    if (user == null) {
      throw new Exception("Usuário não encontrado");
    }

    String token = UUID.randomUUID().toString();
    PasswordResetToken resetToken = new PasswordResetToken();
    resetToken.setToken(token);
    resetToken.setUser(user);
    resetToken.setExpiryDate(new Date(System.currentTimeMillis() + 3600000));
    tokenRepository.save(resetToken);

    String resetLink = "http://localhost:5173/reset-password?token=" + token;
    String subject = "Redefinição de Senha";
    String text = "Clique no link para recuperar sua senha: " + resetLink;
    emailService.sendEmail(user.getEmail(), subject, text);
  }

  @Override
  public void resetPassword(String token, String newPassword) throws Exception {
    PasswordResetToken resetToken = tokenRepository.findByToken(token);
    if (resetToken == null || resetToken.getExpiryDate().before(new Date())) {
      throw new Exception("Token inválido ou expirado");
    }

    User user = resetToken.getUser();
    user.setPassword(passwordEncoder.encode(newPassword));
    userRepository.save(user);
    tokenRepository.delete(resetToken);
  }
}
package com.food.ordering.services.implement;

import com.food.ordering.model.entities.User;
import com.food.ordering.model.enums.USER_ROLE;
import com.food.ordering.providers.JWTProvider;
import com.food.ordering.repositories.UserRepository;
import com.food.ordering.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

  private final UserRepository userRepository;
  private final JWTProvider jwtProvider;

  @Override
  public User findUserByJwtToken(String jwt) throws Exception {
    String email = jwtProvider.getEmailFromJwtToken(jwt);

    if (email == null) {
      throw new Exception("Invalid or expired token");
    }

    User user = userRepository.findByEmail(email);

    if (user == null) {
      throw new Exception("User not found");
    }

    return user;
  }

  @Override
  public User findUserByEmail(String email) throws Exception {
    User user = userRepository.findByEmail(email);

    if (user == null) {
      throw new Exception("user not found");
    }

    return user;
  }

  @Override
  public void saveUser(User user) throws Exception {
    userRepository.save(user);
  }

  @Override
  public List<User> findAllUsers() {
    return userRepository.findAll();
  }

  @Override
  public User updateUserRole(Long userId, USER_ROLE newRole) throws Exception {
    User user = userRepository.findById(userId)
      .orElseThrow(() -> new Exception("User not found with id: " + userId));
    user.setRole(newRole);
    return userRepository.save(user);
  }
}

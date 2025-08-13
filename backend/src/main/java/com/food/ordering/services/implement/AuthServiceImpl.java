package com.food.ordering.services.implement;

import com.food.ordering.exceptions.CustomBadCredentialsException;
import com.food.ordering.model.entities.Cart;
import com.food.ordering.model.entities.User;
import com.food.ordering.model.enums.USER_ROLE;
import com.food.ordering.providers.JWTProvider;
import com.food.ordering.repositories.CartRepository;
import com.food.ordering.repositories.UserRepository;
import com.food.ordering.request.LoginRequest;
import com.food.ordering.response.AuthResponse;
import com.food.ordering.services.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthServiceImpl implements AuthService {

  @Autowired
  private UserRepository userRepository;

  @Autowired
  private PasswordEncoder passwordEncoder;

  @Autowired
  private JWTProvider jwtProvider;

  @Autowired
  private CustomerUserDetailsService customerUserDetailsService;

  @Autowired
  private CartRepository cartRepository;

  @Override
  public AuthResponse registerUser(User user) throws Exception {
    User emailExists = userRepository.findByEmail(user.getEmail());

    if (emailExists != null) {
      throw new Exception("Email is already used with another account");
    }

    User createdUser = new User();
    createdUser.setEmail(user.getEmail());
    createdUser.setFullName(user.getFullName());
    createdUser.setRole(user.getRole());
    createdUser.setPassword(passwordEncoder.encode(user.getPassword()));
    User savedUser = userRepository.save(createdUser);

    Cart cart = new Cart();
    cart.setCustomer(savedUser);
    cartRepository.save(cart);

    Authentication authentication = new UsernamePasswordAuthenticationToken(savedUser.getEmail(), user.getPassword());
    SecurityContextHolder.getContext().setAuthentication(authentication);

    String jwt = jwtProvider.generateToken(authentication);

    AuthResponse authResponse = new AuthResponse();
    authResponse.setJwt(jwt);
    authResponse.setMessage("User Registered if success");
    authResponse.setRole(savedUser.getRole());

    return authResponse;
  }


  @Override
  public AuthResponse authenticateUser(LoginRequest request) {
    String email = request.email();
    String password = request.password();

    UserDetails userDetails = customerUserDetailsService.loadUserByUsername(email);

    if (userDetails == null || !passwordEncoder.matches(password, userDetails.getPassword())) {
      throw new CustomBadCredentialsException();
    }

    Authentication authentication = new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
    String jwt = jwtProvider.generateToken(authentication);

    String role = userDetails.getAuthorities().isEmpty() ? null : userDetails.getAuthorities().iterator().next().getAuthority();
    USER_ROLE userRole = USER_ROLE.valueOf(role);

    AuthResponse authResponse = new AuthResponse();
    authResponse.setJwt(jwt);
    authResponse.setMessage("Login Success");
    authResponse.setRole(userRole);

    return authResponse;
  }
}

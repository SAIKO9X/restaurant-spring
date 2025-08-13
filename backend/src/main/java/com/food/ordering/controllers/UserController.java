package com.food.ordering.controllers;

import com.food.ordering.model.entities.Address;
import com.food.ordering.model.entities.User;
import com.food.ordering.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
public class UserController {

  @Autowired
  private UserService userService;


  @GetMapping("/profile")
  public ResponseEntity<User> findUserByJwtToken(@RequestHeader("Authorization") String jwt) throws Exception {
    User user = userService.findUserByJwtToken(jwt);
    return new ResponseEntity<>(user, HttpStatus.OK);
  }

  @GetMapping("/email")
  public ResponseEntity<User> findUserByEmail(@RequestParam String email) throws Exception {
    User user = userService.findUserByEmail(email);
    return new ResponseEntity<>(user, HttpStatus.OK);
  }
}

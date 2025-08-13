package com.food.ordering.controllers;

import com.food.ordering.model.entities.Address;
import com.food.ordering.model.entities.User;
import com.food.ordering.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class AddressController {

  @Autowired
  private UserService userService;

  @PostMapping("/address")
  public ResponseEntity<Address> addAddress(@RequestBody Address address, @RequestHeader("Authorization") String jwt) throws Exception {
    User user = userService.findUserByJwtToken(jwt);
    address.setUser(user);
    user.getAddresses().add(address);
    userService.saveUser(user);
    return new ResponseEntity<>(address, HttpStatus.CREATED);
  }

  @GetMapping("/user/addresses")
  public ResponseEntity<List<Address>> getUserAddresses(@RequestHeader("Authorization") String jwt) throws Exception {
    User user = userService.findUserByJwtToken(jwt);
    return new ResponseEntity<>(user.getAddresses(), HttpStatus.OK);
  }
}
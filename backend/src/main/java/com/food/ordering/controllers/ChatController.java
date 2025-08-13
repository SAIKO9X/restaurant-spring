package com.food.ordering.controllers;

import com.food.ordering.model.entities.Chat;
import com.food.ordering.model.entities.Message;
import com.food.ordering.model.entities.Restaurant;
import com.food.ordering.model.entities.User;
import com.food.ordering.request.MessageRequest;
import com.food.ordering.services.ChatService;
import com.food.ordering.services.RestaurantService;
import com.food.ordering.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/chats")
@RequiredArgsConstructor
public class ChatController {

  private final ChatService chatService;
  private final UserService userService;
  private final RestaurantService restaurantService;

  @PostMapping
  public ResponseEntity<Chat> createChat(@RequestHeader("Authorization") String jwt, @RequestParam Long restaurantId) throws Exception {
    User user = userService.findUserByJwtToken(jwt);
    Chat chat = chatService.createChat(user, restaurantId);
    return new ResponseEntity<>(chat, HttpStatus.CREATED);
  }

  @PostMapping("/send-message")
  public ResponseEntity<Message> sendMessage(@RequestHeader("Authorization") String jwt, @RequestBody MessageRequest request) throws Exception {
    User user = userService.findUserByJwtToken(jwt);
    Message message = chatService.sendMessage(user, request.chatId(), request.content());
    return new ResponseEntity<>(message, HttpStatus.CREATED);
  }

  @GetMapping("/{chatId}/messages")
  public ResponseEntity<List<Message>> getChatMessages(@PathVariable Long chatId) throws Exception {
    List<Message> messages = chatService.getChatMessages(chatId);
    return new ResponseEntity<>(messages, HttpStatus.OK);
  }

  @GetMapping("/user")
  public ResponseEntity<List<Chat>> getUsersChats(@RequestHeader("Authorization") String jwt) throws Exception {
    User user = userService.findUserByJwtToken(jwt);
    List<Chat> chats = chatService.findUsersChats(user.getId());
    return new ResponseEntity<>(chats, HttpStatus.OK);
  }

  @GetMapping("/restaurant")
  public ResponseEntity<List<Chat>> getRestaurantsChats(@RequestHeader("Authorization") String jwt) throws Exception {
    User user = userService.findUserByJwtToken(jwt);
    Restaurant restaurant = restaurantService.findRestaurantByUserId(user.getId());
    List<Chat> chats = chatService.findRestaurantsChats(restaurant.getId());
    return new ResponseEntity<>(chats, HttpStatus.OK);
  }
}
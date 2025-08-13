package com.food.ordering.services;

import com.food.ordering.model.entities.Chat;
import com.food.ordering.model.entities.Message;
import com.food.ordering.model.entities.User;

import java.util.List;

public interface ChatService {
  Chat createChat(User customer, Long restaurantId) throws Exception;

  Message sendMessage(User sender, Long chatId, String content) throws Exception;

  List<Message> getChatMessages(Long chatId) throws Exception;

  List<Chat> findUsersChats(Long userId);

  List<Chat> findRestaurantsChats(Long restaurantId);
}
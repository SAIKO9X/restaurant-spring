package com.food.ordering.services.implement;

import com.food.ordering.model.entities.Chat;
import com.food.ordering.model.entities.Message;
import com.food.ordering.model.entities.Restaurant;
import com.food.ordering.model.entities.User;
import com.food.ordering.repositories.ChatRepository;
import com.food.ordering.repositories.MessageRepository;
import com.food.ordering.services.ChatService;
import com.food.ordering.services.RestaurantService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ChatServiceImpl implements ChatService {

  private final ChatRepository chatRepository;
  private final MessageRepository messageRepository;
  private final RestaurantService restaurantService;

  @Override
  public Chat createChat(User customer, Long restaurantId) throws Exception {
    // Primeiro, procure por um chat existente
    Optional<Chat> existingChat = chatRepository.findByCustomerIdAndRestaurantId(customer.getId(), restaurantId);

    // Se o chat já existir, retorne-o
    if (existingChat.isPresent()) {
      return existingChat.get();
    }

    // Se não existir, crie um novo
    Restaurant restaurant = restaurantService.findRestaurantById(restaurantId);
    Chat newChat = new Chat();
    newChat.setCustomer(customer);
    newChat.setRestaurant(restaurant);

    return chatRepository.save(newChat);
  }

  @Override
  public Message sendMessage(User sender, Long chatId, String content) throws Exception {
    Chat chat = chatRepository.findById(chatId)
      .orElseThrow(() -> new Exception("Chat not found with id: " + chatId));

    Message message = new Message();
    message.setSender(sender);
    message.setChat(chat);
    message.setContent(content);

    Message savedMessage = messageRepository.save(message);
    chat.getMessages().add(savedMessage);
    chatRepository.save(chat); // Atualiza o chat com a nova mensagem

    return savedMessage;
  }

  @Override
  public List<Message> getChatMessages(Long chatId) throws Exception {
    chatRepository.findById(chatId)
      .orElseThrow(() -> new Exception("Chat not found with id: " + chatId));
    return messageRepository.findByChatIdOrderByTimestampAsc(chatId);
  }

  @Override
  public List<Chat> findUsersChats(Long userId) {
    return chatRepository.findByCustomerId(userId);
  }

  @Override
  public List<Chat> findRestaurantsChats(Long restaurantId) {
    return chatRepository.findByRestaurantId(restaurantId);
  }
}
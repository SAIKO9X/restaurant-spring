package com.food.ordering.repositories;

import com.food.ordering.model.entities.Message;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MessageRepository extends JpaRepository<Message, Long> {
  List<Message> findByChatIdOrderByTimestampAsc(Long chatId);
}
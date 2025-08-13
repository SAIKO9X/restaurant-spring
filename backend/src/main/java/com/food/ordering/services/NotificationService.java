package com.food.ordering.services;

import com.food.ordering.model.entities.Notification;
import com.food.ordering.model.entities.User;

import java.util.List;

public interface NotificationService {
  List<Notification> getUserNotifications(String jwt) throws Exception;

  void createNotification(User user, String message);
}

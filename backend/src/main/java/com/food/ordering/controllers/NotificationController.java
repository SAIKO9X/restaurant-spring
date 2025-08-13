package com.food.ordering.controllers;

import com.food.ordering.model.entities.Notification;
import com.food.ordering.services.NotificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/notifications")
public class NotificationController {

  @Autowired
  private NotificationService notificationService;

  @GetMapping
  public List<Notification> getUserNotifications(@RequestHeader("Authorization") String jwt) throws Exception {
    return notificationService.getUserNotifications(jwt.replace("Bearer ", ""));
  }
}

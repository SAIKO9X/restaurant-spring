package com.food.ordering.services.implement;

import com.food.ordering.model.entities.Notification;
import com.food.ordering.model.entities.User;
import com.food.ordering.repositories.NotificationRepository;
import com.food.ordering.services.NotificationService;
import com.food.ordering.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class NotificationServiceImpl implements NotificationService {

  private final NotificationRepository notificationRepository;
  private final UserService userService;

  @Override
  public List<Notification> getUserNotifications(String jwt) throws Exception {
    User user = userService.findUserByJwtToken(jwt);
    return notificationRepository.findByUserId(user.getId());
  }

  @Override
  public void createNotification(User user, String message) {
    Notification notification = new Notification();
    notification.setUser(user);
    notification.setMessage(message);
    notificationRepository.save(notification);
  }
}
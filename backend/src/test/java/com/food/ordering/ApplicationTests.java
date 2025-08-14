package com.food.ordering;

import com.food.ordering.services.PaymentService;
import com.food.ordering.services.implement.EmailService;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

@SpringBootTest
class ApplicationTests {

  @MockBean
  private EmailService emailService;

  @MockBean
  private PaymentService paymentService;

  @Test
  void contextLoads() {
    
  }

}
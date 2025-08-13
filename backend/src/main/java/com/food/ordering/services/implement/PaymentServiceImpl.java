package com.food.ordering.services.implement;

import com.food.ordering.model.entities.Order;
import com.food.ordering.response.PaymentResponse;
import com.food.ordering.services.PaymentService;
import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.checkout.Session;
import com.stripe.param.checkout.SessionCreateParams;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class PaymentServiceImpl implements PaymentService {

  @Value("${stripe.api.key}")
  private String apiKey;

  @Override
  public PaymentResponse createPaymentLink(Order order) throws StripeException {
    Stripe.apiKey = apiKey;

    SessionCreateParams params = SessionCreateParams.builder()
      .addLineItem(SessionCreateParams.LineItem.builder()
        .setPriceData(SessionCreateParams.LineItem.PriceData.builder()
          .setCurrency("BRL")
          .setUnitAmount((long) order.getTotalPrice() * 100)
          .setProductData(SessionCreateParams.LineItem.PriceData.ProductData.builder()
            .setName("Food Ordering")
            .build())
          .build())
        .setQuantity(1L)
        .build()
      )
      .addPaymentMethodType(SessionCreateParams.PaymentMethodType.CARD)
      .setMode(SessionCreateParams.Mode.PAYMENT)
      .setSuccessUrl("http://localhost:5173/payment/success/" + order.getId())
      .setCancelUrl("http://localhost:5173/payment/failure")
      .build();

    Session session = Session.create(params);

    return new PaymentResponse(session.getUrl());
  }
}

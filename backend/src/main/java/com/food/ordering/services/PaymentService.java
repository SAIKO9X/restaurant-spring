package com.food.ordering.services;

import com.food.ordering.model.entities.Order;
import com.food.ordering.response.PaymentResponse;
import com.stripe.exception.StripeException;

public interface PaymentService {

  public PaymentResponse createPaymentLink(Order Order) throws StripeException;
}

package com.food.ordering.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AnalyticsResponse {
  private double totalRevenue;
  private long totalOrders;
  private List<OrderResponse> recentOrders;
}
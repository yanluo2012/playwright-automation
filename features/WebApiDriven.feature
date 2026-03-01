Feature: API seeded order validation

  @Regression @API
  Scenario: Validate API created order in UI
    Given an API created order for "ZARA COAT 3" with "yanluo2012@gmail.com" and ".5x.xGRyB8h6RR#"
    When I open the client app with the API token
    And I open My Orders and view the API created order
    Then the order details should match the API created order id

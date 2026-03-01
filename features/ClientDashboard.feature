Feature: Client Dashboard validation

  @endtoend
  Scenario: Placing the Order
    Given a login to client Ecommerce applicataion with "yanluo2012@gmail.com" and ".5x.xGRyB8h6RR#"
    When Add "ZARA COAT 3" to Cart
    Then Verify "ZARA COAT 3" is displayed in Cart
    Then Verify logged in email is displayed on checkout page
    When Enter valid details and Place the Order
    Then Verify order in present in the OrderHistory

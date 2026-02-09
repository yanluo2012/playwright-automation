Feature: Ecommerce validation

  @Regression
  Scenario: Placing the Order
    Given a login to Ecommerce applicataion with "yanluo2012@gmail.com" and ".5x.xGRyB8h6RR#"
    When Add "ZARA COAT 3" to Cart
    Then Verify "ZARA COAT 4" is displayed in Cart
    When Enter valid details and Place the Order
    Then Verify order in present in the OrderHistory

  @Validation
  Scenario Outline: Validation of incorrect login
    Given a login to Ecommerce2 applicataion with "<username>" and "<password>"
    Then Verify Error message is displayed

    Examples:
      | username             | password  |
      | yanluo2012@gmail.com | wrongpwd  |
      | hello@123.com        | wrongpwd2 |

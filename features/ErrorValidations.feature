Feature: Ecommerce validation

  @Validation
  Scenario Outline: Validation of incorrect login
    Given a login to Ecommerce2 applicataion with "<username>" and "<password>"
    Then Verify Error message is displayed

    Examples:
      | username             | password  |
      | yanluo2012@gmail.com | wrongpwd  |
      | hello@123.com        | wrongpwd2 |

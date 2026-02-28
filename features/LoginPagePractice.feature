Feature: Login Page Practice validation

  @Validation
  Scenario Outline: Validation of incorrect login
    Given a login to loginpagePractise Ecommerce applicataion with "<username>" and "<password>"
    And click on Sign In button
    Then Verify Error message is displayed

    Examples:
      | username             | password  |
      | yanluo2012@gmail.com | wrongpwd  |
      | hello@123.com        | wrongpwd2 |

  @working
  Scenario: Validation of product visibility after successful login
    Given a login to loginpagePractise Ecommerce applicataion with "rahulshettyacademy" and "Learning@830$3mK2"
    When choose "User" role
    And agree to user role warning
    And select "Consultant" from dropdown
    And accept terms and conditions
    Then Verify blinking text is displayed
    When click on Sign In button
    Then Verify "iphone X" is displayed in Shop Page

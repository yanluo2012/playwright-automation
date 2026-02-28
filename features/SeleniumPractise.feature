Feature: Selenium Practice validations

  @seleniumpractice
  Scenario: Search and add product to cart
    Given launch the Selenium Practice application
    When Search for product "Brocolli"
    Then Verify product "Brocolli" is displayed
    When Add the searched product to cart
    Then Verify cart count is "1"
    When Click Top Deals link
    And Choose Delivery Date to "16" "June" "2026"
    Then Verify Delivery Date is "16" "June" "2026"

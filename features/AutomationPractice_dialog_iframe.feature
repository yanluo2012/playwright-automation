Feature: Automation Practice validations

  @automationpractice
  Scenario: Popup and iframe validation
    Given launch the Automation Practice application
    Then Verify Hide Show textbox is visible
    When Click Hide button
    Then Verify Hide Show textbox is hidden
    ## dialog is also known as alert, popup
    When Accept confirm dialog
    And Hover over Mouse Hover button
    And Click NEW All Access plan in iframe
    Then Verify frame heading contains "Happy"

Feature: Validation on Angular Practice page

  @angular
  Scenario: Validation on Angular Practice page
    Given launch the Angular Practice application
    When Select Date of Birth to "1/1/2026"
    Then Verify Date of Birth is "1/1/2026"
    When Fill password with "learning123"
    Then Verify password is "learning123"
    When Select Female from Gender dropdown
    Then Verify Female is selected in Gender dropdown
    When Check the Ice Cream checkbox
    Then Verify the checkbox is checked
    When Select Employed employment status
    Then Verify Employed employment status is selected
    When Click Sign In button
    Then Verify "Success!" message displayed
    When Click Shop link
    Then Verify Blackberry phone product is on the page

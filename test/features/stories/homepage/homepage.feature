Feature: Homepage
  So that   users can visit the site
  As an     Visitor
  I should  be able to see homepage

  Scenario: Homepage access
    Given I'm not logged in
    When  I visit the homepage
    Then  I should see the homepage

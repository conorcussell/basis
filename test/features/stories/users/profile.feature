Feature: Profile
  So that   I can view my profile
  As a logged in user
  I should  be able to see my profile page

  Scenario: Profile Access
    Given I am logged in to my account
    When  I visit my profile page
    Then  I should see my profile page

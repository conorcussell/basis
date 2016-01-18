Feature: Profile
  So that   I can add posts
  As a logged in user
  I should  be able to create, read, update and delete posts

  Background:
    Given I am logged in to my account
    And  I visit the posts page

    Scenario: Create a Post
      And  I visit the create post page
      And  I add a post
      Then I should see that post on the posts page

    Scenario: Read a Post
      And  I visit a post
      Then I should see that post

    Scenario: Update a Post
      And  I visit a post
      And I update that post
      Then I should see that updated post on the posts page

    Scenario: Delete a Post
      And  I visit a post
      And I delete that post
      Then I should not see that post on the posts page

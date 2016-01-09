module.exports = function () {

  this.When(/^I visit the signup page$/, function () {
    return this.visit('http://localhost:5000/signup');
  });


  this.Then(/^I should see the signup page$/, function () {
    this.browser.visit('http://localhost:5000/signup').then(function() {
      return browser.assert.text('title', 'Signup');
    });
  });

};

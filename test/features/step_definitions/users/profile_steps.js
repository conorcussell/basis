module.exports = function () {

  this.When(/^I visit my profile page$/, function () {
    return this.visit('http://localhost:5000/signup');
  });

  this.Then(/^I should see my profile page$/, function (callback) {
    // Write code here that turns the phrase above into concrete actions
    callback.pending();
  });

};


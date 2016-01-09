module.exports = function () {

  this.When(/^I visit the homepage$/, function () {
    return this.visit('http://localhost:5000');
  });


  this.Then(/^I should see the homepage$/, function () {
    this.browser.visit('http://localhost:5000').then(function() {
      return browser.assert.text('title', 'Basis Home');
    });
  });

};

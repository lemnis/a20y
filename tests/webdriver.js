var {Builder, By, until} = require('selenium-webdriver');
var test = require('selenium-webdriver/testing');

test.describe('Google Search', function() {
  var driver;
  test.after(function(done) {
      driver.quit();
      done();
      console.log(Date.now(), done);
  });

  test.before(function(done) {
    driver = new Builder().forBrowser('firefox').build(() => {
        console.log(arguments);
    });
    done();
    console.log(Date.now(), done);
  });


  test.it('should append query to title', function() {
      console.log(driver);
    driver.get('http://www.google.com/ncr');
    driver.findElement(By.name('q')).sendKeys('webdriver');
    driver.findElement(By.name('btnK')).click();
    driver.wait(until.titleIs('webdriver - Google Search'), 1000);
  });
});

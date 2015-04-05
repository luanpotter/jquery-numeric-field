(function ($) {
  "use strict";

  QUnit.test("getGreeting", function(assert) {
    var el = $("<div>");
    assert.equal(el.getGreeting(), "Hello, world!");
  });

}(jQuery));

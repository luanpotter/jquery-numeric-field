(function ($) {
  "use strict";

  var input = function() {
    return $("<input>").attr("type", "text");
  };

  var type = function(input, value) {
    return input.val(value).trigger("input");
  };

  var typeAndExit = function(input, value) {
    return type(input, value).trigger("blur");
  };

  QUnit.test("numericField defaults", function(assert) {
    var el = input().numericField();
    type(el, "az\"/;123a123ç~");
    assert.equal(el.val(), "123123");
  });

  QUnit.test("numericField integer true", function(assert) {
    var el = input().numericField({ integer : true });
    type(el, "123.456");
    assert.equal(el.val(), "123456");
  });

  QUnit.test("numericField integer false", function(assert) {
    var el = input().numericField({ integer : false });
    type(el, "123.456");
    assert.equal(el.val(), "123.456");
  });

  QUnit.test("numericField decimal", function(assert) {
    var el = input().numericField({ integer : false, decimal : ';' });
    type(el, "123;456");
    assert.equal(el.val(), "123;456");
  });

  QUnit.test("numericField decimal disallow multiple chars", function(assert) {
    assert.throws(function() {
      input().numericField({ decimal : ".." });
    }, function (e) {
      return e.message === "The decimal separator must have a single character.";
    });
  });

  QUnit.test("numericField decimal disallow digit", function(assert) {
    assert.throws(function() {
      input().numericField({ decimal : "2" });
    }, function (e) {
      return e.message === "The decimal separator cannot be a digit (0-9).";
    });
  });

  QUnit.test("numericField min non-negative only", function(assert) {
    var el = input().numericField({ min : 0  });
    type(el, "-123");
    assert.equal(el.val(), "123");
  });

  QUnit.test("numericField min auto", function(assert) {
    var el = input().numericField({ min : 42, auto_update : true });
    typeAndExit(el, "12");
    assert.equal(el.val(), "42");
    typeAndExit(el, "asd6asdas");
    assert.equal(el.val(), "42");
    typeAndExit(el, "120");
    assert.equal(el.val(), "120");
  });

  QUnit.test("numericField max auto", function(assert) {
    var el = input().numericField({ max : 42, auto_update : true });
    typeAndExit(el, "120");
    assert.equal(el.val(), "42");
    typeAndExit(el, "asd6asd3as");
    assert.equal(el.val(), "42");
    typeAndExit(el, "12");
    assert.equal(el.val(), "12");
  });

  QUnit.test("numericValue", function(assert) {
    var el = input().numericField();
    type(el, "a1a2a0;;");
    assert.ok(el.numericValue() === 120);
  });

  QUnit.test("numericValue float", function(assert) {
    var el = input().numericField({ integer : false });
    type(el, "a1a2a0;;");
    assert.ok(el.numericValue() === 120.0);
  });

  QUnit.test("numericValue float custom separator", function(assert) {
    var el = input().numericField({ integer : false, decimal : ')' });
    type(el, "a1a2a0;;)21");
    assert.ok(el.numericValue() === 120.21);
  });

  QUnit.test("numericValue fails if non-initialized", function(assert) {
    var el = input();
    assert.throws(function() {
      el.numericValue();
    }, function(e) {
      return e.message === "numericValue function called on non-initialized object. You must first call numericField to set it up.";
    });
  });

}(jQuery));

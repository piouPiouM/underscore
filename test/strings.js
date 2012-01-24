$(document).ready(function() {

  module("Strings");

  var testException = function(fn, arg) {
    raises(function() {
      return _[fn](arg);
    }, TypeError, 'the given argument must be a string.');
  };

  test("strings: downcase", function() {
    equals(_.downcase("hellO"), "hello");
    equals(_.downcase("hello"), "hello");
    equals(_.downcase("HELLO"), "hello");
    equals(_.downcase("abc HELLO 123"), "abc hello 123");
  });

  test("strings: upcase", function() {
    equals(_.upcase("hellO"), "HELLO");
    equals(_.upcase("HELLO"), "HELLO");
    equals(_.upcase("hello"), "HELLO");
    equals(_.upcase("abc hello 123"), "ABC HELLO 123");
  });

  test("strings: isUpperCase", function() {
    ok(_.isUpperCase("HELLO"), '"HELLO" is in upper case.');
    ok(!_.isUpperCase("hello"), '"hello" is not in upper case.');
    ok(!_.isUpperCase("hELlo"), '"hELlo" is not in upper case.');
  });

  test("strings: isLowerCase", function() {
    ok(_.isLowerCase("hello"), '"hello" is in lower case.');
    ok(!_.isLowerCase("HELLO"), '"HELLO" is not in lower case.');
    ok(!_.isLowerCase("hELlo"), '"hELlo" is not in upper case.');
  });

  test("strings: capitalize", function () {
    equals(_.capitalize("hello"), 'Hello');
    equals(_.capitalize("HELLO"), 'Hello');
    equals(_.capitalize("123ABC"), '123abc');
    equals(_.capitalize("abc Hello 123"), "Abc hello 123");
  });

  test("strings: swapcase", function() {
    ok(_.isUpperCase(_.swapcase("hello")));
    ok(_.isLowerCase(_.swapcase("HELLO")));
    equals(_.swapcase("Hello"), "hELLO");
    equals(_.swapcase("piouPiouM 123"), "PIOUpIOUm 123");
    equals(_.swapcase("HI&low"), "hi&LOW");
    equals(_.swapcase("$^#^%$#!!"), "$^#^%$#!!");
  });

  test("strings: empty", function() {
    ok(_.empty(""));
    ok(!_.empty("not"));
    ok(!_.empty(" "));
    ok(!_.empty("    "));
    testException('empty', 0);
    testException('empty', null);
    testException('empty', undefined);
  });

  test("strings: repeat", function () {
    equals(_.repeat("x", 5), "xxxxx", "Single char 'x' repeated 5 times");
    equals(_.repeat("hello", 2), "hellohello", "A string 'hello' repeated 2 times");
    equals(_.repeat("", 5), "", "An empty string is not repeated");
    equals(_.repeat("x", -2), "", "Negative multiplier returns an empty String");
    equals(_.repeat("x", 2.14), "xx");
  });

  test("strings: reverse", function () {
    equals(_.reverse("stressed"), "desserts", "Reverse string 'stressed'");
    equals(_.reverse("madamImadam"), "madamImadam", "Reverse the palindrome 'madamImadam'");
    equals(_.reverse(""), "", "Reverse an empty string");
    testException('reverse', undefined);
    testException('reverse', 123);
    testException('reverse', null);
  });

  test("strings: ljust", function() {
    equals(_.ljust("hello", 4), "hello");
    equals(_.ljust("hello", 5), "hello");
    equals(_.ljust("hello", 20), "hello               ");
    equals(_.ljust("hello", 20, "123"), "hello123123123123123");
    equals(_.ljust("hello", -20), "hello");
    equals(_.ljust("hello", -20, "123"), "hello");
  });

  test("strings: rjust", function() {
    equals(_.rjust("hello", 4), "hello");
    equals(_.rjust("hello", 5), "hello");
    equals(_.rjust("hello", 20), "               hello");
    equals(_.rjust("hello", 20, "123"), "123123123123123hello");
    equals(_.rjust("hello", -20), "hello");
    equals(_.rjust("hello", -20, "123"), "hello");
  });

  test("strings: center", function() {
    equals(_.center("hello", 4), "hello");
    equals(_.center("hello", 5), "hello");
    equals(_.center("hello", 20), "       hello        ");
    equals(_.center("hello", 11), "   hello   ");
    equals(_.center("hello", 20, "123"), "1231231hello12312312");
    equals(_.center("hello", -20), "hello");
    equals(_.center("hello", -20, "123"), "hello");
  });

});

$(document).ready(function() {

  module("Strings");

  var testException = function(fn, msg) {
    var args = Array.prototype.slice.call(arguments, 2);
    raises(function() {
      return _[fn].apply(null, args);
    }, TypeError, msg);
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
    testException('empty', "the given argument must be a string.", 0);
    testException('empty', "the given argument must be a string.", null);
    testException('empty', "the given argument must be a string.", undefined);
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
    testException('reverse', "the given argument must be a string.", undefined);
    testException('reverse', "the given argument must be a string.", 123);
    testException('reverse', "the given argument must be a string.", null);
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

  test("strings: squeeze", function() {
    equals(_.squeeze("yellow moon"), "yelow mon", "Replace identical characters by a single character in 'yellow moon'");
    equals(_.squeeze("  now   is  the", " "), " now is the", "Replace spaces from by a single space in '  now   is  the'");
    equals(_.squeeze("putters shoot balls", "m-z"), "puters shot balls", "Replace all characters from the set [m-z] by a single character in 'putters shoot balls'");
    equals(_.squeeze("aaabbbbccc"), "abc");
    equals(_.squeeze("aa   bb      cc", " "), "aa bb cc");
    equals(_.squeeze("BxxxTyyyWzzzzz", "a-z"), "BxTyWz");
  });

  test("strings: chop", function() {
    equals(_.chop("hello"), "hell");
    equals(_.chop("hello\r\n"), "hello");
    equals(_.chop("hello\n\r"), "hello\n");
    equals(_.chop("hello\n"), "hello");
    equals(_.chop("\r\n"), "");
    equals(_.chop(""), "");
    equals(_.chop("x"), "");
    equals(_.chop(_.chop("x")), "");
  });

  test("strings: chomp", function() {
    equals(_.chomp("hello"), "hello");
    equals(_.chomp("hello\n"), "hello");
    equals(_.chomp("hello\r\n"), "hello");
    equals(_.chomp("hello\n\r"), "hello\n");
    equals(_.chomp("hello\r"), "hello");
    equals(_.chomp("hello \n there"), "hello \n there");
    equals(_.chomp("hello!", "!"), "hello");
    equals(_.chomp("hello", "llo"), "he");
    equals(_.chomp("hello", "hel"), "hello");
  });

  test("strings: index", function() {
    equals(_.index("hello", "h"), 0);
    equals(_.index("hello", "ell"), 1);
    equals(_.index("hello", ""), 0);

    equals(_.index("hello", /ll./), 2);
    equals(_.index("hello", /.?h/), 0);
    equals(_.index("hello", /.+l/), 0);
    equals(_.index("hello", /l(?!l)/), 3);
    equals(_.index("hello", /l$/), -1);

    equals(_.index("hello", "l", 3), 3);
    equals(_.index("hello", "", 3), 3);
    equals(_.index("hello", /l./, 3), 3);
    equals(_.index("hello", /[aeiou]/, -3), 4);

    equals(_.index("abcde", "c", 0), 2);
    equals(_.index("abcde", "c", -1), -1);
    equals(_.index("abcde", "c", -2), -1);
    equals(_.index("abcde", "c", -3), 2);
    equals(_.index("abcde", "c", -5), 2);
    equals(_.index("abcde", "c", -6), -1);
    equals(_.index("abcde", "c", -20), -1);

    equals(_.index("hello", "z"), -1);
    equals(_.index("hello", /z./), -1);
    equals(_.index("hello", "z", 3),  -1);
    equals(_.index("hello", /z./, 3), -1);
    equals(_.index("hello", /.?z/, 3), -1);

    testException("index", "'string' argument must be a string.", 123, "2");
    testException("index", "'subtring' argument must be a string or a pattern.", "hello", 2);
    testException("index", "'offset' argument must be a number.", "hello", "h", "z");
  });

  test("strings: strip", function() {
    equals(_.strip("      x        "), "x");
    equals(_.strip(" \n\r\t     x  \t\r\n\n      "), "x");
    equals(_.strip("\xa0"), "");
    equals(_.strip("a\xa0"), "a");
    equals(_.strip("w     x       y"), "w     x       y");
    equals(_.strip(""), "");
    testException("strip", "the given argument must be a string.", []);
  });

  test("strings: lstrip", function() {
    equals(_.lstrip("      x        "), "x        ");
    equals(_.lstrip(" \n\r\t     x  \t\r\n\n      "), "x  \t\r\n\n      ");
    equals(_.lstrip("\xa0"), "");
    equals(_.lstrip("\xa0a"), "a");
    equals(_.lstrip("w     x       y"), "w     x       y");
    equals(_.lstrip(""), "");
    testException("lstrip", "the given argument must be a string.", []);
  });

  test("strings: rstrip", function() {
    equals(_.rstrip("      x        "), "      x");
    equals(_.rstrip(" \n\r\t     x  \t\r\n\n      "), " \n\r\t     x");
    equals(_.rstrip("\xa0"), "");
    equals(_.rstrip("a\xa0"), "a");
    equals(_.rstrip("w     x       y"), "w     x       y");
    equals(_.rstrip(""), "");
    testException("rstrip", "the given argument must be a string.", []);
  });

  test("string: chars", function(){
    deepEqual(_.chars("hello"), "hello".split(""));
    equals(_.chars("hello", function(c) { return c + "-"; }), "h-e-l-l-o-");
    equals(_.chars("hello", _.upcase), "HELLO");
    equals(_.each_char("hello", function(c) { return c + "-"; }), "h-e-l-l-o-");
  });

  test("string: bytes", function(){
    deepEqual(_.bytes("hello"), [104, 101, 108, 108, 111]);
    equals(_.bytes("hello", function(b) { return b + "-"; }), "104-101-108-108-111-");
    equals(_.bytes("hello", function(b) { return String.fromCharCode(++b); }), "ifmmp");
    equals(_.each_byte("hello", function(b) { return b + "-"; }), "104-101-108-108-111-");
  });

  test("string: lines", function() {
    var res  = [], i = 0;
        push = function (x) { res.push(x); };

    res = _.lines("hello\nworld");
    deepEqual(res, ["hello\n", "world"]);

    res = [];
    res = _.lines("hello\n\n\nworld");
    deepEqual(res, ["hello\n", "\n", "\n", "world"]);

    res = [];
    res = _.lines("hello\n\n\nworld", "");
    deepEqual(res, ["hello\n\n\n", "world"]);

    res = [];
    res = _.lines("hello!world", "!");
    deepEqual(res, ["hello!", "world"]);

    res=[];
    _.chain("hello!world").lines("!").each(push);
    equals("hello!", res[0]);
    equals("world",  res[1]);

    var s = null;
    _.chain("hello\nworld").each_line(null, function(s2) {
      s = s2;
    });
    equals("hello\nworld", s);

    testException('lines', 'the given separator must not be a RegExp.', "hello\nworld", /l/);
    testException('lines', 'the given separator must not be a RegExp.', "hello\nworld", 2);
  });

  test("string: count", function() {
    equals(_.count("hello world", "e", "o"), 0);
    equals(_.count("hello world", "e", "o", "z"), 0);
    equals(_.count("hello world", "d-i"), 3);
    equals(_.count("hello world", "z", "d-i"), 0);
    equals(_.count("hello world", "e", "d-i"), 1);
    equals(_.count("hello world", "o", "a-f"), 0);
    equals(_.count("hello world", "d-i", "z"), 0);
    equals(_.count("hello world", "d-i", "e"), 1);
    equals(_.count("hello world", "d-i", "o"), 0);
    equals(_.count("hello world", "^l", "d-lw"), 4);
    equals(_.count("hello world", "d-lw", "^l"), 4);
    equals(_.count("hello world", "^o"), 9);
    equals(_.count("hello world", "^o", "^e"), 8);
    equals(_.count("hello world", "^o", "^l"), 6);
    equals(_.count("abcdef", "ab-fm-p", "d-fgp", "^f", "^g"), 2);

    testException("count", "'string' argument must be a string.", 123);
  });
});

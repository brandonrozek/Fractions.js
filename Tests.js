if (typeof(module) != 'undefined' && module.exports) {
	var Fraction = require('./Fraction.js');
}
var assert = function(expected, actual) {
	if (typeof(expected) == 'object' && typeof(actual) == 'object') {
		if (!expected.equals(actual)) {
			throw new Error("Assertion Error: " + expected.toString() + " is not the same as " + actual.toString());
		}
	} else {
		if (expected != actual) {
			throw new Error("Assertion Error: " + expected + " does not equal " + actual);
		}
	}
}
var describe = function(objective, test) {
	console.log(objective);
	if (typeof(test) == 'function') {
		test();
		console.log("Tests passed\n");
	} else {
		console.log("No tests written\n");
	}
}
var section = function(label, tests) {
	console.log("\n*********************\n" +label +"\n*********************");
	if (typeof(tests) == 'function') {
		tests();
		console.log("\nSection tests passed");
	} else {
		console.log("No tests written for this section");
	}
}

section("Helper Functions -- Basic", function() {
	describe("Check if input is a string", function() {
		assert(Fraction.isString(""), true);
		assert(Fraction.isString(true), false);
		assert(Fraction.isString("Hello"), true);
		assert(Fraction.isString(5), false);
		assert(Fraction.isString("12"), true);
	});
	describe("Greatest Common Divisor algorithm", function() {
		assert(Fraction.greatestCommonDivisor(4, 20), 4);
		assert(Fraction.greatestCommonDivisor(3, 30), 3);
		assert(Fraction.greatestCommonDivisor(1, 5), 1);
		assert(Fraction.greatestCommonDivisor(6, 20), 2);
		assert(Fraction.greatestCommonDivisor(15, 33), 3);
	}); 
})

section("Constructor -- Basic \n\nEncounter any errors? Check out \n\nFraction\nFraction.simplify\nfraction.change", function() {
	describe("Tests for new Fraction()", function() {
		assert(new Fraction(1, 2), .5);
		assert(new Fraction(4, 4), 1);
		assert(new Fraction("1/10"), .1);
		assert(new Fraction(4), 4);
		assert(new Fraction("10", "5"), 2);
		assert(new Fraction("1/5"), new Fraction(1,5));
		assert(new Fraction("10", "5"), new Fraction(10.0, 5.0));
	});
});
section("Helper Functions -- Intermediate", function() {
	describe("Did the input come from the Fraction constructor?", function() {
		assert(Fraction.fromFraction(123), false);
		assert(Fraction.fromFraction(new Fraction("5.0/3.0")), true);
		assert(Fraction.fromFraction(3/2), false);
		assert(Fraction.fromFraction(new Fraction(2,5)), true);
		assert(Fraction.fromFraction("1/2"), false);
		assert(Fraction.fromFraction(new Fraction(3.4,23)), true);
		assert(Fraction.fromFraction(true), false);
		assert(Fraction.fromFraction(new Fraction("1/2")), true);
	});
	describe("To String", function() {
		assert(Fraction.toString(new Fraction(1,4)), "1/4");
		assert(new Fraction("5/6").toString(), "5/6");
		assert(Fraction.toString(new Fraction("8.0", "9.0")), "8/9");
		assert(new Fraction(5).toString(), "5");
		assert(Fraction.toString(new Fraction("7.0/3.0")), "7/3");
	});
	describe("Convert to Fraction", function() {
		assert(Fraction.toFraction(2), new Fraction(2, 1));
		assert(Fraction.toFraction("1/4"), new Fraction(1,4));
		assert(Fraction.toFraction(.7), new Fraction(7, 10));
		assert(Fraction.toFraction("8/10"), new Fraction(4,5));
	});
});
section("Arithmetic Operations", function() {
	describe("The addition operator", function() {
		assert(Fraction.add("2/12", "4/6"), new Fraction("5/6"));
		assert(new Fraction("4/8").add("1/4"), .75);
		assert(Fraction.add("2/10", "2/5"), new Fraction(3,5));
		assert(new Fraction("3/6").add("2/12"), new Fraction(2,3));
	});
	describe("The subtraction operator", function() {
		assert(Fraction.subtract("4/8", "1/4"), .25);
		assert(new Fraction("7/12").subtract("3/6"), new Fraction(1,12));
		assert(Fraction.subtract("5/12", "1/6"), .25);
		assert(new Fraction("1/2").subtract("1/3"), new Fraction(1, 6));
	});
	describe("The multiplication operator", function() {
		assert(Fraction.multiply(.9, "5/18"), .25);
		assert(new Fraction("2/3").multiply(9), 6);
		assert(Fraction.multiply("6/15", "6/7"), new Fraction(12, 35));
		assert(new Fraction("14/3").multiply("3/4"), 3.5);
	});
	describe("The division operator", function() {
		assert(Fraction.divide("2/3", "7/8"), new Fraction(16, 21));
		assert(new Fraction("5/9").divide("105/36"), new Fraction(4, 21));
		assert(Fraction.divide("5/12", "9/4"), new Fraction(5, 27));
		assert(new Fraction(19).divide("38/6"), 3);
	});
});
section("Helper Functions -- Advanced", function() {
	describe("Convert decimal to fraction", function() {
		assert(Fraction.decimalToFraction(.5), new Fraction(1, 2));
	        assert(Fraction.decimalToFraction(.25), new Fraction(1,4));
	        assert(Fraction.decimalToFraction(1.7), new Fraction(17, 10));
		assert(Fraction.decimalToFraction(8), new Fraction(8,1));
		assert(Fraction.decimalToFraction(-.5), new Fraction(-1,2));
	});
});

section("Constructor -- Advanced", function() {
	describe("Tests for new Fraction()", function() {
		assert(new Fraction(.25), .25);
		assert(new Fraction("1.2/4.5"), (1.2/4.5));
		assert(new Fraction("1.8", "1.0"), 1.8);
		assert(new Fraction(2.5, 0.1), 25);
		assert(new Fraction("1.2/4.5"), new Fraction("1.2", "4.5"));
	});
});

console.log("\nFinished!!!! All tests passed.");

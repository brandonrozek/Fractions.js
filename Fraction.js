var Fraction = function() {
	this.numerator;
	this.denominator;

	var numerator = 0;
	var denominator = 1;
	var frac;

	//If two numbers-like arguments are passed into the function
	if (!isNaN(arguments[0]) && !isNaN(arguments[1])) {
		numerator = Number(arguments[0]);
		denominator = Number(arguments[1]);

	}
	//Only a single number is present
	else if (!isNaN(arguments[0])) {
		numerator = Number(arguments[0]);
	}
	//If a string is passed into the function
	else if (Fraction.isString(arguments[0])) {
		var number = arguments[0];
		if (number.indexOf('/') != -1) {
			numerator = Number(number.substring(0, number.indexOf('/')));
			denominator = Number(number.substring(number.indexOf('/') + 1, number.length));
		} else {
			numerator = number;
		}
	}
	else {
		throw new Error("Arguments invalid");
	}

	if (!Number.isInteger(numerator) || !Number.isInteger(denominator)) {
			if (!Number.isInteger(numerator)) { numerator = Fraction.decimalToFraction(numerator); }
			if (!Number.isInteger(denominator)) { denominator = Fraction.decimalToFraction(denominator); }
			frac = Fraction.divide(numerator, denominator);
			numerator = frac.numerator;
			denominator = frac.denominator;
	}
	if (denominator == 0) {
		throw new Error("Cannot divide by zero");
	}

	this.numerator = numerator;
	this.denominator = denominator;

	this.simplify();

}

Fraction.prototype.multiply = function(frac) {
	Fraction.correctArgumentLength(1, arguments.length);
	return Fraction.change(this, Fraction.multiply(this, frac));
}
Fraction.prototype.divide = function(frac) {
	Fraction.correctArgumentLength(1, arguments.length);
	return Fraction.change(this, Fraction.divide(this, frac));
}
Fraction.prototype.add = function(frac) {
	Fraction.correctArgumentLength(1, arguments.length);
	return Fraction.change(this, Fraction.add(this, frac));
}
Fraction.prototype.subtract = function(frac) {
	Fraction.correctArgumentLength(1, arguments.length);
	return Fraction.change(this, Fraction.subtract(this, frac));
}
Fraction.prototype.simplify = function() {
	Fraction.correctArgumentLength(0, arguments.length);
	return Fraction.change(this, Fraction.simplify(this));
}
Fraction.prototype.toString = function() {
	return Fraction.toString(this);
}
Fraction.prototype.equals = function(frac) {
	return Fraction.equals(this, frac);
}
Fraction.prototype.valueOf = function() {
	return Fraction.valueOf(this);
}

Fraction.add = function(frac1, frac2) {
	Fraction.correctArgumentLength(2, arguments.length);
	frac1 = Fraction.toFraction(frac1)
	frac2 = Fraction.toFraction(frac2)

	var newFrac = frac1;
	newFrac.numerator = frac1.numerator * frac2.denominator + frac1.denominator * frac2.numerator;
	newFrac.denominator = frac1.denominator * frac2.denominator;
	return Fraction.simplify(newFrac);
}
Fraction.subtract = function(frac1, frac2) {
	Fraction.correctArgumentLength(2, arguments.length);
	frac1 = Fraction.toFraction(frac1);
	frac2 = Fraction.toFraction(frac2);

	var newFrac = frac1;
	newFrac.numerator = frac1.numerator * frac2.denominator - frac1.denominator * frac2.numerator;
	newFrac.denominator = frac1.denominator * frac2.denominator;
	return Fraction.simplify(newFrac);
}
Fraction.multiply = function(frac1, frac2) {
	Fraction.correctArgumentLength(2, arguments.length);
	frac1 = Fraction.toFraction(frac1);
	frac2 = Fraction.toFraction(frac2);

	var newFrac = frac1;
	newFrac.numerator = frac1.numerator * frac2.numerator;
	newFrac.denominator = frac1.denominator * frac2.denominator;
	return Fraction.simplify(newFrac);
}
Fraction.divide = function(frac1, frac2) {
	Fraction.correctArgumentLength(2, arguments.length);
	frac1 = Fraction.toFraction(frac1);
	frac2 = Fraction.toFraction(frac2);

	var newFrac = frac1;
	newFrac.numerator = frac1.numerator * frac2.denominator;
	newFrac.denominator = frac1.denominator * frac2.numerator;
	return Fraction.simplify(newFrac);
}

Fraction.simplify = function(frac) {
	Fraction.correctArgumentLength(1, arguments.length);
	frac = Fraction.toFraction(frac);

	var gcd = Fraction.greatestCommonDivisor(frac.numerator, frac.denominator);
	if (gcd == 1) { return frac; }
	frac.numerator /= gcd;
	frac.denominator /= gcd;
	return frac;
}
Fraction.greatestCommonDivisor = function(num1, num2) {
	var greater;
	var lesser;

	num1 = Math.abs(num1);
	num2 = Math.abs(num2);
	greater = Math.max(num1, num2);
	lesser = Math.min(num1, num2);

	while (lesser != 0) {
		var t = lesser;
		lesser = greater % lesser;
		greater = t;
	}
	return greater;
}
Fraction.toString = function(frac) {
	Fraction.correctArgumentLength(1, arguments.length);
	if (frac.denominator == 1) { return "" + frac.numerator; }
	return "" + frac.numerator + "/" + frac.denominator;
}
Fraction.equals = function(frac1, frac2) {
	Fraction.correctArgumentLength(2, arguments.length);
	frac1 = Fraction.toFraction(frac1);
	frac2 = Fraction.toFraction(frac2);

	frac1 = Fraction.simplify(frac1);
	frac2 = Fraction.simplify(frac2);
	return frac1.numerator == frac2.numerator && frac1.denominator == frac2.denominator;
}
Fraction.valueOf = function(frac) {
	Fraction.correctArgumentLength(1, arguments.length);
	frac = Fraction.toFraction(frac);
	return frac.numerator / frac.denominator;
}
Fraction.correctArgumentLength = function(ideal, actual) {
	if (ideal != actual) { throw new Error("" + ideal + " arguments needed"); }
}
Fraction.change = function(oldFrac, newFrac) {
	Fraction.correctArgumentLength(2, arguments.length);
	oldFrac.numerator = newFrac.numerator;
	oldFrac.denominator = newFrac.denominator;
	return oldFrac;
}
Fraction.isString = function(s) {
	return typeof(s) == "string" || (typeof(s) == 'object' && s.constructor == String)
}
Fraction.fromFraction = function(frac) {
	return typeof(frac) == 'object' && frac.constructor == Fraction;
}
Fraction.toFraction = function(x) {
	if (!Fraction.fromFraction(x)) {
		return new Fraction(x);
	}
	return x;
}
Fraction.decimalToFraction = function(x) {
	Fraction.correctArgumentLength(1, arguments.length);
	if (isNaN(x)) { throw new Error("Argument invalid") }

	x = String(x);
	var decLocation = x.indexOf('.');
	if (decLocation != -1) {
		var whole = x.substring(0, decLocation);
		var isNegative = (whole.indexOf('-') != -1)? true: false;
		var remainder = x.substring(decLocation + 1, x.length);
		var nthPlace = Math.pow(10, remainder.length);
		if (isNegative) {
			return Fraction.subtract(new Fraction(Number(whole), 1), new Fraction(Number(remainder), nthPlace))
		} else {
			return Fraction.add(new Fraction(Number(whole), 1), new Fraction(Number(remainder), nthPlace))
		}
	}
	else { return new Fraction(Number(x)); }
}

if (typeof module !== "undefined" && module.exports) {
	module.exports = Fraction;
}

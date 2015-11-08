# Fractions.js
A library to help do more precise fractional math

*What do you mean?*
Multiply `.1` by `.2` in javascript and you'll get something around `0.020000000000000004`, even though the correct answer is `.2`

You can read up more about it [here](http://floating-point-gui.de/).

##How to set up
###Node.js
Install
```
npm install fractions
```
Then in your program
```
var Fraction = require('fractions');
```
###Browser
Download Fraction.js, and then link it in your HTML
```
<script src="Fraction.js"></script>
```
##API
###Create a fraction
There are multiple ways to create a fraction
```
var oneHalf = new Fraction(1,2);
var oneHalf = new Fraction(.5);
var oneHalf = new Fraction("1/2");
var oneHalf = new Fraction("1", "2")
```
###Add two fractions
You can use Fraction.add(fraction1, fraction2) to add two fractions
```
var oneThird = new Fraction("1/3");
var fourThirds = new Fraction("4/3");
var fiveThirds = Fraction.add(oneThird, fourThirds);

```
You can also use Fraction.add() to add anything that can be converted into a fraction
```
var fiveThirds = Fraction.add("1/3", "4/3");
```
Another method of adding
```
var fiveThirds = new Fraction("1/3").add("4/3");
```

###Subtract two fractions
```
var oneThird = Fraction.subtract("5/3", "4/3");
```

```
var oneThird = new Fraction("5/3").subtract("4/3");
```
###Multiply two fractions
```
var oneFiftieth = Fraction.multiply(".2", ".1");
```
```
var oneFiftieth = new Fraction(".2").multiply(".1");
```
###Divide two fractions
```
var oneFifth = Fraction.divide(".02", ".1");
```
```
var oneFifth = new Fraction(".02").divide(".1");
```
###Compare two fractions
```
var oneFifth = new Fraction(1,5);
var oneOverFive = new Fraction("1/5");
oneFifth.equals(oneOverFive); //true
```
###Compare to a number
```
var oneTenth = new Fraction(1,10);
oneTenth == .1 //true
```

var targetRoutes = require('../routes/targetRoutes.js');
var assignTargets = targetRoutes.targetsRandomized;

describe('Assassin Ring Targets', function () {

  it('Throws error with no arguments', function () {
    expect(assignTargets).toThrow();
  });

  it('Throws error for non array input', function () {
  	var f = function() {
  		assignTargets("stuff");
  	}
    expect(f).toThrow();
  });

  // it('Throws error for array less than 2', function () {
  // 	var f = function() {
  // 		assignTargets(["One Person"]);
  // 	}
  //   expect(f).toThrow();
  // });

  it('For two element array, returns obvious assigments', function() {
  	expect(assignTargets(["a", "b"])).toEqual(["b", "a"]);
  });

  var times = 1000;

  it('For three, test no self-assignments - ' + times + ' times - check odds', function() {
  	var assassins = ["a", "b", "c"];
  	var targetTimes = {a: {b:0, c:0}, b: {a:0, c:0}, c: {a:0, b:0}};
  	for (var i = 0; i < times; i++) {
	  	var targets = assignTargets(assassins);
	  	expect(targets.length).toEqual(assassins.length);
	  	assassins.forEach(function(assassin, index) {
	  		expect(assassin).not.toBe(targets[index]);
	  		targetTimes[assassin][targets[index]]++;
	  	});
	};
	// check for relatively even odds
	expect(targetTimes.a.b / times).toBeGreaterThan(.45);
	expect(targetTimes.a.c / times).toBeGreaterThan(.45);
	expect(targetTimes.b.a / times).toBeGreaterThan(.45);
	expect(targetTimes.b.c / times).toBeGreaterThan(.45);
	expect(targetTimes.c.a / times).toBeGreaterThan(.45);
	expect(targetTimes.c.b / times).toBeGreaterThan(.45);
  });

  it('With ' + times + ' people, no self-assignments', function() {
  	var assassins = [];
  	for (var i = 0; i < times; i++) {
  		assassins.push("Assassin #" + i);
  	}
  	for (var i = 0; i < 5; i++) {
	  	var targets = assignTargets(assassins);
	  	expect(targets.length).toEqual(assassins.length);
	  	assassins.forEach(function(assassin, index) {
	  		expect(assassin).not.toBe(targets[index]);
	  	});
	};

  });

});
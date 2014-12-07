var should = require("chai").should(),
	decitectural = require("../index"),
	toDecimal = decitectural.toDecimal,
	toArchitectural = decitectural.toArchitectural;
	
describe("#toDecimal", function() {
	it("converts \"0'\" to 0", function() {
		toDecimal("0'", "inches", "1/100").should.equal(0);
	});
	
	it("converts \"0' 0\\\"\" to 0", function() {
		toDecimal("0' 0\"", "inches", "1/100").should.equal(0);
	});
	
	it("converts \"1'\\\" to 12", function() {
		toDecimal("1'", "inches", "1/100").should.equal(12);
	});
	
	it("converts \"43' 1 3/16\\\"\" to 517", function() {
		toDecimal("43' 1 3/16\"", "inches", "1").should.equal(517);
	});
	
	it("converts \"43' 1 3/16\\\"\" to 517.1", function() {
		toDecimal("43' 1 3/16\"", "inches", "1/10").should.equal(517.1);
	});
	
	it("converts \"43' 1 3/16\\\"\" to 517.18", function() {
		toDecimal("43' 1 3/16\"", "inches", "1/100").should.equal(517.18);
	});
	
	it("converts \"43' 1 3/16\\\"\" to 517.187", function() {
		toDecimal("43' 1 3/16\"", "inches", "1/1000").should.equal(517.187);
	});
	
	it("converts \"43' 1 3/16\\\"\" to 517.1875", function() {
		toDecimal("43' 1 3/16\"", "inches", "1/10000").should.equal(517.1875);
	});
	
	it("converts \"43' 1 3/16\\\"\" to 517.1875", function() {
		toDecimal("43' 1 3/16\"", "inches", "1/100000").should.equal(517.1875);
	});
	
	it("converts \"43\" to false", function() {
		toDecimal("43", "inches", "1/100000").should.equal(false);
	});
	
	it("converts \"43' \" to 516", function() {
		toDecimal("43' ", "inches", "1/100000").should.equal(516);
	});
	
	it("converts \"43' 1\" to false", function() {
		toDecimal("43' 1", "inches", "1/100000").should.equal(false);
	});
	
	it("converts \"43' 1 \" to false", function() {
		toDecimal("43' 1 ", "inches", "1/100000").should.equal(false);
	});
	
	it("converts \"43' 1 3\" to false", function() {
		toDecimal("43' 1 3", "inches", "1/100000").should.equal(false);
	});
	
	it("converts \"43' 1 3/\" to false", function() {
		toDecimal("43' 1 3/", "inches", "1/100000").should.equal(false);
	});
	
	it("converts \"43' 1 3/16\" to false", function() {
		toDecimal("43' 1 3/16", "inches", "1/100000").should.equal(false);
	});
	
	it("converts \"43' 1 3/16\" to false", function() {
		toDecimal("43' 1 3/16", "inches", "1/100000").should.equal(false);
	});
	
	it("converts \"43' 1 \\\"\" to false", function() {
		toDecimal("43' 1 \"", "inches", "1/100000").should.equal(false);
	});
});

describe("#toArchitectural", function() {
	it("converts 1.0 to \"0' 12\\\"\"", function() {
		toArchitectural(1.0, "feet", "1/4").should.equal("1' 0\"");
	});
	
	it("converts 0 to \"0' 0\\\"\"", function() {
		toArchitectural(0.0, "feet", "1/4").should.equal("0' 0\"");
	});
	
	it("converts 0.0 to \"0' 0\\\"\"", function() {
		toArchitectural(0.0, "feet", "1/4").should.equal("0' 0\"");
	});
	
	it("converts .0 to \"0' 0\\\"\"", function() {
		toArchitectural(.0, "feet", "1/4").should.equal("0' 0\"");
	});
	
	it("converts \"0.0\" to false", function() {
		toArchitectural("0.0", "feet", "1/4").should.equal(false);
	});
	
	it("converts Infinity to false", function() {
		toArchitectural(Infinity, "feet", "1/4").should.equal(false);
	});
	
	it("converts NaN to false", function() {
		toArchitectural(NaN, "feet", "1/4").should.equal(false);
	});
	
	it("converts Math.LN2 to \"0' 8 1/4\\\"\"", function() {
		toArchitectural(Math.LN2, "feet", "1/4").should.equal("0' 8 1/4\"");
	});
});
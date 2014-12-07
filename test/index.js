var should = require("chai").should(),
	decitectural = require("../index"),
	toDecimal = decitectural.toDecimal,
	toArchitectural = decitectural.toArchitectural;
	
describe("#toDecimal", function() {
	it("converts 1' into 12", function() {
		toDecimal("1'", "inches", "1/100").should.equal(12);
	});
});

describe("#toArchitectural", function() {
	it("converts 1.0 into 0' 12\"", function() {
		toArchitectural(1.0, "feet", "1/4").should.equal("1' 0\"");
	});
});
"use strict";

var expect = require('chai').expect;

var server = require('../../server');

describe("Encounter Builder Server", function() {

    it("should be rewritten to be testable", function() {
        /* server.js is completely untestable at this point */
        var current_state = "not testable";
        expect(current_state).to.equal("testable");
    })

});
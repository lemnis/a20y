/* eslint-env mocha */

var { JSDOM } = require('jsdom');
var assert = require('assert');

var AccessibleNode = require("./../src/type/AccessibleNode.js");

console.log(AccessibleNode);
const frag = JSDOM.fragment(`<div></div>`);
const ay = new AccessibleNode.default(frag.querySelector('div'));

describe('Array', function () {
	describe('#indexOf()', function () {
		it('should return -1 when the value is not present', function () {
			assert.equal([1, 2, 3].indexOf(4), -1);
		});
	});
});
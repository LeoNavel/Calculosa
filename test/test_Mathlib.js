/**
 * Including should assert module.
 * @type {should|exports|module.exports}
 */
var should = require('should');

/**
 * Including local modul with Mathlib
 * @type {exports|module.exports}
 */
var Mathlib = require('../app/js/Mathlib/Mathlib.js');

/**
 * @brief Class for creating automated testing.
 */
describe('Mathlib', function () {
    /**
     * Tests for round method of Mathlib.
     *
     * Should function like regular mathematic round.
     */
    describe('round()', function(){
        it('should return 5 when rounding 5', function(){
            Mathlib.round(5.3).should.equal(5);
        });
        it('should return 5 when rounding 5.0', function(){
            Mathlib.round(5.0).should.equal(5);
        });
        it('should return 5 when rounding 4.5', function(){
            Mathlib.round(4.5).should.equal(5);
        });
        it('should return 0 when rounding 0', function(){
            Mathlib.round(0).should.equal(0);
        });
        it('should return 2 when rounding 1.7', function(){
            Mathlib.round(1.7).should.equal(2);
        });
        it('should return -1 when rounding -1', function(){
            Mathlib.round(-1).should.equal(-1);
        });
        it('should return -1 when rounding -1.4', function(){
            Mathlib.round(-1.4).should.equal(-1);
        });
        it('should return -2 when rounding -2.5', function(){
            Mathlib.round(-2.5).should.equal(-2);
        });
        it('should return -4 when rounding -3.9', function(){
            Mathlib.round(-3.9).should.equal(-4);
        });
        it('should return -10 when rounding -10', function(){
            Mathlib.round(-10).should.equal(-10);
        });
    });
    /**
     * Tests for addition method of Mathlib.
     *
     * Should function like regular mathematic addition.
     */
    describe('addition()', function () {
        it('should return 8 when adding 5 to 3', function () {
            Mathlib.addition(5, 3).should.equal(8);
        });
        it('should return -200 when adding -250 to 50', function () {
            Mathlib.addition(-250, 50).should.equal(-200);
        });
        it('should return -1000000 when adding -1 to -999999', function () {
            Mathlib.addition(-999999, -1).should.equal(-1000000);
        });
        it('should return 593183759184 when adding 21398327312 to 571785431872', function () {
            Mathlib.addition(571785431872, 21398327312).should.equal(593183759184);
        });
        it('should return -3.41 when adding 4 to -7.41', function () {
            Mathlib.addition(4, -7.41).should.equal(-3.41);
        });
        it('should return 3.96516835094 when adding 2.475938120 to 1.48923023094', function () {
            Mathlib.addition(2.475938120, 1.48923023094).should.equal(3.96516835094);
        });
    });
    /**
     * Tests for subtraction method of Mathlib.
     *
     * Should function like regular mathematic subtraction.
     */
    describe('subtraction()', function () {
        it('should return 3 when subtracting 5 from 8', function () {
            Mathlib.subtraction(8, 5).should.equal(3);
        });
        it('should return 50 when subtracting -250 from -200', function () {
            Mathlib.subtraction(-200, -250).should.equal(50);
        });
        it('should return -1 when subtracting 1000000 from 999999', function () {
            Mathlib.subtraction(999999, 1000000).should.equal(-1);
        });
        it('should return 571785431872 when subtracting 21398327312 from 593183759184', function () {
            Mathlib.subtraction(593183759184, 21398327312).should.equal(571785431872);
        });
        it('should return -11.41 when subtracting 4 from -7.41', function () {
            Mathlib.subtraction(-7.41, 4).should.equal(-11.41);
        });
        it('should return 1.48923023094 when subtracting 2.475938120 from 3.96516835094', function () {
            Mathlib.subtraction(3.96516835094, 2.475938120).should.equal(1.48923023094);
        });
    });
    /**
     * Tests for multiplication method of Mathlib.
     *
     * Should function like regular mathematic multiplication.
     */
    describe('multiplication()', function () {
        it('should return 40 when 5 times 8', function () {
            Mathlib.multiplication(5, 8).should.equal(40);
        });
        it('should return 1250 when -250 times -5', function () {
            Mathlib.multiplication(-250, -5).should.equal(1250);
        });
        it('should return 571785431872 when 2 times 285892715936', function () {
            Mathlib.multiplication(2, 285892715936).should.equal(571785431872);
        });
        it('should return 42.42 when 21.21 times 2', function () {
            Mathlib.multiplication(21.21, 2).should.equal(42.42);
        });
    });
    /**
     * Tests for logarithm method of Mathlib.
     *
     * Should function like regular mathematic logarithm.
     * Testing also irregular floating point results.
     */
    describe('logarithm()', function () {
        it('should return NaN for negative argument', function () {
            Mathlib.logarithm(-10).should.be.NaN();
            Mathlib.logarithm(-100028310).should.be.NaN();
            Mathlib.logarithm(-0.100028310).should.be.NaN();
        });
        it('should return ~2.30258509 for input 10', function () {
            Mathlib.logarithm(10).should.be.approximately(2.30258509, 0.00000001);
        });
        it('should return ~1 for input 2.71828182', function () {
            Mathlib.logarithm(2.71828182).should.be.approximately(1, 0.00000001);
        });
    });
    /**
     * Tests for power method of Mathlib.
     *
     * Should function like regular mathematic power.
     * Testing also negative exponents.
     */
    describe('power()', function () {
        it('should return 0 for powers of 0', function () {
            Mathlib.power(0, 10).should.equal(0);
            Mathlib.power(0, 100000).should.equal(0);
            Mathlib.power(0, 0.128).should.equal(0);
        });
        it('should return 1 for everythin with power to 0', function () {
            Mathlib.power(10, 0).should.equal(1);
            Mathlib.power(-10, 0).should.equal(1);
            Mathlib.power(0.345, 0).should.equal(1);
        });
        it('should return 256 for 2 power to 8', function () {
            Mathlib.power(2, 8).should.equal(256);
        });
        it('should return 0.25 for 0.5 power to 2', function () {
            Mathlib.power(0.5, 2).should.equal(0.25);
        });
        it('should return 0.0625 for 2 power to -4', function () {
            Mathlib.power(2, -4).should.equal(0.0625);
        });
        it('should return NaN for 2 power to 0.3', function(){
            Mathlib.power(2, 0.3).should.equal(NaN);
        });
    });
    /**
     * Tests for division method of Mathlib.
     *
     * Should function like regular mathematic division.
     */
    describe('division()', function () {
        it('should return 0 for division of 0', function () {
            Mathlib.division(0, 10).should.equal(0);
            Mathlib.division(0, 100000).should.equal(0);
            Mathlib.division(0, 0.128).should.equal(0);
        });
        it('should return NaN for division by 0', function () {
            Mathlib.division(10, 0).should.be.NaN();
            Mathlib.division(-10, 0).should.be.NaN();
            Mathlib.division(0.345, 0).should.be.NaN();
        });
        it('should return 256 for 512 divided by 2', function () {
            Mathlib.division(512, 2).should.equal(256);
        });
        it('should return -0.25 for 0.5 divided by -2', function () {
            Mathlib.division(0.5, -2).should.equal(-0.25);
        });
    });
    /**
     * Tests for factorial method of Mathlib.
     *
     * Should function like regular mathematic factorial.
     * Testing also negative argument.
     */
    describe('factorial()', function () {
        it('should return 1 for factorial of 0', function () {
            Mathlib.factorial(0).should.equal(1);
        });
        it('should return NaN for negative argument', function () {
            Mathlib.factorial(-1000).should.be.NaN();
            Mathlib.factorial(-10).should.be.NaN();
            Mathlib.factorial(-1).should.be.NaN();
        });
        it('should return NaN for non natural argument', function () {
            Mathlib.factorial(1.05).should.be.NaN();
            Mathlib.factorial(-10).should.be.NaN();
        });
        it('should return 3628800 for factorial of 10', function () {
            Mathlib.factorial(10).should.equal(3628800);
        });
    });
});
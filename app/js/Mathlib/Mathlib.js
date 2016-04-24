/**Math library for our calculator**/

/**
 * @file Mathlib.js
 * @desc Mathlib class, requires numbers in float for methods except factorial
 * @author Michal
 */

/**
 * @class Mathlib
 */

/**
 * Addition
 * @desc Adds b to a
 * @param a {float} - number
 * @param b {float} - number
 * @return {number} adition of a+b
 */
exports.addition = function(a, b){
    return a + b;
};

/**
 * Subtraction
 * @desc Subtracts b from a
 * @param a {float} - number
 * @param b {float} - number
 * @return {number} subtraction of a-b
 */
exports.subtraction = function(a, b){
    return a - b;
};

/**
 * Multiplication
 * @desc Multiply a and b
 * @param a {float} - number
 * @param b {float} - number
 * @return {number} multiplication of a*b
 */
exports.multiplication = function(a, b){
    return a * b;
};

/**
 * Logarithm
 * @desc Calculate logarithm from a to 0.00000001 aproximation
 * @param x {float} - number
 * @return {number} logarithm of x
 */
exports.logarithm = function(x){
    var n = 1, eps = 1, log1, log;
    if(x==0)
        return -Infinity;
    while(eps>=0.00000001){
        n = n * 2;
        log = continuedFraction(x, n);
        log1 = continuedFraction(x, n - 1);
        eps = log1 - log;
        if(eps<0){
            eps = eps * -1;
        }
    }
    return continuedFraction(x, n);
};

/**
 * Continued Fraction
 * @desc Calculates logarithm for n iterations from continued fractions
 * @param x {float} - number
 * @param n {float} - number
 * @return {number} logarithm of x
 */
continuedFraction = function(x, n){
    if(x<0 || n<=0)
        return NaN;
    if(x>0){
        x = (x - 1) / (x + 1);
        n--;
        var frac = (n==0) ? 1 : 2 * n;
        while(n>0){
            frac = 2.0 * n - 1 - (x * x * n * n / frac);
            n--;
        }

        return 2 * x / frac;
    }
};

/**
 * Power
 * @desc Empower a to b
 * @param a {float} - number
 * @param b {int} - number
 * @return {number} b-th power of a
 */
exports.power = function(a, b){
    var i = 1, c = 1, sign = b;
    var muls = [], pows = [];
    if(a==0){
        return 0;
    }
    if(b % 1>0){
        return NaN;
    }
    if(b<0){
        b = b * -1;
    }
    if(a==0){
        return a;
    }
    muls[0] = 1;
    pows[0] = a;

    while(muls[i - 1]<b){
        muls[i] = muls[i - 1] * 2;
        pows[i] = pows[i - 1] * pows[i - 1];
        i++;
    }

    i--;
    while(i>=0){
        if(b - muls[i]>=0){
            b = b - muls[i];
            c *= pows[i];
        }
        i--;
    }

    if(sign<0){
        c = 1 / c;
    }
    return c;
};

/**
 * Division
 * @desc A divided by b
 * @param a {float} - number
 * @param b {float} - number
 * @return {number} division of a by b
 */
exports.division = function(a, b){
    var c;
    if(b!=0){
        c = a / b;
    }
    else
        c = NaN;
    return c;
};

/**
 * Factorial
 * @desc Calculate factorial
 * @param n {float} - number
 * @return {number} factorial of a
 */
exports.factorial = (function(){
    var cache = {},
        fn = function(n){
            if(n<0){
                return NaN;
            }
            if(n>60 && n % 1==0){
                return Infinity;
            }
            if(n===0){
                return 1;
            }else if(cache[n]){
                return cache[n];
            }
            return cache[n] = n * fn(n - 1);
        };
    return fn;
}());

/**
 * Round
 * @desc Rounds given number
 * @param x {float} - number
 * @return {number} rounded number
 */
exports.round = function(x){
    var num = 1, sign = 1;
    if(x<0){
        sign = -1;
        x = x * -1;
    }
    num = x % 1;
    if(num>0 && sign>0){
        if(num>=0.5){
            return x - num + 1;
        }
        else{
            return x - num;
        }
    }
    if(num>0 && sign<0){
        if(num>0.5){
            return (x - num + 1) * (-1);
        }
        else{
            return (x - num) * (-1);
        }
    }
    if(sign<0){
        x = x * -1;
    }
    return x;
};
/*** End of file Mathlib.js ***/
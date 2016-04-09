/**Math library for our calculator**/

/**
 * @file Mathlib.js
 *
 * @brief Mathlib class, requires numbers in float for methods except factorial
 * @author Michal
 */

/** @brief Addition
 *
 *  Adds b to a
 *
 *	@param [in] a number
 *	@param [in] b number
 *	@return adition of a+b
 */
exports.addition = function(a,b){
return a+b;
};

/** @brief Subtraction
 *
 *  Subtracts b from a
 *
 *	@param [in] a number
 *	@param [in] b number
 *	@return subtraction of a-b
 */
exports.subtraction = function(a,b){
return a-b;
};

/** @brief Multiplication
 *
 *  Multiply a and b
 *
 *	@param [in] a number
 *	@param [in] b number
 *	@return multiplication of a*b
 */
exports.multiplication = function(a,b){
return a*b;
};

/** @brief Logarithm
 *
 *  Calculate logarithm from a
 *
 *	@param [in] a number
 *	@return logarithm of a
 */
exports.logarithm = function(a){
    var n=150;
    var sum=0;
    if(a<0)
        return NaN;
    if(a>0){
        var koeficient = 1;
        if(a<1){
            a = 1-a;
            for(var index = 1; index<=n; index++){
                koeficient *= a;
                sum -= (koeficient/index);
            }
        }else{
            for(var index = 1; index<=n; index++){
                koeficient *= (a-1)/a;
                sum += koeficient/index;
            }
        }
    }else
        sum = -INFINITY;
    return sum;
};

/** @brief Power
 *
 *  Empower a to b
 *
 *	@param [in] a number
 *	@param [in] b number
 *	@return b-th power of a
 */
exports.power = function(a,b){
    var i= 0, c= 1, sign= b;
    if (b<0){
        b = b*-1;
    }
    while(i<b) {
        c = c * a;
        i++;
    }
    if(sign<0){
        c=1/c;
    }
return c;
};

/** @brief Division
 *
 *  A divided by b
 *
 *	@param [in] a number
 *	@param [in] b number
 *	@return division of a by b
 */
exports.division = function(a,b){
    var c;
    if (b!=0){
        c=a/b;
    }
    else
        c=NaN;
    return c;
};

/** @brief Factorial
 *
 *  Calculate factorial
 *
 *	@param [in] a number
 *	@return factorial of a
 */
exports.factorial = function(a){
    var c=1;
    if (a==0)
        return 1;
    if (a<0)
        return NaN;
    if (a%1 !== 0)
        return NaN;
    while(a>1){
        c=c*a;
        a=a-1;
    }
    return c;
};
/*** End of file Mathlib.js ***/
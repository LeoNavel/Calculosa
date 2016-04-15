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
 *  Calculate logarithm from a to 0.00000001 aproximation
 *
 *	@param [in] a number
 *	@return logarithm of a
 */
exports.logarithm = function(x){
    var n=1, eps= 1, log1, log;
    while (eps>=0.00000001){
        n=n*2;
        log = continuedFraction(x,n);
        log1 = continuedFraction(x,n-1);
        eps = log1-log;
        if (eps<0) {
            eps = eps * -1;
        }
    }
    return continuedFraction(x,n);
};

/** @brief Continued Fraction
 *
 *  Calculates logarithm for n iterations from continued fractions
 *
 *  @param [in] n number
 *	@param [in] a number
 *	@return logarithm of a
 */
continuedFraction = function(x,n){
    if(x<0 || n<=0)
        return NaN;
    if(x>0){
        x = (x-1)/(x+1);    //upravenie
        n--;        //dekrementovanie kvoli tomu ze prva iteracia je v return
        var menovatel = (n==0)?1:2*n;    //nastavenie najspodnejsieho menovatela
        while(n>0){
            menovatel = 2.0*n-1-(x*x*n*n/menovatel);  //nastavenie noveho menovatela
            n--;        //dekrementovanie /(n)
        }

        return 2*x/menovatel;       //vrati vysledok pre dany pocet operacii
    }
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
    var i= 1, c= 1, sign= b;
    var nasobky = [], mocniny = [];
    if (b<0){
        b = b*-1;
    }
    if (a == 0){
        return a;
    }

    if (a>0 && a<1 || a<0 && a>-1){
        while(i<=b) {
            c = c * a;
            i++;
        }
        if(sign<0){
            c=1/c;
        }
        return c;
    }

    nasobky[0]=1;
    mocniny[0]=a;

    while(nasobky[i-1]<b) {
        nasobky[i] = nasobky[i-1]*a;
        mocniny[i] = mocniny[i-1]*mocniny[i-1];
        i++;
    }

    i--;
    while (i>=0) {
        if (b-nasobky[i]>=0){
            b=b-nasobky[i];
            c*=mocniny[i];
        }
        i--;
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

exports.factorial = (function() {
    var cache = {},
        fn = function(n) {
            if (n < 0){
                return NaN;
            }
            if (n === 0) {
                return 1;
            } else if (cache[n]) {
                return cache[n];
            }
            return cache[n] = n * fn(n -1);
        };
    return fn;
}());
/*** End of file Mathlib.js ***/
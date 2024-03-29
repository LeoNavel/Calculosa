/**Math library for our calculator**/
/**
 * @file script.js
 * @desc state machine with function for calculator
 * @author Filip Leo Klembara
 * @author Lucia Ter Tušimová
 * @author Michal Bohuš
 */

/**
 * Mathlib library
 * @var {class} Mathlib
 */
var Mathlib = require("../js/Mathlib/Mathlib");

/**
 * Our little Calculosa :3
 * @var {class} Calculosa
 */
var Calculosa = new calculosa;

/**
 * All states and vars
 * @var {object} olejvan
 * @prop {object} olejvan - all in one
 * @prop {int} olejvan.state - state of state mashine
 * @prop {object} olejvan.vars - keep all global vars
 * @prop {float|int} olejvan.vars.a - first number in calculations
 * @prop {float|int} olejvan.vars.b - second number in calculations
 * @prop {string} olejvan.vars.operation - operation
 */
var olejvan = {state: 1, vars: {a: "", b: "", operation: ""}};

/**
 * Everything with screen's data
 * @var {object} screen
 * @prop {object} screen
 * @prop {object} screen.operation - element with operation
 * @prop {object} screen.output - element for output strings
 * @prop {string} screen.operationStr - operation string
 * @prop {string} screen.outputStr - output string
 * @prop {bool} screen.newNumber - boolean value if the number on the screen is new or not
 */
var screen = {operation: "", output: "", operationStr: "", outputStr: "", newNumber: true};

/**
 * handle click events
 * @event #click
 * @returns There is no return from this hell
 */
$(function(){
    Calculosa.setSentence("Hello!<br>I am Calculosa!");
    Calculosa.say();
    $("#closeHelp").click(function(){
        Calculosa.closeHelp();
    });
    $("#calcImg").click(function(){
        Calculosa.setSentence("You are bored...<br>aren't you?");
        Calculosa.say();
    });
    $(".btn").click(function(){
        if($(this).attr("id")=="btnHelp"){
            Calculosa.help();
            return;
        }
        var classes = $(this).attr("class").split(" ");
        var index = classes.indexOf("btn");
        if(index> -1){
            classes.splice(index, 1); //remove btn from classes
        }
        index = classes.indexOf("btn-default");
        if(index> -1){
            classes.splice(index, 1);   //remove btn-default from classes
        }
        reloadScreenData(); //reload data from screen
        var ids;
        if(classes.length>0){
            if($(this).hasClass("number"))
                addNumber($(this));
            if($(this).hasClass("binOperand")){
                doBinOperand.call(this);
            }
            if($(this).hasClass("unOperand")){
                doUnOperand.call(this);
            }
        }else{
            ids = $(this).attr("id");
            if(ids=="btnPoint")
                floatingPoint();
            if(ids=="btnSign")
                changeSign();
            if(ids=="btnDel")
                deleteLastNumber();
            if(ids=="btnCA")
                clearAll();
            if(ids=="btnSolve")
                solve(true);
        }
        setScreenData();
        if(Calculosa.somethingToSay)
            Calculosa.say();
    });
});

/**
 * Solve for binary operand, check state and solve
 */
function doBinOperand(){
    var ids = $(this).attr("id");   //get id
    if(ids.length>0){
        switch(olejvan.state){
            case 1:
            case 3:
                if(screen.outputStr=="")
                    screen.outputStr = "0";
                screen.operationStr = $(this).text();   //set operation
                changeStateTo(2);
                break;
            case 2:
                if(!screen.newNumber){
                    solve(true);    //solve for binary operand
                    screen.operationStr = $(this).text(); //set operation
                }else
                    screen.operationStr = $(this).text(); //set operation
                changeStateTo(2);
                break;
        }
    }
}

/**
 * Solve for unary operands, checking state and solve
 */
function doUnOperand(){
    var ids = $(this).attr("id");
    if(ids.length>0){
        switch(olejvan.state){
            case 1:
            case 3:
                if(screen.outputStr=="")
                    screen.outputStr = "0";
                screen.operationStr = $(this).text();   //set operation
                solve(false);
                break;
            case 2:
                if(!screen.newNumber){
                    solve(true);    //solve previous binary operation
                    screen.operationStr = $(this).text(); //set operation
                    solve(false);   //solve unary operation
                }else{
                    screen.operationStr = $(this).text();   //set operation
                    solve(false);
                }
                break;
        }
    }
}

/**
 * Solve binary operand, detect which function should by called and call it
 */
function solveBin(){
    olejvan.vars.b = screen.outputStr;
    var a = olejvan.vars.a,
        b = olejvan.vars.b,
        op = olejvan.vars.operation;
    a = +a; //str to number
    b = +b; //str to number
    var func;
    switch(op){
        case "-":
            func = Mathlib.subtraction;
            break;
        case "+":
            func = Mathlib.addition;
            break;
        case "x":
            func = Mathlib.multiplication;
            break;
        case "/":
            func = Mathlib.division;
            break;
        case "^":
            func = Mathlib.power;
            break;
    }
    if(func){
        var solution = func(a, b);
        if(!isNaN(solution)){
            console.log(solution);
            if(solution>Mathlib.power(10, -8))
                solution = Mathlib.round(solution * 100000000) / 100000000;
            Calculosa.setSentence(a + "" + op + "" + b + " = " + solution);
            screen.outputStr = solution;

        }else{
            if(screen.operationStr=="/")
                Calculosa.setErr("Division by zero");
            else
                Calculosa.setErr("Wrong input");
            clear();
        }
    }
}

/**
 * Solve unary, decide which function should be used and call it
 */
function solveUn(){
    olejvan.vars.a = screen.outputStr;
    var a = olejvan.vars.a,
        op = screen.operationStr;
    a = +a;
    var func;
    switch(op){
        case "ln":
            func = Mathlib.logarithm;
            break;
        case "!":
            func = Mathlib.factorial;
            break;
    }
    if(func){
        var solution = func(a);
        if(!isNaN(solution)){
            console.log(solution);
            if(solution>Mathlib.power(10, -8))
                solution = Mathlib.round(solution * 100000000) / 100000000;
            var ret = (op=="ln") ? op + "(" + a + ")" : a + "" + op;
            Calculosa.setSentence(ret + "=" + solution);
            screen.outputStr = solution;
        }else{
            Calculosa.setErr("Wrong input");
            clear()
        }
    }
}

/**
 * Reloads data from screen
 */
function reloadScreenData(){
    screen.operation = $("#operation");
    screen.operationStr = screen.operation.text();
    screen.output = $("#output");
    screen.outputStr = screen.output.text();
}

/**
 * Sets screen data
 */
function setScreenData(){
    screen.operation.text(screen.operationStr);
    screen.output.text(screen.outputStr);
}

/**
 * change current state
 * @param state {int} - state next state
 */
function changeStateTo(state){
    switch(state){
        case 1:
            clear();
            break;
        case 2:
            screen.newNumber = true;
            olejvan.vars.a = screen.outputStr;
            olejvan.vars.operation = screen.operationStr;
            olejvan.vars.b = "";
            olejvan.state = 2;
            break;
        case 3:
            if(olejvan.state==2 || olejvan.state==1){
                screen.newNumber = true;
                olejvan.vars.a = screen.outputStr;
                olejvan.vars.b = "";
                olejvan.vars.operation = "";
                olejvan.state = 3;
            }
            break;
    }
}

/**
 * try to solve everything
 * @param bin {bool} - if true, solve for binary; if not, solve for unary operand
 */
function solve(bin){
    var e = false;
    if(bin){
        switch(olejvan.state){
            case 1:
            case 3:
                Calculosa.setErr("There is nothing to solve...");
                e = true;
                break;
            case 2:
                solveBin();

        }
    }else{
        switch(olejvan.state){
            case 1:
            case 2:
            case 3:
                solveUn();
                break;
        }
    }
    if(!e)
        changeStateTo(3);
    screen.operationStr = "";

}

/**
 * Clear everything and set current state to 1
 */
function clear(){
    olejvan.state = 1;
    olejvan.vars.a = "";
    olejvan.vars.b = "";
    olejvan.vars.operation = "";
    screen.operationStr = "";
    screen.outputStr = "";
    setScreenData();
    Calculosa.shutUp();
}

/**
 * call clear() and set Calculosa's sentence to "Clear!"
 */
function clearAll(){
    clear();
    Calculosa.setSentence("Clear!");
}

/**
 * Delete last number from screen
 */
function deleteLastNumber(){
    var str = screen.outputStr;
    if(str.length>0){
        str = str.slice(0, -1);
        screen.outputStr = str;
    }else{
        Calculosa.setErr("Nothing to delete");
    }
}

/**
 * Change sign
 */
function changeSign(){
    var str = screen.outputStr;
    if(str.length>0){
        if(str.substr(0, 1)=="-")
            str = str.substr(1);
        else
            str = "-" + str;
        screen.outputStr = str;
    }else{
        Calculosa.setErr("Enter a number firstly");
    }
}

/**
 * Add number if the number is "new" then clear screen and instead of add make the number first
 * @param element {object} - element of the clicked button
 */
function addNumber(element){
    /**
     * @const maxLen {number} - max length od screen
     */
    const maxLen = 30;
    if(olejvan.state==3){
        changeStateTo(1);
    }
    var str = screen.outputStr;
    if(screen.newNumber){
        str = "";
        screen.newNumber = false;
    }
    if(str.length<maxLen){
        str += element.text();
        screen.outputStr = str;
    }else{
        Calculosa.setErr("Screen overflow");
    }
}

/**
 * Add floating point, if last char on the screen is point then removes it,
 * if on the screen is point and it is not last char do nothing
 */
function floatingPoint(){
    var str = screen.outputStr;
    if(screen.newNumber){
        str = "";
        screen.newNumber = false;
    }
    if(str.length>0){
        if(str.slice(-1)==".")
            str = str.slice(0, -1);
        else if(str.indexOf(".")<0) //check if point exists
            str += ".";
        else{
            Calculosa.setErr("You can have just one point");
            return;
        }
        screen.outputStr = str;
    }else
        screen.outputStr = "0.";    //if screen#output is empty add 0. to it
}


/*** End of file script.js ***/
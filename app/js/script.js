/**Math library for our calculator**/
/**
 * @file script.js
 *
 * @brief state machine with function for calculator
 * @author Filip Leo Klembara
 * @date 15.4.2016
 */
var style = 0;
var Mathlib = require("../js/Mathlib/Mathlib");

var Calculosa = new calculosa;
///Our little Calculosa :3

var olejvan = {state: 1, vars: {a: "", b: "", operation: ""}};
/// state and global vars

var screen = {operation: "", output: "", operationStr: "", outputStr: "", newNumber: true};
///everything with screen

/**
 * @brief handle click events
 *
 * @return There is no return from this hell
 */
$(function(){
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

    $("#changeStyle").click(function(){
        changeStyle();
    });
});

/**
 * @brief solve for binary operand
 *
 * checking state and solve
 *
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
                }
                changeStateTo(2);
                break;
        }
    }
}

/**
 * @brief solve for unary operands
 *
 * checking state and solve
 *
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

/** @brief solve binary operand
 *
 * detect which function should by called and call it
 *
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
            solution = Math.round(solution * 100000000) / 100000000;
            Calculosa.setSentence(a + "" + op + "" + b + "=" + solution);
            screen.outputStr = solution;

        }else{
            Calculosa.setErr("FTW?");
            clearAll();
        }
    }
}

/**
 *
 * @brief solve unary
 *
 * decide which function should be used and call it
 *
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
            solution = Math.round(solution * 100000000) / 100000000;
            var ret = (op=="ln") ? op + "(" + a + ")" : a + "" + op;
            Calculosa.setSentence(ret + "=" + solution);
            screen.outputStr = solution;
        }else{
            Calculosa.setErr("WTF?");
            clearAll()
        }
    }
}

/**
 *
 * @brief reload screen data
 *
 * reloads data from screen
 *
 */
function reloadScreenData(){
    screen.operation = $("#operation");
    screen.operationStr = screen.operation.text();
    screen.output = $("#output");
    screen.outputStr = screen.output.text();
}

/**
 *
 * @brief sets screen data
 *
 * sets data on screen
 *
 */
function setScreenData(){
    screen.operation.text(screen.operationStr);
    screen.output.text(screen.outputStr);
}

/**
 *
 * @brief change state
 *
 * change current state
 *
 * @param state next state
 *
 */
function changeStateTo(state){
    switch(state){
        case 1:
            clearAll();
            break;
        case 2:
            if(olejvan.state==1 || olejvan.state==3){
                screen.newNumber = true;
                olejvan.vars.a = screen.outputStr;
                olejvan.vars.operation = screen.operationStr;
                olejvan.vars.b = "";
                olejvan.state = 2;
            }
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
 *
 * @brief solve
 *
 * try to solve everything
 *
 * @param bin if true, solve for binary; if not, solve for unary
 *
 */
function solve(bin){
    var e = false;
    if(bin){
        switch(olejvan.state){
            case 1:
            case 3:
                Calculosa.setErr("There is nothing to solve....");
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
 *
 * @brief clear
 *
 * clear everything and set current state to 1
 *
 */
function clearAll(){
    Calculosa.setSentence("Clear!");
    olejvan.state = 1;
    olejvan.vars.a = "";
    olejvan.vars.b = "";
    olejvan.vars.operation = "";
    screen.operationStr = "";
    screen.outputStr = "";
    setScreenData();
}

/**
 * @brief delete last number from screen
 */
function deleteLastNumber(){
    var str = screen.outputStr;
    if(str.length>0){
        str = str.slice(0, -1);
        screen.outputStr = str;
    }else{
        Calculosa.setErr("nothing to delete"); //todo
    }
}

/**
 * @brief change sign
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
        Calculosa.setErr("firstly enter a number"); //todo calculosa error
    }
}

/**
 * @brief add number to screen
 *
 * add number if the number is "new" then clear screen and insted of add make the number first
 *
 * @param element element of the clicked button
 */
function addNumber(element){
    /// maximal length of string on screen
    var maxLen = 30;
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
        Calculosa.setErr("screen overflow");  // todo calculosa error
    }
}

/**
 * @brief add flating point
 *
 * if last char on the screen is point then removes it
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
            Calculosa.setErr("you can have just one point");  //todo calculosa error
            return;
        }
        screen.outputStr = str;
    }else
        screen.outputStr = "0.";    //if screen#output is empty add 0. to it
}

function changeStyle(){
    if(style==1){
        $(".btn").css("background-color", "#B2E5F0");
        $("#screen").css("background-color", "#B2E5F0");
        $("img").css("color", "#B2E5F0");
        $("body").css("background-image", "url(../images/background.png");
        style = 0;
    }else{
        $(".btn").css("background-color", "");
        $("#screen").css("background-color", "");
        $("img").css("color", "");
        $("body").css("background-image", "");
        style = 1;
    }
}

/*** End of file script.js ***/
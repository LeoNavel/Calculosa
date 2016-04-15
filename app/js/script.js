/**Math library for our calculator**/
var style = 0;
var Mathlib = require("../js/Mathlib/Mathlib");
var Calculosa = new calculosa;
var olejvan = {state: 1, vars: {a: "", b: "", operation: ""}};
var screen = {operation: "", output: "", operationStr: "", outputStr: "", newNumber: true};
$(function(){
    $(".btn").click(function(){
        var classes = $(this).attr("class").split(" ");
        var index = classes.indexOf("btn");
        if(index> -1){
            classes.splice(index, 1);
        }
        index = classes.indexOf("btn-default");
        if(index> -1){
            classes.splice(index, 1);
        }
        reloadScreenData();
        if(classes.length>0){
            if($(this).hasClass("number"))
                addNumber($(this));
            if($(this).hasClass("binOperand")){
                var ids = $(this).attr("id");
                if(ids.length>0){
                    switch(olejvan.state){
                        case 1:
                        case 3:
                            if(screen.outputStr=="")
                                screen.outputStr = "0";
                            screen.operationStr = $(this).text();
                            changeStateTo(2);
                            break;
                        case 2:
                            if(!screen.newNumber){
                                solve(true);
                                screen.operationStr = $(this).text();
                            }
                            changeStateTo(2);
                            break;
                    }

                }
            }
            if($(this).hasClass("unOperand")){
                var ids = $(this).attr("id");
                if(ids.length>0){
                    switch(olejvan.state){
                        case 1:
                        case 3:
                            if(screen.outputStr=="")
                                screen.outputStr = "0";
                            screen.operationStr = $(this).text();
                            solve(false);
                            break;
                        case 2:
                            if(!screen.newNumber){
                                solve(true);
                                screen.operationStr = $(this).text();
                                solve(false);
                            }else{
                                screen.operationStr = $(this).text();
                                solve(false);
                            }
                            break;
                    }
                }
            }
        }else{
            var ids = $(this).attr("id");
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

function solveBin(){
    olejvan.vars.b = screen.outputStr;
    var a = olejvan.vars.a,
        b = olejvan.vars.b,
        op = olejvan.vars.operation;
    a = +a;
    b = +b;
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

function reloadScreenData(){
    screen.operation = $("#operation");
    screen.operationStr = screen.operation.text();
    screen.output = $("#output");
    screen.outputStr = screen.output.text();
}

function setScreenData(){
    screen.operation.text(screen.operationStr);
    screen.output.text(screen.outputStr);
}

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

function deleteLastNumber(){
    var str = screen.outputStr;
    if(str.length>0){
        str = str.slice(0, -1);
        screen.outputStr = str;
    }else{
        Calculosa.setErr("nothing to delete"); //todo
    }
}

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

function addNumber(element){

    if(olejvan.state==3){
        changeStateTo(1);
    }
    var str = screen.outputStr;
    if(screen.newNumber){
        str = "";
        screen.newNumber = false;
    }
    if(str.length<30){
        str += element.text();
        screen.outputStr = str;
    }else{
        Calculosa.setErr("screen overflow");  // todo calculosa error
    }
}

function floatingPoint(){
    var str = screen.outputStr;
    if(screen.newNumber){
        str = "";
        screen.newNumber = false;
    }
    if(str.length>0){
        if(str.slice(-1)==".")
            str = str.slice(0, -1);
        else if(str.indexOf(".")<0)
            str += ".";
        else{
            Calculosa.setErr("you can have just one point");  //todo calculosa error
            return;
        }
        screen.outputStr = str;
    }else
        screen.outputStr = "0.";
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
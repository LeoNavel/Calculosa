/**Math library for our calculator**/
var style = 0;
var Mathlib = require("../js/Mathlib/Mathlib");
var Calculosa = new calculosa;
var olejvan = {state: 1, vars: {a: "", b: "", operation: ""}};
var screen = {operation: "", output: "", operationStr: "", outputStr: "", newNumber: true};
$(function(){
    $(".btn").click(function(){
        // console.log("------------------");
        // printOlejvan();
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
                            screen.operationStr = $(this).text();
                            changeStateTo(2);
                            break;
                        case 2:
                            if(!screen.newNumber){
                                solve();
                                screen.operationStr = $(this).text();
                            }
                            changeStateTo(2);
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
                solve();
            }
        setScreenData();
        // printOlejvan()
    });

    $("#changeStyle").click(function(){
        changeStyle();
    });
});

function printOlejvan(){
    console.log("state: " + olejvan.state + "\n\ta: " + olejvan.vars.a + "\n\tb: " + olejvan.vars.b + "\n\to: " + olejvan.vars.operation);
}

function solveBin(){
    olejvan.vars.b = screen.outputStr;
    var a = olejvan.vars.a,
        b = olejvan.vars.b,
        op = olejvan.vars.operation;
    a = +a;
    b = +b;
    console.log(a);
    console.log(b);
    switch(op){
        case "-":
            var func = Mathlib.subtraction;
            break;
        case "+":
            var func = Mathlib.addition;
            break;
        case "x":
            var func = Mathlib.multiplication;
            break;
        case "/":
            var func = Mathlib.division;
            break;
        case "^":
            var func = Mathlib.power;
            break;
    }
    if(func){
        var solution = func(a, b);
        if(solution){
            Calculosa.say(a + "" + op + "" + b + "=" + solution);
            screen.outputStr = solution;
            changeStateTo(3);

        }else{
            Calculosa.err("FTW?");
            clearAll();
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
            if(olejvan.state==2){
                screen.newNumber = true;
                olejvan.vars.a = screen.outputStr;
                olejvan.vars.b = "";
                olejvan.vars.operation = "";
                olejvan.state = 3;
            }
    }
}

function solve(){
    switch(olejvan.state){
        case 1:
            Calculosa.err("There is nothing to solve....");
            break;
        case 2:
            solveBin();

    }

}

function clearAll(){
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
        Calculosa.err("nothing to delete"); //todo
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
        Calculosa.err("firstly enter a number"); //todo calculosa error
    }
}

function addNumber(element){

    if(olejvan.state==3){
        //todo
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
        Calculosa.err("screen overflow");  // todo calculosa error
    }
}

function floatingPoint(){
    var str = screen.outputStr;
    if(str.length>0){
        if(str.slice(-1)==".")
            str = str.slice(0, -1);
        else if(str.indexOf(".")<0)
            str += ".";
        else{
            Calculosa.err("you can have just one point");  //todo calculosa error
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
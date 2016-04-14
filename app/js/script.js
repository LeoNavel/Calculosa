/**Math library for our calculator**/
var style = 0;
var Mathlib = require('../js/Mathlib/Mathlib.js');
var Calculosa = new calculosa;
var olejvan = {state: 1, vars: {a: "", b: "", operation: ""}};
var screen = {operation: "", output: "", operationStr: "", outputStr: ""};
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

        }else{
            var ids = $(this).attr("id");
            if(ids.length>0){
                if(ids=="btnPoint")
                    floatingPoint();
                if(ids=="btnSign")
                    changeSign();
                if(ids=="btnDel")
                    deleteLastNumber();
                if(ids=="btnCA")
                    clearAll();
            }
        }
        setScreenData();
    });

    $("#changeStyle").click(function(){
        changeStyle();
    });
});

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
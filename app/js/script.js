/**Math library for our calculator**/
var style = 0;
var Mathlib = require('../js/Mathlib/Mathlib.js');
var Calculosa = new calculosa;
var olejvan = {state: 1, vars: {a: "", b: "", operation: ""}};
$(function(){
    $(".number").click(function(){
        addNumber($(this));
    });

    $(".point").click(function(){
        floatingPoint();
    });

    $(".sign").click(function(){
        changeSign();
    });

    $("#changeStyle").click(function(){
        changeStyle();
    });
});

function changeSign(){
    var outputElement = $("#output");
    var str = outputElement.text();
    if(str.length>0){
        if(str.substr(0, 1)=="-")
            str = str.substr(1);
        else
            str = "-" + str;
        outputElement.text(str);
    }else{
        Calculosa.err("firstly enter a number"); //todo calculosa error
    }
}

function addNumber(element){
    if(olejvan.state==3){
        //todo
    }
    var outputElement = $("#output");
    var str = outputElement.text();
    if(str.length<30){
        str += element.text();
        outputElement.text(str);
    }else{
        Calculosa.err("screen overflow");  // todo calculosa error
    }
}

function floatingPoint(){
    var outputElement = $("#output");
    var str = outputElement.text();
    if(str.length>0){
        if(str.slice(-1)==".")
            str = str.slice(0, -1);
        else if(str.indexOf(".")<0)
            str += ".";
        else{
            Calculosa.err("you can have just one point");  //todo calculosa error
            return;
        }
        outputElement.text(str);
    }else
        outputElement.text("0.");
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
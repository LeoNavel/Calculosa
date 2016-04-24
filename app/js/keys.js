/**
 * Created by Navel on 15.04.16.
 */


/**
 * @file keys.js
 * @desc handle pressed keys events
 * @author Filip Leo Klembara
 */

$(function(){
    /**
     * @event #keypress
     */
    $(document).keypress(function(e){
        var element = getKey(e);
        if(element)
            element.click();
    })
});

/**
 * @param e {object}
 * @returns {*} if e is valid key then return element to click
 */
function getKey(e){
    var element;
    var c = String.fromCharCode(e.which);
    var btnSolve = $("#btnSolve");
    switch(e.which){
        case 13:
            element = btnSolve;
            break;
    }
    switch(c){
        case '+':
            element = $("#btnAdd");
            break;
        case '-':
            element = $("#btnSub");
            break;
        case '*':
        case 'x':
        case 'X':
            element = $("#btnMul");
            break;
        case '/':
            element = $("#btnDiv");
            break;
        case 'l':
        case 'L':
            element = $("#btnLog");
            break;
        case '^':
            element = $("#btnPower");
            break;
        case '!':
        case 'f':
        case 'F':
            element = $("#btnFuck");
            break;
        case '=':
            element = btnSolve;
            break;
        case 'd':
        case 'D':
            element = $("#btnDel");
            break;
        case 'c':
        case 'C':
            element = $("#btnCA");
            break;
        case '.':
        case ',':
            element = $("#btnPoint");
            break;
        case 's':
        case 'S':
            element = $("#btnSign");
            break;
        case '1':
            element = $("#btn1");
            break;
        case '2':
            element = $("#btn2");
            break;
        case '3':
            element = $("#btn3");
            break;
        case '4':
            element = $("#btn4");
            break;
        case '5':
            element = $("#btn5");
            break;
        case '6':
            element = $("#btn6");
            break;
        case '7':
            element = $("#btn7");
            break;
        case '8':
            element = $("#btn8");
            break;
        case '9':
            element = $("#btn9");
            break;
        case '0':
            element = $("#btn0");
            break;
        case 'h':
        case 'H':
            element = $("#btnHelp");
            break;
    }
    return element;
}
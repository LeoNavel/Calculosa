/**
 * Created by Navel on 15.04.16.
 */

/**
 * @brief handle kaypress events
 */
$(function(){
    $(document).keypress(function(e){
        console.log(e.which);
        var c = String.fromCharCode(e.which);
        var btnSolve = $("#btnSolve");
        var element;
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
        if(element)
            element.click();
    })
});
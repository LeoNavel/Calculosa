var style=0;
$(function(){
    $("#output").append("Hello Calculosa from jQuery!");
    $(".number").click(function(){
        alert($(this).text() + " clicked");
    });
    $("#changeStyle").click(function(){
        changeStyle();
    });
});

function changeStyle(){
    if(style==1){
        $(".btn").css("background-color", "#B2E5F0");
        $("#output").css("background-color", "#B2E5F0");
        $("img").css("color", "#B2E5F0");
        $("body").css("background-image", "url(../images/background.png");
        style=0;
    }else{
        $(".btn").css("background-color", "");
        $("#output").css("background-color", "");
        $("img").css("color", "");
        $("body").css("background-image", "");
        style=1;
    }
}
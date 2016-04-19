/**
 * Created by Navel on 14.04.16.
 */
function calculosa(){
    this.sentence = "";
    this.err = "";
    this.solution = NaN;
    this.somethingToSay = false;
    this.silent = false;

    this.setSentence = function(sentence){
        this.sentence = sentence;
        var pos = sentence.indexOf("=");
        if(pos> -1)
            this.solution = sentence.substr(pos + 1);
        this.somethingToSay = true;
    };
    this.setErr = function(a){
        this.err = a;
        this.somethingToSay = true;
    };
    this.say = function(){
        if(this.silent)
            return;
        if(this.err!=""){
            this.errMsg();
        }else if(this.sentence!=""){
            if(!isNaN(this.solution)){
                switch(this.solution){
                    case "666":
                        this.sentence = "Hell! Ou!";
                        break;
                }
            }
            this.bubble(this.sentence, true);
            console.log(this.sentence);
        }else{
            console.log("nothing to say");
        }
        this.resetVars();
    };
    this.resetVars = function(){
        this.sentence = "";
        this.err = "";
        this.solution = NaN;
        this.somethingToSay = false;
    };
    this.help = function(){
        // alert("Hey...\nyo...\naj hrd yo nid maj helf...\nwell...\nfok you...");
        this.silencePlease();
        $("#calcImg").animate({
            right: "0px",
            bottom: "0px"
        }, 500);
        $("#main").animate({
            opacity: "0.3"
        }, 1000);
        // $("#calcImg").css("right", "0");
        // $("#calcImg").css("bottom", "0");
        // $("#main").css("opacity","0.3");
        $("body").append("<div id='help'></div>");
        $("#help").animate({
            opacity: "1"
        }, 1000);


    };

    this.errMsg = function(){
        this.bubble(this.err, false)
    };

    this.bubble = function(str, ok){
        str = str || this.sentence;
        var bublina = $("#bublina"), bublina1 = $("#bublina1"), bublina2 = $("#bublina2");
        if(ok){
            bublina.css("border-color", "#515151");
            bublina1.css("border-color", "#515151 transparent transparent #515151");
        }else{
            bublina.css("border-color", "#800");
            bublina1.css("border-color", "#800 transparent transparent #800");
        }
        bublina.html(str);
        var scrollBar = bublina.hasScrollBar();
        bublina1.hide();
        bublina2.hide();
        bublina.hide();
        if(scrollBar.vertical || scrollBar.horizontal){
            this.sentence = "I'm too lazy to say it...";
            bublina.html(this.sentence);
        }

        var height = bublina.outerHeight(),
            width = bublina.outerWidth();
        var top = 330 - height, left = 700 - (width / 2);
        bublina.css("top", top + "px");
        bublina.css("left", left + "px");

        bublina1.fadeIn('slow');
        bublina2.fadeIn('slow');
        bublina.fadeIn('slow');
    };

    this.shutUp = function(){
        $("#bublina").hide();
        $("#bublina1").hide();
        $("#bublina2").hide();
    };

    this.silencePlease = function(){
        this.shutUp();
        this.silent = true;
    };
    this.showUsYourFemaleSelf = function(){
        this.silent = false;
    };

    (function($){
        $.fn.hasScrollBar = function(){
            var e = this.get(0);
            return {
                vertical: e.scrollHeight>e.clientHeight,
                horizontal: e.scrollWidth>e.clientWidth
            };
        }
    })(jQuery);
}
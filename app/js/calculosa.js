/**
 * Created by Navel on 14.04.16.
 * @author Filip Leo Klembara
 * @file calculosa.js
 * @desc All behavior of our little Calculosa :3
 */

/**
 * @class Calculosa
 */
function calculosa(){
    /**
     * @var {string} sentence - message
     */
    this.sentence = "";
    /**
     * @var {string} err - error message
     */
    this.err = "";
    /**
     * @var {string} solution - solution
     */
    this.solution = NaN;
    /**
     * @var {bool} somethingToSay - boolean value for checking if Calclulosa have something wise to say
     */
    this.somethingToSay = false;
    /**
     * @var {bool} silent - check if Calculosa should be silent or not
     */
    this.silent = false;

    /**
     * set sentence and solution
     * @param sentence {string} - sentence to say
     */
    this.setSentence = function(sentence){
        this.sentence = sentence;
        var pos = sentence.indexOf("=");
        if(pos> -1)
            this.solution = sentence.substr(pos + 2);
        this.somethingToSay = true;
    };

    /**
     * set error message
     */
    this.setErr = function(a){
        this.err = a;
        this.somethingToSay = true;
    };

    /**
     * makes Calculosa say something
     */
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
                    case "42":
                        this.sentence = "You have just found answer to everything";
                        break;
                }
            }
            this.bubble(this.sentence, true);
            console.log(this.sentence);
        }else{
            console.log("Nothing to say");
        }
        this.resetVars();
    };

    /**
     * resets vars sentence, err, solution and somethingToSay
     */
    this.resetVars = function(){
        this.sentence = "";
        this.err = "";
        this.solution = NaN;
        this.somethingToSay = false;
    };

    /**
     * close help window
     */
    this.closeHelp = function(){
        this.showUsYourFemaleSelf();
        $("#calcImg").animate({
            right: "75px",
            bottom: "100px"
        }, 500);
        $("#main").animate({
            opacity: "1"
        }, 1000);
        $("#help").css("visibility", "hidden").animate({
            opacity: "0"
        }, 1000);
        $(".blahblah").unbind("click");
    };

    /**
     * open help window, and order Calculosa to be quiet
     */
    this.help = function(){
        this.silencePlease();
        $("#calcImg").animate({
            right: "0px",
            bottom: "0px"
        }, 500);
        $("#main").animate({
            opacity: "0.3"
        }, 1000);
        $("#help").css("visibility", "visible").animate({
            opacity: "1"
        }, 1000);
        $(".blahblah:not(oneLine)").bind("click", function(){
            var a = $(this).next();
            a.toggle('slow');
            var b = $(this).hasClass("active");
            if(b)
                $(this).removeClass("active");
            else
                $(this).addClass("active");
        })
    };

    /**
     * show error message
     */
    this.errMsg = function(){
        this.bubble(this.err, false);
        console.log("ERROR: " + this.err);
    };

    /**
     * create bubble and sets properties
     * @param str {string} - message to fill bubble
     * @param ok {bool} - true if str is not error message
     */
    this.bubble = function(str, ok){
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
            str = "I'm too lazy to say it...";
            bublina.html(str);
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

    /**
     * Shut up Calculosa...
     */
    this.shutUp = function(){
        $("#bublina").hide();
        $("#bublina1").hide();
        $("#bublina2").hide();
    };

    /**
     * Makes Calculosa be quiet
     */
    this.silencePlease = function(){
        this.shutUp();
        this.silent = true;
    };

    /**
     * Makes from Calculosa classic female... How? Well... She starts commenting everything...
     */
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
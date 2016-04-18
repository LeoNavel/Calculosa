/**
 * Created by Navel on 14.04.16.
 */
function calculosa(){
    this.sentence = "";
    this.err = "";
    this.solution = NaN;
    this.somethingToSay = false;
    this.hello = function(){
        alert("puf");
    };
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
        alert("Hey...\nyo...\naj hrd yo nid maj helf...\nwell...\nfok you...");
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
        bublina.hide();
        bublina1.hide();
        bublina2.hide();
        bublina.html(str);
        var scrollBar = bublina.hasScrollBar();
        if(scrollBar.vertical || scrollBar.horizontal){
            this.sentence = "I'm too lazy to say it...";
            bublina.html(str);
        }

        var height = bublina.outerHeight(),
            width = bublina.outerWidth();
        var top = 330 - height, left = 700 - (width / 2);
        bublina.css("top", top + "px");
        bublina.css("left", left + "px");
        bublina1.css("left", left + (width - 50) / 2 + "px");
        bublina1.css("top", top + height - 8 + "px");
        bublina2.css("left", left + (width - 32) / 2 + "px");
        bublina2.css("top", top + height - 8 + "px");

        bublina.fadeIn('slow');
        bublina1.fadeIn('slow');
        bublina2.fadeIn('slow');
    };

    this.shutUp = function(){
        $("#bublina").hide();
        $("#bublina1").hide();
        $("#bublina2").hide();
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
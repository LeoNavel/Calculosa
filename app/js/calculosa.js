/**
 * Created by Navel on 14.04.16.
 */
function calculosa(){
    this.sentence = "";
    this.err = "";
    this.somethingToSay = false;
    this.hello = function(){
        alert("puf");
    };
    this.setSentence = function(sentence){
        this.sentence = sentence;
        this.somethingToSay = true;
    };
    this.setErr = function(a){
        this.err = a;
        this.somethingToSay = true;
    };
    this.say = function(){
        if(this.err!=""){
            alert(this.err);
        }else if(this.sentence!=""){
            console.log(this.sentence);
        }else{
            console.log("nothing to say");
        }
        this.resetVars();
    };
    this.resetVars = function(){
        this.sentence = "";
        this.err = "";
        this.somethingToSay = false;
    };
    this.help = function(){
        alert("Hey...\nyo...\naj hrd yo nid maj helf...\nwell...\nfok you...");
    }
}
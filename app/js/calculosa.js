/**
 * Created by Navel on 14.04.16.
 */
function calculosa(){
    this.hello = function(){
        alert("puf");
    };
    this.say = function(sentence){
        console.log(sentence);
    };
    this.err = function(a){
        alert("ERROR: " + a)
    };
}
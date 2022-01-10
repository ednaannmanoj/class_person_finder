status="";
song="";
object=[];
function preload(){
song=loadSound("Senorita.mp3");
}
function setup(){
 canvas=createCanvas(800,500);
 canvas.center();
 video=createCapture(VIDEO);
 video.hide();
 classify=ml5.objectDetector('cocossd',modelLoaded);
 document.getElementById("status_result").innerHTML =" Detecting objects";

}

function modelLoaded(){
    console.log("Model Loaded");
    status=true;
    
}
function gotResult(e,r){
    if(e){
         console.error(e);
    }
    else{
        console.log(r);
        object=r;

    }
} 
function draw(){

    image(video,0,0,800,500);
    if(status !=""){
        classify.detect(video, gotResult);
       for(i=0; i<object.length; i++){
            r=random(255);
            g=random(255);
            b=random(255);
            fill(r,g,b);
            
            percentage=floor(object[i].confidence*100);

            text(object[i].label+" "+percentage+"%",object[i].x+15,object[i].y+15);
            noFill();
            stroke(r,g,b);
            rect(object[i].x,object[i].y,object[i].width,object[i].height);

            if(object[i].label=="person"){
                document.getElementById("status_result").innerHTML =" Person Found";
                song.stop();
            }
            else{
                document.getElementById("status_result").innerHTML =" Person Not Found";
                song.play();
                song.volume(0.4);
                song.rate(1);
            }
        }
    }
    }
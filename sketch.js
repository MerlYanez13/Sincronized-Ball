var ball;
var database, position;
function setup(){
    createCanvas(500,500);
    database=firebase.database();
    ball = createSprite(250,250,10,10);
    ball.shapeColor = "red";
    var positionref=database.ref('Ball/position');
    positionref.on("value",readposition,showError)
}

function draw(){
    background("white");
    if(position!=undefined){
        if(keyDown(LEFT_ARROW)){
            changePosition(-1,0);
        }
        else if(keyDown(RIGHT_ARROW)){
            changePosition(1,0);
        }
        else if(keyDown(UP_ARROW)){
            changePosition(0,-1);
        }
        else if(keyDown(DOWN_ARROW)){
            changePosition(0,+1);
        }
    }
    
    drawSprites();
}
function showError(){
    console.log("could not read database");
}

function changePosition(x,y){
   database.ref('Ball/position').set({
       x:position.x+x,
       y:position.y+y
   })
}
function readposition(data){
    position=data.val();
    ball.x=position.x;
    ball.y=position.y;

}
var tower, towerImage, door, doorImage;
var climber, climberImage, ghostJumping,ghost, ghostStand, spookySound, invisibleBlockGroup;
var doorsGroup,invisibleBlock,climbersGroup;
var PLAY=1;
var END=0;
var gameState=PLAY;

function preload(){
  towerImage=loadImage("tower.png");
  doorImage=loadImage("door.png");
  climberImage=loadImage("climber.png");
  ghostJumping=loadImage("ghost-jumping.png");
  ghostStanding=loadImage("ghost-standing.png");
  spookySound=loadSound("spooky.wav");
}


function setup(){
  createCanvas(600,600);
  
  tower=createSprite(300,300);
  tower.addImage("tower",towerImage);
  tower.velocityY=1;
  
  ghost=createSprite(200,200,50,50);
  ghost.addImage("ghost",ghostJumping);
  ghost.scale=0.3;

doorsGroup=new Group();
  climbersGroup=new Group();
  invisibleBlockGroup=new Group();
}

  function draw(){
  
 if(gameState===PLAY){
      
    
 if(tower.y>350){ 
   tower.y=300;
    }
   
if(keyDown("space")){
  ghost.velocityY=-5; 
}

if(keyDown("left_arrow")){
  ghost.x=ghost.x-3;  
}
 
if(keyDown("right_arrow")){
  ghost.x=ghost.x+3;  
}
 
ghost.velocityY=ghost.velocityY+0.8;

  if(climbersGroup.isTouching(ghost))   {
    ghost.velocityY=0;
  } 
      
      
  if(invisibleBlockGroup.isTouching(ghost)||ghost.y>600){
    ghost.destroy();
    gameState=END;
    
  }
    
  
   
   
    spawnDoors() ;
        
    }
    else if(gameState===END){
    
     
      background(0);
      fill("yellow");
     textSize(30);
      text("Game over",300,300);
       
    
      
    }
      
    drawSprites();
 
}

function spawnDoors(){
  if(frameCount %240===0){
    door=createSprite(200,-50)
    climber=createSprite(200,10);
    
    invisibleBlock=createSprite(200,15)
     invisibleBlock.width=climber.width;
    invisibleBlock.height=2;
    invisibleBlock.velocityY=1;
    invisibleBlock.lifetime=700;
    
    door.x=(Math.round(random(150,400)));
    door.addImage(doorImage);
    door.scale=0.8;
    door.velocityY=1;
    door.lifetime=700;
    invisibleBlock.x=door.x;
    
    climber.addImage(climberImage);
    climber.velocityY=1;
    climber.x=door.x;
    climber.lifetime=700;
  
    ghost.depth=door.depth;
    ghost.depth=ghost.depth+1;
 
    invisibleBlock.debug=true;
  
    invisibleBlockGroup.add(invisibleBlock);
   doorsGroup.add(door);
    climbersGroup.add(climber);
  }

}

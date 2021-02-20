var player;
var life=3;
var score=0;
var coinImage, gems;
var coin,coinsGroup;
var playerImage,playerJImage;
var enemey1,enemey2,enemey3,enemyImage;
var ground,groundImage;
var bgSprite, bgImage;
var houndImage,houndGroup;
var enemeyGroup;
var gameState=0;
var gameOverI,restartI;
function preload(){
playerImage=loadAnimation("Ninja1.png","Ningia2.png","Ningia3.png","Ningia4.png","Ningia5.png")
//playerJImage=loadAnimation("NJ.png","NJ2.png","NJ3.png","NJ4.png","NJ5.png","NJ6.png","NJ7.png","NJ.png",);
houndImage=loadAnimation("hound1.png","enemy1-3.png","enemy1-4.png");
enemyImage=loadImage("bug1.png");
groundImage=loadImage("wood.png");
bgImage=loadImage("backgrounds2.png");
coinImage=loadAnimation("coin1.png","coin2.png","coin3.png","coin4.png","coin5.png","coin6.png")
gameOverI=loadImage("gameOverI.png");
restartI=loadImage("restartB.png");
}

function setup(){
createCanvas(1000,625);
bgSprite=createSprite(200,300,50,50);
bgSprite.addImage(bgImage);
bgSprite.velocityX=-3;
player= createSprite(200,535,50,40);
player.setCollider("rectangle",0,0,40,150);
//player.debug=true;
ground= createSprite(600,725,900,40);
ground.velocityX=-3;
player.addAnimation("player",playerImage);
ground.addImage("wood",groundImage);
ground.scale=2;
player.scale=0.8;
gameOver=createSprite(200,200);
restart= createSprite(200,400);
gameOver.addImage(gameOverI);
restart.addImage(restartI);
gameOver.visible=false;
restart.visible=false;
coinsGroup=new Group();
enemeyGroup=new Group();
houndGroup=new Group();
}
function draw(){
    if(gameState===0){
        gameOver.visible=false;
restart.visible=false;
background(0);
player.collide(ground);
if(ground.x<100){
    ground.x=500;
    
}
if(bgSprite.x<-100){
   bgSprite.x=500;
    
}
for(var i=0;i<coinsGroup.length;i++){
if(player.isTouching(coinsGroup.get(i))){
    coinsGroup.get(i).destroy(i)
    score=score+1;
}
}
for(var i=0;i<houndGroup.length;i++){
    if(player.isTouching(houndGroup.get(i))){
        houndGroup.get(i).destroy(i)
        life=life-1;
    }
    }
    for(var i=0;i<enemeyGroup.length;i++){
        if(player.isTouching(enemeyGroup.get(i))){
            enemeyGroup.get(i).destroy(i)
            life=life-1;
        }
        }

if(keyDown(UP_ARROW)){
player.velocityY=-10;
//player.addAnimation("player",playerImageJ);
}
player.velocityY=player.velocityY+0.8;
if(keyDown(LEFT_ARROW)){
    player.x=player.x-2;
    }
    if(keyDown(RIGHT_ARROW)){
        player.x=player.x+2;
        }
spwancoins();
enemies();
hounds();
drawSprites()
textSize(30);
fill("red");
text("score: "+score,800,50);
text("lives: "+life,500,50);
if(life===0){
    gameState=1;
    }
    }
  else if(gameState===1){
        background("red");
       gameOver.visible=true;
       restart.visible=true;
        if(mousePressedOver(restart)){
            gameState=0;
            gameOver.destroy();
            restart.destroy();

        }
        drawSprites()
    }
}
function spwancoins(){
    if(frameCount%120===0){
coin=createSprite(900,200);
coin.addAnimation("coin",coinImage);
coin.velocityX=-2;
coin.scale=0.5;
coin.y=random(200,600);
coinsGroup.add(coin);
    }
}
function enemies(){
    if(frameCount%400===0){
        enemy=createSprite(500,300);
       enemy.addImage("enemy",enemyImage);
        enemy.velocityX=-3;
        enemy.scale=0.5;
        enemy.y=random(200,600);
        enemeyGroup.add(enemy);
        }
 
    
}
function hounds(){
    if(frameCount%500===0){
    hound=createSprite(900,50);
    hound.addAnimation("hound",houndImage);
    hound.velocityX=-3;
    hound.scale=0.5;
    hound.y=random(200,600);
    houndGroup.add(hound);
    }
}



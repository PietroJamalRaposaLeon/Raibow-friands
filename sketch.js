
var jogador,jogadorImg,pulo2;

var fundo,fundoImg;

var blue,blueImg;

var musica;

var chao;

var roxoImg,orangeImg;

var buracoImg;

var score;

var PLAY = 1;

var END = 0;


function preload(){

fundoImg = loadImage("fundo5.png");

musica = loadSound("som.mp3");

blueImg = loadAnimation("blue1.png","blue2.png","blue3.png","blue4.png");

jogadorImg = loadAnimation("run1.png","run2.png","run3.png","run2.png");

pulo2 = loadAnimation("pulo.png");

roxoImg = loadImage("roxo.png");

orangeImg = loadAnimation("orange1.png","orange2.png","orange3.png","orange.png");
 
buracoImg = loadImage("buraco.png");

}

function setup() {
 createCanvas(700,300);

 fundo = createSprite(350,150,30,30);
 fundo.addImage("Img",fundoImg);
 fundo.scale = 1;
 fundo.velocityX = -10

 blue = createSprite(100,200);
 blue.addAnimation("blueImg",blueImg);
 blue.scale=0.25;
 blue.setCollider("circle",-80,100,240);
 blue.debug = true;

 jogador = createSprite(300,200);
 jogador.addAnimation("jogadorImg",jogadorImg);
 jogador.scale = 0.25
 jogador.debug = true;
 jogador.setCollider("circle",0,100,200);
 jogador.velocityY = 0.8;
 
 chao = createSprite(300,280,600,20);
 chao.visible = false;

 parede = createSprite(0,150,10,400);
 parede.visible = false;

 buracoGroup = createGroup();
 roxoGroup = createGroup();
 orangeGroup = createGroup();
 
 score = 0;
 
}

function draw() {
 background("blue");
 
 jogador.collide(chao);
 blue.collide(chao);
 blue.collide(parede);

 if(gameState === PLAY){

    score = score + Math.round(getFrameRate()/60);

    if(fundo.x <50){
      fundo.x = 500;
    }
    if(keyDown("up") && jogador.y >= 160|| keyDown("space")&& jogador.y >= 180){

        jogador.velocityY = -15;
       
       }
       
       if(orangeGroup.isTouching(jogador)){
        
        gameState = END;

       }
       
       jogador.velocityY = jogador.velocityY +0.8;
       blue.velocityX = blue.velocityX -0.8;
       
       roxo();
       buraco();
       laranja();
}
drawSprites();

text("Pontua????o: "+ score, 500,50);
}

function roxo(){
 if(frameCount % 190 === 0){
  var  roxo = createSprite(800,230);
  roxo.addImage("roxoImg",roxoImg);
  roxo.velocityX = -10;
  roxo.scale = 0.25;

  var rand = Math.round(random(190,600));
  roxo.lifetime = 600;
  roxo.depth = jogador.depth;
  jogador.depth = jogador.depth +1

  roxo.depth = blue.depth;
  blue.depth = blue.depth +1

  roxoGroup.add(roxo);
 }
}
 
 function laranja(){
 if(frameCount % 400 === 0){
  var orange = createSprite(1000,230);
  orange.addAnimation("orangeImg",orangeImg);
  orange.setCollider("circle",0,80,200);
  orange.debug = true;
  orange.velocityX = -15
  orange.scale = 0.25;
  var ran = Math.round(random(400,600));
  orange.lifetime = 800; 
  orangeGroup.add(orange);

 }
 }

 function buraco(){
    if(frameCount % 100 === 0){
     var buraco = createSprite(1000,270);
     buraco.addAnimation("buracoImg",buracoImg);
     buraco.setCollider("circle",0,80,200);
     buraco.debug = true;
     buraco.velocityX = -10;
     buraco.scale = 0.08;
     var ra = Math.round(random(100,600));
     buraco.lifetime = 800; 
   
     buraco.depth = jogador.depth;
     jogador.depth = jogador.depth +1
   
     buraco.depth = blue.depth;
     blue.depth = blue.depth +1

     buracoGroup.add(buraco);

    }
    }

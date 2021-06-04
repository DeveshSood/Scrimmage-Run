var wii,wi;
var gii,gi,gj,gd;
var epki,epk,epkgrp;
var gpki,gpk,gpkgrp;
var bki;
var grdi,grd;
var shi,sh;
var tri,tr;
var scl = 1;
var hi,h;

var gmst = "startscreen";
var gmori,gmor;
var resti,rest;

var laserSound;
var laughSound;
var bkgrdSound;

var shots, chk = 0, potion, potiongrp, potioni, trgrp;
var score = 0,health = 6;
var gpke =0;
var epke =0;
var hpt =0;

function preload() {
  
 gii = loadAnimation("images/rf1.png","images/rf2.png","images/rf3.png","images/rf4.png","images/rf5.png","images/rf6.png");
  
 wii = loadAnimation("images/g1.png","images/g2.png","images/g3.png","images/g4.png","images/g5.png","images/g6.png");
 
 gj = loadAnimation("images/rf3.png", "images/rf3.png");

 gd = loadAnimation("images/gidown.png", "images/gidown2.png", "images/gidown3.png");

  bki = loadImage("images/bkgrd.jpg");
  grdi = loadImage("images/grass2.PNG");
  gpki = loadImage("images/good pmk.png");
  epki = loadImage("images/evil pmk.png");
  potioni = loadImage("images/potion.png")
  shi = loadImage("images/LA.png");
  tri = loadImage("images/tree1.png");
  hi = loadImage("images/house.png");
  gmori = loadImage("images/gameover.png");
  resti = loadImage("images/reset-button-png.png");
  laserSound = loadSound("sounds/Comet-SoundBible.com-1256431940.wav");
  laughSound = loadSound("sounds/cackle3.wav");
  bkgrdSound = loadSound("sounds/evil_and_horror.mp3");
 }

function setup() {
  createCanvas(1450, 600);
 
  background = createSprite(width/2,height/2,600,300);
  background.addImage(bki);
  background.scale = 0.29;
    
  cgrd=createSprite(300,565,600,10);
  cgrd.visible = false;
  
  wi=createSprite(70,220,20,20);
  wi.addAnimation("witch",wii);
  
  gi=createSprite(300,520,20,20);
  gi.addAnimation("girl",gii);
  gi.debug = false;
  gi.setCollider("rectangle",0,0,48,55);
  
  grd=createSprite(0,575,20,20);
  grd.addImage(grdi);
  grd.scale = 0.6;
  
  gmor = createSprite(width/2,height/2-50,20,20);
  gmor.addImage(gmori);
  gmor.visible = false;
  
  rest = createSprite(width/2,height/2+50,20,20);
  rest.addImage(resti);
  rest.scale = 0.2;
  rest.visible = false;
  
  bkgrdSound.loop();
  
  shots = new Group();
  gpkgrp = new Group();
  epkgrp = new Group();
  potiongrp = new Group();
  trgrp = new Group();
  fill(255); 
}

function draw() {
  if(gmst === "startscreen"){
    textSize(20);
    fill("black");
    text("Hi, This Is A Game Made By Devesh Sood", 500, 20);
    text("Instructions:-", 10, 80);
    text("\nYou will be followed by a witch from the starting of the game and you have \nto stay safe from the witch's lazer which she will be shooting randomly at you.", 10, 100);
    text("\nYou have to score as much as you can", 10, 170);
    text("\n1. Gather the Good Pumpkin, For each Good Pumpkin You Eat Your Score Increases By 16.", 10, 200);
    text("\n2. Don't Eat The Evil Pumpkin, For each Evil Pumpkin You Eat Your Score Decreases By 4.", 10, 220);
    text("\n3. Each Time You Get Hit By The Witch's Lazer, Yor Health Decreases By 1 And Your Score Decreases By 5.", 10, 240);
    text("\n4. If Your Health Will be Less Than 5, You Will Get A Potion Which On Eating Will Increase Your Health By 1 \n\t\tBut At The Same Time, It Will Decrease your Score By 8.", 10, 263);
    text("\n5. Press P to pause the game and S to resume the game.", 10, 309);
    text("\n6. Press M to mute the sound and U to again play the sound.", 10, 329);
    text("Press SpaceBar To Start Playing", 540, 420);
    textSize(100);
    text("\"Scrimmage Run\"", 310, 570);
    gameStart();
  }
  if(gmst==="play" || gmst==="noSound"){
  playSound();
  grd.velocityX = -4;
  if(grd.x<0){
    grd.x = 300;
  }
  if(frameCount % 70===0){
    trees();
  }
  gi.collide(cgrd);

  if(keyDown("space") && gi.y > 520.124 || keyDown("up") && gi.y > 520.124 || mousePressedOver(gi) && gi.y > 520.124 ){
    gi.velocityY = -10.4;
  }

  if(gi.y<520.124){
    gi.addAnimation("gjumping", gj);
    gi.changeAnimation("gjumping", gj);
  }
  else{
    gi.changeAnimation("girl", gii);
  }

  wi.scale = 1.5;
  gi.scale = 1.43;
  wi.y = gi.y -30;
  gi.velocityY = gi.velocityY +0.33;
  
  chk = Math.round(random(120,180));
  if(frameCount%chk===0){
    shot();
    if(gmst==="play")
    laserSound.play();
  }
  
  if(frameCount%200===0){
    gpumpkin();
  }
  if(frameCount%Math.round(random(230,250))===0){
    epumpkin();
  }
  if(frameCount%300===0 && gmst ==="play"){
    laughSound.play();
  }  
  if(frameCount%950===0 && health<5){
    hpPotion();
  }
  if(gmst === "play" && keyDown("P") || gmst === "noSound" && keyDown("P")){
    bkgrdSound.stop();
    grd.velocityX = 0;
    gi.velocityY = 0;
    if(h){
      h.velocityX = 0;
    }
    if(gpkgrp){
      gpkgrp.setVelocityXEach(0);
    }
    if(epkgrp){
      epkgrp.setVelocityXEach(0);
    }
    if(shots){
      shots.setVelocityXEach(0);
    }
    if(trgrp){
      trgrp.setVelocityXEach(0);
    }
    if(potiongrp){
      potiongrp.setVelocityXEach(0);
    }

    gmst = "pause";
  }
  if(gmst === "play" && keyDown("M")){
    bkgrdSound.stop();
    gmst="noSound";
  }

  hits();
    if(health === 0){
      gmst = "end";
      wi.y = wi.y;
      gi.y = 520.124;
      epkgrp.destroyEach();
      gpkgrp.destroyEach();
      shots.destroyEach();
      potiongrp.destroyEach();
      gmor.visible = true;
      bkgrdSound.stop();
      rest.visible = true;
      gi.addAnimation("gidown", gd);
      gi.changeAnimation("gidown",gd);
    }
    drawSprites();
    textSize(20)
    text("Score : " +score,1330,50);
    text("Good Pumpkins Eaten : "+gpke, 200, 50);
    text("Potions Drank : "+hpt, 600, 50);
    text("Evil Pumpkins Eaten : "+epke, 900, 50)
    text("Health : " +health,20,50);
    textSize(12)
    text("Made By : Devesh Sood",1305,595);
    textSize(50);
    text("\"Scrimmage Run\"", 18, 110);
   }
   if(gmst==="end"){
      Reset();
   }
   if(gmst==="pause"){
     pause();
   }
}

function trees() {
  tr = createSprite(1500,255,20,20);
  tr.addImage(tri);
  scl = Math.round(random(1,3));
  if(scl===1){
    tr.scale = 0.9;
    tr.y = 465;
  }
  else if(scl===2){
    tr.scale = 1;
    tr.y = 460;
  }
  else if(scl===3){
    tr.scale = 1.2;
    tr.y = 450;
  }
  tr.depth = background.depth +1;
  tr.velocityX = -5;
  trgrp.add(tr);
}
function shot() {
  sh = createSprite(100,wi.y+30,20,20);
  sh.addImage(shi);
  sh.scale = 0.1;
  sh.depth = wi.depth -1;
  sh.depth = tr.depth +1;
  sh.velocityX = 3.6;
  //sh.debug = true;
  shots.add(sh);
}
function hits(){
  for(i = 0;i < shots.length;i++){
    if(shots[i].isTouching(gi)){
      shots[i].destroy();
      health = health - 1;
      score = score - 5;
    }
  }
  for (j = 0; j < gpkgrp.length; j++){ 
  if(gpkgrp[j].isTouching(gi)){
    score = score +16;
    gpke++;
    gpkgrp[j].destroy();
  }
 }
  for (k = 0; k <epkgrp.length; k++){
    if(epkgrp[k].isTouching(gi)){
      score = score -4;
      epke++;
      epkgrp[k].destroy();
    }
  }
  for(l = 0;l < potiongrp.length;l++){
    if(potiongrp[l].isTouching(gi)){
      potiongrp[l].destroy();
      health = health + 1;
      score = score - 8;
      hpt++;
    }
  }
}
function gpumpkin(){
  gpk = createSprite(1500,530,20,20);
  gpk.addImage(gpki);
  gpk.scale = 0.23;
  gpk.velocityX = -4;
  gpk.depth = grd.depth -1;
  gpk.setCollider("circle",0,30,110);
  gpkgrp.add(gpk);
  //gpk.debug = true;
  }
function epumpkin(){
  epk = createSprite(1500,530,20,20);
  epk.addImage(epki);
  epk.scale = 0.3;
  epk.velocityX = -4;
  epk.depth = grd.depth -1;
  //epk.debug = true;
  epk.setCollider("circle",0,30,70);
  epkgrp.add(epk);
}
function hpPotion(){
  potion = createSprite(1500,530,20,20);
  potion.addImage(potioni);
  potion.scale = 0.6;
  potion.velocityX = -4;
  potion.depth = grd.depth -1;
  //potion.debug = true;
  potion.setCollider("circle",0,0,45);
  potiongrp.add(potion);
}
function dreset(){
  gmst = "play";
  h = createSprite(400,380,20,20);
  h.addImage(hi);
  h.velocityX = -5;
  h.depth = wi.depth -1;
  h.depth = tr.depth +1;
  h.depth = grd.depth -1;
  wi.y = 220;
  gi.y = 520;
  wi.visible = true;
  gi.visible = true;
  if(epk){
    epk.visible = true;
  }
  if(gpk){
    gpk.visible = true;
  }
  hpt=0;
  epke=0;
  gpke=0;
  score = 0;
  health = 6;
  bkgrdSound.loop();
}
function Reset(){
  if(mousePressedOver(rest) && mouseDown("leftButton") || keyDown("space")){
      gmst = "play";
      h = createSprite(400,380,20,20);
      h.addImage(hi);
      h.velocityX = -5;
      h.depth = wi.depth -1;
      h.depth = tr.depth +1;
      h.depth = grd.depth -1;
      wi.y = 220;
      gi.y = 520;
      wi.visible = true;
      gi.visible = true;
      if(epk){
        epk.visible = true;
      }
      if(gpk){
        gpk.visible = true;
      }
      gmor.visible = false;
      rest.visible = false;
      hpt=0;
      epke=0;
      gpke=0;
      score = 0;
      health = 6;
      bkgrdSound.loop();
  }    
}
function pause(){
       if(keyDown("S")){
         bkgrdSound.loop();
         gmst = "play";
         grd.velocityX = 0;
         gi.velocityY = 0;
         if(h){
          h.velocityX = -5;
         }
         if(gpkgrp){
          gpkgrp.setVelocityXEach(-4);
         }
         if(epkgrp){
          epkgrp.setVelocityXEach(-4);
         }
         if(shots){
          shots.setVelocityXEach(3.6);
         }
         if(trgrp){
          trgrp.setVelocityXEach(-5);
         }
         if(potiongrp){
          potiongrp.setVelocityXEach(-4);
         }
       }
}
function playSound(){
  if(keyDown("U")){
      bkgrdSound.loop();
      gmst="play";
  }
}
function gameStart(){
  if(keyCode === 32){
    gmst = 'play';

    h = createSprite(400,380,20,20);
    h.addImage(hi);
    if(h){
      h.velocityX = -5;
      if(wi)
      h.depth = wi.depth -1;
      if(tr)
      h.depth = tr.depth +1;
      if(grd)
      h.depth = grd.depth -1;
    }
  }
}
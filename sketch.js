var wallImg, wall;
var rockImg, rock, rocksGroup;
var PuddleImg, Puddle, PuddlesGroup;
var Joe, JoeImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"
function preload(){
    wallImg = loadImage("Wall.png");
    rockImg = loadImage("rock.png");
    puddleImg = loadImage("Puddle.png");
    JoeImg = loadImage("Joe.png");
}

function setup() {
    createCanvas(600,600);
    wall = createSprite(300,300);
    wall.addImage("wall",wallImg);
    wall.velocityY = 1;
    wall.scale= 2
    
    rocksGroup = new Group();
    puddlesGroup = new Group();
    invisibleBlockRockGroup = new Group();
    invisibleBlockPuddleGroup = new Group();
    
    Joe = createSprite(200,200,50,50);
    Joe.scale = 0.3;
    Joe.addImage("Joe", JoeImg);
}

function draw(){
    background(0);
    drawSprites();
    if (gameState === "play") {

      if(wall.y > 600){
        wall.y = 300
      }
      if(keyDown("left_arrow")){
        Joe.x = Joe.x - 3;
      }
      
      if(keyDown("right_arrow")){
        Joe.x = Joe.x + 3;
      }
      
      if(keyDown("Enter")){
        Joe.velocityY = -10;
      }
      
      Joe.velocityY = Joe.velocityY + 0.8
      
      spawnRocks();
      if(puddlesGroup.isTouching(Joe)){
        Joe.velocityY = 0;
      }
      if(invisibleBlockRockGroup.isTouching(Joe) || Joe.y > 600){
        Joe.destroy();
        gameState = "end"
      }
      
      
    }
    
    if (gameState === "end"){
      wall.destroy()
      rocksGroup.destroyEach()
      stroke("green");
      fill("green");
      textSize(30);
      text("Game Over", 230,250)
    }

    
  }
  
  function spawnRocks() {
    if (frameCount % 240 === 0) {
      var rock = createSprite(round(random(100,500)), -50);
      var puddle = createSprite(round(random(100,500)),-50);
      
      var invisibleBlockRock = createSprite(rock.x,rock.y,100,20);
      invisibleBlockRock.width = puddle.width;
      invisibleBlockRock.height = 2;
      
      var invisibleBlockPuddle = createSprite(puddle.x,puddle.y , 100,20);
      invisibleBlockPuddle.height = 2;
      
      
      
      rock.addImage(rockImg);
      puddle.addImage(puddleImg);
      
      rock.velocityY = 1;
      puddle.velocityY = 1;
      invisibleBlock.velocityY = 1;
      
      Joe.depth = rock.depth;
      Joe.depth +=1;
     
      Joe.depth = puddle.depth + 1;
  
      rock.lifetime = 800;
      puddle.lifetime = 800;
      invisibleBlockRock.lifetime = 800;
  
      rocksGroup.add(rock);
      invisibleBlock.debug = true;
      puddlesGroup.add(puddle);
      invisibleBlockRockGroup.add(invisibleBlock);
    }
  }
  
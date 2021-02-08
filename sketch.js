//Create variables here
var dog , happyDog,database, foodS , foodStock;
var ndog;
var feed;
var fedTime,lastFed;
var foodObj;
var Foodn;
function preload()
{
  //load images here
  dog=loadImage("images/dogImg.png");
  happyDog=loadImage("images/dogImg1.png");
}

function setup() {
	createCanvas(900, 500);
  ndog=createSprite(650,350,2,2);
  ndog.addImage(dog);
  ndog.scale=0.3;

  database=firebase.database();
  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
feed= createButton("Feed the Dog");
feed.position(700,95);
feed.mousePressed(addFoods);

addFood=createButton("Add Food");
addFood.position(800,95);
addFood.mousePressed(addFoods);

}

function draw() {  
background(46,139,87);

  drawSprites();
  //add styles here
  textSize(20);
  fill("white");
  stroke("white");
  text("Food Remaining:"+foodStock,50,100);
  text("Note: Press UP_ARROW Key To Feed Drago Milk",30,490)

  fedTime=database.ref('FeedTime');
  fedTime.on("value",function(data){
    lastFed=data.val();
  });

  fill(255,255,254);
  textSize(15);
  if(lastFed>=12){
    text("Last Fed:"+lastfed%12+"P.M.",350,30);
  }
  else if(lastFed===0){
    text("Last Fed: 12 A.M.",350,30);
  }
  else{
    text("Last Fed:"+lastFed+"A.M.",350,30);
  }

}

function readStock(data){
  foodS=data.val();
}

function writeStock(x){
  if(x<=0){
    x=0;
  }
  else
  {
    x=x-1;
  }
  database.ref('/').update({
    Food: x
  })
}

function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS

  })
  Foodn=new Food();
  Foodn.display();
}

function feedDog(){
 ndog.addImage(happyDog);

 foodObj.updateFoodStock(foodObj.getFoodStock()-1);
 database.ref('/').update({
   Food:foodObj.getFoodStock(),
   FeedTime:hour()
 })
}

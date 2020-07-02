class Game {
    constructor(){

    }
    
    getState(){
      var gameStateRef  = database.ref('gameState');
      gameStateRef.on("value",function(data){
         gameState = data.val();
      })
     
    }
  
    update(state){
      database.ref('/').update({
        gameState: state
      });
    }
  
    async start(){
      if(gameState === 0){
        player=new Player();
        var playerCountRef=await database.ref('playerCount').once("value");
        if(playerCountRef.exists()){
          playerCount=playerCountRef.val();
          player.getCount();
        }
        form = new Form()
        form.display();
      }
  
      player1 = createSprite(10,300);
      player1.addImage("player1",player1_img);
      player1.scale = 0.35;
      player2 = createSprite(10,500);
      player2.addImage("player2",player2_img);
      player2.scale = 0.35;
      player3 = createSprite(10,700);
      player3.addImage("player3",player3_img);
      player3.scale = 0.35;
      player4 = createSprite(10,900);
      player4.addImage("player4",player4_img);
      player4.scale = 0.35;
      players = [player1,player2,player3,player4];
    }
  
    play(){
      form.hide();
      
      Player.getPlayerInfo();
      
      if(allPlayers !== undefined){
        background(rgb(198,135,103));
        image(track,0,360,displayWidth*4, displayHeight+60);
        
        
        
       
        var index = 0;
  
        
        var y = 430 ;
        var x = 0;
  
        for(var plr in allPlayers){
         
          index = index + 1 ;
  
          
          y = y + 180;
          
          x = displayHeight - allPlayers[plr].distance;
          players[index-1].x = x;
          players[index-1].y = y;
  
          if (index === player.index){
            players[index - 1].shapeColor = "red";
            camera.position.y = displayWidth/2;
            camera.position.x = players[index-1].x;
          }
         
          
        }
  
      }
  
      if(keyIsDown(RIGHT_ARROW) && player.index !== null){
        player.distance -=10
        player.update();
      }
      if(keyIsDown(LEFT_ARROW) && player.index !== null){
        player.distance +=10
        player.update();
      }
      if(player.distance == -6400){
        gameState = 2;
      }
      drawSprites();
    }
  
    end(){
      console.log("Game Ended");
    }
  }
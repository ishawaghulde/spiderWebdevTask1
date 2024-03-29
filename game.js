	
	
	var canvas = document.getElementById("myCanvas");
	var btn = document.getElementById("pause");
	var img = document.getElementById("pic");
	var ctx = canvas.getContext("2d");
	var x = 0;
	var dx = 0.04;
	var radius = 70;
	var rightPressed = false;
	var leftPressed = false;
	var blueCenX = 0;
	var blueCenY = 0;
	var redCenX = 0;
	var redCenY = 0;
	var play = true;
	var score = 0;
	var barWidth = 1;
	var bar = document.getElementById("progress");
	var image = document.getElementById("source");
	var picture = document.getElementById("source2");
	var rad = 70;
	var check1;
	var check2;
	var mult = false;
	var scoreA = 0;
	var scoreB = 0;
	var activeA = false;
	var nameA = "";
	var nameB = "";
	var n =0;
	var tally =0;
	var powerUpFlight = false;
	var powerUpHorlicks = false;
	var xCoordinate = 0;
	var yCoordinate = 0;
	var tick = 0;
	var prevBlocks;
	var powerUp = false;
	var flag = false;
	

	document.addEventListener("keydown", keyDownHandler, false);
	document.addEventListener("keyup", keyUpHandler, false);

	//setting up multiplayer game
	function multiplayer(){
		playAgain();
		mult = true;
		activeA = true;
		nameA = prompt("Enter name of player 1");
		nameB = prompt("Enter name of player 2");
		console.log(nameA);
		console.log(nameB);

	}

	//pause and play button
	function toggle(){
		play = !play;
		if(play==true){
			img.src = "finalplay.png";
		}
		else{
			img.src = "finalpause.jpg";
		}
	}

	//restarting the game
	function playAgain(){
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		score = 0;
		scoreA = 0;
		scoreB = 0;
		if(mult == true){
			drawMultScore();
		}
		else{
			drawScore();
		}
		blocks = [];
		play = true;
		x = 0;
		tally =0;
		tick = 0;
		n=0;
		setTimeout(restart, 5000);

	}
	function restart(){
		console.log("restarted");
	}

	//moving the players
	function keyDownHandler(e) {
    	if(e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = true;
    	}
   	 	else if(e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = true;
    	}
	}

	function keyUpHandler(e) {
    	if(e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = false;
    	}
    	else if(e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = false;
    	}
	}

	//drawing the players
	function drawPlayer(){
		if(play == true){
			// ctx.clearRect(0, 0, canvas.width, canvas.height);
			drawCircle();
			drawDuet();
			if(mult == false){
				drawScore();
			}
			else{
				drawMultScore();
			}
			
			drawBar();
			
			if(rightPressed){
				x += dx;

			}
			else if(leftPressed){
				x -= dx;
			}
			else{
				x += 0;
			}
		}
		
		
	}

	//drawing affection bar
	function drawBar(){
		if(mult == true && activeA == true){
			score = scoreA;
		}
		else if(mult == true && activeA == false){
			score = scoreB;
		}
		else{
			score = score;
		}
		if(barWidth<200){
			barWidth = score*2;
			bar.style.width = barWidth + "px";
		}
		else if(score == 4 && play == true){
			barWidth = score*50;
			bar.style.width = barWidth + "px";
			play = false;
			console.log(flag);
			console.log(play);
			if(play == false && flag == false ){
				check1 = setInterval(function() {
 		 			//update();
    						converge();
						}, 20);
				
			}
			else{
				play = true;
				score++;
				console.log(play);
			}
		}
	}

	//converge when affection meter becomes full
	function converge(){
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		var diff = 0.2;
		rad = rad - diff;
		
		if(rad>0 ){
			
			drawCircle();
			drawDuet();
			

		}
		else{
			console.log("here");
			clearInterval(check1);
			check2 = setInterval(diverge, 20);
			console.log("here");
		}

	}

	//diverge when circles coincide
	function diverge(){
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		var diff = 0.2;
		
		
		if(rad<=70){
			rad = rad + diff;
			drawCircle();
			drawDuet();
		}
		else{
			clearInterval(check2);
			play = true;
			flag = true;
			rad = 70;
			console.log(rad);
		}
	}

	//draw score for single player game
	function drawScore(){
    	ctx.font = "16px Arial";
    	ctx.fillStyle = "#FFFFFF";
    	// ctx.textAlign = "end";
    	ctx.fillText("Score: "+score, 400, 15);
	}

	//draw score for multiplayer game
	function drawMultScore(){
		var name = "";
		if(activeA == true){
			name = nameA;
		}
		else if(activeA == false){
			name = nameB;
		}
		ctx.font = "16px Arial";
    	ctx.fillStyle = "#FFFFFF";
    	ctx.fillText(nameA + " VS "+nameB, 350, 15);
    	ctx.fillText("Now Playing : "+name, 350, 35);
    	ctx.fillText(nameA + " score : "+scoreA, 350, 55);
    	ctx.fillText(nameB + " score : "+scoreB, 350, 75 );
	}

	//draw path circle
	function drawCircle(){
		var cenY = canvas.height-80;
		ctx.beginPath();
		if(powerUp== true){
			var cenY = canvas.height-150;
		}
		ctx.arc(canvas.width/2, cenY, rad, 0, Math.PI*2, false);
		ctx.strokeStyle = "rgba(255, 255, 255, 0.5)";
		ctx.stroke();
		ctx.closePath();
	}

	//draw the players
	function drawDuet(){
		var cenY = canvas.height-80;
		ctx.beginPath();
		if(powerUp== true){
			var cenY = canvas.height-150;
		}

		ctx.beginPath();
		blueCenX = canvas.width/2 + (rad*Math.cos(x));
		blueCenY = cenY + (rad*Math.sin(x));
		ctx.arc(blueCenX,blueCenY , 10, 0, Math.PI*2, false);
		ctx.fillStyle = "rgb(0, 150, 255)";
		ctx.fill();
		ctx.closePath();


		ctx.beginPath();
		redCenX = canvas.width/2 - (rad*Math.cos(x));
		redCenY = cenY - (rad*Math.sin(x));
		ctx.arc(redCenX, redCenY, 10, 0, Math.PI*2, false);
		ctx.fillStyle = "rgb(255, 0, 0)";
		ctx.fill();
		ctx.closePath();
	}

	//start other players tuen in multiplayer
	function startTurn(){
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		
		drawMultScore();
		blocks = [];
		play = true;
		x = 0;
		tally =0;
		n=0;
		tick =0;
		setTimeout(restart, 5000);
	}



	//block variables
	var dy = 2,
    	blocks = [],
    	minWait = 10000,
    	lastTime = +new Date();
    var	n=0;
    var width = 80;

	function Block(x,y,width,height){
    	this.x = x;
    	this.y = y;
    	this.width = width;
    	this.height = height;
	}


	Block.prototype.update = function(){
    	if(this.y < 550){
        	this.y+=dy  
   	 	}else{
        	this.y = 0;   
    	}

    	if( powerUpFlight== true || powerUpHorlicks == true){
    		if(yCoordinate<550){
    			yCoordinate+=dy-1.5;
    		}
    		else{
    			
    			if(tick > 1000){
    				console.log( "tick " +tick);
    				powerUpHorlicks = false;
    				powerUpFlight =false;
    				powerUp = false;
    				dx = 0.02;
    				rad = 70;
    				tick =0;
    			}
    			else{
    				tick++;
    			}
    			
    		}
    	}
	};

	Block.prototype.render = function(){
		
		ctx.fillStyle = "rgb(255,255,255)";
		
		ctx.fillRect(this.x, this.y, this.width, this.height);
		
		

		if(powerUpFlight == true){
			ctx.drawImage(image, xCoordinate, yCoordinate);
		}
		if(powerUpHorlicks == true){
			ctx.drawImage(picture, xCoordinate, yCoordinate);
		}
	
	};

// 	function drawRotatedRect(x, y, width, height) {
// 		var degrees = degrees + 5;

//     // first save the untranslated/unrotated context
//     ctx.save();

//     ctx.beginPath();
//     // move the rotation point to the center of the rect
//     ctx.translate(x + width / 2, y + height / 2);
//     // rotate the rect
//     ctx.rotate(degrees * Math.PI / 180);

//     // draw the rect on the transformed context
//     // Note: after transforming [0,0] is visually [x,y]
//     //       so the rect needs to be offset accordingly when drawn
//     ctx.rect(-width / 2, -height / 2, width, height);

//     ctx.fillStyle = "rgb(255,255,255)";
//     ctx.fill();

//     // restore the context to its untranslated/unrotated state
//     ctx.restore();

// }

	Block.prototype.check = function(){
		// test for ball-block collision
        if ((powerUpHorlicks == false && blueCenX> this.x && blueCenX< this.x + width && blueCenY > this.y && blueCenY < this.y + 20) || (powerUpHorlicks == false && redCenX> this.x && redCenX< this.x + width && redCenY > this.y && redCenY < this.y + 20) ) {
        	if(mult == false && n==0){
        		n++;
        		alert("Game over!");
        		playAgain();
        	}
        	else{
        		if(activeA == true){
        			activeA = false;
        		}
        		else{
        			activeA = true;
        		}
        		startTurn();
        	}
        	
           
        }
        else if((powerUpFlight == true && blueCenX > xCoordinate && blueCenX< xCoordinate + 30 && blueCenY > yCoordinate && blueCenY < yCoordinate + 30) ||(powerUpFlight == true && redCenX > xCoordinate && redCenX< xCoordinate + 30 && redCenY > yCoordinate && redCenY < yCoordinate + 30)){
        		dx = 0.06;
        }

        else if((powerUpHorlicks == true && blueCenX > xCoordinate && blueCenX< xCoordinate + 30 && blueCenY > yCoordinate && blueCenY < yCoordinate + 30) ||(powerUpHorlicks == true && redCenX > xCoordinate && redCenX< xCoordinate + 30 && redCenY > yCoordinate && redCenY < yCoordinate + 30)){
        		rad = 140;
        		powerUp = true;
        }
        else if(powerUpHorlicks == true && redCenX> this.x && redCenX< this.x + width && redCenY > this.y && redCenY < this.y + 20){
        	if(mult == false && n==0){
        		n++;
        		alert("Game over!");
        		playAgain();
        	}
        	else{
        		if(activeA == true){
        			activeA = false;
        			alert(nameA+" playing");
        		}
        		else{
        			activeA = true;
        			alert(nameB+" playing");
        		}
        		startTurn();
        	}
        }

        else{
        	if(prevBlocks != blocks.length){
        		if(mult == false){
        			score = blocks.length;
        			// score = blocks.length;
        		}
        		else if(mult == true && activeA == true){
        			scoreA = blocks.length;
        		}
        		else{
        			scoreB = blocks.length;
        		}
        	}
        	
        	
        	
        }
	}

     //draw the screen
	function draw() {
		if(play == true){

			if(+new Date() > lastTime + Math.random()*100000){
				tally++;
				
				if(tally%100 == 0){
					console.log("powerUp");
					xCoordinate = Math.random()*300;
					yCoordinate = 0;
					if((tally/100)%2 == 0){
						powerUpFlight = true;
						ctx.drawImage(image, xCoordinate, yCoordinate);
					}
					else{
						powerUpHorlicks = true;
						ctx.drawImage(picture, xCoordinate, yCoordinate);
					}
					

				}

			}




			if(+new Date() > lastTime + minWait){
        	lastTime = +new Date();
        	prevBlocks = blocks.length;
        	
        	blocks.push(new Block(Math.random()*300, 0, width,20));

        
     	   
   	 		}
                    
    		ctx.clearRect(0,0,canvas.width, canvas.height);
    		
        
        	blocks.forEach(function(e){
           	 	e.update();
            	e.render();
            	e.check();
        	});

        	drawPlayer();


		}
	
    	
	}


	// if(play){
		setInterval(function() {
 		 //update();
    		draw();
		}, 20);
	// }

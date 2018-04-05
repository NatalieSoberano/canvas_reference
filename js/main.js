(() =>  {

	console.log('game stuff ready!');

	//set up varriables
	const theCanvas = document.querySelector('canvas'),
		ctx = theCanvas.getContext('2d'),
		playerImg = document.querySelector('.ship');
		player = { x: 275, y: 550, width: 50, height: 50, speed: 10, lives: 3},
		bullets = [],
		squares = [
			{ x : 30, y : 30, x2 : 30, y2 : 30, color: 'rgba(0, 200, 0, 0.8)', xspeed : 3, yspeed: 12 },
			{ x : 60, y : 30, x2 : 40, y2 : 40, color: 'rgba(200, 0, 0, 0.8)', xspeed : 7, yspeed: 9 },
			{ x : 90, y : 30, x2 : 35, y2 : 35, color: 'rgba(0, 0, 200, 0.8)', xspeed : 5, yspeed: 8 }
		],
		playButton = document.querySelector('.play'),
		pauseButton = document.querySelector('.pause');

	var playState = true;

	function draw() {
		ctx.clearRect(0,0, theCanvas.width, theCanvas.height); //earasing the canvas
		ctx.drawImage(playerImg, player.x, player.y, player.width, player.height);

		bullets.forEach((bullet, index) => {
			ctx.fillStyle = 'rgba(200, 0, 0, 0.85)';
			ctx.fillRect(bullet.x, bullet.y, bullet.x2, bullet.y2); // for your game do draw img instead of fill rect

		let bulletIndex = index;

		squares.forEach((square, index)=> {
			
			// check for collision (bullets and box)
			if (bullet.y <= (square.y + square.y2) && bullet.y > square.y && bullet.x > square.x && bullet.x < (square.x + square.x2)) {
				delete squares [index];
				delete bullet [bulletIndex];

			//play exploision sound

				let explode = document.createElement('audio');
				explode.src = "audio/expression.mp3";

				document.body.appendChild(explode);

				explode.addEventListener('ended' , () => {
				document.body.removeChild(explode);
				});

				explode.play();
			}
		});

			bullet.y -= bullet.speed;

			// bullet is out of the playing area
			if (bullet.y < 0) {
				delete bullets [index];
			}
		});

		squares.forEach(square => {
			ctx.fillStyle = square.color;
			ctx.fillRect(square.x, square.y, square.x2, square.y2);

			if (square.x + square.x2 > theCanvas.width) {
				square.xspeed *= -1;
			} else if (square.x < 0) {
				square.xspeed *= -1;
			}

			if (square.y + square.y2 > theCanvas.height) {
				square.yspeed *= -1;
			} else if (square.y <0) {
				square.yspeed *= -1;
			}

			square.x += square.xspeed;
			square.y += square.yspeed;
		});

		if (playState === false) {
			window.cancelAnimationFrame(draw);
			return;
		}

		window.requestAnimationFrame(draw);
	}

	// function moveShip(e) {
	// 	//debugger;
	// 	// check the keycode of the key your pressing
	// 	switch (e.keyCode) {
	// 		// left arrow key 
	// 		case 37: // this number is from googling the keycode
	// 		console.log('move the ship left');
	// 		if (player.x > 0) {
	// 			player.x -= player.speed; // move the ship left
	// 		}
	// 		break;

	// 		// right arrow key
	// 		case 39: 
	// 		console.log('move the ship left');
	// 		if (player.x + player.width < theCanvas.width) {
	// 			player.x += player.speed; // move the shop right
	// 		}
	// 		break;

	// 		default:
	// 		// do nothing here
	// 	}
	// }

	function createBullet() {
		//create a bullet and psuh it into the bullet array
		let newBullet = {
			x : player.x + player.width / 2 - 2.5,
			y : theCanvas.height - player.height - 10,
			x2 : 5,
			y2 :10, 
			speed : 12
		};

		bullets.push(newBullet);

		//play chessy laser sound
		let laser = document.createElement('audio');
		laser.src = "aud/laser.mp3";
		document.body.appendChild(laser);

		laser.addEventListener('ended', () => {
			document.body.removeChild(laser);
		});

		laser.play();
	}

	function movePlayer(e) {
		player.x = e.clientX - theCanvas.offsetLeft;
	}

	function resumeGame(){
		playState = true;
		window.requestAnimationFrame(draw);
	}

	function pauseGame(){
		playState = false;
	}

	window.requestAnimationFrame(draw);

	//window.addEventListener('keydown', moveShip);

	//move the player with the mouse instead
	theCanvas.addEventListener ('mousemove', movePlayer);
	theCanvas.addEventListener('click', createBullet);
	playButton.addEventListener('click', resumeGame);
	pauseButton.addEventListener('click', pauseGame);

})();

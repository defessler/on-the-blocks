(function(){
	OTB.require(["GameBoard", "draw", "collision"], function(M) {
		var gBoard = new M.GameBoard(10, 20);
		var i, count = 0, count2 = 0;

		// This code is just test code to see how changing the values work.
		(function(){
			var shape = {
				originalPos: [4, 14, 24, 25],
				currentPos: [175, 185, 195, 196],
				rotateOffsets:[
					[  11,   0, -11,  -2],
					[   9,   0,  -9, -20],
					[ -11,   0,  11,   2],
					[  -9,   0,   9,  20]
				]
			} ;

			var move = true;
			var moveLeft = true;
			var moveRight = true;
			var rotate = true;
			var keyCode = 0;
			var offset = 0;
			var rowCount = 0;
			var collisionData = {};
			var rotate1 = 0;

			document.onkeydown = function(e){
				keyCode = e.keyCode;
			};
			document.onkeyup = function(e){
				keyCode = 0;
			};

			function animate(){
				requestAnimationFrame(animate);

				count += 1;
				if(count >= 30){


					collisionData = M.collision(shape.currentPos, [10, 10, 10, 10], gBoard);

					move = collisionData.vertical;

					if(move){
						for(i = 0; i < shape.currentPos.length; i += 1){
							shape.currentPos[i] += 10;
						}
					}else{
						for(i = 0; i <= gBoard.cursor.length; i += 1){
							if(gBoard.cursor[i] >= 1){
								rowCount += 1;
							}
							count += 1;
							if(count >= gBoard.lengthX){
								count = 0;
								rowCount = 0;
							}
							if(rowCount >= 9){
								console.log('line');
							}
						}
						gBoard.cursor.apply();
						offset = 0;
						shape.currentPos = shape.originalPos.slice(0);
						move = true;
					}
					//console.log(Math.floor(shape[3] / gBoard.lengthX-2));
					count = 0;
				}
				count2 += 1;
				if(count2 >= 5){
					count2 = 0;

					if(keyCode === 37){ //left
						collisionData = M.collision(shape.currentPos, [-1, -1, -1, -1], gBoard, "horizontal");
						console.log(shape);
						if(collisionData.horizontal){
							for(i = 0; i < shape.currentPos.length; i += 1){
								shape.currentPos[i] -= 1;
							}
						}

					}
					if(keyCode === 39){ //right
						collisionData = M.collision(shape.currentPos, [1, 1, 1, 1], gBoard, "horizontal");
						if(collisionData.horizontal){
							for(i = 0; i < shape.currentPos.length; i += 1){
								shape.currentPos[i] += 1;
							}
						}
					}

					if(keyCode === 38){ //up
						collisionData = M.collision(shape.currentPos, shape.rotateOffsets[offset], gBoard, "rotate");
						console.log(shape);
						if(collisionData.rotate){
							for(i = 0; i < shape.currentPos.length; i += 1){
								shape.currentPos[i] +=  shape.rotateOffsets[offset][i];
								shape.currentPos[i] += collisionData.rotateOffset;
							}

							offset += 1;

							if(offset > 3){
								offset = 0;
							}
						}
					}

				}
				gBoard.cursor.clear();
				for(i = 0; i < shape.currentPos.length; i +=1){
					gBoard.cursor[shape.currentPos[i]] = 1;
				}
				M.draw(gBoard, "dom");
			}

			animate();

			//gBoard.cursor.apply();
		}());

	});
}).call();
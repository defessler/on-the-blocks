(function(){
	OTB.require(["GameBoard", "draw", "collision"], function(M) {
		var gBoard = new M.GameBoard(10, 20);
		var i, count = 0, count2 = 0;

		window.gBoard = gBoard;
		// This code is just test code to see how changing the values work.
		(function(){
			var shape = {
				originalPos: [4, 14, 24, 25],
				currentPos:  [4, 14, 24, 25],
				rotateOffsets:[
					[  11,   0, -11,  -2],
					[   9,   0,  -9, -20],
					[ -11,   0,  11,   2],
					[  -9,   0,   9,  20]
				]
			} ;

			var i = 0;
			var move = true;
			var moveLeft = true;
			var moveRight = true;
			var rotate = true;
			var keyCode = 0;
			var offset = 0;
			var rowCount = 0;
			var collisionData = {};
			var rotate1 = 0;
			var clearRows = {
				len: 0,
				row: [],
				count: 0,
				i: 0
			};
			var store = true;
			var j;
			var test = [];
			document.onkeydown = function(e){
				keyCode = e.keyCode;
			};
			document.onkeyup = function(e){
				keyCode = 0;
			};

			function animate(){
				requestAnimationFrame(animate);

				count += 1;
				if(count >= 10){
					collisionData = M.collision(shape.currentPos, [10, 10, 10, 10], gBoard);

					if(collisionData.vertical){
						for(i = 0; i < shape.currentPos.length; i += 1){
							shape.currentPos[i] += 10;
						}
					}else{
						gBoard.cursor.apply();
						offset = 0;
						shape.currentPos = shape.originalPos.slice(0);
						collisionData.vertical = true;
					}
					//console.log(Math.floor(shape[3] / gBoard.lengthX-2));
					count = 0;
				}
				for(i = 0; i < gBoard.length; i += 1){
					if(gBoard[i] >= 1){
						clearRows.len += 1;
					}
					clearRows.count += 1;

					if(clearRows.len > 9){
						for(j = 0; j < clearRows.row.length; j += 1){
							if(parseInt(i / 10, 10) === clearRows.row[j]){
								store = false;
								break;
							}else{
								store = true;
							}
						}
						if(store){
							clearRows.row[clearRows.i] = parseInt(i / 10, 10);
							test[clearRows.i] = i;
							clearRows.i += 1;
						}
					}

					if(clearRows.count >= 10){
						clearRows.count = 0;
						clearRows.len = 0;

					}
					
				}
				for(j = 0; j < clearRows.row.length; j += 1){
					
					for(i = (clearRows.row[j]*10); i <= (clearRows.row[j]*10)+9; i += 1){
						//delete gBoard[i];
					}
					for(i = (clearRows.row[j]*10)+9; i >= 0; i -= 1){
						gBoard[i] = gBoard[i-10];
					}
					
					//gBoard.unshift(j*10);
					clearRows.row[j] = 0;
				}

				console.log(clearRows.row, test);

				count2 += 1;
				if(count2 >= 5){
					count2 = 0;

					if(keyCode === 37){ //left
						collisionData = M.collision(shape.currentPos, [-1, -1, -1, -1], gBoard);
						//console.log(shape.currentPos);
						if(collisionData.horizontal){
							for(i = 0; i < shape.currentPos.length; i += 1){
								shape.currentPos[i] -= 1;
							}
						}

					}
					if(keyCode === 39){ //right
						collisionData = M.collision(shape.currentPos, [1, 1, 1, 1], gBoard);
						//console.log(shape.currentPos);
						if(collisionData.horizontal){
							for(i = 0; i < shape.currentPos.length; i += 1){
								shape.currentPos[i] += 1;
							}
						}
					}

					if(keyCode === 38){ //up
						collisionData = M.collision(shape.currentPos, shape.rotateOffsets[offset], gBoard);

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
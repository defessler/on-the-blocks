(function(){
	OTB.require(["GameBoard", "draw", "collision"], function(M) {
		var gBoard = new M.GameBoard(10, 20);
		var count = 0, count2 = 0, count3 = 20;
		var shape = OTB.shape;

		// This code is just test code to see how changing the values work.
		(function(){

			window.gBoard = gBoard;
			var i = 0;
			var j = 0;
			var offset = 0;
			var collisionData = {};
			var clearRows = {
				len: 0,
				row: [],
				count: 0,
				i: 0
			};
			var store = true;
			var p = Math.floor(Math.random() * 7);
			var key = {
				left: false,
				right: false,
				up: false
			};

			document.onkeydown = function(e){
				if(e.keyCode === 37){ //left
					key.left = true;
				}
				if(e.keyCode === 39){ //right
					key.right = true;
				}
				if(e.keyCode === 38){ //up
					key.up = true;
				}
			};
			document.onkeyup = function(e){
				if(e.keyCode === 37){ //left
					key.left = false;
				}
				if(e.keyCode === 39){ //right
					key.right = false;
				}
				if(e.keyCode === 38){ //up
					key.up = false;
				}
			};

			function clearRow(){
				
			}

			function animate(){
				requestAnimationFrame(animate);

				count += 1;
				if(count >= 20){
					collisionData = M.collision(shape[p].currentPos, [10, 10, 10, 10], gBoard);

					if(collisionData.vertical){
						for(i = 0; i < shape[p].currentPos.length; i += 1){
							shape[p].currentPos[i] += 10;
						}
					}else{
						gBoard.cursor.apply();
						offset = 0;
						shape[p].currentPos = shape[p].originalPos.slice(0);
						collisionData.vertical = true;
						p = Math.floor(Math.random() * 7);
					}
					count = 0;
				}

				for(i = 0; i < gBoard.length; i += 1){
					if(gBoard[i] >= 1){
						clearRows.len += 1;
					}
					clearRows.count += 1;

					if(clearRows.len > 9){
						for(j = 0; j < clearRows.row.length; j += 1){
							if(Math.floor(i / 10) === clearRows.row[j]){
								store = false;
								break;
							}else{
								store = true;
							}
						}
						if(store){
							clearRows.row[clearRows.i] = Math.floor(i / 10);
							clearRows.i += 1;
						}
					}

					if(clearRows.count >= 10){
						clearRows.count = 0;
						clearRows.len = 0;

					}
					
				}
				if(clearRows.row.length > 0){
					count3 -= 1;
					for(j = 0; j < clearRows.row.length; j += 1){
						for(i = (clearRows.row[j]*10)+9; i >= (clearRows.row[j]*10); i -= 1){
							gBoard.el[i].style.opacity = count3 / 20;
						}
					}
					if(count3 <= 0){
						count3 = 20;

						for(j = 0; j < clearRows.row.length; j += 1){
							for(i = (clearRows.row[j]*10)+9; i >= 0; i -= 1){
								gBoard[i] = gBoard[i-10];
							}
						}

						for(j = 0; j < clearRows.row.length; j += 1){
							for(i = (clearRows.row[j]*10)+9; i >= (clearRows.row[j]*10); i -= 1){
								gBoard.el[i].style.opacity = "1";
							}
							delete clearRows.row[j];
						}
						
					}
				}

				
				

				count2 += 1;
				if(count2 >= 5){
					count2 = 0;

					if(key.left){ //left
						collisionData = M.collision(shape[p].currentPos, [-1, -1, -1, -1], gBoard);
						if(collisionData.horizontal){
							for(i = 0; i < shape[p].currentPos.length; i += 1){
								shape[p].currentPos[i] -= 1;
							}
						}

					}
					if(key.right){ //right
						collisionData = M.collision(shape[p].currentPos, [1, 1, 1, 1], gBoard);
						if(collisionData.horizontal){
							for(i = 0; i < shape[p].currentPos.length; i += 1){
								shape[p].currentPos[i] += 1;
							}
						}
					}

					if(key.up){ //up
						key.up = false;

						collisionData = M.collision(shape[p].currentPos, shape[p].rotateOffsets[offset], gBoard);

						if(collisionData.rotate){
							for(i = 0; i < shape[p].currentPos.length; i += 1){
								shape[p].currentPos[i] +=  shape[p].rotateOffsets[offset][i];
								shape[p].currentPos[i] += collisionData.rotateOffset;
							}

							offset += 1;

							if(offset > 3){
								offset = 0;
							}
						}
					}

				}
				gBoard.cursor.clear();
				for(i = 0; i < shape[p].currentPos.length; i +=1){
					gBoard.cursor[shape[p].currentPos[i]] = p+1;
				}
				M.draw(gBoard, "dom");
			}

			animate();

			//gBoard.cursor.apply();
		}());

	});
}).call();
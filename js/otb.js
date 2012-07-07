(function(){

	var OTB = OTB || {};

	OTB.GameBoard = function (width, height){
		var that = {
				pos:[[]],
				update: function(shape){
					var r,c, shapeString = "";

					for(r = 0; r < shape.length; r += 1){
						for(c = 0; c < shape[r].length; c += 1){
							shapeString += shape[r][c].toString();
							this.pos[r][c] = shape[r][c];
						}
						shapeString += "\n";
					}
					console.log(shapeString);
				}
			},
			r = 0,
			c = 0;

		for(r = 0; r < width; r += 1){
			that.pos[r] = [];
			for(c = 0; c < height; c += 1){
				that.pos[r][c] = 0;
			}
		}

		return that;
	};

	window.OTB = OTB;

	var gameBoard = new OTB.GameBoard(20, 10);
	

	var shapeL = [
		[0, 0, 0, 0],
		[0, 1, 0, 0],
		[0, 1, 0, 0],
		[0, 1, 1, 0]
	];

	gameBoard.update(shapeL);


	var game = "";
	for(var r = 0; r < 20; r += 1){
		for(var c = 0; c < 10; c += 1){
			game += gameBoard.pos[r][c].toString();
		}
		game += "\n";
	}

	console.log(game);
}());
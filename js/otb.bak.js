(function(){
	var gBoard = [
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
		[0, 0, 1, 1, 0, 0, 0, 0, 1, 0],
		[0, 0, 0, 1, 1, 0, 0, 0, 1, 1]
	];

	var blockSprite = new Array(10);
	for (var i = 0; i < 10; i++) {
		blockSprite[i] = new Array(14);
	}

	var stage = document.getElementById('gameBoard');

	init();
	draw();

	function draw(){
		for(var r = 0; r <= 9; r+=1){
			for(var c = 0; c <= 13; c+=1){
				if(gBoard[c][r] === 0){
					blockSprite[r][c]
						.setAttribute("class", "blank");
				}else if(gBoard[c][r] === 1){
					blockSprite[r][c]
						.setAttribute("class", "sBlock");
					//console.log('Row: ' + r*30 + ' - Col: ' + c*30);
				}
			}
		}
	}

	function init(){
		for(var r = 0; r <= 9; r+=1){
			for(var c = 0; c <= 13; c+=1){
				blockSprite[r][c] = createDiv(stage, 'blank', r*30, c*30);
			}
		}
	}

	

	function createDiv(appendTo, cls, left, top) {
		var div = document.createElement('div'); 

		if(cls){
			div.setAttribute("class", cls); 
		}

		if((left || top) || (left && top)){
			div.style.position = "absolute";
			appendTo.style.position = "relative"; 

			if(left){ 
				div.style.left = left; 
			}else{
				div.style.left = 0;
			}

			if(top){ 
				div.style.top = top; 
			}else{
				div.style.top = 0;
			}
		}else{
			div.style.left = 0;
			div.style.top = 0;
		}

		appendTo.appendChild(div);

		return div;
	}

	window.DRAW = draw;
})();
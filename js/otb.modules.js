(function(){
	OTB.define("subclass", function(){
		var ctor = function superclass(){};

		var subclass = function(target){
			ctor.prototype = target;
			var sub = new ctor();
			sub.__super__ = target;
				return sub;
		};

		return subclass;
	});

	OTB.define("createElements", function(M){

		function createElements(appendTo, cls, left, top) {
			
			var div = document.createElement('div');
			
			appendTo = document.getElementById(appendTo);

			if(cls){
				div.setAttribute("class", cls);
			}

			div.style.position = "absolute";
			appendTo.style.position = "relative";

			if(left || top ){
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

		return createElements;
	});

	OTB.define("GameBoard", ["subclass", "createElements"], function(M){

		function GameBoard(lengthX, lengthY) {
			this.length = lengthX*lengthY;
			this.lengthX = lengthX;
			this.lengthY = lengthY;
			this.cursor = M.subclass(this);
			
		}

		var proto = GameBoard.prototype = M.subclass(Array.prototype);

		proto.createDOM = function(){
			var tile = 0, x, y;

			if(!this.el){
				this.el = {};

				for(var i = this.length-1; i >= 0; i -= 1){
					x = Math.floor(i % (this.lengthX))*30;
					y = Math.floor(i / this.lengthX)*30;

					this.el[i] = M.createElements("gameBoard", "sBlock", x, y);

				}
				console.log('defined');
			}
			
		};

		proto.clear = function() {
			for(var key in this){
				if(this.hasOwnProperty(key) &&
					key !== "length" &&
					key !== "lengthX" &&
					key !== "lengthY" &&
					key !== "cursor" &&
					key !== "el" &&
					key !== "__super__"
					){
						delete this[key];
					}
				}

				return this;
		};

		proto.apply = function() {
			var parent = this.__super__;

			for(var key in this){
				if(this.hasOwnProperty(key) && key !== "__super__"){
					parent[key] = this[key];
					delete this[key];
				}
			}

			return this;
		};

		return GameBoard;
	});

	OTB.define("draw", function(){
		function draw(data, drawType){
			var i, rowLength = 0; gameString = "", x = 0;

			if(drawType === "console"){
				for(i = 0; i < data.length; i += 1){
					if(Math.floor(i / data.lengthX) > x){
						x = Math.floor(i / data.lengthX);
						gameString += "\n";
					}

					if(data.cursor[i] !== undefined &&
						data.cursor[i] !== null &&
						data.cursor[i] > 0
					){
						gameString += data.cursor[i].toString() + " ";
					}else{
						gameString += "0 ";
					}

				}
			
				console.log(gameString);
			}


			if(drawType === "dom"){
				data.createDOM();
				for(i = 0; i < data.length; i += 1){
					if(data.cursor[i] !== undefined &&
						data.cursor[i] !== null &&
						data.cursor[i] > 0
					){
						data.el[i].setAttribute("class", "sBlock");
					}else{
						data.el[i].setAttribute("class", "blank");
					}

				}
			}

			return data;
		}

		return draw;
	});
}).call();
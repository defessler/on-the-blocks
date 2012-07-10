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
    
    OTB.define("GameBoard", ["subclass"], function(M){
        
        function GameBoard(lengthX, lengthY) {
            this.length = lengthX*lengthY;
            this.lengthX = lengthX;
            this.lengthY = lengthY;
            this.cursor = M.subclass(this);
        }
        
        var proto = GameBoard.prototype = M.subclass(Array.prototype);
        
        proto.clear = function() {
            for(var key in this){
                if(this.hasOwnProperty(key) &&
                    key !== "length" &&
                    key !== "lengthX" &&
                    key !== "lengthY" &&
                    key !== "cursor" &&
                    key !== "__super__"
                ) delete this[key];
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

    OTB.define("draw", ['GameBoard'], function(M){
        function draw(data){
            var r = 0, c = 0, gameString = "", count = 0;

            for(r = 0; r < data.length; r += 1){
                if(Math.floor(r / data.lengthY) > count){
                    count = Math.floor(r / data.lengthY);
                    gameString += "\n";
                }
                if(data.cursor[r] !== undefined &&
                    data.cursor[r] !== null &&
                    data.cursor[r] > 0
                ){
                    gameString += "1 ";
                }else{
                    gameString += "0 ";
                }

            }
            
            console.log(gameString);
        }

        return draw;
    });
}).call();
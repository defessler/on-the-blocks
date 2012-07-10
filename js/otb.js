(function(){
    OTB.require(["GameBoard", "draw"], function(M) {
        var gBoard = new M.GameBoard(20, 10);
        
        // This code is just test code to see how changing the values work.
        (function(){
            var shape = [
                0, 10, 20, 21
            ];
    
            var count = 0;
    
            for(var i = 0; i < shape.length; i += 1){
                gBoard.cursor[shape[i]] = 1;
            }
    
            M.draw(gBoard);
    
            gBoard.cursor.clear();
    
            shape = [
                10, 20, 30, 31
            ];
    
            for(i = 0; i < shape.length; i += 1){
                gBoard.cursor[shape[i]] = 1;
            }
    
            M.draw(gBoard);
    
            
            //gBoard.cursor.apply();
            
        }());
            
    });
}).call();
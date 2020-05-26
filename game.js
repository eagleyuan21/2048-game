var content;

function startGame() {
	myGameArea.start();
}

var myGameArea = {
	canvas : document.createElement("canvas"),
    start : function() {
    	this.canvas.width = 600;
        this.canvas.height = 600;
    	this.context = this.canvas.getContext("2d");
    	document.body.insertBefore(this.canvas, document.body.childNodes[0]);
    	this.interval = setInterval(updateGame, 20);
    	
    	content = new Array(4);
    	for (var i = 0; i < 4; i++) { 
    		content[i] = []; 
		}

		for (var i = 0; i < 4; i++) { 
    		for (var j = 0; j < 4; j++) { 
        		content[i][j] = 0; 
   			} 
		} 
		
		var count = 0;
		while(count != 14)
		{
			var row = Math.floor(Math.random() * 4);
			var col = Math.floor(Math.random() * 4);
			
			var distrib = Math.random();
			var value = 0;
			if(distrib < 0.75)
			{
				value = 2;
			}
			else{
				value = 4;
			}
			
			content[row][col] = value;
			count = countvalues(content, 0);
		}
    },
    
    clear : function() {
    	if (typeof this.context !== 'undefined')
    	{
        	this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        }
    }
}

function countvalues(chart, val)
{
	var counter = 0;
	for (var i = 0; i < 4; i++) { 
    	for (var j = 0; j < 4; j++) { 
        	if(chart[i][j] == val) 
        	{
        		counter++;
        	}
   		} 
	} 
	return counter;
}

function grid()
{	
	if (typeof myGameArea.context !== 'undefined')
	{
		ctx = myGameArea.context;
    	ctx.fillStyle = "white";
    	ctx.fillRect(0, 150, 600, 5);
    	ctx.fillRect(0, 300, 600, 5);
    	ctx.fillRect(0, 450, 600, 5);
    	ctx.fillRect(150, 0, 5, 600);
    	ctx.fillRect(300, 0, 5, 600);
    	ctx.fillRect(450, 0, 5, 600);
    }
}

function drawGame()
{
	if (typeof myGameArea.context !== 'undefined')
	{
		ctx = myGameArea.context;
		for(var i = 0; i < 4; i++)
			for (var j = 0; j < 4; j++) { 
        	if(content[i][j] != 0) 
        	{
        		ctx.fillStyle = getColor(content[i][j]);
        		ctx.fillRect(j * 150 + 8, i * 150 + 8, 140, 140);
        		
        		ctx.font = "90px Times New Roman"
        		ctx.fillStyle = "white";
        		ctx.fillText(content[i][j], j * 150 + 55, i * 150 + 108);
        	}
   		} 
    }
}

function getColor(val)
{
	var colcode;
	switch(Math.log2(val)) {
  		case 1:
  			colcode = "#778899";
  			break;
  		case 2:
  			colcode = "#2F4F4F";
  			break;
  		case 3:
  			colcode = "#3CB371";
  			break;
  		case 4:
  			colcode = "#FF8C00";
  			break;
  		case 5:
  			colcode = "#8B0000";
  			break;
  		case 6:
  			colcode = "#BC8F8F";
  			break;
  		case 7:
  			colcode = "#DAA520";
  			break;
  		case 8:
  			colcode = "#000080";
  			break;
  		case 9:
  			colcode = "#808000";
  			break;
  		case 10:
  			colcode = "#778899";
  			break;
  		case 11:
  			colcode = "#778899";
  			break;
  		case 12:
  			colcode = "#778899";
  			break;
  		case 13:
  			colcode = "#778899";
  			break;
  		case 14:
  			colcode = "#000000";
  			break;
	}
	return colcode;
}

function updateGame()
{
	myGameArea.clear();
	grid();
	drawGame();
}
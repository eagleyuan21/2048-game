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
			if(distrib < 0.8)
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
        		
        		ctx.font = getSize(content[i][j]) + " Times New Roman";
        		ctx.fillStyle = "white";
        		ctx.fillText(content[i][j], j * 150 + getLocX(content[i][j]), i * 150 + getLocY(content[i][j]));
        	}
   		} 
    }
}

function getlength(number) {
    return number.toString().length;
}

function getSize(val)
{
	var size;
	switch(getlength(val)) {
		case 1:
			size = "90px";
			break;
		case 2:
			size = "80px";
			break;
		case 3:
			size = "70px";
			break;
		case 4:
			size = "60px";
			break;
		case 5:
			size = "50px";
			break;
	}
	return size;
}

function getLocX(val)
{
	var X;
	switch(getlength(val)) {
		case 1:
			X = 55;
			break;
		case 2:
			X = 38;
			break;
		case 3:
			X = 26;
			break;
		case 4:
			X = 18;
			break;
		case 5:
			X = 14;
			break;
	}
	return X;
}

function getLocY(val)
{
	var Y;
	switch(getlength(val)) {
		case 1:
			Y = 108;
			break;
		case 2:
			Y = 105;
			break;
		case 3:
			Y = 102;
			break;
		case 4:
			Y = 98;
			break;
		case 5:
			Y = 95;
			break;
	}
	return Y;
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
  			colcode = "#00CED1";
  			break;
  		case 11:
  			colcode = "#C71585";
  			break;
  		case 12:
  			colcode = "#D8BFD8";
  			break;
  		case 13:
  			colcode = "#000000";
  			break;
  		case 14:
  			colcode = "#ace314";
  			break;
	}
	return colcode;
}



function shiftLeft()
{
	var holder = new Array();
	var holdel = 0;
	for(var i = 0; i < 4; i++)
	{
		for(var j = 0; j < 4; j++)
		{
			if(content[i][j] != 0)
			{
				holder[holdel] = content[i][j];
				holdel++;
			}
		}
		
		for(var k = holdel; k < 4; k++)
		{
			holder[k] = 0;
		}
		content[i] = holder;
		holder = new Array();
		holdel = 0;
		
		for(var l = 0; l < 3; l++)
		{
			if(content[i][l] == content[i][l + 1])
			{
				content[i][l] = 2 * content[i][l];
				content[i][l + 1] = 0;
			}
		}
		
		for(var j = 0; j < 4; j++)
		{
			if(content[i][j] != 0)
			{
				holder[holdel] = content[i][j];
				holdel++;
			}
		}
		
		for(var k = holdel; k < 4; k++)
		{
			holder[k] = 0;
		}
		holdel = 0;
		content[i] = holder;

		holder = new Array(); 
	}
}

function shiftRight()
{
	var holder = new Array(4);
	var holdel = 3;
	for(var i = 0; i < 4; i++)
	{
		for(var j = 3; j >= 0; j--)
		{
			if(content[i][j] != 0)
			{
				holder[holdel] = content[i][j];
				holdel--;
			}
		}
		for(g = holdel; g >= 0; g--)
		{
			holder[g] = 0;
		}

		content[i] = holder;
		holder = new Array();
		holdel = 3;
		
		for(var l = 3; l > 0; l--)
		{
			if(content[i][l] == content[i][l - 1])
			{
				content[i][l] = 2 * content[i][l];
				content[i][l - 1] = 0;
			}
		}
		
		for(var j = 3; j >= 0; j--)
		{
			if(content[i][j] != 0)
			{
				holder[holdel] = content[i][j];
				holdel--;
			}
		}
		for(g = holdel; g >= 0; g--)
		{
			holder[g] = 0;
		}
		
		content[i] = holder;
		holder = new Array();
		holdel = 3;
	}
}

function shiftUp()
{
	var holder = new Array(4);
	var holdel = 0;
	for(var j = 0; j < 4; j++)
	{
		for(var i = 0; i < 4; i++)
		{
			if(content[i][j] != 0)
			{
				holder[holdel] = content[i][j];
				holdel++;
			}
		}
		
		for(var k = holdel; k < 4; k++)
		{
			holder[k] = 0;
		}
		for(var i = 0; i < 4; i++)
		{
			content[i][j] = holder[i];
		}
		holder = new Array();
		holdel = 0;
		
		
		for(var l = 0; l < 3; l++)
		{
			if(content[l][j] == content[l + 1][j])
			{
				content[l][j] = 2 * content[l][j];
				content[l + 1][j] = 0;
			}
		}
		
		for(var i = 0; i < 4; i++)
		{
			if(content[i][j] != 0)
			{
				holder[holdel] = content[i][j];
				holdel++;
			}
		}
		
		for(var k = holdel; k < 4; k++)
		{
			holder[k] = 0;
		}
		
		holdel = 0;
		for(var i = 0; i < 4; i++)
		{
			content[i][j] = holder[i];
		}

		holder = new Array();
	}
}

function shiftDown()
{
	var holder = new Array(4);
	var holdel = 3;
	for(var j = 0; j < 4; j++)
	{
		for(var i = 3; i >= 0; i--)
		{
			if(content[i][j] != 0)
			{
				holder[holdel] = content[i][j];
				holdel--;
			}
		}
		for(g = holdel; g >= 0; g--)
		{
			holder[g] = 0;
		}
		for(var i = 0; i < 4; i++)
		{
			content[i][j] = holder[i];
		}
		
		holder = new Array();
		holdel = 3;
		for(var l = 3; l > 0; l--)
		{
			if(content[l][j] == content[l - 1][j])
			{
				content[l][j] = 2 * content[l][j];
				content[l - 1][j] = 0;
			}
		}
		
		for(var i = 3; i >= 0; i--)
		{
			if(content[i][j] != 0)
			{
				holder[holdel] = content[i][j];
				holdel--;
			}
		}
		for(g = holdel; g >= 0; g--)
		{
			holder[g] = 0;
		}
		
		for(var i = 0; i < 4; i++)
		{
			content[i][j] = holder[i];
		}
		holder = new Array();
		holdel = 3;
	}
}

function checkKey(e) {
	var temp = content.map(function(arr) {
    	return arr.slice();
	});
    e = e || window.event;

    if (e.keyCode == '38') {
        shiftUp();
        if(compare(temp))
        {
        	genNew();
        }
    }
    else if (e.keyCode == '40') {
        shiftDown();
        if(compare(temp))
        {
        	genNew();
        }
    }
    else if (e.keyCode == '37') {
       shiftLeft();
       if(compare(temp))
       {
        	genNew();
       }
    }
    else if (e.keyCode == '39') {
       shiftRight();
       if(compare(temp))
       {
        	genNew();
       }
    }
}

function genNew()
{
	var row = Math.floor(Math.random() * 4);
	var col = Math.floor(Math.random() * 4);
			
	var distrib = Math.random();
	var value = 0;
	if(distrib < 0.8)
	{
		value = 2;
	}
	else{
		value = 4;
	}
	
	while(content[row][col] != 0)
	{
		row = Math.floor(Math.random() * 4);
		col = Math.floor(Math.random() * 4);
	}
			
	content[row][col] = value;
}

function compare(t)
{
	for(var i = 0; i < 4; i ++)
	{
		for(var j = 0; j < 4; j++)
		{
			if(t[i][j] != content[i][j])
			{
				return true;
			}
		}
	}
	return false;
}

function updateGame()
{
	myGameArea.clear();
	grid();
	
	document.onkeydown = checkKey;

	drawGame();
}
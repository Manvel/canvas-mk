/*
 * Constructor for character
 * @param sprPath path to character sprite
 * @param mapPath path to character JSON map
 */
function Character(sprPath, mapPath) {
	this.x = 100;
	this.y = 300;
	this.vx = 0;
	this.vy = 0;
	this.sprPath = sprPath;
	this.mapPath = mapPath;
	this.sprite;
	this.sprMap;
	this.stage = "stance1";
	this.frame = 0;
	this.stopFrame = false;
	this.iskeyDown = false;
	this.onGround = true;
	this.isDuck = false;
	this.opercot = false;
}

/*
 * Load character image and JSON map for possitions
 */
Character.prototype.load = function(callback) {
	this.sprite = new Image();
	this.sprite.src = this.sprPath;
	var charObj = this;
	this.sprite.onload = function() {
		var xobj = new XMLHttpRequest();
        xobj.overrideMimeType("application/json");
		xobj.open('GET', charObj.mapPath, true);
		xobj.onreadystatechange = function () {
	          if (xobj.readyState == 4 && xobj.status == "200") {
	             charObj.sprMap = JSON.parse(xobj.responseText);
	             callback();
	             console.log(charObj.sprMap);
	          }
	    };
	    xobj.send(null);
	}
}

Character.prototype.eventBindings = function() {
	var character = this;
	window.onkeydown = function(e) {
		switch(e.keyCode){
			case 68: 
				character.moveRight();
				break;
			case 65: 
				character.moveLeft();
				break;
			case 87: 
				character.jump();
				break;
			case 88: 
				if (character.isDuck) return;
				character.duck();
				break;
			case 83: 
				character.block();
				break;
			case 81: 
				character.highKick();
				break;
			case 90: 
				character.lowKick();
				break;
			case 69: 
				character.highPunch();
				break;
			case 67: 
				character.lowPunch();
				break;
		}
	}
	window.onkeyup = function(e) {
		if(!character.inAir()) {
			character.stage = "stance1";
		}
		character.iskeyDown = false;
		if(!character.inAir())
			character.vx = 0;
		
		if(e.keyCode == 83)
			character.stopFrame = false;
		if(e.keyCode == 88) {
			character.stopFrame = false;
			character.y -= 50; 
			character.isDuck = false;
		}
		if((e.keyCode == 67)&&(character.isDuck)) {
			character.stage = "duck1";
			character.iskeyDown = true;
			character.stopFrame = 2;
		}
		if((e.keyCode == 69)&&(character.isDuck)) {
			character.stage = "duck1";
			character.iskeyDown = true;
			character.stopFrame = 2;
		}
		if((e.keyCode == 81)&&(character.isDuck)) {
			character.stage = "duck1";
			character.iskeyDown = true;
			character.stopFrame = 2;
		}
		if((e.keyCode == 90)&&(character.isDuck)) {
			character.stage = "duck1";
			character.iskeyDown = true;
			character.stopFrame = 2;
		} else if(e.keyCode == 90) {
			character.iskeyDown = true;
			if(character.y>300)
			character.y -=50;
		}
		if((e.keyCode == 83)&&(character.isDuck)) {
			character.stage = "duck1";
			character.iskeyDown = true;
			character.stopFrame = 2;
		}
		if((e.keyCode == 69)&&(character.isDuck)) {
			character.stage = "duck1";
			character.iskeyDown = true;
			character.stopFrame = 2;
			character.y += 50;
		}
		//character.vy = 0;
	}
}

Character.prototype.moveRight = function() {
	console.log("moving right");
	this.iskeyDown = true;
	this.vx = 5;
	if(this.inAir()) {
		this.stage = "jump-direction";
		this.stopFrame = false;
		this.vx = this.vx*2;
		return;
	}
	this.stage = "walking";
}

Character.prototype.moveLeft = function() {
	console.log("moving left");
	this.stage = "walking";
	this.iskeyDown = true;
	this.vx = -5;
}

Character.prototype.jump = function() {
	console.log("jump");
	if(this.y < 300) return;
	this.vy = -15;
	this.iskeyDown = true;
	if(this.vx != 0) {
		this.stage = "jump-direction";
		this.vx = this.vx*2;
		return;
	}
	this.stage = "jump-place";
	this.stopFrame = 2;
	
}

Character.prototype.block = function() {
	this.stage = "block";
	this.stopFrame = 2;
	this.iskeyDown = true;
	if(this.isDuck) {
		this.stage = "duck-block";
		this.stopFrame = 2;
	} else {
		this.stage = "block";
	}
}

Character.prototype.highPunch = function() {
	this.stage = "punch-high";
	this.iskeyDown = true;
	if(this.isDuck) {
		this.stage = "punch-duck-high";
		this.stopFrame = false;
		console.log(this.y);
		if(this.y>300)
		this.y -= 50;
		this.opercot = true;
	} else {
		this.stage = "punch-high";
	}
}

Character.prototype.lowPunch = function() {
	this.iskeyDown = true;
	if(this.isDuck) {
		this.stage = "punch-duck-low";
		this.stopFrame = false;
	} else {
		this.stage = "punch-low";
	}
	
	
}

Character.prototype.highKick = function() {
	this.iskeyDown = true;
	if(this.vx < 0) {
		this.stage = "kick-round-high";
		return;
	}
	if(this.isDuck) {
		this.stage = "kick-high-duck";
		this.stopFrame = false;
	} else {
		this.stage = "kick-high";
	}
}

Character.prototype.lowKick = function() {
	this.iskeyDown = true;
	if(this.vx < 0) {
		this.stage = "kick-round-low";
		if(this.y<350)
		this.y += 50;
		return;
	}
	if(this.isDuck) {
		this.stage = "kick-low-duck";
		this.stopFrame = false;
	} else {
		this.stage = "kick-low";
	}
}

Character.prototype.duck = function() {
	this.stage = "duck1";
	this.isDuck = true;
	this.iskeyDown = true;
	this.stopFrame = 2;
	this.y += 50;
}

Character.prototype.inAir = function() {
	if(this.y < 300) {
		this.onGround = false;
		if(this.y < 200) 
			this.vy = -this.vy;
		return true;
	} else {
		if(this.onGround) {
			return false;
		}
		this.onGround = true;
		this.stage = "stance1";
		this.stopFrame = false;
		this.vy = 0;
		this.vx = 0;
		return false;
	}
}


Character.prototype.draw = function(scene) {
	console.log(this.stage);
	this.x += this.vx;
	this.y += this.vy;
	
	this.inAir();
	
	//Get the length for current character stage
	var frameLength = this.sprMap[this.stage].length;
	// Mathematical iteration
	this.frame = (this.frame+1)%frameLength;
	
	for(var i=0;i<6;i++) {
		if(i==0) {
			scene.ctx.drawImage(scene.arena[i].image, scene.arena[i].x, scene.arena[i].y, 1000, 400);
		} else {
			scene.ctx.drawImage(scene.arena[i].image, scene.arena[i].x, scene.arena[i].y);	
		}
		
	}
	
	var charCoords = this.sprMap[this.stage][this.frame].frame;
	scene.ctx.drawImage(this.sprite, charCoords.x, charCoords.y, charCoords.w, charCoords.h, this.x, this.y, charCoords.w, charCoords.h);
	
	if((this.stopFrame)&&(this.frame == this.stopFrame)) {
		console.log("should stop");
		this.frame -= 1;
	}
}

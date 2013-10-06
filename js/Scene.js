function Scene() {
	this.canvas = document.getElementById("canvas");
	this.ctx = this.canvas.getContext("2d");
	this.character;
	this.interval;
	this.arena = [];
}

Scene.prototype.clear = function() {
	this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
}

Scene.prototype.draw = function() {
	//console.log(this);
	this.clear();
	
	var character = this.character;
	character.draw(this);
	
	//this.ctx.drawImage(character.sprite, 0 + iBgShiftX, 0, 1000, 940, 0, 0, 1000, 600);
}

Scene.prototype.setCharacter = function(character) {
	this.character = character;
}

Scene.prototype.animate = function() {
	var scene = this;
	this.interval = setInterval(function() {
		scene.draw();
	}, 50);
	
}

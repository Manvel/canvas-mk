
window.onload = function() {
	var scene = new Scene();
	var character = new Character('img/scorpion.png', 'img/scorpion.json');
	var character = new Character('img/liu-keng.png', 'img/liu-keng.json');
	
	var layers_array = new Array();
	//push layers to array
	layers_array.push({img:"img/arena/layer1.png",x:0,y:0});
	layers_array.push({img:"img/arena/layer2.png",x:0,y:300});
	layers_array.push({img:"img/arena/layer3.png",x:0,y:300});
	layers_array.push({img:"img/arena/layer4.gif",x:0,y:300});
	layers_array.push({img:"img/arena/layer5.gif",x:0,y:330});
	layers_array.push({img:"img/arena/layer6.gif",x:-100,y:400});
	var loadArenaCounter = 0;
	
	//Looping through array and loading scenes
	for (var i = 0; i < layers_array.length; i++) {
		var layer = layers_array[i];
		loadArena(layer.img, layer.x, layer.y, scene, function(){
			loadArenaCounter++;
			if(loadArenaCounter >= layers_array.length) {
				character.load(function() {
					scene.setCharacter(character);
					scene.animate();
					character.eventBindings();
				});
			}
		});
	};
};

function loadArena(url, x, y, scene, callback) {
	var image = new Image();
	image.src = url;
	image.onload = function() {
		scene.arena.push({"image":image,"x":x,"y":y});
		callback();
	}
}


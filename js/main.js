
window.onload = function() {
	var scene = new Scene();
	var character = new Character('img/scorpion.png', 'img/scorpion.json');
	var character = new Character('img/liu-keng.png', 'img/liu-keng.json');
	
	loadArena("img/arena/layer1.png", 0, 0, scene, function(){
		loadArena("img/arena/layer2.png", 0, 300, scene, function(){
			loadArena("img/arena/layer3.png", 0, 300, scene, function(){
				loadArena("img/arena/layer4.gif", 0, 300, scene, function(){
					loadArena("img/arena/layer5.gif", 0, 330, scene, function(){
						loadArena("img/arena/layer6.gif", -100, 400, scene, function(){
							character.load(function() {
								scene.setCharacter(character);
								scene.animate();
								character.eventBindings();
								
								var snd = new Audio("media/den_pobedy.mp3"); // buffers automatically when created
								snd.play();
							});
						});
					});
				});
			});
		});
	});
	
};

function loadArena(url, x, y, scene, callback) {
	var image = new Image();
	image.src = url;
	image.onload = function() {
		scene.arena.push({"image":image,"x":x,"y":y});
		callback();
	}
}


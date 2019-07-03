console.log("Are you ready to own a Tomagotchi?");


//**************************************************
// Definition of Tomagotchi class
//**************************************************
class Tomagotchi {
	constructor(name) {
		this.name = name;
		this.age = 0;
		this.hunger = 0;
		this.sleepiness = 0;
		this.boredom = 0;
		this.limit = 10;
		this.ageLimit = 4;
	}


	feedTomagotchi() {
		console.log("inside feedTomagotchi function");
		// change CSS image/animation to hungry pet
	}

	getHungrier(){}

	playWithTomagotchi() {
		console.log("inside feedTomagotchi function");
		// change CSS image/animation to playing pet
		
	}
}

//**************************************************
// Game object and methods
//**************************************************
const game = {

	tomagotchi: null,
	handle: null,
	timeElapsed: 0,
	createTomagotchi: function(name){
		console.log("inside createTomagotchi function");
		const pet = new Tomagotchi(name);
		this.tomagotchi = pet;
	},

	startTimer() {
		// MDN timer -- returns a handle that can be used to stop timer
		// setInterval -- increase time elapsed
	},

	turnOutLights() {
		console.log("inside turnOutLights function");
		// change CSS image/animation to dark background
		// and dark, sleeping image of pet
	}

}

game.createTomagotchi("tommy");

//**************************************************
// Event listeners
//**************************************************
$('#feed-me').on('click', (e) => {
	game.tomagotchi.feedTomagotchi();
})

$('#play-with-me').on('click', (e) => {
	game.tomagotchi.playWithTomagotchi()
});


$('#turn-out-lights').on('click', (e) => {
	games.turnOutLights()
});

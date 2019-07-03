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

	getSleepier() {
		console.log("inside getSleepier function");
		this.sleepiness++;
	}
	
	getHungrier () {
		console.log("inside getHungier function");
		this.hunger++;
	}

	getMoreBored () {
		console.log("inside getMoreBored function");
		this.boredom++;
	}

	growOlder () {
		console.log("inside growOlder function");
		this.age++;

	}
	
}

//**************************************************
// Game object and methods
//**************************************************
const game = {
	tomagotchi: null,
	handle: null,
	timeElapsed: 0,
	createTomagotchi: function(name) {
		console.log("inside createTomagotchi function");
		this.tomagotchi = new Tomagotchi(name);
	},

	startTimer() {
		// MDN timer -- returns a handle that can be used to stop timer
		// setInterval -- increase time elapsed

	},

	feedTomagotchi() {
		console.log("inside feedTomagotchi function");
		// change CSS image/animation to hungry pet
	},

	playWithTomagotchi() {
		console.log("inside feedTomagotchi function");
		// change CSS image/animation to playing pet
		
	},

	turnOutLights() {
		console.log("inside turnOutLights function");
		// change CSS image/animation to dark background
		// and dark, sleeping image of pet
	},

	ageTomagotchi () {
		console.log("inside ageTomagotchi function");
		// change CSS image/animation increase size of pet
	},

	

}

game.createTomagotchi("tommy");


//**************************************************
// Event listeners
//**************************************************
$('#feed-me').on('click', (e) => {
	game.feedTomagotchi();
})

$('#play-with-me').on('click', (e) => {
	game.playWithTomagotchi()
});

$('#turn-out-lights').on('click', (e) => {
	game.turnOutLights()
});

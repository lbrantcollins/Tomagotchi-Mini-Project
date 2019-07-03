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

	// Sleepiness actions:
	//***********************
	getSleepier () {
		console.log("inside getSleepier function");
		this.sleepiness++;
	}

	beRested () {
		console.log("inside beRested");
		this.hunger = max(0, this.hunger -  3);
	}
	
	// Hunger actions:
	//***********************
	getHungrier () {
		console.log("inside getHungier");
		this.hunger++;
	}

	beFed() {
		console.log("inside beFed");
		this.hunger = max(0, this.hunger -  3);
	}

	// Boredom actions:
	//***********************
	getMoreBored () {
		console.log("inside getMoreBored");
		this.boredom++;
	}

	bePlayedWith() {
		console.log("inside bePlayedWith");
		this.boredom = max(0, this.boredom -  3);
	}

	growOlder () {
		console.log("inside growOlder");
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

	// Animation is triggered by button push
	//*******************************************
	// Let the tomagotchi sleep
	turnOutLights() {
		console.log("inside turnOutLights function");
		this.tomoagotchi.beRested();
		// change CSS image/animation to dark background
		// and dark, sleeping image of pet
	},
	// Feed the tomagotchi
	feedTomagotchi() {
		console.log("inside feedTomagotchi function");
		this.tomoagotchi.beFed();
		// change CSS image/animation to hungry pet
	},
	// play with the tomagotchi
	playWithTomagotchi() {
		console.log("inside playWithTomagotchi function");
		this.tomoagotchi.bePlayedWith();
		// change CSS image/animation to playing pet
		
	},

	

	ageTomagotchi () {
		console.log("inside ageTomagotchi function");
		// change CSS image/animation increase size of pet
	},

	startTimer() {
		// MDN timer -- returns a handle that can be used to stop timer
		// setInterval -- increase time elapsed

	   const timer = setInterval( () => {
	   	this.timeElapsed++;
	   	console.log(`time: ${this.timeElapsed}`);
	   	// a failsafe to get out of the timer
			if (this.timeElapsed >= 15) {
				clearInterval(timer);
				console.log("Thank goodness I put in a timer stopper!");
			}

	   	// $('#timer').text(`Time: ${this.time}s`);

	   	// Sleepiness increase (slowest to change)
	   	if (this.timeElapsed % 7 === 0) {
	   		console.log("increasing sleep counter");
	   		this.tomagotchi.getSleepier();
	   	}
	   	// Hunger increase
	   	if (this.timeElapsed % 5 === 0) {
	   		console.log("increasing hunger counter");
	   		this.tomagotchi.getHungrier();
	   	}
	   	// Boredom increase (fastest to change)
	   	if (this.timeElapsed % 3 === 0) {
	   		console.log("increasing boredom counter");
	   		this.tomagotchi.getMoreBored();
	   	}

	   	// Check if tomagotchi has died or grown too old	
			if ( 	(this.tomagotchi.sleepiness >= this.tomagotchi.limit)
					||	(this.tomagotchi.sleepiness >= this.tomagotchi.limit)
					||	(this.tomagotchi.sleepiness >= this.tomagotchi.limit)
					||	(this.tomagotchi.age >= this.tomagotchi.agelimit)
				) {

				clearInterval(timer);
				console.log("end of game");
			}
			

			
		}, 3000);
  	}

}

game.createTomagotchi("tommy");
game.startTimer();

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

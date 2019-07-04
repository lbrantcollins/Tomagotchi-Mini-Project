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
		this.limit = 3;
		this.ageLimit = 4;
	}

	// Sleepiness actions:
	//***********************
	getSleepier () {
		console.log("inside getSleepier function");
		this.sleepiness++;
	}

	isRested () {
		console.log("inside isRested");
		this.sleepiness = Math.max(0, this.sleepiness -  3);
	}
	
	// Hunger actions:
	//***********************
	getHungrier () {
		console.log("inside getHungier");
		this.hunger++;
	}

	isFed() {
		console.log("inside isFed");
		this.hunger = Math.max(0, this.hunger -  3);
	}

	// Boredom actions:
	//***********************
	getMoreBored () {
		console.log("inside getMoreBored");
		this.boredom++;
	}

	isPlayedWith() {
		console.log("inside isPlayedWith");
		this.boredom = Math.max(0, this.boredom -  3);
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

	startTomagotchi() {
		/////// Need to prompt user for name here //////
		this.createTomagotchi("tommy"); 
		this.initializeScoreBoard();
		this.startTimer();
	},

	createTomagotchi: function(name) {
		console.log("inside createTomagotchi function");
		this.tomagotchi = new Tomagotchi(name);
	},

	initializeScoreBoard() {
		$('.limit').text(` out of ${this.tomagotchi.limit}`);
	},

	// Animation is triggered by button push
	//*******************************************

	// Let the tomagotchi sleep (turn off the lights)
	turnOutLights() {
		console.log("inside turnOutLights");
		this.tomagotchi.isRested();
		// change CSS image/animation to dark background
		// and dark, sleeping image of pet
		$("#the-image").attr("src", "./images/catSleepingBlackBackground.png")
		$("#the-image").attr("width", "180px")

		$("body").css("background-color", "#171719");
		$("body").css("color", "lightgrey");
	},

	// Feed the tomagotchi
	feedTomagotchi() {
		console.log("inside feedTomagotchi");
		this.tomagotchi.isFed();
		// change CSS image/animation to hungry pet
		$("#the-image").attr("src", "./images/hungryCat.jpeg")
		$("body").css("background-color", "white");
		$("body").css("color", "black");
	},

	// play with the tomagotchi
	playWithTomagotchi() {
		console.log("inside playWithTomagotchi");
		this.tomagotchi.isPlayedWith();
		// change CSS image/animation to playing pet
		$("#the-image").attr("src", "./images/playingCat.jpeg")
		$("body").css("background-color", "white");
		$("body").css("color", "black");
		$("#the-image").attr("width", "500px")
	},

	updateScoreBoard() {
		console.log("inside updateScoreBoard");
		console.log(this.tomagotchi.sleepiness, this.tomagotchi.hunger, this.tomagotchi.boredom);
		$('#sleep-count').text(this.tomagotchi.sleepiness);
		$('#hunger-count').text(this.tomagotchi.hunger);
		$('#boredom-count').text(this.tomagotchi.boredom);
	},

	ageTomagotchi () {
		console.log("inside ageTomagotchi function");
		// change CSS image/animation increase size of pet
	},

	startTimer() {
		// MDN timer -- returns a handle that can be used to stop timer
		// setInterval -- increase time elapsed
		console.log("Upper limit: " + this.tomagotchi.limit);	

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
	   		this.tomagotchi.getSleepier();
	   		console.log("increasing sleep counter: " 
	   			+ this.tomagotchi.sleepiness);
	   	}
	   	// Hunger increase
	   	if (this.timeElapsed % 5 === 0) {
	   		this.tomagotchi.getHungrier();
	   		console.log("increasing hunger counter: "
	   			+ this.tomagotchi.hunger);
	   	}
	   	// Boredom increase (fastest to change)
	   	if (this.timeElapsed % 3 === 0) {
	   		this.tomagotchi.getMoreBored();
	   		console.log("increasing boredom counter: "
	   			+ this.tomagotchi.boredom);
	   	}

	   	// Display updated counts
	   	this.updateScoreBoard();

	   	// Check if tomagotchi has died or grown too old
			if ( 	(this.tomagotchi.sleepiness >= this.tomagotchi.limit)
					||	(this.tomagotchi.hunger >= this.tomagotchi.limit)
					||	(this.tomagotchi.boredom >= this.tomagotchi.limit)
					||	(this.tomagotchi.age >= this.tomagotchi.agelimit)
				) {

				clearInterval(timer);
				console.log("end of game");
			}
			

			
		}, 2000);
  	}

}

//**************************************************
// Start the game
game.startTomagotchi();
//**************************************************


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

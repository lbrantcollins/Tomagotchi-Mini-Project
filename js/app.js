console.log("Are you ready to own a Tomagotchi?");


//**************************************************
// Definition of Tomagotchi class
//**************************************************
class ClassTomagotchi {
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
		console.log("inside getSleepier");
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
	timeElapsed: 0,
	maxTimeLengthOfGame: 26,

	startTomagotchi() {
		this.createTomagotchi("tommy"); //****** prompt user for name here
		this.initializeScoreBoard();
		this.startTimer();
	},

	createTomagotchi: function(name) {
		console.log("inside createTomagotchi");
		this.tomagotchi = new ClassTomagotchi(name);
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
		$("#image-src").attr("src", "./images/catSleepingBlackBackground.png")
		$("body").css("background-color", "#171719");
		$("body").css("color", "lightgrey");
		// $("#image-div").attr("width", "100px")
	},

	// Feed the tomagotchi
	feedTomagotchi() {
		console.log("inside feedTomagotchi");
		this.tomagotchi.isFed();
		// change CSS image/animation to hungry pet
		$("#image-src").attr("src", "./images/hungryCat.jpeg")
		$("body").css("background-color", "white");
		$("body").css("color", "black");
	},

	// play with the tomagotchi
	playWithTomagotchi() {
		console.log("inside playWithTomagotchi");
		this.tomagotchi.isPlayedWith();
		// change CSS image/animation to playing pet
		$("#image-src").attr("src", "./images/playingCat.jpeg")
		$("body").css("background-color", "white");
		$("body").css("color", "black");
		// $("#image-div").attr("width", "500px")
	},

	updateScoreBoard() {
		console.log("inside updateScoreBoard");
		console.log(this.tomagotchi.sleepiness, this.tomagotchi.hunger, this.tomagotchi.boredom);
		$('#sleep-count').text(this.tomagotchi.sleepiness);
		$('#hunger-count').text(this.tomagotchi.hunger);
		$('#boredom-count').text(this.tomagotchi.boredom);
	},

	ageTomagotchi () {
		console.log("inside ageTomagotchi");
		// change CSS image/animation increase size of pet
	},

	revertToOriginalTomagotchiImage () {
		console.log("inside revertToOriginalTomagotchiImage");
		// change CSS image/animation return to original starting image
	},

	increaseSizeOfTomagotchi () {
		console.log("inside increaseSizeOfTomagotchi");
		// change base size of Tomagotchi image 
	}

	startTimer() {
		// MDN timer -- returns a handle that can be used to stop timer
		// setInterval -- increase time elapsed
		console.log("Upper limit: " + this.tomagotchi.limit);	

		// Allow CSS to revert to walking cat after feed, play, sleep
		let revertTime = 1;

	   const timer = setInterval( () => {
	   	this.timeElapsed++;
	   	console.log(`time: ${this.timeElapsed}`);

	   	// a failsafe to get out of the timer after a long time of playing
			if (this.timeElapsed >= maxTimeLengthOfGame) {
				clearInterval(timer);
				console.log("Game too long!\n Thank goodness I put in a failsafe to stop the game so you can rest!");
			}

	   	// $('#timer').text(`Time: ${this.time}s`);

	   	// Sleepiness increase (slowest to change)
	   	if (this.timeElapsed % 7 === 0) {
	   		this.tomagotchi.getSleepier();
	   		console.log("increasing sleep counter: " 
	   			+ this.tomagotchi.sleepiness);
	   		revertTime = this.timeElapsed + 3;

	   	}
	   	// Hunger increase
	   	if (this.timeElapsed % 5 === 0) {
	   		this.tomagotchi.getHungrier();
	   		console.log("increasing hunger counter: "
	   			+ this.tomagotchi.hunger);
	   		revertTime = this.timeElapsed + 3;
	   	}
	   	// Boredom increase (fastest to change)
	   	if (this.timeElapsed % 3 === 0) {
	   		this.tomagotchi.getMoreBored();
	   		console.log("increasing boredom counter: "
	   			+ this.tomagotchi.boredom);
	   		revertTime = this.timeElapsed + 3;
			}
			// increase age (much slower to change)
			if (this.timeElapsed % 11 === 0) {
	   		this.tomagotchi.growOlder();
	   		console.log("increasing age counter: "
	   			+ this.tomagotchi.age);
	   		this.increaseSizeOfTomagotchi();
			}

			// Revert back to original image 
			// after some time spent in feed, play, or sleep image
			if (this.timeElapsed === revertTime) {
				this.revertToOriginalTomagotchiImage();
			} 

	   	// Display updated score board
	   	this.updateScoreBoard();

	   	// Check if tomagotchi has died or grown too old
	   	const stressLimit = this.tomagotchi.limit;
			if (this.tomagotchi.sleepiness >= stressLimit) {
				console.log(`${tomagotchi1} died from lack of sleep!`)
				clearInterval(timer);
			} else if (this.tomagotchi.hunger >= stressLimit) {
				console.log(`${tomagotchi1} died from lack of sleep!`)
				clearInterval(timer);
			} else if (this.tomagotchi.boredom >= stressLimit) {
				console.log(`${tomagotchi1} died from lack of sleep!`)
				clearInterval(timer);
			} else if (this.tomagotchi.age >= this.tomagotchi.agelimit) {
				console.log(`${tomagotchi1} is too old to continue!`)
				clearInterval(timer);
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
	game.updateScoreBoard();
})

$('#play-with-me').on('click', (e) => {
	game.playWithTomagotchi();
	game.updateScoreBoard();
});

$('#turn-out-lights').on('click', (e) => {
	game.turnOutLights();
	game.updateScoreBoard();
});

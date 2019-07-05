console.log("Are you ready to own a Tomagotchi?");


//**************************************************
// Definition of Tomagotchi class
//**************************************************
class ClassTomagotchi {
	constructor(name) {
		this.name = name;
		this.age = 1;
		this.ageLimit = 4;
		this.ageIntervalDefault = 13;

		this.sleepiness = 0;
		this.sleepIntervalDefault = 11;
		this.hunger = 0;
		this.hungerIntervalDefault = 8;
		this.boredom = 0;
		this.boredomIntervalDefault = 3;

		this.sleepHungerBoredomLimit = 6;

		this.wake = 0;
		this.wakeIntervalDefault = 3;
	}

	// decrement the sleep, hunger, boredom meters
	// age never gets decremented 
	// and wake gets set back to zero after sleep
	decrementMeter (characteristic) {;
		characteristic = Math.max(0, characteristic -  parseInt(this.sleepHungerBoredomLimit / 2));
		return characteristic;
	}
	// increment the sleep, hunger, boredom (and age and wake) meters
	incrementMeter (characteristic) {
		characteristic++;
		return characteristic;
	}

}

//**************************************************
// Game object and methods
//**************************************************
const game = {
	tomagotchi: null,
	timeElapsed: 0,
	maxTimeLengthOfGame: 50,
	warningTimeProportion: 0.60,

	startTomagotchi() {
		this.createTomagotchi("tommy"); //****** prompt user for name here
		this.initializeScoreBoard();
		this.runGame();
		console.log("max time: " + this.maxTimeLengthOfGame);
	},

	createTomagotchi: function(name) {
		console.log("inside createTomagotchi");
		this.tomagotchi = new ClassTomagotchi(name);
	},

	initializeScoreBoard() {
		$('.limit').text(` out of ${this.tomagotchi.sleepHungerBoredomLimit}`);
	},

	// Animation is triggered by button push
	//*******************************************

	// Let the tomagotchi sleep (turn off the lights)
	turnOutLights() {
		console.log("inside turnOutLights");
		this.tomagotchi.sleepiness = this.tomagotchi.decrementMeter(this.tomagotchi.sleepiness);
		// change CSS image/animation to dark background
		// and dark, sleeping image of pet
		$("#image-src").attr("src", "https://giphy.com/embed/1URlthYDD9ZfNe68JT");
		$("body").css("background-color", "#171719");
		$("body").css("color", "lightgrey");
		//******************
		//****************** stall the boredom and hunger timers
		//******************
	},

	// Feed the tomagotchi
	feedTomagotchi() {
		// console.log("inside feedTomagotchi");
		this.tomagotchi.hunger = this.tomagotchi.decrementMeter(this.tomagotchi.hunger);
		// change CSS image/animation to hungry pet
		$("#image-src").attr("src", "https://giphy.com/embed/1r94BxRXEi2l5YnGVp");
		$("body").css("background-color", "white");
		$("body").css("color", "black");
	},

	// play with the tomagotchi
	playWithTomagotchi() {
		// console.log("inside playWithTomagotchi:");
		this.tomagotchi.boredom = this.tomagotchi.decrementMeter(this.tomagotchi.boredom);
		// change CSS image/animation to playing pet
		$("#image-src").attr("src", "https://giphy.com/embed/2zotXB1xGbTB28cKAD");
		$("body").css("background-color", "white");
		$("body").css("color", "black");
	},

	ageTomagotchi () {
		console.log("inside ageTomagotchi");
		// change CSS image/animation increase size of pet
		if (this.tomagotchi.age === 2 ) {
			$('#image-div').css("transform", "scale(2)");
		}
		if (this.tomagotchi.age === 3 ) {
			$('#image-div').css("transform", "scale(3)");
		}
		if (this.tomagotchi.age === 4 ) {
			$('#image-div').css("transform", "scale(4)");
		}
	},

	updateScoreBoard() {
		console.log("inside updateScoreBoard");
		console.log("sleep", this.tomagotchi.sleepiness, 
			"hunger", this.tomagotchi.hunger, 
			"boredom", this.tomagotchi.boredom, 
			"age", this.tomagotchi.age);
		$('#sleep-count').text(this.tomagotchi.sleepiness);
		$('#hunger-count').text(this.tomagotchi.hunger);
		$('#boredom-count').text(this.tomagotchi.boredom);
	},

	runGame() {
		// MDN timer -- returns a handle that can be used to stop timer
		// setInterval -- increase time elapsed
		console.log("Upper limit: " + this.tomagotchi.sleepHungerBoredomLimit);	


	   const timer = setInterval( () => {
	   	this.timeElapsed++;
	   	console.log(`time: ${this.timeElapsed}`);

	   	// a failsafe to get out of the timer after a long time of playing
			if (this.timeElapsed >= this.maxTimeLengthOfGame) {
				clearInterval(timer);
				console.log("Game too long!\n Thank goodness I put in a failsafe to stop the game so you can rest!");
			}

	   	// $('#timer').text(`Time: ${this.time}s`);

	   	// Sleepiness increase (slowest to change)
	   	if (this.timeElapsed % this.tomagotchi.sleepIntervalDefault === 0) {
	   		this.tomagotchi.sleepiness = this.tomagotchi.incrementMeter(this.tomagotchi.sleepiness);
	   		console.log("increasing sleep counter: " + this.tomagotchi.sleepiness);
	   		if (this.tomagotchi.sleepiness >= this.tomagotchi.sleepHungerBoredomLimit * this.warningTimeProportion) {
	   			// show sleeping Tomagotchi
	   			$("#image-src").attr("src", "https://giphy.com/embed/1URlthYDD9ZfNe68JT");
	   		}
	   	}
	   	// Hunger increase
	   	if (this.timeElapsed % this.tomagotchi.hungerIntervalDefault === 0) {
	   		this.tomagotchi.hunger = this.tomagotchi.incrementMeter(this.tomagotchi.hunger);
	   		console.log("increasing hunger counter: " + this.tomagotchi.hunger);
	   		if (this.tomagotchi.hunger >= this.tomagotchi.sleepHungerBoredomLimit * this.warningTimeProportion) {
	   			// show hungry Tomagotchi
	   			$("#image-src").attr("src", "https://giphy.com/embed/1xnu4sgy1FpbHXZoW6");
	   		}
	   	}
	   	// Boredom increase (fastest to change)
	   	if (this.timeElapsed % this.tomagotchi.boredomIntervalDefault === 0) {
	   		this.tomagotchi.boredom = this.tomagotchi.incrementMeter(this.tomagotchi.boredom);
	   		console.log("increasing boredom counter: " + this.tomagotchi.boredom);
	   		if (this.tomagotchi.boredom >= this.tomagotchi.sleepHungerBoredomLimit * this.warningTimeProportion) {
	   			// show hungry Tomagotchi
	   			$("#image-src").attr("src", "https://giphy.com/embed/pzvUEkOeAViy7VS7B6");
	   		}

			}
			// increase age (much slower to change)
			if (this.timeElapsed % this.tomagotchi.ageIntervalDefault === 0) {
	   		this.tomagotchi.age = this.tomagotchi.incrementMeter(this.tomagotchi.age);
	   		console.log("increasing age counter: " + this.tomagotchi.age);
	   		// show effect of age (by increasing size of Tomagotchi)
	   		this.ageTomagotchi();
			}

	   	// Display updated score board
	   	this.updateScoreBoard();

	   	// Check if tomagotchi has died or grown too old
			if (this.tomagotchi.sleepiness >= this.tomagotchi.sleepHungerBoredomLimit) {
				console.log(`${this.tomagotchi.name} died from lack of sleep!`);
				$("#image-src").attr("src", "https://giphy.com/embed/SGld0SRSJzZuKAm9c1");
				clearInterval(timer);
			} else if (this.tomagotchi.hunger >= this.tomagotchi.sleepHungerBoredomLimit) {
				console.log(`${this.tomagotchi.name} died from hunger!`);
				$("#image-src").attr("src", "https://giphy.com/embed/SGld0SRSJzZuKAm9c1");
				clearInterval(timer);
			} else if (this.tomagotchi.boredom >= this.tomagotchi.sleepHungerBoredomLimit) {
				console.log(`${this.tomagotchi.name} died from boredom!`);
				$("#image-src").attr("src", "https://giphy.com/embed/SGld0SRSJzZuKAm9c1");
				clearInterval(timer);
			} else if (this.tomagotchi.age >= this.tomagotchi.ageLimit) {
				console.log(`${this.tomagotchi.name} is too old to continue!`);
				$("#image-src").attr("src", "https://giphy.com/embed/SGld0SRSJzZuKAm9c1");
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

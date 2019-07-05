console.log("Are you ready to own a Tomagotchi?");


//**************************************************
// Definition of Tomagotchi class
//**************************************************
class ClassTomagotchi {
	constructor(name) {
		this.name = name;
		this.age = 1;
		this.ageLimit = 5;
		this.ageIntervalDefault = 20;

		this.sleepiness = 0;
		this.sleepIntervalDefault = 7;
		this.hunger = 0;
		this.hungerIntervalDefault = 3;
		this.boredom = 0;
		this.boredomIntervalDefault = 5;

		this.sleepHungerBoredomLimit = 10;  // must be an even number
		this.sleepHungerBoredomWarningTime = 7;
		this.sleepHungerBoredomBackup = 6;

		this.wake = 0;
		this.wakeIntervalDefault = 3;
	}

	// decrement the sleep, hunger, boredom meters
	// age never gets decremented 
	// and wake gets set back to zero after sleep
	decrementMeter (characteristic) {;
		characteristic = Math.max(0, characteristic - this.sleepHungerBoredomBackup);
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
	

	// Start: new Tomagotchi, fresh score board, start the game timer
	startTomagotchi() {
		this.createTomagotchi("tommy"); //****** prompt user for name here
		this.initializeScoreBoard();
		this.runGame();
		console.log("max time: " + this.maxTimeLengthOfGame);
	},

	createTomagotchi: function(name) {
		// console.log("inside createTomagotchi");
		//******************
		//****************** allow user to enter a name
		//******************
		this.tomagotchi = new ClassTomagotchi(name);
	},

	initializeScoreBoard() {
		//******************
		//****************** improve scoreboard appearance with growing meters, not text
		//****************** numbers (perhaps div with flex box, small boxes added as time progresses)
		//****************** change meter to red when getting close to limit (sleep, hunger, boredom)
		//****************** (give the meter a border so it's obvious how much "time" is left)
		//******************
		$('.limit').text(` out of ${this.tomagotchi.sleepHungerBoredomLimit}`);
	},

	// Let the Tomagotchi sleep (turn off the lights)
	turnOutLights() {
		// console.log("inside turnOutLights");
		const currentCount = this.tomagotchi.sleepiness;
		this.tomagotchi.sleepiness = this.tomagotchi.decrementMeter(this.tomagotchi.sleepiness);
		// change CSS image/animation to dark background
		// and dark, sleeping image of pet
		$("#image-src").attr("src", "https://giphy.com/embed/1URlthYDD9ZfNe68JT");
		$("body").css("background-color", "#343A40");
		const numToRemove = Math.min(currentCount, this.tomagotchi.sleepHungerBoredomBackup);
		console.log("currentCount = " + currentCount);
		console.log("numToRemove = " + numToRemove);
		for (let i = 0; i < numToRemove;  i++) {
			console.log("div index: " + (currentCount - i));
	   	$("#sleep-meter" + (currentCount - i)).remove();
		}
		//******************
		//****************** stall the boredom and hunger timers
		//****************** start the wake timer
		//******************

	},

	// Wake up the Tomagotchi (turn on the lights)
	turnOnLights() {
		console.log("inside turnOnLights");
		// return to original start image of sitting cat
		$("#image-src").attr("src", "https://giphy.com/embed/xl1pVfHSGczTgLL3YQ");
		$("body").css("background-color", "lavender");
	},

	feedTomagotchi() {
		console.log("inside feedTomagotchi");
		const currentCount = this.tomagotchi.hunger;
		console.log("currentCount = ", currentCount);
		this.tomagotchi.hunger = this.tomagotchi.decrementMeter(this.tomagotchi.hunger);
		console.log("hunger meter = ", this.tomagotchi.hunger);
		// change CSS image/animation happy heart
		$("#image-src").attr("src", "https://giphy.com/embed/1r94BxRXEi2l5YnGVp");
		$("body").css("background-color", "lavender");
		const numToRemove = Math.min(currentCount, this.tomagotchi.sleepHungerBoredomBackup);
		console.log("currentCount = " + currentCount);
		console.log("numToRemove = " + numToRemove);
		for (let i = 0; i < numToRemove;  i++) {
			console.log("div index: " + (currentCount - i));
	   	$("#hunger-meter" + (currentCount - i)).remove();
		}
	},

	// play with the tomagotchi
	playWithTomagotchi() {
		console.log("inside playWithTomagotchi:");
		const currentCount = this.tomagotchi.boredom;
		this.tomagotchi.boredom = this.tomagotchi.decrementMeter(this.tomagotchi.boredom);
		// change CSS image/animation to playing pet
		$("#image-src").attr("src", "https://giphy.com/embed/2zotXB1xGbTB28cKAD");
		$("body").css("background-color", "lavender");
		const numToRemove = Math.min(currentCount, this.tomagotchi.sleepHungerBoredomBackup);
		console.log("currentCount = " + currentCount);
		console.log("numToRemove = " + numToRemove);
		for (let i = 0; i < numToRemove;  i++) {
			console.log("div index: " + (currentCount - i));
	   	$("#boredom-meter" + (currentCount - i)).remove();
		}

	   // $("#boredom-div1").remove();
	   // $("#boredom-div2").remove();
	   // $("#boredom-div3").remove();
	},

	// use CSS transition to animate increase size of Tomagotchi as it ages
	ageTomagotchi () {
		// console.log("inside ageTomagotchi");
		if (this.tomagotchi.age === 2 ) {
			$('#image-div').css("animation-name", "age2");
			$('#image-div').css("animation-duration", "6s");
			$('#image-div').css("animation-iteration-count", "1");
			$('#image-div').css("transform", "scale(2.5)");
			$('#image-div').css("margin-left", 300);
			$('#image-div').css("margin-top", 250);
		}
		if (this.tomagotchi.age === 3 ) {
			//******************
			//****************** need to resstart CSS transition for another smooth size growth
			//******************
			$('#image-div').css("animation-name", "age3");
			$('#image-div').css("animation-duration", "6s");
			$('#image-div').css("animation-iteration-count", "1");
			$('#image-div').css("transform", "scale(4)");
			$('#image-div').css("margin-left", 250);
			$('#image-div').css("margin-top", 300);
		}
		if (this.tomagotchi.age === 4 ) {
			//******************
			//****************** need to resstart CSS transition for another smooth size growth
			//******************
			$('#image-div').css("animation-name", "age4");
			$('#image-div').css("animation-duration", "6s");
			$('#image-div').css("animation-iteration-count", "1");
			$('#image-div').css("transform", "scale(5.5)");
			$('#image-div').css("margin-left", 200);
			$('#image-div').css("margin-top", 350);
		}
	},

	// updateScoreBoard() {
	// 	// console.log("inside updateScoreBoard");
	// 	// console.log("sleep", this.tomagotchi.sleepiness, 
	// 		// "hunger", this.tomagotchi.hunger, 
	// 		// "boredom", this.tomagotchi.boredom, 
	// 		// "age", this.tomagotchi.age);
	// 	$('#sleep-count').text(this.tomagotchi.sleepiness);
	// 	$('#hunger-count').text(this.tomagotchi.hunger);
	// 	$('#boredom-count').text(this.tomagotchi.boredom);
	// },

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

			
	   	// Sleepiness increase (slowest to change)
	   	if (this.timeElapsed % this.tomagotchi.sleepIntervalDefault === 0) {
	   		this.tomagotchi.sleepiness = this.tomagotchi.incrementMeter(this.tomagotchi.sleepiness);
	   		$div = $("<div/>");
	   		$div.attr("class", "meter-specs sleep-meter-color");
	   		$div.attr("id", "sleep-meter" + this.tomagotchi.sleep);
	   		if (this.tomagotchi.sleepiness >= this.tomagotchi.sleepHungerBoredomWarningTime) {
	   			// show sleeping Tomagotchi
	   			$("#image-src").attr("src", "https://giphy.com/embed/1URlthYDD9ZfNe68JT");
	   			$div.attr("class", "meter-specs meter-alert-color");
	   		}
	   		$("#sleep-meter").append($div);
	   	}

	   	// Hunger increase
	   	if (this.timeElapsed % this.tomagotchi.hungerIntervalDefault === 0) {
	   		this.tomagotchi.hunger = this.tomagotchi.incrementMeter(this.tomagotchi.hunger);
	   		$div = $("<div/>");
	   		$div.attr("class", "meter-specs hunger-meter-color");
	   		$div.attr("id", "hunger-meter" + this.tomagotchi.hunger);
	   		if (this.tomagotchi.hunger >= this.tomagotchi.sleepHungerBoredomWarningTime) {
	   			// show hungry Tomagotchi
	   			$("#image-src").attr("src", "https://giphy.com/embed/1xnu4sgy1FpbHXZoW6");
	   			$div.attr("class", "meter-specs meter-alert-color");
	   		}
	   		$("#hunger-meter").append($div);
	   	}

	   	// Boredom increase (fastest to change)
	   	if (this.timeElapsed % this.tomagotchi.boredomIntervalDefault === 0) {
	   		this.tomagotchi.boredom = this.tomagotchi.incrementMeter(this.tomagotchi.boredom);
	   		$div = $("<div/>");
	   		$div.attr("class", "meter-specs boredom-meter-color");
	   		$div.attr("id", "boredom-meter" + this.tomagotchi.boredom);
	   		if (this.tomagotchi.boredom >= this.tomagotchi.sleepHungerBoredomWarningTime) {
	   			// show bored Tomagotchi
	   			$("#image-src").attr("src", "https://giphy.com/embed/pzvUEkOeAViy7VS7B6");
	   			// show red in the progress bar (the meter)
	   			$div.attr("class", "meter-specs meter-alert-color");
	   		}
	   		$("#boredom-meter").append($div);
			}

			// increase age (much slower to change)
			if (this.timeElapsed % this.tomagotchi.ageIntervalDefault === 0) {
	   		this.tomagotchi.age = this.tomagotchi.incrementMeter(this.tomagotchi.age);
	   		// console.log("increasing age counter: " + this.tomagotchi.age);
	   		// show effect of age (by increasing size of Tomagotchi)
	   		this.ageTomagotchi();
			}

	   	
	   	// Check if tomagotchi has died or grown too old
	   	// That is, check if game has ended
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

			// Display updated score board
	   	// this.updateScoreBoard();

	   	
			
		}, 500);  // timer is in milliseconds
  	}

}

//**************************************************
// Start the game
//**************************************************
game.startTomagotchi();



//**************************************************
// Event listeners
//**************************************************
$('#feed-me').on('click', (e) => {
	game.feedTomagotchi();
	// game.updateScoreBoard();
})

$('#play-with-me').on('click', (e) => {
	game.playWithTomagotchi();
	// game.updateScoreBoard();
});

$('#turn-out-lights').on('click', (e) => {
	game.turnOutLights();
	// game.updateScoreBoard();
});

$('#turn-out-lights').on('click', (e) => {
	game.turnOutLights();
	// game.updateScoreBoard();
});

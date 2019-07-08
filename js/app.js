console.log("Are you ready to own a Tomagotchi?");


//**************************************************
// Definition of Tomagotchi class
//**************************************************
class ClassTomagotchi {
	constructor(name) {
		this.name = name;
		this.age = 1;
		this.ageLimit = 6;
		this.ageIntervalDefault = 31;  // 31

		this.sleepiness = 0;
		this.sleepIntervalDefault = 7;  // 7
		this.sleepInterval = 7;
		this.hunger = 0;
		this.hungerIntervalDefault = 3;  // 3
		this.hungerInterval = 3;
		this.boredom = 0; 
		this.boredomIntervalDefault = 5;  // 5
		this.boredomInterval = 5;

		this.sleepHungerBoredomLimit = 10;  // must be an even number
		this.sleepHungerBoredomWarningTime = 7;
		this.sleepHungerBoredomBackup = 6;

		this.wake = 0;
		this.wakeIntervalDefault = 2;  // 2
		this.wakeInterval = 2;
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
	maxTimeLengthOfGame: 300,


	// Start: new Tomagotchi, fresh score board, start the game timer
	startTomagotchi(name) {
		// create a Tomagotchi with the name chosen by the user
		this.createTomagotchi(name);

		// before starting the game, set the wake meter interval
		// so high that it is never triggered until...
		// when Tomagotchi is sleeping (then set wake interval to small value)
		this.tomagotchi.wakeInterval = this.maxTimeLengthOfGame + 1;

		// start the game
		this.runGame();
		console.log("max time: " + this.maxTimeLengthOfGame);
	},

	createTomagotchi: function(name) {
		// console.log("inside createTomagotchi");

		// create the Tomagotchi from a class definition
		this.tomagotchi = new ClassTomagotchi(name);

		// "pop" the Tomagotchi up on the screen 
		// by starting from a small (not visible) image
		// and use CSS transition to grow image to full size quickly
		$('#image-div').css("animation-name", "age1");
		$('#image-div').css("animation-duration", "1s");
		$('#image-div').css("animation-iteration-count", "1");
		$('#image-div').css("transform", "scale(1)");
	},

	// Let the Tomagotchi sleep (turn off the lights)
	turnOutLights() {
		// console.log("inside turnOutLights");

		// change CSS image/animation to dark background
		// and dark, sleeping image of pet
		$("#image-src").attr("src", "https://giphy.com/embed/1URlthYDD9ZfNe68JT");
		$("body").css("background-color", "#343A40");

		// claw back some of the meter reading to a lower value
		const currentCount = this.tomagotchi.sleepiness;
		this.tomagotchi.sleepiness = this.tomagotchi.decrementMeter(this.tomagotchi.sleepiness);

		// ...by removing some of the div boxes from the meter
		const numToRemove = Math.min(currentCount, this.tomagotchi.sleepHungerBoredomBackup);
		for (let i = 0; i < numToRemove;  i++) {
	   	$("#sleep-meter" + (currentCount - i)).remove();
		}

	},

	// Wake up the Tomagotchi (turn on the lights)
	turnOnLights() {
		// console.log("inside turnOnLights");

		// Return to original gif at the start of the game
		$("#image-src").attr("src", "https://giphy.com/embed/xl1pVfHSGczTgLL3YQ");
		$("body").css("background-color", "lavender");

		// clear the meter completely
		const currentCount = this.tomagotchi.wake;
		this.tomagotchi.wake = 0;  // decrement to zero (start over for next time sleeping)
      // ... by removing all div boxes from the meter
		const numToRemove = currentCount; 
		for (let i = 0; i < numToRemove;  i++) {
	   	$("#wake-meter" + (currentCount - i)).remove();
		}

	},

	feedTomagotchi() {
		// console.log("inside feedTomagotchi");

		// change CSS image/animation happy heart
		// $("#image-src").attr("src", "https://giphy.com/embed/1r94BxRXEi2l5YnGVp");
		// change CSS image/animation to cat happy to get a present: a mouse!
		$("#image-src").attr("src", "https://giphy.com/embed/d5J083vjsxXRbwnTqS");
		$("body").css("background-color", "lavender");

		// claw back some of the meter reading to a lower value
		const currentCount = this.tomagotchi.hunger;
		this.tomagotchi.hunger = this.tomagotchi.decrementMeter(this.tomagotchi.hunger);
		// ... by removing some of the div boxes from the meter
		const numToRemove = Math.min(currentCount, this.tomagotchi.sleepHungerBoredomBackup);
		for (let i = 0; i < numToRemove;  i++) {
	   	$("#hunger-meter" + (currentCount - i)).remove();
		}

	},

	// play with the tomagotchi
	playWithTomagotchi() {
		// console.log("inside playWithTomagotchi:");

		// change CSS image/animation to playing pet
		$("#image-src").attr("src", "https://giphy.com/embed/2zotXB1xGbTB28cKAD");
		$("body").css("background-color", "lavender");

		// claw back some of the meter reading to a lower value
		const currentCount = this.tomagotchi.boredom;
		this.tomagotchi.boredom = this.tomagotchi.decrementMeter(this.tomagotchi.boredom);
		// ... by removing some of the div boxes from the meter
		const numToRemove = Math.min(currentCount, this.tomagotchi.sleepHungerBoredomBackup);
		for (let i = 0; i < numToRemove;  i++) {
	   	$("#boredom-meter" + (currentCount - i)).remove();
		}

	},

	// use CSS transition to animate increase size of Tomagotchi as it ages
	ageTomagotchi () {
		// console.log("inside ageTomagotchi");
		if (this.tomagotchi.age === 2 ) {
			$('#image-div').css("animation-name", "age2");
			$('#image-div').css("animation-duration", "6s");
			$('#image-div').css("animation-iteration-count", "1");
			$('#image-div').css("transform", "scale(2.5)");
			$('#image-div').css("margin-left", 650);
			$('#image-div').css("margin-top", 200);
		}
		if (this.tomagotchi.age === 3 ) {
			$('#image-div').css("animation-name", "age3");
			$('#image-div').css("animation-duration", "6s");
			$('#image-div').css("animation-iteration-count", "1");
			$('#image-div').css("transform", "scale(4)");
			$('#image-div').css("margin-left", 700);
			$('#image-div').css("margin-top", 300);
		}
		if (this.tomagotchi.age === 4 ) {
			$('#image-div').css("animation-name", "age4");
			$('#image-div').css("animation-duration", "6s");
			$('#image-div').css("animation-iteration-count", "1");
			$('#image-div').css("transform", "scale(5.5)");
			$('#image-div').css("margin-left", 750);
			$('#image-div').css("margin-top", 400);
		}
	},

	runGame() {
		// setInterval returns a handle that can be used to stop timer
	   const timer = setInterval( () => {
	   	this.timeElapsed++;
	   	console.log(`time: ${this.timeElapsed}`);

	   	// a failsafe to get out of the timer after a long time of playing
			if (this.timeElapsed >= this.maxTimeLengthOfGame) {
				clearInterval(timer);
				console.log("Game too long!\n Thank goodness I put in a failsafe to stop the game so you can rest!");
			}

			// Waking time meter
	   	if (this.timeElapsed % this.tomagotchi.wakeInterval === 0) {
	   		this.tomagotchi.wake = this.tomagotchi.incrementMeter(this.tomagotchi.wake);
	   		$div = $("<div/>");
	   		$div.attr("class", "meter-specs wake-meter-color");
	   		$div.attr("id", "wake-meter" + this.tomagotchi.wake);
	   		if (this.tomagotchi.wake >= this.tomagotchi.sleepHungerBoredomWarningTime) {
	   			// Simon's cat is pointing and meowing for you to turn on the lights
	   			$("#image-src").attr("src", "https://giphy.com/embed/4T1Sf6UvSXYyLJ5tUS");
	   			$div.attr("class", "meter-specs meter-alert-color");
	   		}
	   		$("#wake-meter").append($div);
	   	}

	   	// Sleepiness increase meter
	   	if (this.timeElapsed % this.tomagotchi.sleepInterval === 0) {
	   		this.tomagotchi.sleepiness = this.tomagotchi.incrementMeter(this.tomagotchi.sleepiness);
	   		$div = $("<div/>");
	   		$div.attr("class", "meter-specs sleep-meter-color");
	   		$div.attr("id", "sleep-meter" + this.tomagotchi.sleepiness);
	   		if (this.tomagotchi.sleepiness >= this.tomagotchi.sleepHungerBoredomWarningTime) {
	   			// show sleeping Tomagotchi
	   			$("#image-src").attr("src", "https://giphy.com/embed/1URlthYDD9ZfNe68JT");
	   			$div.attr("class", "meter-specs meter-alert-color");
	   		}
	   		$("#sleep-meter").append($div);
	   	}

	   	// Hunger increase meter
	   	if (this.timeElapsed % this.tomagotchi.hungerInterval === 0) {
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

	   	// Boredom increase meter
	   	if (this.timeElapsed % this.tomagotchi.boredomInterval === 0) {
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
	   		// show effect of age (by increasing size of Tomagotchi)
	   		this.ageTomagotchi();
			}
	   	
	   	// Check if tomagotchi has died or grown too old
	   	// That is, check if game has ended
	   	let endOfGame = false;
			if (this.tomagotchi.sleepiness >= this.tomagotchi.sleepHungerBoredomLimit) {
				console.log(`${this.tomagotchi.name} died from lack of sleep!`);
				endOfGame = true;
				// $("#image-src").attr("src", "https://giphy.com/embed/SGld0SRSJzZuKAm9c1");
				clearInterval(timer);
			} 	else if (this.tomagotchi.wake >= this.tomagotchi.sleepHungerBoredomLimit) {
				console.log(`${this.tomagotchi.name} died from too much sleep in the dark!`);
				endOfGame = true;
				// $("#image-src").attr("src", "https://giphy.com/embed/SGld0SRSJzZuKAm9c1");
				clearInterval(timer);
			} else if (this.tomagotchi.hunger >= this.tomagotchi.sleepHungerBoredomLimit) {
				console.log(`${this.tomagotchi.name} died from hunger!`);
				endOfGame = true;
				// $("#image-src").attr("src", "https://giphy.com/embed/SGld0SRSJzZuKAm9c1");
				clearInterval(timer);
			} else if (this.tomagotchi.boredom >= this.tomagotchi.sleepHungerBoredomLimit) {
				console.log(`${this.tomagotchi.name} died from boredom!`);
				endOfGame = true;
				// $("#image-src").attr("src", "https://giphy.com/embed/SGld0SRSJzZuKAm9c1");
				clearInterval(timer);
			} 

			if (endOfGame) {
				// You lose.   :(
				$("#image-src").attr("src", "https://giphy.com/embed/SGld0SRSJzZuKAm9c1");
				clearInterval(timer);
			}
			if ( !endOfGame && (this.tomagotchi.age >= this.tomagotchi.ageLimit) ) {
				// You win!    :)
				$("#image-src").attr("src", "https://giphy.com/embed/NQDcH2ZZaPV8QBDYK3");
				clearInterval(timer);
			}	   	
			
		}, 500);  // timer is in milliseconds
  	}

}



//**************************************************
// Event listeners
//**************************************************

// ***** THE GAME BEGINS WHEN....
// User submits a form to enter a name for their Tomagotchi
$('#enter-name').on('submit', (event) => {
	// prevent form from sending data (to stop page "reload")
	event.preventDefault();
	// retrieve the text entered by the user
	const $input = $(event.target[0]);
	const name = $input.val();
	console.log("Name: ", name);
	// create a Tomagotchi with the name chosen by the user
	game.startTomagotchi(name);
})

// Actions to take when user clicks the "Feed Me!" button
$('#feed-me').on('click', (e) => {
	game.feedTomagotchi();
})

// Actions to take when user clicks the "Play with me!" button
$('#play-with-me').on('click', (e) => {
	game.playWithTomagotchi();
});

// Actions to take when user clicks the "Turn out the lights!" button
$('#turn-out-lights').on('click', (e) => {
	game.tomagotchi.hungerInterval = game.maxTimeLengthOfGame + 1;
	game.tomagotchi.boredomInterval = game.maxTimeLengthOfGame + 1;
	game.tomagotchi.sleepInterval = game.maxTimeLengthOfGame + 1;
	game.tomagotchi.wakeInterval = game.tomagotchi.wakeIntervalDefault;
	game.turnOutLights();
	
});

// Actions to take when user clicks the "Turn on the lights!" button
$('#turn-on-lights').on('click', (e) => {
	game.tomagotchi.hungerInterval = game.tomagotchi.hungerIntervalDefault;
	game.tomagotchi.boredomInterval = game.tomagotchi.boredomIntervalDefault;
	game.tomagotchi.sleepInterval = game.tomagotchi.sleepIntervalDefault;
	game.tomagotchi.wakeInterval = game.maxTimeLengthOfGame + 1;
	game.turnOnLights();
	

});

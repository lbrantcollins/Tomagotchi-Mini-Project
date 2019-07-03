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
}

//**************************************************
// Game object and methods
//**************************************************
const game {

	createTomagotchi = (name) => {
		console.log("inside createTomagotchi function");
		const pet = new Tomagotchi(name);
	},

	turnOutLights = (sleepiness) => {
		console.log("inside turnOutLights function");
		// change CSS image/animation to dark background
		// and dark, sleeping image of pet
	},

	feedTomagotchi = (hunger) => {
		console.log("inside feedTomagotchi function");
		// change CSS image/animation to hungry pet
	},

	playWithTomagotchi = (boredom) => {
		console.log("inside feedTomagotchi function");
		// change CSS image/animation to playing pet
		
	}

}

game.createTomagotchi("tommy");

//**************************************************
// Event listeners
//**************************************************
('#feed-me').on('click', feedTomagotchi( HOW to pass "hunger" here?);

('#play-with-me').on('click', playWithTomagotchi( HOW to pass "boredom" here?);

('#turn-out-lights').on('click'), turnOutLights( HOW to pass "sleepiness" here?)

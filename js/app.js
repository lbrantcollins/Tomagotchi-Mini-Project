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
	turnOutLights = () => {
		console.log("inside turnOutLights function");
		// change CSS image/animation to dark background
		// and dark, sleeping image of pet
	}

	feedTomagotchi() {
		console.log("inside feedTomagotchi function");
		// change CSS image/animation to hungry pet
	}

	playWithTomagotchi() {
		console.log("inside feedTomagotchi function");
		// change CSS image/animation to playing pet
		
	}
}

//**************************************************
// Game object and methods
//**************************************************
const game {
	//Tomagotchi: null,
	createTomagotchi: function(name){
		console.log("inside createTomagotchi function");
		const pet = new Tomagotchi(name);
	},

	

}

game.createTomagotchi("tommy");

//**************************************************
// Event listeners
//**************************************************
$('#feed-me').on('click', (e) => {
	game.Tomagotchi.feedTomagotchi();
})

('#play-with-me').on('click', game.Tomagotchi.playWithTomagotchi();

('#turn-out-lights').on('click'), game.Tomagotchi.turnOutLights( HOW to pass "sleepiness" here?)

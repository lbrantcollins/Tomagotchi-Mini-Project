console.log("Are you ready to own a Tomagotchi?");

class Tomagotchi {
	constructor(name) {
		this.name = name;
		this.age = 0;
		this.hunger = 10;
		this.sleepiness = 10;
		this.boredom = 10;
	}
}

const game = {

	createTomagotchi(name) {
		const pet = new Tomagotchi(name);
 	console.log(pet);
	}

}

game.createTomagotchi("tommy");
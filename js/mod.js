let modInfo = {
	name: "The Ice Cream Tree",
	id: "catyme",
	author: "CatyIceCream",
	pointsName: "funds",
	modFiles: ["layers.js", "tree.js"],

	discordName: "",
	discordLink: "",
	initialStartPoints: new Decimal (0), // Used for hard resets and new players
	offlineLimit: 1,  // In hours
}

// Set your version in num and name
let VERSION = {
	num: "0.21",
	name: "Investment Buyable Change",
}

let changelog = `<h1>Changelog:</h1><br>
	<h3>v0.21</h3><br>
		-Changed Investment buyable cost from ((215 * 2^x)+(2+(0.5*x)% of player points)) to ((215 * 2^x) + (player points to the 1.5th root))
		<br>-Changed investment bonus from 2% to 4%<br>
	<h3>v0.2</h3><br>
		- Replaced coldness with funds (basic points)
			-Fund increase their gain by a small amount based off itself, but slows down and becomes too small to matter<br>
		-Added a ingredient layer between basic points and ice<br>
		-Removed placeholder upgrades and added a Investment buyable<br>
	<h3>v0.1</h3><br>
		- Added coldness. Max coldness is currently 33.33<br>
		- Added ice layer.`

let winText = `You won! Come back next update!`

// If you add new functions anywhere inside of a layer, and those functions have an effect when called, add them here.
// (The ones here are examples, all official functions are already taken care of)
var doNotCallTheseFunctionsEveryTick = ["blowUpEverything"]

function getStartPoints(){
    return new Decimal(modInfo.initialStartPoints)
}

// Determines if it should show points/sec
function canGenPoints(){
	return true
}

// Calculate points/sec!
function getPointGen() {
	if(!canGenPoints())
		return new Decimal(0)

	// make Decimal(1) happen if player.points <= 1, make Decimal(1/player.points) happen if player.points > 1

	//let gain = new Decimal(1/(player.points+1))
	let gain = new Decimal(player.points <= 0 ? 0.43 : 0.43+Math.log(1.29**(player.points**0.43)))
	
	const numInvestments = getBuyableAmount('in', 11)
	const investmentBonus = new Decimal(1.04).pow(numInvestments)
	gain = gain.times(investmentBonus)

	return gain

}

// You can add non-layer related variables that should to into "player" and be saved here, along with default values
function addedPlayerData() { return {
}}

// Display extra things at the top of the page
var displayThings = [
   function () { return `<br>default: (0.43/s) <br>fund self-boost: +(${Math.log(1.29**(player.points**0.43)).toFixed(2)}/s)`},
]

// Determines when the game "ends"
function isEndgame() {
	return player.points.gte(new Decimal("e280000000"))
}



// Less important things beyond this point!

// Style for the background, can be a function
var backgroundStyle = {

}

// You can change this if you have things that can be messed up by long tick lengths
function maxTickLength() {
	return(3600) // Default is 1 hour which is just arbitrarily large
}

// Use this if you need to undo inflation from an older version. If the version is older than the version that fixed the issue,
// you can cap their current resources with this.
function fixOldSave(oldVersion){
}
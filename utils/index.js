function randomSetOfPhrases(){
	const listOfPhrases = [
		[
			"Encrypting Drives..............ENCRYPTED",
			"<br/>Checking Partitions............Partitions [ OK ]",
			"<br/>Clearing MemoryPages...........MemoryPages [ CLEARED ]",
			"<br/>Checking Burrito...............Nice and Toasty [ OK ]",
			"<br/>Loading nothing important......Loaded [ OK ]",
			"<br/>You not in a hurry.............are you?"
		],
		[
			"			Processing a Sidequest..............Processed [ OK ]",
			"<br/>The Game.............[ <span style='color: #e34f00'>Failed</span> ]",
			"<br/>OS used Stall..............Success [ OK ]",
			"<br/>Hey! Listen!..............Listening [ <span style='color: #e34f00'>Failed</span> ]",
			"<br/>I hope you quicksaved......Saving [ <span style='color: #e34f00'>Failed</span> ]",
			"<br/>I swear, I didn't forget a method........Compiled [ OK ]",
			"<br/>Thank goodness"
		]
	];

	return listOfPhrases[Math.floor(Math.random() * listOfPhrases.length) + 0];
}

export {
	randomSetOfPhrases
}

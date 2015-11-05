
var deleteGuy = function(gameid, guy){
	$.getJSON("/api/gamePlayer/" + gameid, function( data ) {
		console.log(gameid, guy, data);
		var foundGuy = null;
		for (var i = 0; i < data.length; i++) {	
		  	if( data[i] === guy ) {
				foundGuy = guy;
			};
		};
		if (foundGuy != null) {
			$.ajax({
				url: "/api/gamePlayer/" + gameid,
				type: 'DELETE',
				dataType: 'json',
				data: { "player": guy},
				success: function(result) {
        			console.log('Successfully removed ' + guy);	
        			location.href = "/game/" + gameid;
    			}
			});
		} else {
			console.log("Couldn't find " + guy);
		};	
	});
	playerGetter();
};

var activeArray = [];
var allPlayers = [];
var playersInGame = [];

var playerGetter = function (currentGamePlayers) {

	var list = document.getElementById("players");

	$.getJSON( "/api/playerRoutes", function( data ) {
		
		var players = '<option>Choose a player for your game</option>';

		for (var i = 0; i < data.length; i++) {
			// if(currentGamePlayers.indexOf(data[i].handle) != -1 ){
				players += '<option value="' + data[i].handle + '">' + data[i].handle + '</option>';

				allPlayers.push(data[i].handle);
			// }

		}
		list.innerHTML = players;
	
	});
}

playerGetter();



// $('#players').on('click', function())
// $('#players').on('change', function(event) {
// 	var printOut = document.getElementById('selectedPlayers');
// 	activeArray.push(event.target.value);
// 	var active = activeArray.map(function(e){
// 		var selected = '<li>' + e + '</li>  <a>remove player</a>';
// 		return selected;
// 	})

// 	var runningList = active.join('');
// 	printOut.innerHTML = runningList;
	

// 	$.ajax({
// 		url: '/api/gamePlayer/563a3b2ffe4ed89e8f48f2e1',
// 		type: 'PUT',
// 		dataType: 'json',
// 		data: player,
// 		success: function(result) {
    
//         	console.log('it works');
//     }
// });


// });




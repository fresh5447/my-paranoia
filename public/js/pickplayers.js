
var deleteGuy = function(gameid, guy){
	$.getJSON("/api/gamePlayer/" + gameid, function( data ) {
		
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
	
};


var allPlayers = [];


var playerGetter = function (gameid) {

	var list = document.getElementById("players");

	$.when( 
		$.getJSON( "/api/playerRoutes/"), 
		$.getJSON("/api/gamePlayer/" + gameid)
	).then(

		function( theplayers, gameplayers ) {
			var players = '<option>Choose a player for your game</option>';

			for (var i = 0; i < theplayers[0].length; i++) {
				var p = theplayers[0][i].handle;
				var g = gameplayers[0];

				if(g.indexOf(p) === -1 ){
					players += '<option value="' + p + '">' + p + '</option>';

					allPlayers.push(p);
				}
			}
			list.innerHTML = players;
		}
	);
}

var players = ['Jessie', 'Walt', 'Hank', 'Finn', 'Saul'];



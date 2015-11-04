
var activeArray = [];
var allPlayers = [];
var playersInGame = [];

var playerGetter = function () {

	var list = document.getElementById("players");

	$.getJSON( "http://localhost:7000/api/playerRoutes", function( data ) {
		
		var players = '<option>Choose a guy for your game</option>';

		for (var i = 0; i < data.length; i++) {
			players += '<option value="' + data[i].handle + '">' + data[i].handle + '</option>';
			
			allPlayers.push(data[i].handle);
		}
		list.innerHTML = players;
	
});
}

playerGetter();


$('#players').on('change', function(event) {
	var printOut = document.getElementById('selectedPlayers');
	activeArray.push(event.target.value);
	var active = activeArray.map(function(e){
		var selected = '<li>' + e + '</li>  <a>remove player</a>';
		return selected;
	})

	var runningList = active.join('');
	printOut.innerHTML = runningList;
	

	$.ajax({
		url: '/api/gamePlayer/',
		type: 'PUT',
		dataType: 'json',
		data: runningList,
		success: function(result) {
    
        	console.log('it works');
    }
});


});



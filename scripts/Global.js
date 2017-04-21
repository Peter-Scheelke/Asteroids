let getRandomNumber = function(min, max) {
    return Math.random() * (max - min) + min;
}

let renderOffset = {x: 100, y: 100};

let gameFontStyle = 'Arial';

let storeScore = function(score, level) {
    $.ajax({
		url: `http://localhost:8080/v1/high-scores?score=${score}&level=${level}`,
		type: 'POST',
	});
}

let highscores = [];

let getHighScores = function() {
    $.ajax({
        url: 'http://localhost:8080/v1/high-scores',
        type: 'GET',
        success: function(result) {
            highscores.length = 0;
            for (let score in result) {
                highscores.push(`${result[score].date}: ${result[score].points} (${result[score].level})`);
            }
        },
        
        error: function(result) {
            highscores.length = 0;
            highscores.push('Server unavailable');
        },
    })
}
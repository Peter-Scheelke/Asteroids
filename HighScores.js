let sortNumbers = function(a, b) {
    return parseInt(b.points) - parseInt(a.points);
}

let fs = require('fs');
var path = require('path'); 

let Highscores = [];

let filename = 'scores.json'

fs.stat(filename, function(err, stat) {
    if(err == null) {
        Highscores = JSON.parse(fs.readFileSync(filename,'utf8'));
        Highscores.sort(sortNumbers);
        if (Highscores.length > 10) {
            Highscores = Highscores.slice(0, 10);
        }
    }
});

exports.all = function(request, response) {
	response.writeHead(200, {'content-type': 'application/json'});
	response.end(JSON.stringify(Highscores));
};

exports.add = function(request, response) {
    if (request.query.score > 0) {
        let today = new Date();
        let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
        
        if (Highscores.length < 10) {
            Highscores.push({points : request.query.score, date : date});
            Highscores.sort(sortNumbers);
        }
        else {
            Highscores.sort(sortNumbers);
            if (parseInt(request.query.score) > (Highscores[9].points)) {
                Highscores[9] = {points : request.query.score, date : date};
            }
            Highscores.sort(sortNumbers);
        }

        fs.writeFile(filename, JSON.stringify(Highscores));
    }
    
	response.writeHead(200);
	response.end();
};

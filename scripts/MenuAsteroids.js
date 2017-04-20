let MenuAsteroids = (function() {
    
    let asteroids = [];
    
    let createRandomAsteroid = (function() {
        let asteroidStartSize = 70;
        
        let asteroidCount = Math.floor(getRandomNumber(4, 10));
        asteroidStartSize /= 2;
        for (let i = 0; i < asteroidCount; ++i) {
            let spec = {
                position: {x: getRandomNumber(0, BoundingBox.width), y: getRandomNumber(0, BoundingBox.height)},
                velocity: {speed: getRandomNumber(0.5, 1.5), angle: getRandomNumber(0, Math.PI * 2)},
                size: {width: asteroidStartSize, height: asteroidStartSize},
                heading: 0,
                rotationSpeed: getRandomNumber(-0.05, 0.05),
                pointValue: 0,
            }
            
            asteroids.push(GameObjects.CreateAsteroid(spec));
        }

        asteroidCount = Math.floor(getRandomNumber(9, 15));
        asteroidStartSize /= 2;
        for (let i = 0; i < asteroidCount; ++i) {
            let spec = {
                position: {x: getRandomNumber(0, BoundingBox.width), y: getRandomNumber(0, BoundingBox.height)},
                velocity: {speed: getRandomNumber(0.5, 1.5), angle: getRandomNumber(0, Math.PI * 2)},
                size: {width: asteroidStartSize, height: asteroidStartSize},
                heading: 0,
                rotationSpeed: getRandomNumber(-0.05, 0.05),
                pointValue: 0,
            }
            
            asteroids.push(GameObjects.CreateAsteroid(spec));
        }
    })();
    
    let update = function(elapsedTime) {
        if (Game.isPaused()) {
            for (let asteroid in asteroids) {
                asteroids[asteroid].update(elapsedTime);
            }
        }
    }
    
    let render = function() {
        for (let asteroid in asteroids) {
            asteroids[asteroid].render();
        }
    }
    
    return  {
        update: update,
        render: render,
    }
}());
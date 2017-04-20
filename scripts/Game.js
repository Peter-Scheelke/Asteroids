let Game = (function() {
    
    let asteroidStartSize = 70;
    
    let CreatePlayableGame = function() {
        let that = {};

        that.hasStoredScore = false;
        
        let hyperjumpFrequency = 15000;
        let paused = true;
        let isAlive = false;
        let timeSinceSpaceShipDied = 0;
        let pointsSinceLastNewLife = 0;
        let timeSinceHyperjump = hyperjumpFrequency;
        
        that.asteroids = [];
        that.projectiles = [];
        that.enemyProjectiles = [];
        that.saucer = null;
        that.spaceship = null;
        that.score = 0;
        that.lives = 0;
        that.clearedCount = 0;
        that.asteroidCount = 0;
        
        let createRandomAsteroid = function() {
            let spec = {
                position: {x: getRandomNumber(0, BoundingBox.width), y: getRandomNumber(0, BoundingBox.height)},
                velocity: {speed: getRandomNumber(0.5, 1.5), angle: getRandomNumber(0, Math.PI * 2)},
                size: {width: asteroidStartSize, height: asteroidStartSize},
                heading: 0,
                rotationSpeed: getRandomNumber(-0.05, 0.05),
                pointValue: 20,
            }

            return GameObjects.CreateAsteroid(spec);
        }
        
        that.initialize = function(score = 0, lives = 0, isAlive = false, asteroidCount = 0) {
            this.hasStoredScore = false;
            Explosions.clear();
            timeSinceSpaceShipDied = 3000;
            pointsSinceLastNewLife = 0;
            this.asteroids = [];
            this.projectiles = [];
            this.enemyProjectiles = [];
            this.saucer = null;
            this.score = score;
            this.lives = lives;
            this.isAlive = isAlive;
            this.asteroidCount = asteroidCount;
            timeSinceHyperjump = hyperjumpFrequency;
            
            let spec = {
                position: {x: BoundingBox.width / 2, y: BoundingBox.height / 2},
                velocity: {speed: 0, angle: 0},
                size: {width: 20 * 1.1, height: 30 * 1.1},
                heading: Math.PI / 2 * 3,
                rotationSpeed: 0,
            }
            
            that.spaceship = GameObjects.CreateShip(spec);

            
            for (let i = 0; i < this.asteroidCount; ++i) {
                let position = {x: this.spaceship.position.x - this.spaceship.size.width * 2, y: this.spaceship.position.y - this.spaceship.size.height * 2};
                let size = {width: this.spaceship.size.width * 6, height: this.spaceship.size.height * 6};
                let shipBoundingBox = {
                    position: position,
                    size: size,
                    isAlive: true,
                }
                
                let asteroid = null;
                do {
                    asteroid = createRandomAsteroid();
                }
                while (GameObjects.doCollide(shipBoundingBox, asteroid));
                this.asteroids.push(asteroid);
            }
        }
        
        that.isAlive = function() {
            return isAlive;
        }
        
        that.incrementScore = function(points) {
            if (this.lives > 0) {
                this.score += points;
                pointsSinceLastNewLife += points;
                if (pointsSinceLastNewLife >= 10000) {
                    pointsSinceLastNewLife -= 10000;
                    this.lives += 1;
                }
            }
        }

        that.createSaucer = function(elapsedTime) {
            if (this.saucer != null && this.saucer.isAlive) {
                return;
            }

            let probability = getRandomNumber(0, 1);
            if (probability < 0.9993) {
                return;
            }
            
            let randomPosition = {x: 0, y: 0};
            if (getRandomNumber(0, 1) > 0.5) {
                // Ship starts outside in x direction
                if (getRandomNumber(0, 1) > 0.5) {
                    randomPosition.x = 10;
                }
                else {
                    randomPosition.x = BoundingBox.width - 10;
                }
                
                randomPosition.y = getRandomNumber(0, BoundingBox.height);
            } 
            else {
                // Ship starts with constant y
                if (getRandomNumber(0, 1) > 0.5) {
                    randomPosition.y = 10;
                }
                else {
                    randomPosition.y = BoundingBox.height - 10;
                }
                
                randomPosition.x = getRandomNumber(0, BoundingBox.width);
            }            
            
            if (this.score > 40000 || getRandomNumber(0, 1) < 0.3) {
                let spec = {
                    position: randomPosition,
                    velocity: {speed: getRandomNumber(2, 4), angle: getRandomNumber(0, Math.PI * 2)},
                    size: {width: 35, height: 35},
                    heading: 0,
                    rotationSpeed: -0.1,
                }
                
                this.saucer = GameObjects.CreateSmallSaucer(spec);
            }
            else {
                let spec = {
                    position: randomPosition,
                    velocity: {speed: getRandomNumber(0.5, 2), angle: getRandomNumber(0, Math.PI * 2)},
                    size: {width: 50, height: 50},
                    heading: 0,
                    rotationSpeed: 0.1,
                }

                this.saucer = GameObjects.CreateLargeSaucer(spec);
            }
        }
        
        that.update = function(elapsedTime) {
            if (!paused) {

                if (this.lives == 0 && !this.hasStoredScore) {
                    this.hasStoredScore = true;
                    storeScore(this.score);
                }
                
                if (this.spaceship != null) {
                    if (this.spaceship.isAlive) {
                        if (!this.spaceship.shouldBurn) {
                            Sounds.soundPlayer.stopBurnSound();
                        }

                        this.spaceship.update(elapsedTime);
                    }
                    else {
                        if (timeSinceSpaceShipDied > 3000 && this.lives > 0) {
                            let spec = {
                                position: {x: BoundingBox.width / 2, y: BoundingBox.height / 2},
                                velocity: {speed: 0, angle: 0},
                                size: {width: 20 * 1.1, height: 30 * 1.1},
                                heading: Math.PI / 2 * 3,
                                rotationSpeed: 0,
                            }
                            
                            this.spaceship = GameObjects.CreateShip(spec);
                        }
                    }
                }
                
                if (this.saucer == null || !this.saucer.isAlive) {
                    this.createSaucer(elapsedTime);
                }
                
                if (this.saucer != null) {
                    this.saucer.update(elapsedTime);
                }
                
                timeSinceHyperjump += elapsedTime;
                timeSinceSpaceShipDied += elapsedTime;
                let aliveProjectiles = [];
                for (let projectile in this.projectiles) {
                    this.projectiles[projectile].update(elapsedTime);
                    if (this.projectiles[projectile].isAlive) {
                        aliveProjectiles.push(this.projectiles[projectile]);
                    }
                }
                
                this.projectiles = aliveProjectiles;
                
                aliveProjectiles = [];
                for (let projectile in this.enemyProjectiles) {
                    this.enemyProjectiles[projectile].update(elapsedTime);
                    if (this.enemyProjectiles[projectile].isAlive) {
                        aliveProjectiles.push(this.enemyProjectiles[projectile]);
                    }
                }
                
                this.enemyProjectiles = aliveProjectiles;
                
                let aliveAsteroids = [];
                for (let asteroid in this.asteroids) {
                    this.asteroids[asteroid].update(elapsedTime);
                    if (this.asteroids[asteroid].isAlive) {
                        aliveAsteroids.push(this.asteroids[asteroid]);
                    }
                }
                
                this.asteroids = aliveAsteroids;
                this.checkAsteroidCollisions();
                this.checkShipAndSaucerCollisions();
                
                if (this.asteroids.length == 0) {
                    for (let i = 0; i < this.asteroidCount + 1; ++i) {
                        let position = {x: this.spaceship.position.x - this.spaceship.size.width * 2, y: this.spaceship.position.y - this.spaceship.size.height * 2};
                        let size = {width: this.spaceship.size.width * 6, height: this.spaceship.size.height * 6};
                        let shipBoundingBox = {
                            position: position,
                            size: size,
                            isAlive: true,
                        }

                        let asteroid = null;
                        do {
                            asteroid = createRandomAsteroid();
                        }
                        while (GameObjects.doCollide(shipBoundingBox, asteroid));
                        this.asteroids.push(asteroid);
                    }
                }
            }
        }

        that.isPaused = function() {
            return paused;
        }
        
        that.pause = function() {
            paused = true;
        }
        
        that.resume = function() {
            paused = false;
        }
        
        that.render = function() {
            if (this.spaceship != null) {
                this.spaceship.render();
            }
            
            for (let projectile in this.projectiles) {
                this.projectiles[projectile].render();
            }
            
            for (let projectile in this.enemyProjectiles) {
                this.enemyProjectiles[projectile].render();
            }

            for (let asteroid in this.asteroids) {
                this.asteroids[asteroid].render();
            }
            
            if (this.lives <= 0) {
                let fontSize = 48;
                let text = "Game Over";
                let width = Graphics.getTextWidth(text, fontSize, gameFontStyle);
                let position = {x: BoundingBox.width / 2 - width / 2, y: BoundingBox.height / 3};
                Graphics.writeText(text, position, fontSize, gameFontStyle, '#FFFFFF');
            }
            
            if (this.saucer != null) {
                this.saucer.render();
            }
        }
        
        that.renderScore = function() {
            let text = `Score: ${this.score}`;
            let width = Graphics.getTextWidth(text, 24, gameFontStyle);
            Graphics.writeText(text, {x: BoundingBox.width - width, y: -20}, 24, gameFontStyle, '#FFFFFF');
        }
        
        that.fire = function() {
            if (!this.paused && this.spaceship != null) {
                this.spaceship.shouldFire = true;
            }
        }
        
        that.hyperjump = function() {
            if (!this.paused  && this.spaceship != null && this.spaceship.isAlive) {
                if (timeSinceHyperjump < hyperjumpFrequency) {
                    if (!Sounds.soundPlayer.errorSoundIsPlaying() && timeSinceHyperjump > 500) {
                        Sounds.soundPlayer.playErrorSound();
                    }
                }
                else {
                    timeSinceHyperjump = 0;
                    Sounds.soundPlayer.playHyperjumpSound();
                    this.performHyperjump();
                }
            }
        }
        
        that.thrustLeft = function() {
            if (!this.paused && this.spaceship != null) {
                this.spaceship.thrustLeft(elapsedTime);
            }
        }
        
        that.thrustRight = function() {
            if (!this.paused && this.spaceship != null) {
                this.spaceship.thrustRight(elapsedTime);
            }
        }
        
        that.burn = function(elapsedTime) {
            if (!this.paused && this.spaceship != null && this.spaceship.isAlive) {
                this.spaceship.burn();
                if (!Sounds.soundPlayer.burnSoundIsPlaying()) {
                    Sounds.soundPlayer.playBurnSound();
                }
            }
        }
        
        that.fireProjectile = function(position, direction) {
            let spec = {
                position: position,
                velocity: {speed: 7, angle: direction},
                size: {width: 5, height: 5},
                heading: 0,
                rotationSpeed: getRandomNumber(-0.1, 0.1),
                image: ImagePool.blueProjectileImage,
            };
            
            let projectile = GameObjects.CreateProjectile(spec);
            this.projectiles.push(projectile);
        }
        
        that.fireSaucerProjectile = function(position, direction) {
            let spec = {
                position: position,
                velocity: {speed: 7, angle: direction},
                size: {width: 5, height: 5},
                heading: 0,
                rotationSpeed: getRandomNumber(-0.1, 0.1),
                image: ImagePool.redProjectileImage,
            };
            
            Sounds.soundPlayer.playSaucerFireSound();
            let projectile = GameObjects.CreateProjectile(spec);
            this.enemyProjectiles.push(projectile);
        }
        
        that.checkAsteroidCollisions = function() {
            let newAsteroids = [];
            let shouldPlaySound = false;
            for (let asteroid in this.asteroids) {
                let currentAsteroid = this.asteroids[asteroid]
                // Check for collisions with projectiles
                for (let projectile in this.projectiles) {
                    if (GameObjects.doCollide(currentAsteroid, this.projectiles[projectile])) {
                        this.incrementScore(currentAsteroid.pointValue);
                        currentAsteroid.isAlive = false;
                        this.projectiles[projectile].isAlive = false;
                        splitAsteroid(currentAsteroid, newAsteroids);
                        shouldPlaySound = true;
                        if (currentAsteroid.size.width == asteroidStartSize) {
                            Explosions.CreateLargeAsteroidExplosion(this.projectiles[projectile].position);
                        }
                        else if (currentAsteroid.size.width == asteroidStartSize / 2) {
                            Explosions.CreateMediumAsteroidExplosion(currentAsteroid.position);
                        }
                        else {
                            Explosions.CreateSmallAsteroidExplosion(currentAsteroid.position);
                        }
                        
                        Explosions.CreateFlameExplosion(this.projectiles[projectile].position);
                    }
                }
                
                for (let projectile in this.enemyProjectiles) {
                    if (GameObjects.doCollide(currentAsteroid, this.enemyProjectiles[projectile])) {
                        this.incrementScore(currentAsteroid.pointValue);
                        currentAsteroid.isAlive = false;
                        this.enemyProjectiles[projectile].isAlive = false;
                        splitAsteroid(currentAsteroid, newAsteroids);
                        shouldPlaySound = true;
                        if (currentAsteroid.size.width == asteroidStartSize) {
                            Explosions.CreateLargeAsteroidExplosion(this.enemyProjectiles[projectile].position);
                        }
                        else if (currentAsteroid.size.width == asteroidStartSize / 2) {
                            Explosions.CreateMediumAsteroidExplosion(currentAsteroid.position);
                        }
                        else {
                            Explosions.CreateSmallAsteroidExplosion(currentAsteroid.position);
                        }
                    }
                }
                
                // Check for collisions with ships
                if (this.spaceship != null && this.spaceship.isAlive && GameObjects.doCollide(currentAsteroid, this.spaceship) && timeSinceSpaceShipDied > 5000) {
                    this.incrementScore(currentAsteroid.pointValue);
                    this.spaceship.isAlive = false;
                    timeSinceHyperjump = hyperjumpFrequency;
                    this.lives -= 1;
                    if (this.lives <= 0) {
                        this.isAlive = false;
                    }
                    
                    timeSinceSpaceShipDied = 0;
                    shouldPlaySound = true;
                    let position = {x: this.spaceship.position.x + this.spaceship.size.width / 2, y: this.spaceship.position.y + this.spaceship.size.height / 2};
                    Explosions.CreateShipExplosion(position);
                    this.spaceship.shouldBurn = false;
                    
                    currentAsteroid.isAlive = false;
                    splitAsteroid(currentAsteroid, newAsteroids);
                    if (currentAsteroid.size.width == asteroidStartSize) {
                        let averagePosition = {
                            x: (currentAsteroid.position.x + this.spaceship.position.x) / 2,
                            y: (currentAsteroid.position.y + this.spaceship.position.y) / 2,
                        }
                        
                        Explosions.CreateLargeAsteroidExplosion(averagePosition);
                    }
                    else if (currentAsteroid.size.width == asteroidStartSize / 2) {
                        Explosions.CreateMediumAsteroidExplosion(currentAsteroid.position);
                    }
                    else {
                        Explosions.CreateSmallAsteroidExplosion(currentAsteroid.position);
                    }
                    
                    Sounds.soundPlayer.stopBurnSound();
                }
                
                if (this.saucer != null && this.saucer.isAlive && this.saucer.timeAlive > 1000 && GameObjects.doCollide(currentAsteroid, this.saucer)) {
                    this.incrementScore(currentAsteroid.pointValue);
                    this.saucer.isAlive = false;
                    Explosions.CreateSaucerExplosion(this.saucer.position);
                    shouldPlaySound = true;
                    currentAsteroid.isAlive = false;
                    splitAsteroid(currentAsteroid, newAsteroids);
                    if (currentAsteroid.size.width == asteroidStartSize) {
                        let averagePosition = {
                            x: (currentAsteroid.position.x + this.spaceship.position.x) / 2,
                            y: (currentAsteroid.position.y + this.spaceship.position.y) / 2,
                        }
                        
                        Explosions.CreateLargeAsteroidExplosion(averagePosition);
                    }
                    else if (currentAsteroid.size.width == asteroidStartSize / 2) {
                        Explosions.CreateMediumAsteroidExplosion(currentAsteroid.position);
                    }
                    else {
                        Explosions.CreateSmallAsteroidExplosion(currentAsteroid.position);
                    }
                }
            }
            
            if (shouldPlaySound) {
                Sounds.soundPlayer.playAsteroidExplosionSound();
            }
            
            for (let asteroid in newAsteroids) {
                this.asteroids.push(newAsteroids[asteroid]);
            }
        }
        
        that.checkShipAndSaucerCollisions = function() {
            let shouldPlaySound = false;
            
            if (this.saucer != null && this.saucer.isAlive) {
                for (let projectile in this.projectiles) {
                    let currentProjectile = this.projectiles[projectile];
                    if (GameObjects.doCollide(this.saucer, currentProjectile)) {
                        this.incrementScore(this.saucer.pointValue);
                        this.saucer.isAlive = false;
                        currentProjectile.isAlive = false;
                        shouldPlaySound = true;
                        Explosions.CreateFlameExplosion(currentProjectile.position);
                        Explosions.CreateSaucerExplosion(this.saucer.position);
                    }
                }
            }
            
            if (this.spaceship != null && this.spaceship.isAlive && timeSinceSpaceShipDied > 5000) {
                for (let projectile in this.enemyProjectiles) {
                    let currentProjectile = this.enemyProjectiles[projectile];
                    if (GameObjects.doCollide(this.spaceship, currentProjectile)) {
                        this.spaceship.isAlive = false;
                        timeSinceHyperjump = hyperjumpFrequency;
                        currentProjectile.isAlive = false;
                        this.lives -= 1;
                        if (this.lives <= 0) {
                            this.isAlive = false;
                        }

                        timeSinceSpaceShipDied = 0;
                        shouldPlaySound = true;
                        let position = {x: this.spaceship.position.x + this.spaceship.size.width / 2, y: this.spaceship.position.y + this.spaceship.size.height / 2};
                        Explosions.CreateShipExplosion(position);
                        this.spaceship.shouldBurn = false;
                        Sounds.soundPlayer.stopBurnSound();
                    }
                }
            }
            
            if (this.spaceship != null && this.saucer != null && this.spaceship.isAlive && this.saucer.isAlive) {
                if (GameObjects.doCollide(this.spaceship, this.saucer)) {
                    this.incrementScore(this.saucer.pointValue);
                    this.saucer.isAlive = false;
                    this.spaceship.isAlive = false;
                    timeSinceHyperjump = hyperjumpFrequency;
                    timeSinceSpaceShipDied = 0;
                    shouldPlaySound = true;
                    let position = {x: this.spaceship.position.x + this.spaceship.size.width / 2, y: this.spaceship.position.y + this.spaceship.size.height / 2};
                    Explosions.CreateShipExplosion(position);
                    position = {x: this.saucer.position.x + this.saucer.size.width / 2, y: this.saucer.position.y + this.saucer.size.height / 2};
                    Explosions.CreateSaucerExplosion(position);
                    
                    this.lives -= 1;
                    if (this.lives <= 0) {
                        this.isAlive = false;
                    }
                    
                    this.spaceship.shouldBurn = false;
                    Sounds.soundPlayer.stopBurnSound();
                }
            }
            
            if (shouldPlaySound) {
                Sounds.soundPlayer.playAsteroidExplosionSound();
            }
        }
        
        let splitAsteroid = function(asteroid, newAsteroids) {
            if (asteroid.size.width >= asteroidStartSize / 2) {
                let asteroidCount = 3;
                let pointValue = 50;
                if (asteroid.size.width == asteroidStartSize / 2) {
                    asteroidCount = 4;
                    pointValue = 100;
                }
                
                for (let i = 0; i < asteroidCount; ++i) {
                    let newSize = asteroid.size.width / 2;
                    let maxSpeed = 1.8;
                    if (asteroid.size.width < asteroidStartSize / 2) {
                        maxSpeed = 2.2;
                    }

                    let spec = {
                        position: {x: asteroid.position.x, y: asteroid.position.y},
                        velocity: {speed: getRandomNumber(0.5, maxSpeed), angle: getRandomNumber(0, Math.PI * 2)},
                        size: {width: newSize, height: newSize},
                        heading: 0,
                        rotationSpeed: getRandomNumber(-0.05, 0.05),
                        pointValue: pointValue,
                    }

                    newAsteroids.push(GameObjects.CreateAsteroid(spec));
                }
            }
        }
        
        let getDistance = function(point1, point2) {
            let dx = point1.x - point2.x;
            let dy = point1.y - point2.y;
            return Math.sqrt(dx * dx + dy * dy);
        }
        
        that.positionIsSafe = function(position) {
            for (let asteroid in this.asteroids) {
                let currentAsteroid = this.asteroids[asteroid];
                let shipCenter = {x: this.spaceship.position.x + this.spaceship.size.width / 2, y: this.spaceship.position.y + this.spaceship.size.height};
                let asteroidCenter = {x: currentAsteroid.position.x + currentAsteroid.size.width / 2, y: currentAsteroid.position.y + currentAsteroid.size.height};
                let distance = getDistance(shipCenter, asteroidCenter);
                if (distance < Math.max(this.spaceship.size.width, this.spaceship.size.height) * 4 + Math.max(currentAsteroid.size.width, currentAsteroid.size.height) * 4) {
                    return false;
                }   
            }
            
            return true;
        }
        
        that.performHyperjump = function() {
            let shipCenter = {x: this.spaceship.position.x + this.spaceship.size.width / 2, y: this.spaceship.position.y + this.spaceship.size.height};
            let jumpPosition = null;
            
            do {
                jumpPosition = {x: getRandomNumber(BoundingBox.width / 10, BoundingBox.width - BoundingBox.width / 10), y: getRandomNumber(BoundingBox.height / 10, BoundingBox.height - BoundingBox.height / 10)};
            }
            while (getDistance(jumpPosition, shipCenter) < 200 || this.positionIsSafe(jumpPosition));
            
            Explosions.CreateJumpVortex(shipCenter);
            Explosions.CreateJumpVortex(jumpPosition);

            this.spaceship.position = {x: jumpPosition.x - this.spaceship.size.width / 2, y: jumpPosition.y - this.spaceship.size.height};
        }
        
        that.getHyperjumpCharge = function() {
            return Math.min(timeSinceHyperjump / hyperjumpFrequency, 1);
        }
        
        return that;
    }
    
    return CreatePlayableGame();
}());
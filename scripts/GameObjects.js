let GameObjects = (function() {
    
    let CreateSpaceObject = function(spec) {
        let that = {};
        
        that.pointValue = spec.pointValue;
        that.isAlive = true;
        that.position = spec.position;
        that.velocity = spec.velocity; // Should have a direction and a speed
        that.size = spec.size;
        that.heading = spec.heading; // The direction the object is pointing (not moving)
        that.type = spec.type;
        that.image = spec.image;
        
        that.rotationSpeed = spec.rotationSpeed;
        
        that.update = function(elapsedTime) {
            this.position.x += this.velocity.speed * Math.cos(this.velocity.angle);
            if (this.position.x < -30 && Math.cos(this.velocity.angle) < 0) {
                this.position.x = BoundingBox.width;
            }
            else if (this.position.x > BoundingBox.width && Math.cos(this.velocity.angle) > 0) {
                this.position.x = 0;
            }
            
            this.position.y += this.velocity.speed * Math.sin(this.velocity.angle);
            if (this.position.y < -30 && Math.sin(this.velocity.angle) < 0) {
                this.position.y = BoundingBox.height;
            }
            else if (this.position.y > BoundingBox.height && Math.sin(this.velocity.angle) > 0) {
                this.position.y = 0;
            }
            
            that.heading += that.rotationSpeed;
            
            this.customUpdate(elapsedTime);
        }
        
        that.render = function() {
            if (this.isAlive) {
                let spec = {
                    center: {x: this.position.x + this.size.width / 2, y: this.position.y + this.size.height / 2},
                    rotation: this.heading + Math.PI / 2,
                    size: this.size,
                    image: this.image,
                }

                Graphics.drawImage(spec);
            }
        }
        
        that.getType = function() {
            return this.type;
        }
        
        that.customUpdate = function(elapsedTime) {} // Override this
        
        return that;
    }
   
    let CreateShip = function(spec) {
        spec.type = 'ship';
        spec.rotationSpeed = 0;
        spec.pointValue = 0;
        spec.image = ImagePool.spaceshipImage;
        let that = CreateSpaceObject(spec);
        that.turningSpeed = 0.006;
        that.burnAcceleration = 0.125;
        that.shouldTurnLeft = false;
        that.shouldTurnRight = false;
        that.shouldBurn = false;
        that.shouldFire = false;
        that.timeSinceLastShot = 0;
        that.rateOfFire = 250;

        that.customUpdate = function(elapsedTime) {
            if (this.isAlive) {
                if (that.shouldTurnLeft) {
                    that.heading -= elapsedTime * this.turningSpeed;
                    that.shouldTurnLeft = false;
                }

                if (that.shouldTurnRight) {
                    that.heading += elapsedTime * this.turningSpeed;
                    that.shouldTurnRight = false;
                }

                if (that.shouldBurn) {
                    // Get x and y components of velocity vector
                    let vx = this.velocity.speed * Math.cos(this.velocity.angle);
                    let vy = this.velocity.speed * Math.sin(this.velocity.angle);

                    // Get x and y components of burn vector
                    let bx = this.burnAcceleration * Math.cos(this.heading);
                    let by = this.burnAcceleration * Math.sin(this.heading);

                    // Add the vectors to get the final components
                    let fx = bx + vx;
                    let fy = by + vy;

                    // ???
                    let fspeed = Math.sqrt(fx * fx + fy * fy);
                    let fangle = Math.atan(fy / fx);

                    if (fx < 0) {
                        fangle += Math.PI;
                    }

                    // Profit!
                    this.velocity = {
                        speed: fspeed,
                        angle: fangle,
                    }

                    // Add particles to the point sources ...
                    let position = {x: this.position.x + this.size.width / 2, y: this.position.y + this.size.height / 2};
                    Explosions.CreateEnginePlume(position, this.heading + Math.PI, Math.floor(elapsedTime / 5));

                    this.shouldBurn = false;
                }

                if (this.isAlive && this.shouldFire) {
                    if (this.timeSinceLastShot >= this.rateOfFire) {

                        Sounds.soundPlayer.playFireSound();
                        this.timeSinceLastShot = 0;
                        Game.fireProjectile({x: this.position.x + this.size.width / 2, y: this.position.y + this.size.height / 2}, this.heading);
                    }

                    this.shouldFire = false;
                }

                this.timeSinceLastShot += elapsedTime;
            }
        }
        
        that.thrustLeft = function() {
            if (this.isAlive) {
                this.shouldTurnLeft = true;
            }
            else {
                this.shouldTurnLeft = false;
            }
        }
        
        that.thrustRight = function() {
            if (this.isAlive) {
                this.shouldTurnRight = true;
            }
            else {
                this.shouldTurnRight = false;
            }
        }
        
        that.burn = function() {
            if (this.isAlive) {
                this.shouldBurn = true;
            }
            else {
                this.shouldBurn = false;
            }
        }
        
        return that;
    }
    
    let CreateAsteroid = function(spec) {
        spec.type = 'asteroid';
        spec.image = ImagePool.asteroidImage;
        let that = CreateSpaceObject(spec);
        
        return that;
    }
    
    let CreateProjectile = function(spec) {
        spec.type = 'projectile';
        let that = CreateSpaceObject(spec);
        that.lifeTime = 1200;
        
        that.customUpdate = function(elapsedTime) {
            if (this.lifeTime <= 0) {
                this.isAlive = false;
            }
            else {
                this.lifeTime -= elapsedTime;
            }
        }
        
        return that;
    }
    
    let CreateSmallSaucer = function(spec) {
        spec.type = 'smallSaucer';
        spec.pointValue = 1000;
        spec.image = ImagePool.saucerImage;
        let that = CreateSpaceObject(spec);
        that.burnAcceleration = 0.05;
        that.timeSinceLastShot = 0;
        that.rateOfFire = 900;
        that.maxVelocity = 4;
        that.minVelocity = 2;
        that.timeAlive = 0;
        
        that.customUpdate = function(elapsedTime) {
            if (this.isAlive) {
                this.timeAlive += elapsedTime;
                let closeAsteroids = [];
                let position = {x: this.position.x + this.size.width / 2, y: this.position.y + this.size.height / 2};
                for (let asteroid in Game.asteroids) {
                    let dx = position.x - Game.asteroids[asteroid].position.x;
                    let dy = position.y - Game.asteroids[asteroid].position.y;
                    let distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < Math.sqrt(BoundingBox.height * BoundingBox.height + BoundingBox.width * BoundingBox.width) / 4) {
                        closeAsteroids.push(Game.asteroids[asteroid]);
                    }
                }

                if (closeAsteroids.length > 0) {
                    for (let asteroid in closeAsteroids) {
                        // Get x and y components of velocity vector
                        let vx = this.velocity.speed * Math.cos(this.velocity.angle);
                        let vy = this.velocity.speed * Math.sin(this.velocity.angle);

                        // Get x and y components of burn vector
                        let dx = this.position.x - closeAsteroids[asteroid].position.x;
                        let dy = this.position.y - closeAsteroids[asteroid].position.y;
                        let heading = Math.atan(dy / dx);
                        if (dx < 0) {
                            heading += Math.PI;
                        }

                        let bx = this.burnAcceleration * Math.cos(heading);
                        let by = this.burnAcceleration * Math.sin(heading);

                        // Add the vectors to get the final components
                        let fx = bx + vx;
                        let fy = by + vy;

                        // ???
                        let fspeed = 2;//Math.sqrt(fx * fx + fy * fy);
                        let fangle = Math.atan(fy / fx);

                        if (fx < 0) {
                            fangle += Math.PI;
                        }

                        // Profit!
                        this.velocity = {
                            speed: fspeed,
                            angle: fangle,
                        }
                    }

                    if (this.velocity.speed > this.maxVelocity) {
                        this.velocity.speed = this.maxVelocity;
                    }
                }
                else if (this.velocity.speed > this.minVelocity) {
                    // Get x and y components of velocity vector
                    let vx = this.velocity.speed * Math.cos(this.velocity.angle);
                    let vy = this.velocity.speed * Math.sin(this.velocity.angle);

                    // Get x and y components of burn vector
                    let bx = this.burnAcceleration * Math.cos(this.velocity.angle * Math.PI);
                    let by = this.burnAcceleration * Math.sin(this.velocity.angle * Math.PI);

                    // Add the vectors to get the final components
                    let fx = bx + vx;
                    let fy = by + vy;

                    // ???
                    let fspeed = Math.sqrt(fx * fx + fy * fy);
                    let fangle = Math.atan(fy / fx);

                    if (fx < 0) {
                        fangle += Math.PI;
                    }

                    // Profit!
                    this.velocity = {
                        speed: fspeed,
                        angle: fangle,
                    }
                }

                Explosions.CreateSaucerTrail(position, this.velocity.angle + Math.PI, 1);

                if (this.timeSinceLastShot > this.rateOfFire) { 
                    let angle = getRandomNumber(0, Math.PI * 2);

                    if (Game.spaceship.isAlive) {
                        let dx = Game.spaceship.position.x - this.position.x;
                        let dy = Game.spaceship.position.y - this.position.y;

                        angle = Math.atan(dy / dx);
                        if (dx < 0) {
                            angle += Math.PI;
                        }
                    }
                    else if (Game.asteroids.length > 0) {
                        let minDistance = null;
                        let minAsteroid = null;
                        for (let asteroid in Game.asteroids) {
                            let dx = this.position.x - Game.asteroids[asteroid].position.x;
                            let dy = this.position.y - Game.asteroids[asteroid].position.y;
                            let distance = Math.sqrt(dx * dx + dy * dy);
                            if (minDistance == null) {
                                minDistance = distance;
                                minAsteroid = Game.asteroids[asteroid]; 
                            } else if (distance < minDistance) {
                                minDistance = distance;
                                minAsteroid = Game.asteroids[asteroid];
                            }
                        }
                        
                        
                        let dx = minAsteroid.position.x - this.position.x;
                        let dy = minAsteroid.position.y - this.position.y;
                        
                        angle = Math.atan(dy / dx);
                        if (dx < 0) {
                            angle += Math.PI;
                        }
                    }

                    this.timeSinceLastShot = 0;
                    Game.fireSaucerProjectile(position, angle);
                }
                else {
                    this.timeSinceLastShot += elapsedTime;
                }
                
                if (!Sounds.soundPlayer.saucerSoundIsPlaying()) {
                    Sounds.soundPlayer.playSaucerSound();
                }
            }
            else {
                if (Sounds.soundPlayer.saucerSoundIsPlaying()) {
                    Sounds.soundPlayer.stopSaucerSound();
                }
            }
        }
        
        return that;
    }
    
    let CreateLargeSaucer = function(spec) {
        spec.type = 'largeSaucer';
        spec.pointValue = 200;
        spec.image = ImagePool.saucerImage;
        let that = CreateSpaceObject(spec);
        that.burnAcceleration = 0.05;
        that.timeSinceLastShot = 0;
        that.rateOfFire = 2000;
        that.maxVelocity = 2;
        that.minVelocity = 0.5;
        that.timeAlive = 0;
        
        that.customUpdate = function(elapsedTime) {
            if (this.isAlive) {
                this.timeAlive += elapsedTime;
                let closeAsteroids = [];
                let position = {x: this.position.x + this.size.width / 2, y: this.position.y + this.size.height / 2};
                for (let asteroid in Game.asteroids) {
                    let dx = position.x - Game.asteroids[asteroid].position.x;
                    let dy = position.y - Game.asteroids[asteroid].position.y;
                    let distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < Math.sqrt(BoundingBox.height * BoundingBox.height + BoundingBox.width * BoundingBox.width) / 4) {
                        closeAsteroids.push(Game.asteroids[asteroid]);
                    }
                }

                if (closeAsteroids.length > 0) {
                    for (let asteroid in closeAsteroids) {
                        // Get x and y components of velocity vector
                        let vx = this.velocity.speed * Math.cos(this.velocity.angle);
                        let vy = this.velocity.speed * Math.sin(this.velocity.angle);

                        // Get x and y components of burn vector
                        let dx = this.position.x - closeAsteroids[asteroid].position.x;
                        let dy = this.position.y - closeAsteroids[asteroid].position.y;
                        let heading = Math.atan(dy / dx);
                        if (dx < 0) {
                            heading += Math.PI;
                        }

                        let bx = this.burnAcceleration * Math.cos(heading);
                        let by = this.burnAcceleration * Math.sin(heading);

                        // Add the vectors to get the final components
                        let fx = bx + vx;
                        let fy = by + vy;

                        // ???
                        let fspeed = 2;//Math.sqrt(fx * fx + fy * fy);
                        let fangle = Math.atan(fy / fx);

                        if (fx < 0) {
                            fangle += Math.PI;
                        }

                        // Profit!
                        this.velocity = {
                            speed: fspeed,
                            angle: fangle,
                        }
                    }

                    if (this.velocity.speed > this.maxVelocity) {
                        this.velocity.speed = this.maxVelocity;
                    }
                }
                else if (this.velocity.speed > this.minVelocity) {
                    // Get x and y components of velocity vector
                    let vx = this.velocity.speed * Math.cos(this.velocity.angle);
                    let vy = this.velocity.speed * Math.sin(this.velocity.angle);

                    // Get x and y components of burn vector
                    let bx = this.burnAcceleration * Math.cos(this.velocity.angle * Math.PI);
                    let by = this.burnAcceleration * Math.sin(this.velocity.angle * Math.PI);

                    // Add the vectors to get the final components
                    let fx = bx + vx;
                    let fy = by + vy;

                    // ???
                    let fspeed = Math.sqrt(fx * fx + fy * fy);
                    let fangle = Math.atan(fy / fx);

                    if (fx < 0) {
                        fangle += Math.PI;
                    }

                    // Profit!
                    this.velocity = {
                        speed: fspeed,
                        angle: fangle,
                    }
                }

                Explosions.CreateSaucerTrail(position, this.velocity.angle + Math.PI, 1);

                if (this.timeSinceLastShot > this.rateOfFire) {
                    this.timeSinceLastShot = 0;
                    Game.fireSaucerProjectile(position, getRandomNumber(0, Math.PI * 2));
                }
                else {
                    this.timeSinceLastShot += elapsedTime;
                }
                
                if (!Sounds.soundPlayer.saucerSoundIsPlaying()) {
                    Sounds.soundPlayer.playSaucerSound();
                }
            }
            else {
                if (Sounds.soundPlayer.saucerSoundIsPlaying()) {
                    Sounds.soundPlayer.stopSaucerSound();
                }
            }
        }
        
        return that;
    }
    
    let doCollide = function(spaceObjectOne, spaceObjectTwo) {
        if (!spaceObjectOne.isAlive || !spaceObjectOne.isAlive) {
            return false;
        }
        
        if (spaceObjectOne.position.x > spaceObjectTwo.position.x + spaceObjectTwo.size.width) {
            return false;
        }
        
        if (spaceObjectOne.position.x + spaceObjectOne.size.width < spaceObjectTwo.position.x) {
            return false;
        }
        
        if (spaceObjectOne.position.y > spaceObjectTwo.position.y + spaceObjectTwo.size.height) {
            return false;
        }
        
        if (spaceObjectOne.position.y + spaceObjectOne.size.height < spaceObjectTwo.position.y) {
            return false;
        }
        
        return true;
    }
    
    return {
        CreateShip: CreateShip,
        CreateAsteroid: CreateAsteroid,
        CreateProjectile: CreateProjectile,
        CreateSmallSaucer: CreateSmallSaucer,
        CreateLargeSaucer: CreateLargeSaucer,
        doCollide: doCollide,
    }
}())
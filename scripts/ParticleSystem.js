let ParticleSystem = (function() {
    
    let CreatePointSource = function(spec) {
        let that = {};
        
        that.particleSpec = spec.particleSpec;
        that.position = spec.position;
        that.particles = [];
        
        that.addParticles = function(particleCount) {
            this.particleSpec.position = this.position;
            for (let i = 0; i < particleCount; ++i) {
                that.particles.push(CreateParticle(this.particleSpec));
            }
        }
        
        that.update = function(elapsedTime) {
            let aliveParticles = [];
            for (let i = 0; i < this.particles.length; ++i) {
                this.particles[i].update(elapsedTime);
                if (this.particles[i].isAlive) {
                    aliveParticles.push(this.particles[i]);
                }
            }
            
            this.particles = aliveParticles;
        }
        
        that.render = function() {
            for (let particle in this.particles) {
                this.particles[particle].render();
            }
        }
        
        return that;
    }
    
    let CreateParticle = function(spec) {
        let that = {};
        // The position is the center of the particle
        that.position = {x: spec.position.x, y: spec.position.y};
        that.velocity = {speed: getRandomNumber(spec.minSpeed, spec.maxSpeed), angle: getRandomNumber(spec.minAngle, spec.maxAngle)};
        that.rotation = getRandomNumber(0, 2 * Math.PI);
        that.lifeTime = getRandomNumber(spec.minLifetime, spec.maxLifetime);
        that.rotationSpeed = getRandomNumber(spec.minRotationSpeed, spec.maxRotationSpeed);
        let dimension = getRandomNumber(spec.minSize, spec.maxSize);
        that.size = {width: dimension, height: dimension};
        that.isAlive = true;
        that.image = spec.image;
        
        that.update = function(elapsedTime) {
            if (this.lifeTime <= 0) {
                this.isAlive = false;
            }

            let vx = this.velocity.speed * Math.cos(this.velocity.angle);
            let vy = this.velocity.speed * Math.sin(this.velocity.angle);
            this.position.x += vx;
            if (this.position.x < 0 && Math.cos(this.velocity.angle) < 0) {
                this.position.x = BoundingBox.width;
            }
            else if (this.position.x > BoundingBox.width && Math.cos(this.velocity.angle) > 0) {
                this.position.x = 0;
            }
            
            this.position.y += vy;
            if (this.position.y < 0 && Math.sin(this.velocity.angle) < 0) {
                this.position.y = BoundingBox.height;
            }
            else if (this.position.y > BoundingBox.height && Math.sin(this.velocity.angle) > 0) {
                this.position.y = 0;
            }
            
            this.rotation += this.rotationSpeed;
            this.lifeTime -= elapsedTime;
        }
        
        that.render = function() {
            if (this.isAlive) {
                let graphicsSpec = {
                    center: {x: this.position.x, y: this.position.y},
                    rotation: this.rotation,
                    size: this.size,
                    image: this.image,
                }

                Graphics.drawImage(graphicsSpec);
            }
        }
        
        return that;
    }
    
    return {
        CreatePointSource: CreatePointSource,
        CreateParticle: CreateParticle,
    }
}());
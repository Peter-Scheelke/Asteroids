let Explosions = (function() {
    
    let particleSystems = [];
    
    let CreateEnginePlume = function(position, direction, particleCount) {
        let smokeSpec = {
            position: position,
            particleSpec: {
                position: position,
                minAngle: direction - Math.PI / 12,
                maxAngle: direction + Math.PI / 12,
                minSpeed: 2,
                maxSpeed: 8,
                minLifetime: 100,
                maxLifetime: 500,
                minRotationSpeed: -0.1,
                maxRotationSpeed: 0.1,
                minSize: 5,
                maxSize: 10,
                image: ImagePool.smokeImage,
            },
        };
        
        smokePointSource = ParticleSystem.CreatePointSource(smokeSpec);
        smokePointSource.addParticles(particleCount);
        
        let fireSpec = {
            position: position,
            particleSpec: {
                position: position,
                minAngle: direction - Math.PI / 12,
                maxAngle: direction + Math.PI / 12,
                minSpeed: 2,
                maxSpeed: 8,
                minLifetime: 100,
                maxLifetime: 500,
                minRotationSpeed: -0.1,
                maxRotationSpeed: 0.1,
                minSize: 5,
                maxSize: 10,
                image: ImagePool.fireImage,
            },
        };
        
        firePointSource = ParticleSystem.CreatePointSource(fireSpec);
        firePointSource.addParticles(particleCount);
        
        particleSystems.push(firePointSource);
        particleSystems.push(smokePointSource);
    }
       
    let CreateSaucerTrail  = function(position, direction, particleCount) {    
        let energySpec = {
            position: position,
            particleSpec: {
                position: position,
                minAngle: direction - Math.PI / 24,
                maxAngle: direction + Math.PI / 24,
                minSpeed: 2,
                maxSpeed: 4,
                minLifetime: 600,
                maxLifetime: 900,
                minRotationSpeed: -0.1,
                maxRotationSpeed: 0.1,
                minSize: 2,
                maxSize: 2,
                image: ImagePool.redProjectileImage,
            },
        }
        
        let energyPointSource = ParticleSystem.CreatePointSource(energySpec);
        energyPointSource.addParticles(particleCount);
        particleSystems.push(energyPointSource);
    }
    
    let CreateSmallAsteroidExplosion = function(position) {
        let rockSpec = {
            position: position,
            particleSpec: {
                position: position,
                minAngle: 0,
                maxAngle: 2 * Math.PI,
                minSpeed: 4,
                maxSpeed: 8,
                minLifetime: 100,
                maxLifetime: 600,
                minRotationSpeed: -0.1,
                maxRotationSpeed: 0.1,
                minSize: 3,
                maxSize: 8,
                image: ImagePool.asteroidImage,
            }
        }
        
        let rockParticleSystem = ParticleSystem.CreatePointSource(rockSpec);
        rockParticleSystem.addParticles(getRandomNumber(5, 10));
        particleSystems.push(rockParticleSystem);
    }
    
    let CreateMediumAsteroidExplosion = function(position) {
        let rockSpec = {
            position: position,
            particleSpec: {
                position: position,
                minAngle: 0,
                maxAngle: 2 * Math.PI,
                minSpeed: 2,
                maxSpeed: 6,
                minLifetime: 200,
                maxLifetime: 800,
                minRotationSpeed: -0.1,
                maxRotationSpeed: 0.1,
                minSize: 5,
                maxSize: 10,
                image: ImagePool.asteroidImage,
            }
        }
        
        let rockParticleSystem = ParticleSystem.CreatePointSource(rockSpec);
        rockParticleSystem.addParticles(getRandomNumber(10, 20));
        particleSystems.push(rockParticleSystem);
    }
    
    let CreateLargeAsteroidExplosion = function(position) {
        let rockSpec = {
            position: position,
            particleSpec: {
                position: position,
                minAngle: 0,
                maxAngle: 2 * Math.PI,
                minSpeed: 1,
                maxSpeed: 3,
                minLifetime: 300,
                maxLifetime: 900,
                minRotationSpeed: -0.1,
                maxRotationSpeed: 0.1,
                minSize: 8,
                maxSize: 13,
                image: ImagePool.asteroidImage,
            }
        }
        
        let rockParticleSystem = ParticleSystem.CreatePointSource(rockSpec);
        rockParticleSystem.addParticles(getRandomNumber(80, 100));
        particleSystems.push(rockParticleSystem);
    }
    
    let CreateFlameExplosion = function(position) {
        let flameSpec = {
            position: position,
            particleSpec: {
                position: position,
                minAngle: 0,
                maxAngle: 2 * Math.PI,
                minSpeed: 1,
                maxSpeed: 2,
                minLifetime: 100,
                maxLifetime: 500,
                minRotationSpeed: -0.1,
                maxRotationSpeed: 0.1,
                minSize: 5,
                maxSize: 10,
                image: ImagePool.fireImage,
            }
        }
        
        let smokeSpec = {
            position: position,
            particleSpec: {
                position: position,
                minAngle: 0,
                maxAngle: 2 * Math.PI,
                minSpeed: 2,
                maxSpeed: 1,
                minLifetime: 200,
                maxLifetime: 600,
                minRotationSpeed: -0.1,
                maxRotationSpeed: 0.1,
                minSize: 5,
                maxSize: 10,
                image: ImagePool.smokeImage,
            }
        }
        
        let flameParticleSystem = ParticleSystem.CreatePointSource(flameSpec);
        flameParticleSystem.addParticles(getRandomNumber(50, 80));
        particleSystems.push(flameParticleSystem);
        
        let smokeParticleSystem = ParticleSystem.CreatePointSource(smokeSpec);
        smokeParticleSystem.addParticles(getRandomNumber(50, 80));
        particleSystems.push(smokeParticleSystem);
    }
    
    let CreateSaucerExplosion = function(position) {
        let flameSpec = {
            position: position,
            particleSpec: {
                position: position,
                minAngle: 0,
                maxAngle: 2 * Math.PI,
                minSpeed: 1,
                maxSpeed: 2,
                minLifetime: 300,
                maxLifetime: 700,
                minRotationSpeed: -0.1,
                maxRotationSpeed: 0.1,
                minSize: 5,
                maxSize: 10,
                image: ImagePool.fireImage,
            }
        }
        
        let smokeSpec = {
            position: position,
            particleSpec: {
                position: position,
                minAngle: 0,
                maxAngle: 2 * Math.PI,
                minSpeed: 2,
                maxSpeed: 1,
                minLifetime: 400,
                maxLifetime: 900,
                minRotationSpeed: -0.1,
                maxRotationSpeed: 0.1,
                minSize: 5,
                maxSize: 10,
                image: ImagePool.smokeImage,
            }
        }
        
        let energySpec = {
            position: position,
            particleSpec: {
                position: position,
                minAngle: 0,
                maxAngle: 2 * Math.PI,
                minSpeed: 2,
                maxSpeed: 1,
                minLifetime: 500,
                maxLifetime: 1000,
                minRotationSpeed: -0.1,
                maxRotationSpeed: 0.1,
                minSize: 3,
                maxSize: 7,
                image: ImagePool.redProjectileImage,
            }
        }
        
        let flameParticleSystem = ParticleSystem.CreatePointSource(flameSpec);
        flameParticleSystem.addParticles(getRandomNumber(80, 100));
        particleSystems.push(flameParticleSystem);
        
        let smokeParticleSystem = ParticleSystem.CreatePointSource(smokeSpec);
        smokeParticleSystem.addParticles(getRandomNumber(80, 100));
        particleSystems.push(smokeParticleSystem);
        CreateFlameExplosion(position);


        let energyParticleSystem = ParticleSystem.CreatePointSource(energySpec);
        energyParticleSystem.addParticles(getRandomNumber(50, 70));
        particleSystems.push(energyParticleSystem);
    }
    
    let CreateShipExplosion = function(position) {
        let flameSpec = {
            position: position,
            particleSpec: {
                position: position,
                minAngle: 0,
                maxAngle: 2 * Math.PI,
                minSpeed: 1,
                maxSpeed: 2,
                minLifetime: 300,
                maxLifetime: 700,
                minRotationSpeed: -0.1,
                maxRotationSpeed: 0.1,
                minSize: 5,
                maxSize: 10,
                image: ImagePool.fireImage,
            }
        }
        
        let smokeSpec = {
            position: position,
            particleSpec: {
                position: position,
                minAngle: 0,
                maxAngle: 2 * Math.PI,
                minSpeed: 2,
                maxSpeed: 1,
                minLifetime: 400,
                maxLifetime: 900,
                minRotationSpeed: -0.1,
                maxRotationSpeed: 0.1,
                minSize: 5,
                maxSize: 10,
                image: ImagePool.smokeImage,
            }
        }
        
        let energySpec = {
            position: position,
            particleSpec: {
                position: position,
                minAngle: 0,
                maxAngle: 2 * Math.PI,
                minSpeed: 2,
                maxSpeed: 1,
                minLifetime: 500,
                maxLifetime: 1000,
                minRotationSpeed: -0.1,
                maxRotationSpeed: 0.1,
                minSize: 3,
                maxSize: 7,
                image: ImagePool.blueProjectileImage,
            }
        }
        
        let flameParticleSystem = ParticleSystem.CreatePointSource(flameSpec);
        flameParticleSystem.addParticles(getRandomNumber(80, 100));
        particleSystems.push(flameParticleSystem);
        
        let smokeParticleSystem = ParticleSystem.CreatePointSource(smokeSpec);
        smokeParticleSystem.addParticles(getRandomNumber(80, 100));
        particleSystems.push(smokeParticleSystem);
        CreateFlameExplosion(position);


        let energyParticleSystem = ParticleSystem.CreatePointSource(energySpec);
        energyParticleSystem.addParticles(getRandomNumber(50, 70));
        particleSystems.push(energyParticleSystem);
    }
    
    let CreateJumpVortex = function(position) {
        let spec = {
            position: position,
            particleSpec: {
                position: position,
                minAngle: 0,
                maxAngle: 2 * Math.PI,
                minSpeed: 0.5,
                maxSpeed: 1.5,
                minLifetime: 600,
                maxLifetime: 1300,
                minRotationSpeed: -0.1,
                maxRotationSpeed: 0.1,
                minSize: 5,
                maxSize: 10,
                image: ImagePool.blueProjectileImage,
            }
        }
        
        let vortex = ParticleSystem.CreatePointSource(spec);
        vortex.addParticles(100);
        particleSystems.push(vortex);
    }

    let update = function(elapsedTime) {
        if (!Game.isPaused()) {
            let aliveParticleSystems = [];
            for (let particleSystem in particleSystems) {
                let system = particleSystems[particleSystem];
                system.update(elapsedTime);
                if (system.particles.length > 0) {
                    aliveParticleSystems.push(system);
                }
            }
            
            particleSystems = aliveParticleSystems;
        }
    }
    
    let render = function() {
        for (let particleSystem in particleSystems) {
            let system = particleSystems[particleSystem];
            system.render();
        }
    }
    
    let clear = function() {
        particleSystems.length = 0;
    }
    
    return {
        CreateSmallAsteroidExplosion: CreateSmallAsteroidExplosion,
        CreateMediumAsteroidExplosion: CreateMediumAsteroidExplosion,
        CreateLargeAsteroidExplosion: CreateLargeAsteroidExplosion,
        CreateFlameExplosion: CreateFlameExplosion,
        CreateEnginePlume: CreateEnginePlume,
        CreateSaucerTrail: CreateSaucerTrail,
        CreateShipExplosion: CreateShipExplosion,
        CreateSaucerExplosion: CreateSaucerExplosion,
        CreateJumpVortex: CreateJumpVortex,
        update: update,
        render: render,
        clear: clear,
    }
}());
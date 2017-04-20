let Sounds = (function() {
    
    function loadSound(source) {
		let sound = new Audio();
		sound.src = source;
		return sound;
	}

    let musicPlayer = (function(){
        let trackCount = 0;
        let musicTracks = {};
    
        for (let i = 0; i < 3; ++i) {
            musicTracks[i] = loadSound(`resources/audio/music${i}.mp3`);
            ++trackCount;
        }
        
        let currentTrack = 1;
        
        let update = function(elapsedTime) {
            if (musicTracks.length == 0) {
                return;
            }
            
            if (musicTracks[currentTrack].paused) {
                ++currentTrack;
                if (currentTrack >= trackCount) {
                    currentTrack = 0;
                }
                
                musicTracks[currentTrack].play();
            }
            
            let volume = 0;
            if (!GameSettings.getMaxVolume() == 0) {
                volume = GameSettings.getMusicVolume() / GameSettings.getMaxVolume();
            }
            
            musicTracks[currentTrack].volume = volume;
        }

        return {
            update: update,
        }
    }());
    
    let soundPlayer = (function() {
        
        // Start Fire Sound
        let fireSound = loadSound(`resources/audio/fire.mp3`);
        let playFireSound = function() {
            playSound(fireSound);
        }
        
        let stopFireSound = function() {
            stopSound(fireSound);
        }
        
        let fireSoundIsPlaying = function() {
            return !fireSound.paused;
        }
        
        // End Fire Sound
        
        // Start Burn Sound
        let burnSound = loadSound(`resources/audio/burn.mp3`);
        let playBurnSound = function() {
            playSound(burnSound);
        }
        
        let stopBurnSound = function() {
            stopSound(burnSound);
        }
        
        let burnSoundIsPlaying = function() {
            return !burnSound.paused;
        }
        
        // End Burn Sound
        
        // Start Hyperjump Sound
        let hyperjumpSound = loadSound(`resources/audio/hyperjump.mp3`);
        let playHyperjumpSound = function() {
            playSound(hyperjumpSound);
        }
        
        let stopHyperjumpSound = function() {
            stopSound(hyperjumpSound);
        }
        
        let hyperjumpSoundIsPlaying = function() {
            return !hyperjumpSound.paused;
        }
         
        // End Hyperjump Sound
        
        // Start Saucer Fire Sound
        let saucerFireSound = loadSound(`resources/audio/saucerFire.mp3`);
        let playSaucerFireSound = function() {
            playSound(saucerFireSound);
        }
        
        let stopSaucerFireSound = function() {
            stopSound(saucerFireSound);
        }
        
        let saucerFireSoundIsPlaying = function() {
            return !burnSound.paused;
        }
        
        // End Saucer Fire Sound
        
        // Start Saucer Sound
        let saucerSound = loadSound(`resources/audio/saucer.mp3`);
        let playSaucerSound = function() {
            playSound(saucerSound);
        }
        
        let stopSaucerSound = function() {
            stopSound(saucerSound);
        }
        
        let saucerSoundIsPlaying = function() {
            return !saucerSound.paused;
        }
        
        // End Saucer Sound
        
        // Start Click Sound
        let clickSound = loadSound(`resources/audio/click.wav`);
        let playClickSound = function() {
            playSound(clickSound);
        }
        
        let stopClickSound = function() {
            stopSound(clickSound);
        }
        
        let clickSoundIsPlaying = function() {
            return !clickSound.paused;
        }
        
        // End Click Sound
        
        // Start Error Sound
        let errorSound = loadSound(`resources/audio/error.wav`);
        let playErrorSound = function() {
            playSound(errorSound);
        }
        
        let stopErrorSound = function() {
            stopSound(errorSound);
        }
        
        let errorSoundIsPlaying = function() {
            return !errorSound.paused;
        }        
        
        // End Error Sound
        
        // Start Asteroid Explosion Sound
        let asteroidExplosionSound = loadSound(`resources/audio/asteroidExplosion.mp3`);
        let playAsteroidExplosionSound = function() {
            playSound(asteroidExplosionSound);
        }
        
        let stopAsteroidExplosionSound = function() {
            stopSound(asteroidExplosionSound);
        }
        
        let asteroidExplosionSoundIsPlaying = function() {
            return !asteroidExplosionSound.paused;
        } 
        
        // End Asteroid Explosion Sound
        
        let playSound = function(sound) {
            let volume = 0;
            if (!GameSettings.getMaxVolume() == 0) {
                volume = GameSettings.getSoundVolume() / GameSettings.getMaxVolume();
            }
            
            sound.pause();
            sound.currentTime = 0;
            sound.volume = volume;
            sound.play();
        }
        
        let stopSound = function(sound) {
            sound.pause();
            sound.currentTime = 0;
        }

        return {
            playFireSound: playFireSound,
            stopFireSound: stopFireSound,
            fireSoundIsPlaying: fireSoundIsPlaying,
            
            playBurnSound: playBurnSound,
            stopBurnSound: stopBurnSound,
            burnSoundIsPlaying: burnSoundIsPlaying,
            
            playHyperjumpSound: playHyperjumpSound,
            stopHyperjumpSound: stopHyperjumpSound,
            hyperjumpSoundIsPlaying: fireSoundIsPlaying,
            
            playSaucerFireSound: playSaucerFireSound,
            stopSaucerFireSound: stopSaucerFireSound,
            saucerSoundIsPlaying: saucerSoundIsPlaying,
            
            playSaucerSound: playSaucerSound,
            stopSaucerSound: stopSaucerSound,
            saucerSoundIsPlaying: saucerSoundIsPlaying,
            
            playClickSound: playClickSound,
            stopClickSound: stopClickSound,
            clickSoundIsPlaying: clickSoundIsPlaying,
            
            playErrorSound: playErrorSound,
            stopErrorSound: stopErrorSound,
            errorSoundIsPlaying: errorSoundIsPlaying,
            
            asteroidExplosionSound: asteroidExplosionSound,
            playAsteroidExplosionSound: playAsteroidExplosionSound,
            asteroidExplosionSoundIsPlaying: asteroidExplosionSoundIsPlaying,
        }
    }());
    
    return {
        musicPlayer: musicPlayer,
        soundPlayer: soundPlayer,
    }
}());
let GameSettings = (function() {
    
    // Start Sound Settings
    let volume = localStorage.getItem('Asteroids.volume');
    if (volume !== null) {
        volume = JSON.parse(volume);
    }
    else {
        volume = {
            musicVolume: 30,
            soundVolume: 60,
        }
    }

    let increment = 5;
    let min = 0;
    let max = 100;
    
    let increaseMusicVolume = function() {
        volume.musicVolume += increment;
        if (volume.musicVolume > max) {
            volume.musicVolume = max;
        }
        
        saveSettings();
    }
    
    let decreaseMusicVolume = function() {
        volume.musicVolume -= increment;
        if (volume.musicVolume < min) {
            volume.musicVolume = min;
        }
        
        saveSettings();
    }
    
    let increaseSoundVolume = function() {
        volume.soundVolume += increment;
        if (volume.soundVolume > max) {
            volume.soundVolume = max;
        }
        
        saveSettings();
    }
    
    let decreaseSoundVolume = function() {
        volume.soundVolume -= increment;
        if (volume.soundVolume < min) {
            volume.soundVolume = min;
        }
        
        saveSettings();
    }
    
    let getMusicVolume = function() {
        return volume.musicVolume;
    }
    
    let getSoundVolume = function() {
        return volume.soundVolume;
    }
    
    let getMaxVolume = function() {
        return max;
    }
    
    let getMinVolume = function() {
        return min;
    }
    
    // End Sound Settings
    
    // Start Control Settings
    
    // This should not change
    let commandToFunctionMap = {
        'burn': function() {Game.burn();},
        'thrust left': function() {Game.thrustLeft();},
        'thrust right': function() {Game.thrustRight();},
        'fire': function() {Game.fire();},
        'hyperjump': function() {Game.hyperjump();},
        'pause': function() {
            Game.pause();
            GameMenu.resume();
        },
    }
    
    let commandToKeyCodeMap = localStorage.getItem('Asteroids.commandToKeyCodeMap');
    if (commandToKeyCodeMap !== null) {
        commandToKeyCodeMap = JSON.parse(commandToKeyCodeMap);
    }
    else {
        commandToKeyCodeMap = {
            'burn': 'DOM_VK_UP',
            'thrust left': 'DOM_VK_LEFT',
            'thrust right': 'DOM_VK_RIGHT',
            'fire': 'DOM_VK_SPACE',
            'hyperjump': 'DOM_VK_CONTROL',
            'pause': 'DOM_VK_ESCAPE',
        }
    }
    
    let keyCodeToCommandMap = localStorage.getItem('Asteroids.keyCodeToCommandMap');
    if (keyCodeToCommandMap !== null) {
        keyCodeToCommandMap = JSON.parse(keyCodeToCommandMap);
    }
    else {
        keyCodeToCommandMap = {
            DOM_VK_UP: 'burn',
            DOM_VK_LEFT: 'thrust left',
            DOM_VK_RIGHT: 'thrust right',
            DOM_VK_SPACE: 'fire',
            DOM_VK_CONTROL: 'hyperjump',
            DOM_VK_ESCAPE: 'pause',
        }
    }
    
    let setBurnKey = function(newKeyCode) {
        if (Keyboard.codeToNumericMap.hasOwnProperty(newKeyCode)) {
            if (!keyCodeToCommandMap.hasOwnProperty(newKeyCode)) {
                delete keyCodeToCommandMap[commandToKeyCodeMap['burn']];
                keyCodeToCommandMap[newKeyCode] = 'burn';
                commandToKeyCodeMap['burn'] = newKeyCode;
            }
            else {
                Sounds.soundPlayer.playErrorSound();
            }
        }
        
        saveSettings();
    }
    
    let setLeftThrustKey = function(newKeyCode) {
        if (Keyboard.codeToNumericMap.hasOwnProperty(newKeyCode)) {
            if (!keyCodeToCommandMap.hasOwnProperty(newKeyCode)) {
                delete keyCodeToCommandMap[commandToKeyCodeMap['thrust left']];
                keyCodeToCommandMap[newKeyCode] = 'thrust left';
                commandToKeyCodeMap['thrust left'] = newKeyCode;
            }
            else {
                Sounds.soundPlayer.playErrorSound();
            }
        }
        
        saveSettings();
    }
    
    let setRightThrustKey = function(newKeyCode) {
        if (Keyboard.codeToNumericMap.hasOwnProperty(newKeyCode)) {
            if (!keyCodeToCommandMap.hasOwnProperty(newKeyCode)) {
                delete keyCodeToCommandMap[commandToKeyCodeMap['thrust right']];
                keyCodeToCommandMap[newKeyCode] = 'thrust right';
                commandToKeyCodeMap['thrust right'] = newKeyCode;
            }
            else {
                Sounds.soundPlayer.playErrorSound();
            }
        }
        
        saveSettings();
    }
    
    let setFireKey = function(newKeyCode) {
        if (Keyboard.codeToNumericMap.hasOwnProperty(newKeyCode)) {
            if (!keyCodeToCommandMap.hasOwnProperty(newKeyCode)) {
                delete keyCodeToCommandMap[commandToKeyCodeMap['fire']];
                keyCodeToCommandMap[newKeyCode] = 'fire';
                commandToKeyCodeMap['fire'] = newKeyCode;
            }
            else {
                Sounds.soundPlayer.playErrorSound();
            }
        }
        
        saveSettings();
    }
    
    let setHyperjumpKey = function(newKeyCode) {
        if (Keyboard.codeToNumericMap.hasOwnProperty(newKeyCode)) {
            if (!keyCodeToCommandMap.hasOwnProperty(newKeyCode)) {
                delete keyCodeToCommandMap[commandToKeyCodeMap['hyperjump']];
                keyCodeToCommandMap[newKeyCode] = 'hyperjump';
                commandToKeyCodeMap['hyperjump'] = newKeyCode;
            }
            else {
                Sounds.soundPlayer.playErrorSound();
            }
        }
        
        saveSettings();
    }
    
    let setPauseKey = function(newKeyCode) {
        if (Keyboard.codeToNumericMap.hasOwnProperty(newKeyCode)) {
            if (!keyCodeToCommandMap.hasOwnProperty(newKeyCode)) {
                delete keyCodeToCommandMap[commandToKeyCodeMap['pause']];
                keyCodeToCommandMap[newKeyCode] = 'pause';
                commandToKeyCodeMap['pause'] = newKeyCode;
            } 
            else {
                Sounds.soundPlayer.playErrorSound();
            }
        }
        
        
        saveSettings();
    }
    
    let getBurnKey = function() {
        return commandToKeyCodeMap['burn'];
    }
    
    let getLeftThrustKey = function() {
        return commandToKeyCodeMap['thrust left'];
    }
    
    let getRightThrustKey = function() {
        return commandToKeyCodeMap['thrust right'];
    }
    
    let getFireKey = function() {
        return commandToKeyCodeMap['fire'];
    }
    
    let getHyperjumpKey = function() {
        return commandToKeyCodeMap['hyperjump'];
    }
    
    let getPauseKey = function() {
        return commandToKeyCodeMap['pause'];
    }
    
    let performAction = function(keyCode) {
        if (keyCodeToCommandMap.hasOwnProperty(keyCode)) {
            command = keyCodeToCommandMap[keyCode];
            commandToFunctionMap[command]();
        }
    }
    
    let saveSettings = function() {
        localStorage['Asteroids.volume'] = JSON.stringify(volume);
        localStorage['Asteroids.keyCodeToCommandMap'] = JSON.stringify(keyCodeToCommandMap);
        localStorage['Asteroids.commandTokeyCodeMap'] = JSON.stringify(commandToKeyCodeMap);
    }
	
	let getKeyCodeFromCommand = function(command) {
		return commandToKeyCodeMap[command];
	}
	
	let getCommandFromKeyCode = function(keyCode) {
		return keyCodeToCommandMap[command];
	}
    
    // End Control Settings 
    
    return {
        increaseMusicVolume: increaseMusicVolume,
        decreaseMusicVolume: decreaseMusicVolume,
        getMusicVolume: getMusicVolume,
        
        increaseSoundVolume: increaseSoundVolume,
        decreaseSoundVolume: decreaseSoundVolume,
        getSoundVolume: getSoundVolume,
        
        getMaxVolume: getMaxVolume,
        getMinVolume: getMinVolume,
        
        setBurnKey: setBurnKey,
        setLeftThrustKey: setLeftThrustKey,
        setRightThrustKey: setRightThrustKey,
        setFireKey: setFireKey,
        setHyperjumpKey: setHyperjumpKey,
        setPauseKey: setPauseKey,
        
        getBurnKey: getBurnKey,
        getLeftThrustKey: getLeftThrustKey,
        getRightThrustKey: getRightThrustKey,
        getFireKey: getFireKey,
        getHyperjumpKey: getHyperjumpKey,
        getPauseKey: getPauseKey,
        
        performAction: performAction,
		
		getKeyCodeFromCommand: getKeyCodeFromCommand,
		keyCodeToCommandMap: keyCodeToCommandMap,
    }
}());
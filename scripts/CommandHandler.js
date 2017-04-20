let CommandHandler = (function() {
    
    let handleKeyPress = function(keyNumber) {
        let code = Keyboard.numericToCodeMap[keyNumber];
        if (!GameMenu.isPaused()) {
            GameMenu.keyEventHandler(code);
        }
        
        if (!Game.isPaused()) {
            GameSettings.performAction(code);
        }
    }

    return {
        handleKeyPress: handleKeyPress,
    }
}());
let GameMenu = (function() {
    
    let paused = false;
    let lastInputTime = performance.now();
    
    // This prevents the menu from jumping too far on one user input
    let inputFrequency = 200;
    
    let pause = function() {
        paused = true;
    }
    
    let resume = function() {
        paused = false;
    }
    
    let isPaused = function() {
        return paused;
    }
    
    let menuStack = [SpecificMenus.CreateMainMenu()];

    let update = function(elapsedTime) {
        // For asteroids in the background or whatever
    }
    
    let keyEventHandler = function(keyCode) {
        if (performance.now() - lastInputTime < inputFrequency) {
            return;
        }
        
        lastInputTime = performance.now();
        
        if (menuStack.length > 0) {
            menuStack[menuStack.length - 1].keyEventHandler(keyCode);
        }
    }
    
    let render = function() {
        if (menuStack.length > 0) {
            menuStack[menuStack.length - 1].render();
        }
    }
    
    let goToMenu = function(menu) {
        if (menuStack.length > 0) {
            menuStack.push(menu);
        }
    }
    
    let returnFromMenu = function() {
        if (menuStack.length > 1) {
            menuStack.pop();
        }
    }
    
    return {
        update: update,
        render: render,
        goToMenu: goToMenu,
        returnFromMenu: returnFromMenu,
        isPaused: isPaused,
        pause: pause,
        resume: resume,
        keyEventHandler: keyEventHandler,
    }
}());
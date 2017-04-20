let GameLoop = (function() { 
    
    let previousTime = null;

    let backgroundImageSpec = {
        center: {x: 480, y: 270},
        rotation: 0,
        size: {width: 960, height: 540},
        image: ImagePool.backgroundImage,
    };
    
    let startLoop = function() {
        Game.pause();
        GameMenu.resume();
        previousTime = performance.now();
        requestAnimationFrame(gameLoop);
    }
    
    let gameLoop = function(timestamp)  {
        elapsedTime = Math.abs(timestamp - previousTime);
        handleInput(elapsedTime);
        update(elapsedTime);
        render();
        previousTime = timestamp;
        requestAnimationFrame(gameLoop);
    }
    
    let update = function(elapsedTime) {
        GameMenu.update(elapsedTime);
        Game.update(elapsedTime);
        Explosions.update(elapsedTime);
        Sounds.musicPlayer.update(elapsedTime);
        MenuAsteroids.update(elapsedTime);
    }
    
    let render = function() {
        Graphics.context.clear();
        
        Graphics.drawImage(backgroundImageSpec);
        
        if (!Game.isPaused()) {
            Game.render();
            Explosions.render();
            clearBorders();
            Game.renderScore();
                
            let livesWidth = 0;
            for (let i = 0; i < Game.lives; ++i) {
                
                let spec = {
                    center: {x: 10 * i + i * 20, y: -40},
                    rotation: 0,
                    size: {width: 20, height: 30},
                    image: ImagePool.spaceshipImage,
                }
                
                Graphics.drawImage(spec);
                
                livesWidth += spec.size.width + 20;
                if (livesWidth > BoundingBox.width / 4 * 3) {
                    let position = {x: spec.center.x + 20, y: spec.center.y + 10};
                    Graphics.writeText('. . .', position, 24, gameFontStyle, '#FFFFFF');
                    break;
                }
            }
            
            renderHyperjumpBar();
        }
        else if (!GameMenu.isPaused()) {
            MenuAsteroids.render();
            GameMenu.render();
            clearBorders();
        }
        else {
            console.log("Game and menu are both paused.");
        }
    }
    
    let handleInput = function(elapsedTime) {
        for (let key in Keyboard.pressedKeys) {
            CommandHandler.handleKeyPress(key);
        }
    }
    
    let clearBorders = function() {
        let position = {x: -1 * renderOffset.x, y: -1 * renderOffset.y};
        let size = {width: renderOffset.x * 2 + BoundingBox.width, height: renderOffset.y};
        Graphics.drawRectangle(position, size, '#000000');
        
        position = {x: -1 * renderOffset.x, y: BoundingBox.height};
        Graphics.drawRectangle(position, size, '#000000');
        
        size = {width: renderOffset.x, height: renderOffset.y * 2 + BoundingBox.height};
        position = {x: BoundingBox.width, y: -1 * renderOffset.y};
        Graphics.drawRectangle(position, size, '#000000');
        
        position = {x: -1 * renderOffset.x, y: -1 * renderOffset.y};
        Graphics.drawRectangle(position, size, '#000000');        
    }
    
    let renderHyperjumpBar = function() {
        let percentage = Game.getHyperjumpCharge();
        let position = {x: 0, y: -1 * BoundingBox.height / 100 - 5};
        let size = {width: BoundingBox.width / 15, height: BoundingBox.height / 100};
        Graphics.drawRectangle(position, size, '#8C8C8C');
        size.width *= percentage;
        Graphics.drawRectangle(position, size, '#FFFFFF');
    }
    
    return {
        startLoop : startLoop,
    }
}());

GameLoop.startLoop();
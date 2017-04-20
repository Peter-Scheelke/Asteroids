let SpecificMenus = (function() {
	let buttonSize = {width: 150, height: 25};
	let menuLocation = {x: BoundingBox.width / 2 - buttonSize.width / 2, y: 100};

    let CreateMainMenu = function() {
		let currentYCoordinate = 0;
        let spec = {
            position: menuLocation,
            size: {width: 50, height: 20},			
            menuItems: [
                {
                    action: function() {
                        let pauseMenu = CreatePauseMenu(menuToReturn);
                        GameMenu.goToMenu(pauseMenu);
                        // Score, lives, whether the game is alive, starting asteroid count
                        Game.initialize(0, 3, true, 4);
                        Game.resume();
                        GameMenu.pause();
                    },
                    
                    image: ImagePool.newGameButtonImage,
                    position: {x: 0, y: 0},
                    size: buttonSize,
                },

                {
                    action: function() {
                        let controlsMenu = CreateControlsMenu(menuToReturn);
                        GameMenu.goToMenu(controlsMenu);
                    },
                    
                    image: ImagePool.controlsButtonImage,
                    position: {x: 0, y: buttonSize.height * 1.5},
                    size: buttonSize,
                },

                {
                    action: function() {
                        let soundsMenu = CreateSoundsMenu(menuToReturn);
                        GameMenu.goToMenu(soundsMenu);
                    },
                    
                    image: ImagePool.soundsButtonImage,
                    position: {x: 0, y: buttonSize.height * 1.5 * 2},
                    size: buttonSize,
                },

                {
                    action: function() {
                        let highScoresMenu = CreateHighScoresMenu(menuToReturn);
                        getHighScores();
                        GameMenu.goToMenu(highScoresMenu);
                    },
                    
                    image: ImagePool.highScoresButtonImage,
                    position: {x: 0, y: buttonSize.height * 1.5 * 3},
                    size: buttonSize,
                },

                {
                    action: function() {
                        let creditsMenu = CreateCreditsMenu(menuToReturn);
                        GameMenu.goToMenu(creditsMenu);
                    },
                    
                    image: ImagePool.creditsButtonImage,
                    position: {x: 0, y: buttonSize.height * 1.5 * 4},
                    size: buttonSize,
                },
            ],
            
            render: function() {
                let spec = {
                    center: {x: BoundingBox.width / 2, y: menuLocation.y - buttonSize.height * 2},
                    rotation: 0,
                    size: {width: (buttonSize.width * 4 / 6) * 3, height: (buttonSize.height) * 3},
                    image: ImagePool.menuImage,
                }

                Graphics.drawImage(spec);
                
                for (item in this.menuItems) {
                    this.menuItems[item].render();
                }
            }
        }
        
        var menuToReturn = Menu.CreateMenu(spec);
        menuToReturn.keyEventHandler = function(keyCode) {
            if (keyCode == 'DOM_VK_UP') {
                Sounds.soundPlayer.playClickSound();
                this.moveUp();
            }
            else if (keyCode == 'DOM_VK_DOWN') {
                Sounds.soundPlayer.playClickSound();
                this.moveDown();
            }
            else if (keyCode == 'DOM_VK_RETURN') {
                Sounds.soundPlayer.playClickSound();
                this.click();
            }
        }
        
        return menuToReturn;
    }

    let CreateSoundsMenu = function() {
        let spec = {
            position: {x: menuLocation.x - buttonSize.width * 1 / 6, y: menuLocation.y},
            size: {width: 50, height: 20},
            menuItems: [
                
                // Music adjustment
                {
                    action: function() {
                        GameSettings.decreaseMusicVolume();
                    },
                    
                    image: ImagePool.minusButtonImage,
                    position: {x: 0, y: 0},
                    size: {width: buttonSize.height, height: buttonSize.height},
                },
                
                {
                    action: function() {
                        GameSettings.increaseMusicVolume();
                    },
                    
                    image: ImagePool.plusButtonImage,
                    position: {x: buttonSize.width + buttonSize.height, y: 0},
                    size: {width: buttonSize.height, height: buttonSize.height},
                },
                
                // Sound adjustment
                {
                    action: function() {
                        GameSettings.decreaseSoundVolume();
                    },
                    
                    image: ImagePool.minusButtonImage,
                    position: {x: 0, y: buttonSize.height * 1.5},
                    size: {width: buttonSize.height, height: buttonSize.height},
                },
                
                {
                    action: function() {
                        GameSettings.increaseSoundVolume();
                    },
                    
                    image: ImagePool.plusButtonImage,
                    position: {x: buttonSize.width + buttonSize.height, y: 0, y: buttonSize.height * 1.5},
                    size: {width: buttonSize.height, height: buttonSize.height},
                },
                
                {
                    action: function() {
                        GameMenu.returnFromMenu();
                    },
                    
                    image: ImagePool.backButtonImage,
                    position: {x: buttonSize.height, y: buttonSize.height * 1.8 * 2},
                    size: buttonSize,
                },
            ],
            
            render: function() {
                let spec = {
                    center: {x: BoundingBox.width / 2, y: menuLocation.y - buttonSize.height * 2},
                    rotation: 0,
                    size: {width: (buttonSize.width * 4 / 6) * 3, height: (buttonSize.height) * 3},
                    image: ImagePool.soundsImage,
                }

                Graphics.drawImage(spec);
                
                for (item in this.menuItems) {
                    this.menuItems[item].render();
                }
				
				let position = {x: this.position.x + buttonSize.height, y: this.position.y};
				let size = {width: buttonSize.width * 4 / 6, height: buttonSize.height};
				spec = {
					center: {x: position.x + buttonSize.width / 2, y: position.y + buttonSize.height / 2},
					rotation: 0,
					size: size,
					image: ImagePool.musicVolumeImage,
				};
			
				Graphics.drawImage(spec);
				
				
				let text = `${GameSettings.getMusicVolume()}%`;
				position = {x: position.x + size.width - size.width * 3 / 16, y: position.y + size.height / 2 + size.height / 6}
				Graphics.writeText(text, position, 14, gameFontStyle, '#000000');
				
				position = {x: this.position.x + buttonSize.height, y: this.position.y + buttonSize.height * 1.5};
				
				spec = {
					center: {x: position.x + buttonSize.width / 2, y: position.y + buttonSize.height / 2},
					rotation: 0,
					size: size,
					image: ImagePool.soundVolumeImage,
				};
			
				Graphics.drawImage(spec);
			
				text = `${GameSettings.getSoundVolume()}%`;
				position = {x: position.x + size.width - size.width * 3 / 16, y: position.y + size.height / 2 + size.height / 6}
				Graphics.writeText(text, position, 14, gameFontStyle, '#000000');
            }
        }
        
        var menuToReturn = Menu.CreateMenu(spec);
        
        menuToReturn.keyEventHandler = function(keyCode) {
            if (keyCode == 'DOM_VK_UP') {
                Sounds.soundPlayer.playClickSound();
                this.moveUp();
                this.moveUp();
				
            }
            else if (keyCode == 'DOM_VK_DOWN') {
                Sounds.soundPlayer.playClickSound();
                this.moveDown();
                this.moveDown();
            }
            else if (keyCode == 'DOM_VK_LEFT') {
                Sounds.soundPlayer.playClickSound();
                this.moveUp();
            }
            else if (keyCode == 'DOM_VK_RIGHT') {
                Sounds.soundPlayer.playClickSound();
                this.moveDown();				
            }
            else if (keyCode == 'DOM_VK_RETURN') {
                Sounds.soundPlayer.playClickSound();
                this.click();
            }
            else if (keyCode == 'DOM_VK_ESCAPE') {
                Sounds.soundPlayer.playClickSound();
                GameMenu.returnFromMenu();				
            }
        }
        
        return menuToReturn;
    }

    let CreateControlsMenu = function() {
        let shouldDoAlternateInput = false;
        let keyCommandToChange = 'burn';
        
        let spec = {
            position: {x: menuLocation.x - buttonSize.width * 2 / 6 - 10, y: menuLocation.y},
            size: {width: 50, height: 20},
            menuItems: [
                {
                    action: function() {
                        shouldDoAlternateInput = true;
                        keyCommandToChange = 'burn';
                    },
                    
                    image: ImagePool.burnButtonImage,
                    position: {x: 0, y: 0},
                    size: buttonSize,
                },
                
                {
                    action: function() {
                        shouldDoAlternateInput = true;
                        keyCommandToChange = 'thrust left';
                    },
                    
                    image: ImagePool.leftButtonImage,
                    position: {x: 0, y: buttonSize.height * 1.5},
                    size: buttonSize,
                },
                
                {
                    action: function() {
                        shouldDoAlternateInput = true;
                        keyCommandToChange = 'thrust right';
                    },
                    
                    image: ImagePool.rightButtonImage,
                    position: {x: 0, y: buttonSize.height * 1.5 * 2},
                    size: buttonSize,
                },
                
                {
                    action: function() {
                        shouldDoAlternateInput = true;
                        keyCommandToChange = 'fire';
                    },
                    
                    image: ImagePool.fireButtonImage,
                    position: {x: 0, y: buttonSize.height * 1.5 * 3},
                    size: buttonSize,
                },
                
                {
                    action: function() {
                        shouldDoAlternateInput = true;
                        keyCommandToChange = 'hyperjump';
                    },
                    
                    image: ImagePool.hyperjumpButtonImage,
                    position: {x: 0, y: buttonSize.height * 1.5 * 4},
                    size: buttonSize,
                },
                
                {
                    action: function() {
                        shouldDoAlternateInput = true;
                        keyCommandToChange = 'pause';
                    },
                    
                    image: ImagePool.pauseButtonImage,
                    position: {x: 0, y: buttonSize.height * 1.5 * 5},
                    size: buttonSize,
                },
                
                {
                    action: function() {
                        GameMenu.returnFromMenu();
                    },
                    
                    image: ImagePool.backButtonImage,
                    position: {x: buttonSize.width / 3, y: buttonSize.height * 1.5 * 6 + buttonSize.height * 0.5},
                    size: buttonSize,
                },
            ],
            
            render: function() {
                let spec = {
                    center: {x: BoundingBox.width / 2, y: menuLocation.y - buttonSize.height * 2},
                    rotation: 0,
                    size: {width: (buttonSize.width * 4 / 6) * 3, height: (buttonSize.height) * 3},
                    image: ImagePool.controlsImage,
                }

                Graphics.drawImage(spec);
                
                for (item in this.menuItems) {
                    this.menuItems[item].render();
					
					if (this.menuItems[item].hasOwnProperty('command')) {
						let command = this.menuItems[item].command
						let spec = {
							center: {x: this.menuItems[item].position.x + this.menuItems[item].size.width / 2 + buttonSize.width * 1.1, y: this.menuItems[item].position.y + this.menuItems[item].size.height / 2},
							rotation: 0,
							size: {width: buttonSize.width * 4 / 6, height: buttonSize.height},
							image: ImagePool.emptyMediumButtonImage,
						};
						
						Graphics.drawImage(spec);
						
						if (!shouldDoAlternateInput || !this.menuItems[item].selected) {
							let mappedKey = Keyboard.codeToStringMap[GameSettings.getKeyCodeFromCommand(command)];
							let textWidth = Graphics.getTextWidth(mappedKey, 14, gameFontStyle);
							let position = {
								x: spec.center.x - textWidth / 2,
								y: spec.center.y + 6,
							}
							
							Graphics.writeText(mappedKey, position, 14, gameFontStyle, '#000000');
						}
					}
                }
            }
        }
        
        var menuToReturn = Menu.CreateMenu(spec);
		
		menuToReturn.menuItems[0].command = 'burn';
		menuToReturn.menuItems[1].command = 'thrust left';
		menuToReturn.menuItems[2].command = 'thrust right';
		menuToReturn.menuItems[3].command = 'fire';
		menuToReturn.menuItems[4].command = 'hyperjump';
		menuToReturn.menuItems[5].command = 'pause';
		
        menuToReturn.keyEventHandler = function(keyCode) {
            if (shouldDoAlternateInput) {
                shouldDoAlternateInput = false;
                switch (keyCommandToChange) {
                    case 'burn':
                        GameSettings.setBurnKey(keyCode);
                        break;
                    case 'thrust left':
                        GameSettings.setLeftThrustKey(keyCode);
                        break;
                    case 'thrust right':
                        GameSettings.setRightThrustKey(keyCode);
                        break;
                    case 'fire':
                        GameSettings.setFireKey(keyCode);
                        break;
                    case 'hyperjump':
                        GameSettings.setHyperjumpKey(keyCode);
                        break;
                    case 'pause':
                        GameSettings.setPauseKey(keyCode);
                        break;
                }
            }
            else {
                if (keyCode == 'DOM_VK_UP') {
                    Sounds.soundPlayer.playClickSound();
                    this.moveUp();					
                }
                else if (keyCode == 'DOM_VK_DOWN') {
                    Sounds.soundPlayer.playClickSound();
                    this.moveDown();
                }
                else if (keyCode == 'DOM_VK_RETURN') {
					Sounds.soundPlayer.playClickSound();
                    this.click();
                }
                else if (keyCode == 'DOM_VK_ESCAPE') {
                    Sounds.soundPlayer.playClickSound();
                    GameMenu.returnFromMenu();
                }
            }
        }
        
        return menuToReturn;
    }

    let CreateHighScoresMenu = function() {
        let spec = {
            position: menuLocation,
            size: {width: 50, height: 20},
            menuItems: [
                {
                    action: function() {
                        GameMenu.returnFromMenu();
                    },
                    
                    image: ImagePool.backButtonImage,
                    position: {x: 0, y: 0},
                    size: buttonSize,
                },
            ],
            
            render: function() { 
                let spec = {
                    center: {x: BoundingBox.width / 2, y: menuLocation.y - buttonSize.height * 2},
                    rotation: 0,
                    size: {width: (buttonSize.width * 4 / 6) * 3, height: (buttonSize.height) * 3},
                    image: ImagePool.highscoresImage,
                }
                
                Graphics.drawImage(spec);
                
                for (item in this.menuItems) {
                    this.menuItems[item].render();
                }
                
                for (let i = 0; i < highscores.length; ++i) {
                    let fontSize = 24;
                    let width = Graphics.getTextWidth(highscores[i], fontSize, gameFontStyle);
                    let position = {x: BoundingBox.width / 2 - width / 2, y: i * 30 + BoundingBox.height / 3};
                    Graphics.writeText(highscores[i], position, fontSize, gameFontStyle, '#FFFFFF');
                }
            }
        }
        
        var menuToReturn = Menu.CreateMenu(spec);
        menuToReturn.keyEventHandler = function(keyCode) {
            if (keyCode == 'DOM_VK_UP') {
                Sounds.soundPlayer.playClickSound();
                this.moveUp();
            }
            else if (keyCode == 'DOM_VK_DOWN') {
                Sounds.soundPlayer.playClickSound();
                this.moveDown();
            }
            else if (keyCode == 'DOM_VK_RETURN') {
                Sounds.soundPlayer.playClickSound();
                this.click();
            }
            else if (keyCode == 'DOM_VK_ESCAPE') {
                Sounds.soundPlayer.playClickSound();
                GameMenu.returnFromMenu();
            }
        }
        
        return menuToReturn;
    }

    let CreateCreditsMenu = function() {
        let spec = {
            position: menuLocation,
            size: {width: 50, height: 20},
            menuItems: [
                {
                    action: function() {
                        GameMenu.returnFromMenu();
                    },
                    
                    image: ImagePool.backButtonImage,
                    position: {x: 0, y: 0},
                    size: buttonSize,
                },
            ],
            
            render: function() {
                let spec = {
                    center: {x: BoundingBox.width / 2, y: menuLocation.y - buttonSize.height * 2},
                    rotation: 0,
                    size: {width: (buttonSize.width * 4 / 6) * 3, height: (buttonSize.height) * 3},
                    image: ImagePool.creditsImage,
                }
                
                Graphics.drawImage(spec);
                
                for (item in this.menuItems) {
                    this.menuItems[item].render();
                }
                
                spec = {
                    center: {x: BoundingBox.width / 2, y: BoundingBox.height / 2 + 80},
                    rotation: 0,
                    size: {width: BoundingBox.width / 1.4, height: BoundingBox.height / 1.4},
                    image: ImagePool.creditsListImage,
                }
                
                Graphics.drawImage(spec);
            }
        }
        
        var menuToReturn = Menu.CreateMenu(spec);
        menuToReturn.keyEventHandler = function(keyCode) {
            if (keyCode == 'DOM_VK_UP') {
                Sounds.soundPlayer.playClickSound();
                this.moveUp();
            }
            else if (keyCode == 'DOM_VK_DOWN') {
                Sounds.soundPlayer.playClickSound();
                this.moveDown();
            }
            else if (keyCode == 'DOM_VK_RETURN') {
                Sounds.soundPlayer.playClickSound();
                this.click();
            }
            else if (keyCode == 'DOM_VK_ESCAPE') {
                Sounds.soundPlayer.playClickSound();
                GameMenu.returnFromMenu();
            }
        }
        
        return menuToReturn;
    }

    let CreatePauseMenu = function() {
        let spec = {
            position: menuLocation,
            size: {width: 50, height: 20},
            menuItems: [
                {
                    action: function() {
                        Game.resume();
                        GameMenu.pause();
                    },
                    
                    image: ImagePool.resumeButtonImage,
                    position: {x: 0, y: 0},
                    size: buttonSize,
                },
                
                {
                    action: function() {
                        let controlsMenu = CreateControlsMenu(this);
                        GameMenu.goToMenu(controlsMenu);
                    },
                    
                    image: ImagePool.controlsButtonImage,
					position: {x: 0, y: buttonSize.height * 1.5},
                    size: buttonSize,
                },
                
                {
                    action: function() {
                        let soundsMenu = CreateSoundsMenu(this);
                        GameMenu.goToMenu(soundsMenu);
                    },
                    
                    image: ImagePool.soundsButtonImage,
                    position: {x: 0, y: buttonSize.height * 1.5 * 2},
                    size: buttonSize,
                },
                
                {
                    action: function() {
                        GameMenu.returnFromMenu();
                        if (!Game.hasStoredScore) {
                            Game.hasStoredScore = true;
                            storeScore(Game.score);
                        }
                    },
                    
                    image: ImagePool.quitButtonImage,
                    position: {x: 0, y: buttonSize.height * 1.5 * 3},
                    size: buttonSize,
                },
            ],
            
            render: function() {
                let spec = {
                    center: {x: BoundingBox.width / 2, y: menuLocation.y - buttonSize.height * 2},
                    rotation: 0,
                    size: {width: (buttonSize.width * 4 / 6) * 3, height: (buttonSize.height) * 3},
                    image: ImagePool.pausedImage,
                }

                Graphics.drawImage(spec);
                
                for (item in this.menuItems) {
                    this.menuItems[item].render();
                }
            }
        }
        
        var menuToReturn = Menu.CreateMenu(spec);
        menuToReturn.keyEventHandler = function(keyCode) {
            if (keyCode == 'DOM_VK_UP') {
                Sounds.soundPlayer.playClickSound();
                this.moveUp();
            }
            else if (keyCode == 'DOM_VK_DOWN') {
                Sounds.soundPlayer.playClickSound();
                this.moveDown();
            }
            else if (keyCode == 'DOM_VK_RETURN') {
                Sounds.soundPlayer.playClickSound();
                this.click();
            }
        }
        
        return menuToReturn;
    }
    
    return {
        CreateMainMenu: CreateMainMenu,
        CreateSoundsMenu: CreateSoundsMenu,
        CreateControlsMenu: CreateControlsMenu,
        CreateHighScoresMenu: CreateHighScoresMenu,
        CreatePauseMenu: CreatePauseMenu,
    }
}());
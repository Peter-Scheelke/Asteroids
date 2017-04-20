let ImagePool = (function() {
   
    let backgroundImage = new Image();
    backgroundImage.src = 'resources/images/background.png';
    
    let asteroidImage = new Image();
    asteroidImage.src = 'resources/images/asteroid.png';
    
    let spaceshipImage = new Image();
    spaceshipImage.src = 'resources/images/spaceship.png';
    
    let fireImage = new Image();
    fireImage.src = 'resources/images/fire.png';
    
    let smokeImage = new Image();
    smokeImage.src = 'resources/images/smoke.png';
    
    let blueProjectileImage = new Image();
    blueProjectileImage.src = 'resources/images/blueProjectile.png';
    
    let redProjectileImage = new Image();
    redProjectileImage.src = 'resources/images/redProjectile.png';
    
    let saucerImage = new Image();
    saucerImage.src = 'resources/images/saucer.png';
	
	// Buttons
	let backButtonImage = new Image();
	backButtonImage.src = 'resources/images/buttons/BackButton.png';
	
	let burnButtonImage = new Image();
	burnButtonImage.src = 'resources/images/buttons/BurnButton.png';
	
	let controlsButtonImage = new Image();
	controlsButtonImage.src = 'resources/images/buttons/ControlsButton.png';
	
	let fireButtonImage = new Image();
	fireButtonImage.src = 'resources/images/buttons/FireButton.png';
	
	let creditsButtonImage = new Image();
	creditsButtonImage.src = 'resources/images/buttons/CreditsButton.png';
	
	let hyperjumpButtonImage = new Image();
	hyperjumpButtonImage.src = 'resources/images/buttons/HyperjumpButton.png';
	
	let highScoresButtonImage = new Image();
	highScoresButtonImage.src = 'resources/images/buttons/HighScoresButton.png';
	
	let leftButtonImage = new Image();
	leftButtonImage.src = 'resources/images/buttons/LeftButton.png';
	
	let rightButtonImage = new Image();
	rightButtonImage.src = 'resources/images/buttons/RightButton.png';
	
	let newGameButtonImage = new Image();
	newGameButtonImage.src = 'resources/images/buttons/NewGameButton.png';
	
	let pauseButtonImage = new Image();
	pauseButtonImage.src = 'resources/images/buttons/PauseButton.png';
	
	let resumeButtonImage = new Image();
	resumeButtonImage.src = 'resources/images/buttons/ResumeButton.png';
	
	let soundsButtonImage = new Image();
	soundsButtonImage.src = 'resources/images/buttons/SoundsButton.png';
	
	let plusButtonImage = new Image();
	plusButtonImage.src = 'resources/images/buttons/PlusButton.png';
	
	let minusButtonImage = new Image();
	minusButtonImage.src = 'resources/images/buttons/MinusButton.png';
	
	let quitButtonImage = new Image();
	quitButtonImage.src = 'resources/images/buttons/QuitButton.png';
	
	let musicVolumeImage = new Image();
	musicVolumeImage.src = 'resources/images/buttons/MusicVolume.png';
	
	let soundVolumeImage = new Image();
	soundVolumeImage.src = 'resources/images/buttons/SoundVolume.png';
	
	let buttonSelectionImage = new Image();
	buttonSelectionImage.src = 'resources/images/buttons/ButtonSelection.png';
	
	let emptyMediumButtonImage = new Image();
	emptyMediumButtonImage.src = 'resources/images/buttons/EmptyMediumButton.png';    
    
    // Other
    let highscoresImage = new Image();
    highscoresImage.src = 'resources/images/highscores.png';
    
    let creditsImage = new Image();
    creditsImage.src = 'resources/images/credits.png';
    
    let pausedImage = new Image();
    pausedImage.src = 'resources/images/paused.png';
    
    let controlsImage = new Image();
    controlsImage.src = 'resources/images/controls.png';
    
    let soundsImage = new Image();
    soundsImage.src = 'resources/images/sounds.png';
    
    let menuImage = new Image();
    menuImage.src = 'resources/images/menu.png';
    
    let creditsListImage = new Image();
    creditsListImage.src = 'resources/images/creditsList.png';    
    
    return {
        backgroundImage: backgroundImage,
        asteroidImage: asteroidImage,
        spaceshipImage: spaceshipImage,
        smokeImage: smokeImage,
        fireImage: fireImage,
        blueProjectileImage: blueProjectileImage,
        redProjectileImage: redProjectileImage,
        saucerImage: saucerImage,
		
		burnButtonImage: burnButtonImage,
		backButtonImage: backButtonImage,
		controlsButtonImage: controlsButtonImage,
		fireButtonImage: fireButtonImage,
		creditsButtonImage: creditsButtonImage,
		hyperjumpButtonImage: hyperjumpButtonImage,
		highScoresButtonImage: highScoresButtonImage,
		leftButtonImage: leftButtonImage,
		rightButtonImage: rightButtonImage,
		newGameButtonImage: newGameButtonImage,
		pauseButtonImage: pauseButtonImage,
		resumeButtonImage: resumeButtonImage,
		soundsButtonImage: soundsButtonImage,
		plusButtonImage: plusButtonImage,
		minusButtonImage: minusButtonImage,
		quitButtonImage: quitButtonImage,
		
		musicVolumeImage: musicVolumeImage,
		soundVolumeImage: soundVolumeImage,
		
		buttonSelectionImage: buttonSelectionImage,
		
		emptyMediumButtonImage: emptyMediumButtonImage,
        
        highscoresImage: highscoresImage,
        creditsImage: creditsImage,
        pausedImage: pausedImage,
        controlsImage: controlsImage,
        soundsImage: soundsImage,
        menuImage: menuImage,
        
        creditsListImage: creditsListImage,
    }
}());
let Graphics = (function() {
    
    let canvas = document.getElementById('canvas-main');
    let context = canvas.getContext('2d');

    CanvasRenderingContext2D.prototype.clear = function() {
        this.save();
        this.setTransform(1, 0, 0, 1, 0, 0);
        this.clearRect(0, 0, canvas.width, canvas.height);
        this.restore();
    };
    
    let writeText = function(text, position, fontSize, fontStyle, fontColor) {
        context.save();
        context.font = `${fontSize}px ${fontStyle}`;
        context.fillStyle = fontColor;
        context.fillText(text, position.x + renderOffset.x, position.y + renderOffset.y);
        context.strokeText(text, position.x + renderOffset.x, position.y + renderOffset.y);
        context.restore();
    }
    
    let drawRectangle = function(position, size, color) {
        context.save();
        context.fillStyle = color;
        context.fillRect(position.x + renderOffset.x, position.y + renderOffset.y, size.width, size.height);
        context.restore();
    }
    
    // center: {x: , y: },
    // rotation: ,
    // size: {width:, height:},
    // image: ,
    let drawImage = function(spec) {
		context.save();
        context.translate(renderOffset.x, renderOffset.y);
		context.imageSmoothingEnabled = false;
		context.translate(spec.center.x, spec.center.y);
		context.rotate(spec.rotation);
		context.translate(-spec.center.x, -spec.center.y);
		
		context.drawImage(
			spec.image, 
			spec.center.x - spec.size.width/2, 
			spec.center.y - spec.size.height/2,
			spec.size.width, spec.size.height);
		
		context.restore();

	}
	
	let getTextWidth = function(text, fontSize, fontStyle) {
		context.save();
		context.font = `${fontSize}px ${fontStyle}`;
		let width = context.measureText(text);	
		context.restore();
		return width.width;
	}
	
	let getTextHeight = function(text, fontSize, fontStyle) {
		context.save();
		context.font = `${fontSize}px ${fontStyle}`;
		let height = context.measureText('M');
		context.restore();
		return height.height;
	}
    
    return {
        canvas: canvas,
        context: context,
        writeText: writeText,
        drawRectangle: drawRectangle,
        drawImage: drawImage,
		getTextWidth: getTextWidth,
    }
}());
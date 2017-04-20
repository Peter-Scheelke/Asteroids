let Menu = (function() {
    
    let CreateMenu = function(spec) {
        let that = {};
        
        that.position = spec.position;
        that.size = spec.size;
        that.currentIndex = -1;
        that.menuItems = [];
        
        that.keyEventHandler = function(keyCode) { }
        
        for (let item in spec.menuItems) {
            that.currentIndex = 0;
            let menuItemSpec = {
                selected: item == 0, 
                action: spec.menuItems[item].action, 
                image: spec.menuItems[item].image, 
                
                position: {
                    x: spec.menuItems[item].position.x + that.position.x,
                    y: spec.menuItems[item].position.y + that.position.y,
                },
                
                size: spec.menuItems[item].size,
            };
            
            that.menuItems.push(CreateMenuItem(menuItemSpec));
        }
        
        that.render = spec.render;
        
        that.moveUp = function() {
            if (this.currentIndex >= 0 && this.currentIndex <= this.menuItems.length) {
                this.menuItems[this.currentIndex].deselect();
            }

            if (this.currentIndex > 0) {
                --this.currentIndex;
            }
            
            if (this.currentIndex >= 0 && this.currentIndex <= this.menuItems.length) {
                this.menuItems[this.currentIndex].select();
            }
        }
        
        that.moveDown = function() {
            if (this.currentIndex >= 0 && this.currentIndex <= this.menuItems.length) {
                this.menuItems[this.currentIndex].deselect();
            }
            
            if (this.currentIndex < this.menuItems.length - 1) {
                ++this.currentIndex;
            }
            
            if (this.currentIndex >= 0 && this.currentIndex <= this.menuItems.length) {
                this.menuItems[this.currentIndex].select();
            }
        }
        
        that.click = function() {
            this.menuItems[this.currentIndex].click();
        }
        
        return that;
    }
    
    let CreateMenuItem = function(spec) {
        let that = {};
        
        that.selected = spec.selected;
        that.action = spec.action;
        that.image = spec.image;
        that.position = spec.position;
        that.size = spec.size;
        
        that.select = function() {
            this.selected = true;
        }
        
        that.deselect = function() {
            this.selected = false;
        }
        
        that.click = function() {
            if (this.selected) {
                this.action();
            }
        }
        
        that.render = function() {
            
			if (this.selected) {
				let selectionSpec = {
					center: {x: this.position.x + this.size.width / 2, y: this.position.y + this.size.height / 2},
					rotation: 0,
					size: {width: this.size.width + 0.05 * this.size.width, height: this.size.height + 0.1 * this.size.height},
					image: ImagePool.buttonSelectionImage,
				}
				
				Graphics.drawImage(selectionSpec);
			}
			
			let spec = {
				center: {x: this.position.x + this.size.width / 2, y: this.position.y + this.size.height / 2},
				rotation: 0,
				size: this.size,
				image: this.image,
			};
			
			Graphics.drawImage(spec);
        }
        
        return that;
    }
    
    return {
        CreateMenu : CreateMenu,
        CreateMenuItem : CreateMenuItem,
    }
}());
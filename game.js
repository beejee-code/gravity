// Global variables to store selected options
let selectedRocketType = 'apple';
let selectedGravity = 0.0033;

// Mobile device detection
function isMobileDevice() {
    return /iPhone|iPad|iPod|Android/i.test(navigator.userAgent) || 
           (window.innerWidth <= 800 && window.innerHeight <= 800);
}

// Get appropriate game dimensions based on device
function getGameDimensions() {
    if (isMobileDevice()) {
        return {
            width: window.innerWidth,
            height: window.innerHeight
        };
    }
    return {
        width: 800,
        height: 600
    };
}

class RocketSelectionScene extends Phaser.Scene {
    constructor() {
        super({ key: 'RocketSelectionScene' });
    }

    create() {
        this.width = this.scale.width;
        this.height = this.scale.height;

        // Title
        const titleFontSize = isMobileDevice() ? '32px' : '48px';
        this.add.text(this.width / 2, 50, 'SELECT YOUR ROCKET', {
            fontSize: titleFontSize,
            fill: '#ffffff',
            fontFamily: 'monospace'
        }).setOrigin(0.5);

        // Create starfield background
        this.createStars();

        // Rocket options - adjust layout for mobile
        const rocketOptions = isMobileDevice() 
            ? [
                { type: 'apple', name: 'Apple Rocket', x: this.width / 2, y: 120 },
                { type: 'emoji', name: 'Emoji Rocket', x: this.width / 2, y: 260 },
                { type: 'classic', name: 'Classic Rocket', x: this.width / 2, y: 400 }
              ]
            : [
                { type: 'apple', name: 'Apple Rocket', x: this.width / 2 - 200, y: 200 },
                { type: 'emoji', name: 'Emoji Rocket', x: this.width / 2, y: 200 },
                { type: 'classic', name: 'Classic Rocket', x: this.width / 2 + 200, y: 200 }
              ];

        rocketOptions.forEach((option, index) => {
            // Draw preview
            this.drawRocketPreview(option.x, option.y, option.type);

            // Name label
            const nameFontSize = isMobileDevice() ? '16px' : '20px';
            const labelOffset = isMobileDevice() ? 50 : 80;
            this.add.text(option.x, option.y + labelOffset, option.name, {
                fontSize: nameFontSize,
                fill: '#ffffff',
                fontFamily: 'monospace'
            }).setOrigin(0.5);

            // Selection button
            const buttonOffset = isMobileDevice() ? 90 : 150;
            const button = this.add.rectangle(option.x, option.y + buttonOffset, 120, 40, 0x4444ff)
                .setInteractive({ useHandCursor: true })
                .on('pointerover', () => button.setFillStyle(0x6666ff))
                .on('pointerout', () => button.setFillStyle(0x4444ff))
                .on('pointerdown', () => {
                    selectedRocketType = option.type;
                    this.scene.start('GravitySelectionScene');
                });

            const buttonTextFontSize = isMobileDevice() ? '14px' : '18px';
            this.add.text(option.x, option.y + buttonOffset, 'SELECT', {
                fontSize: buttonTextFontSize,
                fill: '#ffffff',
                fontFamily: 'monospace'
            }).setOrigin(0.5);
        });

        // Instructions
        const instructionsY = isMobileDevice() ? this.height - 50 : 500;
        this.add.text(this.width / 2, instructionsY, 'Click a button to select your rocket', {
            fontSize: '16px',
            fill: '#aaaaaa',
            fontFamily: 'monospace'
        }).setOrigin(0.5);
    }

    createStars() {
        const graphics = this.add.graphics();
        graphics.fillStyle(0xffffff, 1);
        
        for (let i = 0; i < 100; i++) {
            const x = Phaser.Math.Between(0, this.width);
            const y = Phaser.Math.Between(0, this.height);
            const size = Phaser.Math.Between(1, 2);
            graphics.fillCircle(x, y, size);
        }
    }

    drawRocketPreview(x, y, type) {
        const graphics = this.add.graphics();
        graphics.save();
        graphics.translateCanvas(x, y);

        if (type === 'apple') {
            // Apple body (red)
            graphics.fillStyle(0xff0000, 1);
            graphics.fillEllipse(0, 0, 30, 36);

            // Apple shine/highlight
            graphics.fillStyle(0xff6666, 1);
            graphics.fillCircle(-5, -5, 4);

            // Apple stem
            graphics.fillStyle(0x8B4513, 1);
            graphics.fillRect(-2, -20, 4, 6);

            // Apple leaf
            graphics.fillStyle(0x228B22, 1);
            graphics.fillEllipse(5, -18, 12, 6);

            // Landing legs
            graphics.lineStyle(2, 0x8B4513, 1);
            graphics.beginPath();
            graphics.moveTo(-8, 12);
            graphics.lineTo(-15, 20);
            graphics.moveTo(8, 12);
            graphics.lineTo(15, 20);
            graphics.strokePath();
        } else if (type === 'emoji') {
            // Emoji rocket using text
            this.add.text(x, y, '🚀', {
                fontSize: '64px'
            }).setOrigin(0.5);
        } else if (type === 'classic') {
            // Classic rocket body
            graphics.fillStyle(0xcccccc, 1);
            graphics.fillRect(-10, -15, 20, 30);

            // Cockpit
            graphics.fillStyle(0x4444ff, 1);
            graphics.fillCircle(0, -5, 6);

            // Landing legs
            graphics.lineStyle(2, 0x888888, 1);
            graphics.beginPath();
            graphics.moveTo(-8, 12);
            graphics.lineTo(-15, 20);
            graphics.moveTo(8, 12);
            graphics.lineTo(15, 20);
            graphics.strokePath();
        }

        graphics.restore();
    }
}

class GravitySelectionScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GravitySelectionScene' });
    }

    create() {
        this.width = this.scale.width;
        this.height = this.scale.height;

        // Title
        const titleFontSize = isMobileDevice() ? '32px' : '48px';
        this.add.text(this.width / 2, 50, 'SELECT GRAVITY', {
            fontSize: titleFontSize,
            fill: '#ffffff',
            fontFamily: 'monospace'
        }).setOrigin(0.5);

        // Create starfield background
        this.createStars();

        // Gravity options - adjust layout for mobile
        const gravityOptions = isMobileDevice()
            ? [
                { type: 'moon', name: 'Moon Gravity', value: 0.0033, description: '~1/6 Earth gravity', x: this.width / 2, y: 120 },
                { type: 'earth', name: 'Earth Gravity', value: 0.02, description: 'Standard gravity', x: this.width / 2, y: 260 },
                { type: 'asteroid', name: 'Asteroid Gravity', value: 0.0015, description: '~1/20 Earth gravity', x: this.width / 2, y: 400 }
              ]
            : [
                { type: 'moon', name: 'Moon Gravity', value: 0.0033, description: '~1/6 Earth gravity', x: this.width / 2 - 250, y: 200 },
                { type: 'earth', name: 'Earth Gravity', value: 0.02, description: 'Standard gravity', x: this.width / 2, y: 200 },
                { type: 'asteroid', name: 'Asteroid Gravity', value: 0.0015, description: '~1/20 Earth gravity', x: this.width / 2 + 250, y: 200 }
              ];

        gravityOptions.forEach((option, index) => {
            // Name label
            const nameFontSize = isMobileDevice() ? '18px' : '24px';
            this.add.text(option.x, option.y, option.name, {
                fontSize: nameFontSize,
                fill: '#ffffff',
                fontFamily: 'monospace'
            }).setOrigin(0.5);

            // Description
            const descFontSize = isMobileDevice() ? '12px' : '16px';
            const descOffset = isMobileDevice() ? 25 : 40;
            this.add.text(option.x, option.y + descOffset, option.description, {
                fontSize: descFontSize,
                fill: '#aaaaaa',
                fontFamily: 'monospace'
            }).setOrigin(0.5);

            // Gravity value
            const valueFontSize = isMobileDevice() ? '11px' : '14px';
            const valueOffset = isMobileDevice() ? 45 : 70;
            this.add.text(option.x, option.y + valueOffset, `G: ${option.value}`, {
                fontSize: valueFontSize,
                fill: '#888888',
                fontFamily: 'monospace'
            }).setOrigin(0.5);

            // Selection button
            const buttonOffset = isMobileDevice() ? 85 : 150;
            const button = this.add.rectangle(option.x, option.y + buttonOffset, 120, 40, 0x4444ff)
                .setInteractive({ useHandCursor: true })
                .on('pointerover', () => button.setFillStyle(0x6666ff))
                .on('pointerout', () => button.setFillStyle(0x4444ff))
                .on('pointerdown', () => {
                    selectedGravity = option.value;
                    this.scene.start('LunarLanderScene');
                });

            const buttonTextFontSize = isMobileDevice() ? '14px' : '18px';
            this.add.text(option.x, option.y + buttonOffset, 'SELECT', {
                fontSize: buttonTextFontSize,
                fill: '#ffffff',
                fontFamily: 'monospace'
            }).setOrigin(0.5);
        });

        // Instructions
        const instructionsY = isMobileDevice() ? this.height - 50 : 500;
        this.add.text(this.width / 2, instructionsY, 'Click a button to select gravity', {
            fontSize: '16px',
            fill: '#aaaaaa',
            fontFamily: 'monospace'
        }).setOrigin(0.5);
    }

    createStars() {
        const graphics = this.add.graphics();
        graphics.fillStyle(0xffffff, 1);
        
        for (let i = 0; i < 100; i++) {
            const x = Phaser.Math.Between(0, this.width);
            const y = Phaser.Math.Between(0, this.height);
            const size = Phaser.Math.Between(1, 2);
            graphics.fillCircle(x, y, size);
        }
    }
}

class LunarLanderScene extends Phaser.Scene {
    constructor() {
        super({ key: 'LunarLanderScene' });
    }

    create() {
        this.width = this.scale.width;
        this.height = this.scale.height;

        // Get selected rocket type
        this.rocketType = selectedRocketType;

        // Physics constants (use selected gravity)
        this.GRAVITY = selectedGravity;
        this.THRUST = 0.05;
        this.ROTATION_SPEED = 0.02;
        this.FUEL_CONSUMPTION = 0.5 - selectedGravity;
        this.MAX_LANDING_SPEED = 1.5;
        this.MAX_LANDING_ANGLE = 0.2;

        // Game state
        this.fuel = 100;
        this.landed = false;
        this.crashed = false;
        this.score = 0;

        // Create starfield
        this.createStars();

        // Create terrain
        this.createTerrain();

        // Create landing pad
        this.createLandingPad();

        // Create lander
        this.createLander();

        // UI text
        this.uiText = this.add.text(10, 10, '', {
            fontSize: '16px',
            fill: '#ffffff',
            fontFamily: 'monospace'
        });

        this.statusText = this.add.text(this.width / 2, this.height / 2, '', {
            fontSize: '32px',
            fill: '#ffffff',
            fontFamily: 'monospace'
        }).setOrigin(0.5);

        // Input
        this.cursors = this.input.keyboard.createCursorKeys();
        this.rKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);

        // Touch controls for mobile
        this.touchControls = {
            left: false,
            right: false,
            thrust: false
        };
        this.touchPointers = {
            left: null,
            right: null,
            thrust: null
        };

        // Gyroscope rotation control
        this.gyroscopeEnabled = false;
        this.gyroscopeRotation = 0;

        if (isMobileDevice()) {
            this.createTouchControls();
        }
    }

    createStars() {
        const graphics = this.add.graphics();
        graphics.fillStyle(0xffffff, 1);
        
        for (let i = 0; i < 100; i++) {
            const x = Phaser.Math.Between(0, this.width);
            const y = Phaser.Math.Between(0, this.height);
            const size = Phaser.Math.Between(1, 2);
            graphics.fillCircle(x, y, size);
        }
    }

    createTerrain() {
        const graphics = this.add.graphics();
        graphics.fillStyle(0x666666, 1);
        graphics.lineStyle(2, 0x888888, 1);

        this.terrainPoints = [];
        const segments = 20;
        const segmentWidth = this.width / segments;

        for (let i = 0; i <= segments; i++) {
            const x = i * segmentWidth;
            const y = this.height - 50 - Phaser.Math.Between(20, 100);
            this.terrainPoints.push({ x, y });
        }

        // Draw terrain
        graphics.beginPath();
        graphics.moveTo(0, this.height);
        
        for (const point of this.terrainPoints) {
            graphics.lineTo(point.x, point.y);
        }
        
        graphics.lineTo(this.width, this.height);
        graphics.closePath();
        graphics.fillPath();
        graphics.strokePath();

        // Store terrain for collision
        this.terrainGraphics = graphics;
    }

    createLandingPad() {
        // Randomize landing pad placement (avoid edges)
        const minIndex = 3;
        const maxIndex = this.terrainPoints.length - 4;
        const padIndex = Phaser.Math.Between(minIndex, maxIndex);
        const padX = this.terrainPoints[padIndex].x;
        const padY = this.terrainPoints[padIndex].y;

        this.landingPad = {
            x: padX,
            y: padY,
            width: 80,
            height: 10
        };

        // Draw landing pad
        const graphics = this.add.graphics();
        graphics.fillStyle(0x00ff00, 1);
        graphics.fillRect(padX - 40, padY - 5, 80, 5);
        
        // Landing pad lights
        graphics.fillStyle(0xff0000, 1);
        graphics.fillCircle(padX - 35, padY - 8, 3);
        graphics.fillCircle(padX + 35, padY - 8, 3);
    }

    createLander() {
        this.lander = {
            x: this.width / 2,
            y: 50,
            vx: 0,
            vy: 0,
            angle: 0,
            width: 20,
            height: 30
        };

        this.landerGraphics = this.add.graphics();
        this.emojiText = null; // Reset emoji text on scene create
    }

    createTouchControls() {
        const buttonSize = 60;
        const padding = 20;
        const bottomY = this.height - buttonSize - padding;

        // Left button
        this.leftButton = this.add.circle(padding + buttonSize / 2, bottomY, buttonSize / 2, 0x4444ff, 0.7)
            .setInteractive()
            .on('pointerdown', (pointer) => { 
                this.touchPointers.left = pointer.id; 
                this.touchControls.left = true; 
                this.leftButton.setFillStyle(0x6666ff, 0.9); 
            })
            .on('pointerup', (pointer) => { 
                if (this.touchPointers.left === pointer.id) {
                    this.touchControls.left = false; 
                    this.touchPointers.left = null;
                    this.leftButton.setFillStyle(0x4444ff, 0.7); 
                }
            })
            .on('pointerout', (pointer) => { 
                if (this.touchPointers.left === pointer.id) {
                    this.touchControls.left = false; 
                    this.touchPointers.left = null;
                    this.leftButton.setFillStyle(0x4444ff, 0.7); 
                }
            });
        
        this.add.text(padding + buttonSize / 2, bottomY, '◀', {
            fontSize: '32px',
            fill: '#ffffff',
            fontFamily: 'monospace'
        }).setOrigin(0.5);

        // Right button
        this.rightButton = this.add.circle(padding * 2 + buttonSize * 1.5, bottomY, buttonSize / 2, 0x4444ff, 0.7)
            .setInteractive()
            .on('pointerdown', (pointer) => { 
                this.touchPointers.right = pointer.id; 
                this.touchControls.right = true; 
                this.rightButton.setFillStyle(0x6666ff, 0.9); 
            })
            .on('pointerup', (pointer) => { 
                if (this.touchPointers.right === pointer.id) {
                    this.touchControls.right = false; 
                    this.touchPointers.right = null;
                    this.rightButton.setFillStyle(0x4444ff, 0.7); 
                }
            })
            .on('pointerout', (pointer) => { 
                if (this.touchPointers.right === pointer.id) {
                    this.touchControls.right = false; 
                    this.touchPointers.right = null;
                    this.rightButton.setFillStyle(0x4444ff, 0.7); 
                }
            });
        
        this.add.text(padding * 2 + buttonSize * 1.5, bottomY, '▶', {
            fontSize: '32px',
            fill: '#ffffff',
            fontFamily: 'monospace'
        }).setOrigin(0.5);

        // Thrust button
        const thrustButton = this.add.circle(this.width - padding - buttonSize / 2, bottomY, buttonSize / 2, 0xff4444, 0.7)
            .setInteractive()
            .on('pointerdown', (pointer) => { 
                this.touchPointers.thrust = pointer.id; 
                this.touchControls.thrust = true; 
                thrustButton.setFillStyle(0xff6666, 0.9); 
            })
            .on('pointerup', (pointer) => { 
                if (this.touchPointers.thrust === pointer.id) {
                    this.touchControls.thrust = false; 
                    this.touchPointers.thrust = null;
                    thrustButton.setFillStyle(0xff4444, 0.7); 
                }
            })
            .on('pointerout', (pointer) => { 
                if (this.touchPointers.thrust === pointer.id) {
                    this.touchControls.thrust = false; 
                    this.touchPointers.thrust = null;
                    thrustButton.setFillStyle(0xff4444, 0.7); 
                }
            });
        
        this.add.text(this.width - padding - buttonSize / 2, bottomY, '🔥', {
            fontSize: '32px',
            fontFamily: 'monospace'
        }).setOrigin(0.5);

        // Gyroscope toggle button
        const gyroButtonY = bottomY - buttonSize - padding;
        this.gyroButton = this.add.circle(this.width / 2, gyroButtonY, buttonSize / 2, 0x00aa00, 0.7)
            .setInteractive()
            .on('pointerdown', () => {
                this.toggleGyroscope();
            });
        
        this.gyroButtonText = this.add.text(this.width / 2, gyroButtonY, '🔄', {
            fontSize: '32px',
            fontFamily: 'monospace'
        }).setOrigin(0.5);

        // Restart button (hidden initially, shown on game over)
        this.restartButton = this.add.circle(this.width / 2, this.height / 2 + 80, buttonSize / 2, 0x00ff00, 0.8)
            .setInteractive()
            .setVisible(false)
            .on('pointerdown', () => {
                this.scene.start('RocketSelectionScene');
            });
        
        this.restartButtonText = this.add.text(this.width / 2, this.height / 2 + 80, 'R', {
            fontSize: '32px',
            fill: '#ffffff',
            fontFamily: 'monospace'
        }).setOrigin(0.5).setVisible(false);

        // Store reference to show/hide restart button
        this.showRestartButton = () => {
            this.restartButton.setVisible(true);
            this.restartButtonText.setVisible(true);
        };
    }

    toggleGyroscope() {
        this.gyroscopeEnabled = !this.gyroscopeEnabled;
        
        if (this.gyroscopeEnabled) {
            // Request permission for device orientation (iOS 13+)
            if (typeof DeviceOrientationEvent !== 'undefined' && 
                typeof DeviceOrientationEvent.requestPermission === 'function') {
                DeviceOrientationEvent.requestPermission()
                    .then(permissionState => {
                        if (permissionState === 'granted') {
                            window.addEventListener('deviceorientation', this.handleOrientation.bind(this));
                            this.gyroButton.setFillStyle(0x00ff00, 0.9);
                            this.gyroButtonText.setText('📱');
                            // Hide rotation buttons
                            this.leftButton.setVisible(false);
                            this.rightButton.setVisible(false);
                        } else {
                            this.gyroscopeEnabled = false;
                            this.gyroButton.setFillStyle(0x00aa00, 0.7);
                            this.gyroButtonText.setText('🔄');
                            alert('Permission denied for device orientation. Please enable it in Settings.');
                        }
                    })
                    .catch(error => {
                        console.error('Device orientation permission error:', error);
                        this.gyroscopeEnabled = false;
                        this.gyroButton.setFillStyle(0x00aa00, 0.7);
                        this.gyroButtonText.setText('🔄');
                        alert('Failed to request device orientation permission. Make sure this is a secure (HTTPS) context or try again.');
                    });
            } else if (typeof DeviceOrientationEvent !== 'undefined') {
                // Non-iOS devices or older iOS
                window.addEventListener('deviceorientation', this.handleOrientation.bind(this));
                this.gyroButton.setFillStyle(0x00ff00, 0.9);
                this.gyroButtonText.setText('📱');
                // Hide rotation buttons
                this.leftButton.setVisible(false);
                this.rightButton.setVisible(false);
            } else {
                // Device orientation not supported
                this.gyroscopeEnabled = false;
                this.gyroButton.setFillStyle(0x00aa00, 0.7);
                this.gyroButtonText.setText('🔄');
                alert('Device orientation is not supported on this device.');
            }
        } else {
            window.removeEventListener('deviceorientation', this.handleOrientation.bind(this));
            this.gyroButton.setFillStyle(0x00aa00, 0.7);
            this.gyroButtonText.setText('🔄');
            this.gyroscopeRotation = 0;
            // Show rotation buttons
            this.leftButton.setVisible(true);
            this.rightButton.setVisible(true);
        }
    }

    handleOrientation(event) {
        // Use gamma (left/right tilt) for rotation control
        // Gamma is the left-to-right tilt in degrees, where right is positive
        if (event.gamma !== null) {
            // Clamp gamma to reasonable range (-45 to 45 degrees)
            const clampedGamma = Math.max(-45, Math.min(45, event.gamma));
            // Convert to rotation input (-1 to 1)
            this.gyroscopeRotation = clampedGamma / 45;
        }
    }

    drawLander() {
        this.landerGraphics.clear();

        const x = this.lander.x;
        const y = this.lander.y;
        const angle = this.lander.angle;

        if (this.rocketType === 'emoji') {
            // For emoji, we use text instead of graphics
            if (!this.emojiText) {
                this.emojiText = this.add.text(x, y, '🚀', {
                    fontSize: '48px'
                }).setOrigin(0.5);
            }
            this.emojiText.setPosition(x, y);
            // Rotate emoji to point up when angle is 0 (🚀 points right by default, so rotate -45 degrees)
            this.emojiText.setRotation(angle - Math.PI / 4);

            // Thruster flame for emoji
            const thrustPressed = this.cursors.up.isDown || this.touchControls.thrust;
            if (thrustPressed && this.fuel > 0 && !this.landed && !this.crashed) {
                this.landerGraphics.save();
                this.landerGraphics.translateCanvas(x, y);
                this.landerGraphics.rotateCanvas(angle);
                this.landerGraphics.fillStyle(0xffaa00, 1);
                const flameHeight = Phaser.Math.Between(15, 25);
                this.landerGraphics.beginPath();
                this.landerGraphics.moveTo(-5, 20);
                this.landerGraphics.lineTo(0, 20 + flameHeight);
                this.landerGraphics.lineTo(5, 20);
                this.landerGraphics.closePath();
                this.landerGraphics.fillPath();
                this.landerGraphics.restore();
            }
            return;
        }

        this.landerGraphics.save();
        this.landerGraphics.translateCanvas(x, y);
        this.landerGraphics.rotateCanvas(angle);

        if (this.rocketType === 'apple') {
            // Apple body (red)
            this.landerGraphics.fillStyle(0xff0000, 1);
            this.landerGraphics.fillEllipse(0, 0, 30, 36);

            // Apple shine/highlight
            this.landerGraphics.fillStyle(0xff6666, 1);
            this.landerGraphics.fillCircle(-5, -5, 4);

            // Apple stem
            this.landerGraphics.fillStyle(0x8B4513, 1);
            this.landerGraphics.fillRect(-2, -20, 4, 6);

            // Apple leaf
            this.landerGraphics.fillStyle(0x228B22, 1);
            this.landerGraphics.fillEllipse(5, -18, 12, 6);

            // Landing legs
            this.landerGraphics.lineStyle(2, 0x8B4513, 1);
            this.landerGraphics.beginPath();
            this.landerGraphics.moveTo(-8, 12);
            this.landerGraphics.lineTo(-15, 20);
            this.landerGraphics.moveTo(8, 12);
            this.landerGraphics.lineTo(15, 20);
            this.landerGraphics.strokePath();
        } else if (this.rocketType === 'classic') {
            // Classic rocket body
            this.landerGraphics.fillStyle(0xcccccc, 1);
            this.landerGraphics.fillRect(-10, -15, 20, 30);

            // Cockpit
            this.landerGraphics.fillStyle(0x4444ff, 1);
            this.landerGraphics.fillCircle(0, -5, 6);

            // Landing legs
            this.landerGraphics.lineStyle(2, 0x888888, 1);
            this.landerGraphics.beginPath();
            this.landerGraphics.moveTo(-8, 12);
            this.landerGraphics.lineTo(-15, 20);
            this.landerGraphics.moveTo(8, 12);
            this.landerGraphics.lineTo(15, 20);
            this.landerGraphics.strokePath();
        }

        // Thruster flame
        const thrustPressed = this.cursors.up.isDown || this.touchControls.thrust;
        if (thrustPressed && this.fuel > 0 && !this.landed && !this.crashed) {
            this.landerGraphics.fillStyle(0xffaa00, 1);
            const flameHeight = Phaser.Math.Between(15, 25);
            this.landerGraphics.beginPath();
            this.landerGraphics.moveTo(-5, 15);
            this.landerGraphics.lineTo(0, 15 + flameHeight);
            this.landerGraphics.lineTo(5, 15);
            this.landerGraphics.closePath();
            this.landerGraphics.fillPath();
        }

        this.landerGraphics.restore();
    }

    update() {
        if (this.landed || this.crashed) {
            if (Phaser.Input.Keyboard.JustDown(this.rKey)) {
                this.scene.start('RocketSelectionScene');
            }
            // Show restart button on mobile
            if (isMobileDevice() && this.showRestartButton) {
                this.showRestartButton();
            }
            return;
        }

        // Handle input (keyboard or touch)
        const leftPressed = this.cursors.left.isDown || this.touchControls.left;
        const rightPressed = this.cursors.right.isDown || this.touchControls.right;
        const thrustPressed = this.cursors.up.isDown || this.touchControls.thrust;

        if (this.gyroscopeEnabled) {
            // Use gyroscope for rotation
            this.lander.angle += this.gyroscopeRotation * this.ROTATION_SPEED;
        } else {
            // Use keyboard/touch for rotation
            if (leftPressed) {
                this.lander.angle -= this.ROTATION_SPEED;
            }
            if (rightPressed) {
                this.lander.angle += this.ROTATION_SPEED;
            }
        }

        // Thrust
        if (thrustPressed && this.fuel > 0) {
            this.fuel -= this.FUEL_CONSUMPTION;
            this.lander.vx += Math.sin(this.lander.angle) * this.THRUST;
            this.lander.vy -= Math.cos(this.lander.angle) * this.THRUST;
        }

        // Apply gravity
        this.lander.vy += this.GRAVITY;

        // Update position
        this.lander.x += this.lander.vx;
        this.lander.y += this.lander.vy;

        // Screen wrap
        if (this.lander.x < 0) this.lander.x = this.width;
        if (this.lander.x > this.width) this.lander.x = 0;

        // Check collisions
        this.checkCollisions();

        // Draw lander
        this.drawLander();

        // Update UI
        this.updateUI();
    }

    checkCollisions() {
        // Check terrain collision
        const landerBottom = this.lander.y + 15;
        const landerLeft = this.lander.x - 10;
        const landerRight = this.lander.x + 10;

        // Get terrain height at lander position
        const terrainY = this.getTerrainHeightAt(this.lander.x);

        if (landerBottom >= terrainY) {
            // Check if landing on pad
            const onPad = this.lander.x > this.landingPad.x - this.landingPad.width / 2 &&
                         this.lander.x < this.landingPad.x + this.landingPad.width / 2;

            if (onPad) {
                // Check landing conditions
                const speed = Math.sqrt(this.lander.vx ** 2 + this.lander.vy ** 2);
                const angle = Math.abs(this.lander.angle);

                if (speed < this.MAX_LANDING_SPEED && angle < this.MAX_LANDING_ANGLE) {
                    this.landed = true;
                    this.lander.vx = 0;
                    this.lander.vy = 0;
                    this.lander.angle = 0;
                    this.lander.y = this.landingPad.y - 15;
                    this.score += Math.floor(this.fuel * 10);
                    this.statusText.setText('LANDED SUCCESSFULLY!\nPress R to restart');
                    this.statusText.setFill('#00ff00');
                } else {
                    this.crashed = true;
                    this.statusText.setText(`CRASH!\nSpeed: ${speed.toFixed(1)}\nAngle: ${(angle * 180 / Math.PI).toFixed(0)}°\nPress R to restart`);
                    this.statusText.setFill('#ff0000');
                    this.createExplosion(this.lander.x, this.lander.y);
                }
            } else {
                // Crashed on terrain
                this.crashed = true;
                this.statusText.setText('CRASHED ON TERRAIN!\nPress R to restart');
                this.statusText.setFill('#ff0000');
                this.createExplosion(this.lander.x, this.lander.y);
            }
        }

        // Check out of bounds (top of screen)
        if (this.lander.y < 0) {
            this.lander.y = 0;
            this.lander.vy = 0;
        }
    }

    getTerrainHeightAt(x) {
        // Find the terrain segment containing x
        for (let i = 0; i < this.terrainPoints.length - 1; i++) {
            const p1 = this.terrainPoints[i];
            const p2 = this.terrainPoints[i + 1];
            
            if (x >= p1.x && x <= p2.x) {
                // Linear interpolation
                const t = (x - p1.x) / (p2.x - p1.x);
                return p1.y + t * (p2.y - p1.y);
            }
        }
        return this.height;
    }

    createExplosion(x, y) {
        const graphics = this.add.graphics();
        graphics.fillStyle(0xff6600, 1);
        
        for (let i = 0; i < 20; i++) {
            const angle = (Math.PI * 2 * i) / 20;
            const distance = Phaser.Math.Between(10, 40);
            const ex = x + Math.cos(angle) * distance;
            const ey = y + Math.sin(angle) * distance;
            graphics.fillCircle(ex, ey, Phaser.Math.Between(3, 8));
        }
    }

    updateUI() {
        const speed = Math.sqrt(this.lander.vx ** 2 + this.lander.vy ** 2);
        const altitude = Math.max(0, this.getTerrainHeightAt(this.lander.x) - this.lander.y - 15);
        
        const controlsText = isMobileDevice() 
            ? 'Controls: Touch buttons' 
            : 'Controls: ← → Rotate, ↑ Thrust';
        
        this.uiText.setText([
            `Fuel: ${Math.max(0, this.fuel).toFixed(0)}`,
            `Altitude: ${altitude.toFixed(0)}`,
            `Speed: ${speed.toFixed(2)}`,
            `Angle: ${(this.lander.angle * 180 / Math.PI).toFixed(0)}°`,
            controlsText,
            'R: Restart'
        ].join('\n'));
    }
}

const dimensions = getGameDimensions();
const config = {
    type: Phaser.AUTO,
    width: dimensions.width,
    height: dimensions.height,
    parent: 'game-container',
    backgroundColor: '#000000',
    scene: [RocketSelectionScene, GravitySelectionScene, LunarLanderScene],
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    },
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    }
};

const game = new Phaser.Game(config);

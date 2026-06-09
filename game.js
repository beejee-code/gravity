// Global variables to store selected options
let selectedRocketType = 'apple';
let selectedGravity = 0.0033;

class RocketSelectionScene extends Phaser.Scene {
    constructor() {
        super({ key: 'RocketSelectionScene' });
    }

    create() {
        this.width = this.scale.width;
        this.height = this.scale.height;

        // Title
        this.add.text(this.width / 2, 50, 'SELECT YOUR ROCKET', {
            fontSize: '48px',
            fill: '#ffffff',
            fontFamily: 'monospace'
        }).setOrigin(0.5);

        // Create starfield background
        this.createStars();

        // Rocket options
        const rocketOptions = [
            { type: 'apple', name: 'Apple Rocket', x: this.width / 2 - 200 },
            { type: 'emoji', name: 'Emoji Rocket', x: this.width / 2 },
            { type: 'classic', name: 'Classic Rocket', x: this.width / 2 + 200 }
        ];

        rocketOptions.forEach((option, index) => {
            // Draw preview
            this.drawRocketPreview(option.x, 200, option.type);

            // Name label
            this.add.text(option.x, 280, option.name, {
                fontSize: '20px',
                fill: '#ffffff',
                fontFamily: 'monospace'
            }).setOrigin(0.5);

            // Selection button
            const button = this.add.rectangle(option.x, 350, 150, 50, 0x4444ff)
                .setInteractive({ useHandCursor: true })
                .on('pointerover', () => button.setFillStyle(0x6666ff))
                .on('pointerout', () => button.setFillStyle(0x4444ff))
                .on('pointerdown', () => {
                    selectedRocketType = option.type;
                    this.scene.start('GravitySelectionScene');
                });

            this.add.text(option.x, 350, 'SELECT', {
                fontSize: '18px',
                fill: '#ffffff',
                fontFamily: 'monospace'
            }).setOrigin(0.5);
        });

        // Instructions
        this.add.text(this.width / 2, 500, 'Click a button to select your rocket', {
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
        this.add.text(this.width / 2, 50, 'SELECT GRAVITY', {
            fontSize: '48px',
            fill: '#ffffff',
            fontFamily: 'monospace'
        }).setOrigin(0.5);

        // Create starfield background
        this.createStars();

        // Gravity options
        const gravityOptions = [
            { type: 'moon', name: 'Moon Gravity', value: 0.0033, description: '~1/6 Earth gravity', x: this.width / 2 - 250 },
            { type: 'earth', name: 'Earth Gravity', value: 0.02, description: 'Standard gravity', x: this.width / 2 },
            { type: 'asteroid', name: 'Asteroid Gravity', value: 0.0015, description: '~1/20 Earth gravity', x: this.width / 2 + 250 }
        ];

        gravityOptions.forEach((option, index) => {
            // Name label
            this.add.text(option.x, 200, option.name, {
                fontSize: '24px',
                fill: '#ffffff',
                fontFamily: 'monospace'
            }).setOrigin(0.5);

            // Description
            this.add.text(option.x, 240, option.description, {
                fontSize: '16px',
                fill: '#aaaaaa',
                fontFamily: 'monospace'
            }).setOrigin(0.5);

            // Gravity value
            this.add.text(option.x, 270, `G: ${option.value}`, {
                fontSize: '14px',
                fill: '#888888',
                fontFamily: 'monospace'
            }).setOrigin(0.5);

            // Selection button
            const button = this.add.rectangle(option.x, 350, 150, 50, 0x4444ff)
                .setInteractive({ useHandCursor: true })
                .on('pointerover', () => button.setFillStyle(0x6666ff))
                .on('pointerout', () => button.setFillStyle(0x4444ff))
                .on('pointerdown', () => {
                    selectedGravity = option.value;
                    this.scene.start('LunarLanderScene');
                });

            this.add.text(option.x, 350, 'SELECT', {
                fontSize: '18px',
                fill: '#ffffff',
                fontFamily: 'monospace'
            }).setOrigin(0.5);
        });

        // Instructions
        this.add.text(this.width / 2, 500, 'Click a button to select gravity', {
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
        this.ROTATION_SPEED = 0.05;
        this.FUEL_CONSUMPTION = 0.5;
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
            if (this.cursors.up.isDown && this.fuel > 0 && !this.landed && !this.crashed) {
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
        if (this.cursors.up.isDown && this.fuel > 0 && !this.landed && !this.crashed) {
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
            return;
        }

        // Handle input
        if (this.cursors.left.isDown) {
            this.lander.angle -= this.ROTATION_SPEED;
        }
        if (this.cursors.right.isDown) {
            this.lander.angle += this.ROTATION_SPEED;
        }

        // Thrust
        if (this.cursors.up.isDown && this.fuel > 0) {
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
        
        this.uiText.setText([
            `Fuel: ${Math.max(0, this.fuel).toFixed(0)}`,
            `Altitude: ${altitude.toFixed(0)}`,
            `Speed: ${speed.toFixed(2)}`,
            `Angle: ${(this.lander.angle * 180 / Math.PI).toFixed(0)}°`,
            'Controls: ← → Rotate, ↑ Thrust',
            'R: Restart'
        ].join('\n'));
    }
}

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    parent: 'game-container',
    backgroundColor: '#000000',
    scene: [RocketSelectionScene, GravitySelectionScene, LunarLanderScene],
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    }
};

const game = new Phaser.Game(config);

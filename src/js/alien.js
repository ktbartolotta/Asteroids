Asteroids = Asteroids || {};
Asteroids.Objects = Asteroids.Objects || {};
Asteroids.Objects.Sprites = Asteroids.Objects.Sprites || {};


Asteroids.Objects.Sprites.Alien = function(state, x, y, key) {

    this.game = state.game;
    this.state = state;
    Phaser.Sprite.prototype.constructor.call(this, this.game, x, y, key);
    this.game.world.add(this);
    this.anchor.setTo(0.5, 0.5);
    this.animations.add('floaty');
    this.game.physics.enable(this);
    this.checkWorldBounds = true;
    this.body.drag.set(100);
    this.body.maxVelocity.set(200);
}
Asteroids.Objects.Sprites.Alien.prototype = Object.create(Phaser.Sprite.prototype);

Asteroids.Objects.Sprites.Alien.prototype.constructor =
    Asteroids.Objects.Sprites.Alien;


Asteroids.Objects.Sprites.Alien.prototype.update = function() {

    var input = this.game.input.keyboard;

    //Update player rotation
    this.body.angularVelocity = 0;
    if(input.isDown(Phaser.Keyboard.LEFT)) {
        this.body.angularVelocity = -150;
    }
    else if(input.isDown(Phaser.Keyboard.RIGHT)) {
        this.body.angularVelocity = 150;
    }

    //Update player thrust
    if(input.isDown(Phaser.Keyboard.UP)) {

        this.game.physics.arcade.accelerationFromRotation(
            this.rotation, this.maxVelocity,
            this.body.acceleration);
        this.animations.play('floaty', 4, true);
    }
    else {
        this.body.acceleration.set(0);
        this.animations.stop(true);
    }
    this.game.world.wrap(this, 0, true);
}

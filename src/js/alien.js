Asteroids = Asteroids || {};
Asteroids.Objects = Asteroids.Objects || {};
Asteroids.Objects.Sprites = Asteroids.Objects.Sprites || {};


Asteroids.Objects.Sprites.Alien = function(state, x, y, key) {

    //Initialize
    this.game = state.game;
    this.state = state;
    Phaser.Sprite.prototype.constructor.call(this, this.game, x, y, key);
    this.anchor.setTo(0.5, 0.5);
    this.animations.add('floaty');
    this.game.physics.enable(this);
    this.checkWorldBounds = true;
    this.body.drag.set(100);
    this.body.maxVelocity.set(400);

    //Player Thrust particle emitter
    this.thrustEmmiter = this.game.add.emitter(
        this.x + this.width / 2,
        this.y + this.height / 2, 400);

    this.thrustEmmiter.makeParticles('alien-explosion');
    this.thrustEmmiter.setAlpha(1, 0, 400);
    this.thrustEmmiter.setScale(0.01, 1.0, 0.01, 1.0, 1000);
    this.thrustEmmiter.start(false, 500, 5);

}
Asteroids.Objects.Sprites.Alien.prototype =
    Object.create(Phaser.Sprite.prototype);

Asteroids.Objects.Sprites.Alien.prototype.constructor =
    Asteroids.Objects.Sprites.Alien;


Asteroids.Objects.Sprites.Alien.prototype.update = function(input) {

    //var input = this.game.input.keyboard;

    //Update player rotation
    this.body.angularVelocity = 0;
    if(input.isDown(Phaser.Keyboard.LEFT)) {
        this.body.angularVelocity = -200;
    }
    else if(input.isDown(Phaser.Keyboard.RIGHT)) {
        this.body.angularVelocity = 200;
    }
    this.body.acceleration.set(0);

    //Update player thrust
    if(input.isDown(Phaser.Keyboard.UP)) {

        this.game.physics.arcade.accelerationFromRotation(
            this.rotation, this.maxVelocity,
            this.body.acceleration);
        this.animations.play('floaty', 4, true);

        //Emit smoke
        this.thrustEmmiter.minParticleSpeed.set(
            this.body.velocity.x * (-1), this.body.velocity.y * (-1));
        this.thrustEmmiter.maxParticleSpeed.set(
            this.body.velocity.x * (-1), this.body.velocity.y * (-1));
        this.thrustEmmiter.emitX = this.body.x + this.width / 2;
        this.thrustEmmiter.emitY = this.body.y + this.height / 2;
    }
    else {
        this.body.acceleration.set(0);
        this.animations.stop(true);
        this.thrustEmmiter.minParticleSpeed.set(0, 0);
        this.thrustEmmiter.maxParticleSpeed.set(0, 0);
        this.thrustEmmiter.emitX = -50;
        this.thrustEmmiter.emitY = -50;
    }
    this.game.world.wrap(this, 0, true);
}

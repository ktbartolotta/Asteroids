Asteroids = Asteroids || {};
Asteroids.Objects = Asteroids.Objects || {};
Asteroids.Objects.Sprites = Asteroids.Objects.Sprites || {};


Asteroids.Objects.Sprites.Asteroid = function(
        state, x, y, scale, velX, velY, angle, key) {

    this.game = state.game;
    this.state = state;
    Phaser.Sprite.prototype.constructor.call(this, this.game, x, y, key);
    this.game.world.add(this);
    this.anchor.setTo(0.5, 0.5);
    this.animations.add('spin');
    this.game.physics.enable(this);
    this.checkWorldBounds = true;
    this.scale.setTo(scale, scale);
    this.angle = angle;
    this.animations.add('spin');
    this.game.physics.enable(this);
    this.body.velocity.x = velX;
    this.body.velocity.y = velY;
    this.animations.play('spin', 1, true);
}
Asteroids.Objects.Sprites.Asteroid.prototype = Object.create(Phaser.Sprite.prototype);

Asteroids.Objects.Sprites.Asteroid.prototype.constructor =
    Asteroids.Objects.Sprites.Asteroid;


Asteroids.Objects.Sprites.Asteroid.prototype.update = function() {

    this.game.world.wrap(this, 0, true);
}

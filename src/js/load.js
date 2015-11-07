var Asteroids = Asteroids || {};

Asteroids.Load = function(game) {};

Asteroids.Load.prototype = {

    preload: function() {

        this.load.spritesheet(
            'asteroid3', 'assets/images/Asteroid3.png', 133, 133);
        this.load.spritesheet(
            'asteroid2', 'assets/images/Asteroid2.png', 133, 133);
        this.load.spritesheet(
            'asteroid4', 'assets/images/Asteroid4.png', 133, 133);
        this.load.spritesheet(
            'alien', 'assets/images/Alien2.png', 33, 33);
        this.load.image('alien-bullet', 'assets/images/AlienBullet.png');
        this.load.image(
            'alien-explosion', 'assets/images/AlienParticle.png');
        this.load.image(
            'explosion', 'assets/images/Explosion.png');
    },

    create: function() {

        this.state.start('Game1');
    }

};
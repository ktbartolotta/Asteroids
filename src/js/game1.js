var Asteroids = Asteroids || {};

Asteroids.Game1 = function(game) {

    this.asteroids = null;
    this.cursors = null;
    this.alien = null;
    this.bullets = null;
    this.bulletTime = 0;
};

Asteroids.Game1.prototype = {

    create: function() {

        this.game.physics.setBoundsToWorld();
        // Controls
        this.cursors = this.game.input.keyboard.createCursorKeys();
        //bullets
        /*this.bullets = this.game.add.group();
        this.bullets.enableBody = true;
        this.bullets.createMultiple(40, 'alien-bullet');
        this.bullets.setAll('anchor.x', 0.5);
        this.bullets.setAll('anchor.y', 0.5);
        this.bullets.setAll('scale.x', 0.5);
        this.bullets.setAll('scale.y', 0.5);*/

        //Player
        this.alien = new Asteroids.Objects.Sprites.Alien(this,
            this.game.world.centerX, this.game.world.centerY, 'alien');

        // Asteroid
        this.asteroids = this.game.add.group();

        for (var i = 0; i < 5; i++) {
            var asteroid = new Asteroids.Objects.Sprites.Asteroid(this,
                this.game.world.randomX,
                this.game.world.randomY,
                this.game.rnd.realInRange(.6, 1),
                this.game.rnd.between(-50, 50),
                this.game.rnd.between(-50, 50),
                this.game.rnd.between(-180, 180),
                'asteroid' + this.game.rnd.between(2, 4));
        }

    },

    update: function() {

        //Update asteroids
        this.asteroids.forEach(function(a) {

            a.update();
        }, this);

        //Update Player
        this.alien.update();

        //Update player bullets
        /*if(this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {

            this.fireBullet();
        }
        this.bullets.forEachExists(function(b) {

            this.game.world.wrap(b, 0, true);
        }, this);*/
    },

    /*fireBullet: function() {

        //Introduce the world to Mr. Player Bullet
        if(this.game.time.now > this.bulletTime) {
             var bullet = this.bullets.getFirstExists(false);
             if(bullet) {

                bullet.reset(this.alien.body.x + this.alien.width / 2,
                    this.alien.body.y + this.alien.height / 2);
                bullet.lifespan = 1000;
                bullet.rotation = this.alien.rotation;
                this.game.physics.arcade.velocityFromRotation(
                    this.alien.rotation, 400, bullet.body.velocity);
                this.bulletTime = this.game.time.now + 50;
             }
        }
    },*/

    render: function() {

        this.game.debug.spriteInfo(this.alien, 20, 32);
    }

};

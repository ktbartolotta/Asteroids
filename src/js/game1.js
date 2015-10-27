var Asteroids = Asteroids || {};

Asteroids.Game1 = function(game) {

    this.asteroids = null;
    //this.cursors = null;
    this.alien = null;
    this.bullets = null;
    this.bulletTime = 0;
    //this.explosionEmitter = null;
};

Asteroids.Game1.prototype = {

    create: function() {

        this.game.physics.setBoundsToWorld();

        //Add bullets
        /*this.bullets = this.game.add.group()
        for (var i; i < 40; i++) {

            var bullet = new Asteroids.Objects.Sprites.Bullet(this,
                0.5, 'alien-bullet');
            this.bullets.add(bullet);
        }*/
        // Controls
        //this.cursors = this.game.input.keyboard.createCursorKeys();
        //bullets
        this.bullets = this.game.add.group();
        this.bullets.enableBody = true;
        this.bullets.createMultiple(40, 'alien-bullet');
        this.bullets.setAll('anchor.x', 0.5);
        this.bullets.setAll('anchor.y', 0.5);
        this.bullets.setAll('scale.x', 0.5);
        this.bullets.setAll('scale.y', 0.5);


        //Player
        this.alien = this.game.world.add(new Asteroids.Objects.Sprites.Alien(
            this, this.game.world.centerX, this.game.world.centerY, 'alien'));

        // Asteroid
        this.asteroids = this.game.add.group();

        for (var i = 0; i < 10; i++) {
            var asteroid = new Asteroids.Objects.Sprites.Asteroid(this,
                this.game.world.randomX,
                this.game.world.randomY,
                this.game.rnd.realInRange(.6, 1),
                this.game.rnd.between(-50, 50),
                this.game.rnd.between(-50, 50),
                this.game.rnd.between(-180, 180), 1,
                'asteroid' + this.game.rnd.between(2, 4));
            this.asteroids.add(asteroid);
        }

        /*//Exploding asteroid emitter
        this.explosionEmitter = this.game.add.emitter(200, 200, 50)
        this.explosionEmitter.makeParticles('explosion');
        this.explosionEmitter.setAlpha(1, 0, 500);
        this.explosionEmitter.setScale(.01, 2.0, .01, 2.0, 3000);*/

    },

    update: function() {

        var input = this.game.input.keyboard;

        //Update asteroids
        this.asteroids.forEachExists(function(a) {

            a.update();
        }, this);

        //Update Player
        this.alien.update(input);

        //Update player bullets
        if(input.isDown(Phaser.Keyboard.SPACEBAR)) {

            this.fireBullet();
        }
        this.bullets.forEachExists(function(b) {

            this.game.world.wrap(b, 0, true);
        }, this);

        //Check for bullet/asteroid collision
        this.game.physics.arcade.collide(
            this.bullets, this.asteroids, this.onBlam, null, this);

    },

    fireBullet: function() {

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
                this.bulletTime = this.game.time.now + 100;
             }
        }
    },

    render: function() {

        this.game.debug.spriteInfo(this.alien, 20, 32);
    },

    onBlam: function(bullet, asteroid) {


        //Exploding asteroid emitter
        explosionEmitter = this.game.add.emitter(
            bullet.body.x, bullet.body.y, 50)
        explosionEmitter.makeParticles('explosion');
        explosionEmitter.setAlpha(1, 0, 1000);
        explosionEmitter.setScale(.01, 2.0, .01, 2.0, 3000);
        explosionEmitter.start(true, 1000, null, 100);
        this.game.time.events.add(
            3000, this.destroyEmitter, this, explosionEmitter);

        if (asteroid.getBreakStage() < 3) {
            var
                x = asteroid.body.x,
                y = asteroid.body.y,
                scale = asteroid.scale.x / 2,
                velX = asteroid.body.velocity.x,
                velY = asteroid.body.velocity.y,
                angle = asteroid.angle,
                breakStage = asteroid.getBreakStage() + 1,
                key = asteroid.key;
            this.asteroids.add(new Asteroids.Objects.Sprites.Asteroid(this,
                    x, y, scale, velX, velY, angle + 20, breakStage, key));
            this.asteroids.add(new Asteroids.Objects.Sprites.Asteroid(this,
                    x, y, scale, velX, velY, angle - 20, breakStage, key));

         }
        bullet.kill();
        asteroid.destroy();
    },

    destroyEmitter: function(emitter) {

        emitter.destroy();
    }

};

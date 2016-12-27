new Vue({
    el: '#app',
    data: {
        gameIsRunning: false,
        playerHealth: 100,
        trollHealth: 100,
        turns: []
    },
    methods: {
        startGame: function() {
            this.gameIsRunning = true;
            this.playerHealth = 100;
            this.trollHealth = 100;
            this.turns = [];
        },
        attack: function() {
            var damage = this.calculateDamage(3, 10);
            this.trollHealth -= damage;
            this.turns.unshift({
                isPlayer: true,
                text: 'Player hits Troll for ' + damage
            });
            if (this.checkWin()) {
                return;
            }

            this.trollAttacks();
        },
        specialAttack: function() {
            var damage = this.calculateDamage(10, 20);
            this.trollHealth -= damage;
            this.turns.unshift({
                isPlayer: true,
                text: 'Player hits Troll HARD for ' + damage
            });
            if (this.checkWin()) {
                return;
            }

            this.trollAttacks();
        },
        heal: function() {
            if (this.playerHealth <= 90) {
                this.playerHealth += 10;
            } else {
                this.playerHealth = 100;
            }
            this.turns.unshift({
                isPlayer: true,
                text: 'Player heals for 10'
            });
            this.trollAttacks();
        },
        giveUp: function() {
            this.gameIsRunning = false;
        },
        trollAttacks: function() {
            var damage = this.calculateDamage(5, 12);
            this.playerHealth -= damage;
            this.checkWin();
            this.turns.unshift({
                isPlayer: false,
                text: 'Troll hits Player for ' + damage
            });
        },
        calculateDamage: function(min, max) {
            return Math.max(Math.floor(Math.random() * max) + 1, min);
        },
        checkWin: function() {
            if (this.trollHealth <= 0) {
                if (confirm('You have defeated the Troll!!! New Game?')) {
                    this.startGame();
                } else {
                    this.gameIsRunning = false;
                }
                return true;
            } else if (this.playerHealth <= 0) {
                if (confirm('You died. New Game?')) {
                    this.startGame();
                } else {
                    this.gameIsRunning = false;
                }
                return true;
            }
            return false;
        }
    }
});

class Player extends PIXI.Graphics {
    constructor(side, platform) {
        super()
        this.side = side
        this.platform = platform
        this.bullets = []
        this.width = 100
        this.height = 100
        this.y = this.platform.top - 100
        this.vy = 0
        if (side == 'left') {
            this.color = 0x424bf5
            this.x = 30
            this.bindLeftPlayerControls()
        } else {
            this.color = 0xf54269
            this.x = 800
            this.bindRightPlayerControls()
        }
        this.beginFill(this.color)
        // this.lineStyle(4, 0xFF3300, 1);        
        this.drawRect(0, 0, 100, 100);
        this.endFill();

    }

    shoot() {
        let bullet = new Bullet(this)
        this.bullets.push(bullet)
        ps.playScene.addChild(bullet)
    }

    checkPlatformCollision() {
        // land on platform
        if (this.y == this.platform.top - this.height) this.vy = 0
    }

    bindLeftPlayerControls() {
        // w - jump, e - shoot
        this.w = keyboard('w')
        this.e = keyboard('e')
        this.bindControls(this.w, this.e)
    }

    bindRightPlayerControls() {
        // n - jump, m - shoot
        this.n = keyboard('n')
        this.m = keyboard('m')
        this.bindControls(this.n, this.m)
    }

    bindControls(jump_key, shoot_key) {
        jump_key.press = () => {
            this.vy = -3
        }
        jump_key.release = () => {
            this.vy = 3
        }
        shoot_key.press = () => {
            this.shoot()
        }
    }

}
class Bullet extends PIXI.Graphics {
    constructor(owner) {
        super()
        this.owner = owner
        // this.anchor.set(0.5)
        this.x = owner.x + owner.width / 2
        this.y = owner.y + owner.height / 2
        if (owner.side == 'left') {
            this.vx = 3
        } else {
            this.vx = -3
        }
        this.beginFill(0xffffff)
        // this.lineStyle(4, 0xFF3300, 1);
        this.drawRect(0, 0, 10, 10);
        this.endFill();
    }

    checkHit() {
        // check if bullet hits a player
        if ((this.x == ps.p1.x + ps.p1.width && (this.y > ps.p1.y && this.y < ps.p1.y + ps.p1.height)))
            ps.endGame('Player 2')
        if ((this.x == ps.p2.x) && (this.y > ps.p2.y && this.y < ps.p2.y + ps.p2.height))
            ps.endGame('Player 1')
    }
}
class Platform extends PIXI.Graphics {
    constructor() {
        super()
        this.top = 400;
        this.beginFill(0x66CCFF)
        // this.lineStyle(4, 0xFF3300, 1);
        this.drawRect(0, this.top, 950, 30);
        this.endFill();
    }
}
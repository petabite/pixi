class PlatformShooter extends PIXI.Application {
    constructor() {
        super({
            width: 256,
            height: 256,
            antialias: true,
            transparent: false,
            resolution: 1
        })
        //Create a Pixi Application
        // this.app = new Application();
        this.renderer.view.style.position = "absolute";
        this.renderer.view.style.display = "block";
        this.renderer.autoResize = true;
        this.renderer.resize(window.innerWidth, window.innerHeight);

        //Add the canvas that Pixi automatically created for you to the HTML document
        document.body.appendChild(this.view);
        this.setup()
    }

    setup = () => {
        //start scene
        this.startScene = new Container()
        this.startScene.visible = true
        this.textStyle = new TextStyle({
            align: "center",
            fontFamily: "Arial",
            fontSize: 50,
            fill: "white",
            stroke: '#ff3300',
            strokeThickness: 4,
        });
        let playText = new Text("PIXI SHOOTA\nPRESS SPACE TO PLAY", this.textStyle)
        playText.anchor.set(0.5)
        playText.position.set(window.innerWidth / 2, window.innerHeight / 2)
        this.startScene.addChild(playText)
        this.stage.addChild(this.startScene)

        let space = keyboard(" ")
        space.press = () => {
            this.startGame()
            space.unsubscribe()
        }

        // play scene
        this.playScene = new Container()
        this.playScene.visible = false
        this.stage.addChild(this.playScene)

        this.platform = new Platform()
        this.p1 = new Player('left', this.platform)
        this.p2 = new Player('right', this.platform)
        this.players = [this.p1, this.p2]
        this.playScene.addChild(this.platform, this.p1, this.p2)

        // end scene
        this.endScene = new Container()
        this.endScene.visible = false
        this.stage.addChild(this.endScene)
        this.state = this.play

        //Start the game loop 
        this.ticker.add(delta => this.gameLoop(delta));
    }

    gameLoop = (delta) => {

        //Update the current game state:
        this.state(delta);
    }

    startGame() {
        this.startScene.visible = false
        this.playScene.visible = true
    }

    endGame(winner) {
        this.endScene.visible = true
        this.playScene.visible = false
        let endText = new Text(winner + " WON!", this.textStyle)
        endText.anchor.set(0.5)
        endText.position.set(window.innerWidth / 2, window.innerHeight / 2)
        this.endScene.addChild(endText)
    }

    play = (delta) => {
        // console.log(delta);

        this.players.forEach((player) => {
            player.y += player.vy // move player if jump velocity is there
            player.checkPlatformCollision()
            player.bullets.forEach((bullet) => {
                bullet.checkHit()
                bullet.x += bullet.vx
            })
        })

    }
}
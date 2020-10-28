import { AudioManager } from "../../audio/AudioManager";

export class GameOver extends Phaser.Scene {
    constructor() {
        super("GameOver")
    }

    create() {
        let gameOver = this.add.text(800, 200, "GAMEOVER").setFontSize(30).setOrigin(0.5)
        let playBtn = this.add.text(800, 400, 'RESTART').setFontSize(30).setOrigin(0.5);
        let quitBtn = this.add.text(800, 600, 'QUIT').setFontSize(30).setOrigin(0.5);
        playBtn.setInteractive()
        quitBtn.setInteractive()
        AudioManager.getInstance(this).playBackgroundMusic(false)
        AudioManager.getInstance(this).playGameOver(true)

        playBtn.on('pointerdown', () => {
            AudioManager.getInstance(this).playBackgroundMusic(true)
            AudioManager.getInstance(this).playGameOver(false)
            this.scene.stop()
            this.scene.resume('MainPlatformer');
        });
        playBtn.on('pointerover', () => {
            playBtn.setColor("red");
        });
        playBtn.on('pointerout', () => {
            playBtn.setColor("red");
        });
        quitBtn.on('pointerdown', () => {
            AudioManager.getInstance(this).playGameOver(false)
            this.scene.stop()
            this.scene.start('MainMenu');
        });
        quitBtn.on('pointerover', () => {
            quitBtn.setColor("red");
        });
        quitBtn.on('pointerout', () => {
            quitBtn.setColor("red");
        });

    }
}
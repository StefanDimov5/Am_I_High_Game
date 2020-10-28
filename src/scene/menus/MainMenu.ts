import { AudioManager } from "../../audio/AudioManager"

export class MainMenu extends Phaser.Scene {
    constructor() {
        super("MainMenu")
    }

    create() {
        let cutScene = this.physics.add.sprite(0, 0, 'SmokinInRoom').setOrigin(0);
        let anima = this.anims.create({
            key: 'SmokinInRoom',
            frameRate: 10,
            frames: this.anims.generateFrameNames('SmokinInRoom', {
                start: 1,
                end: 4,
            }),
            repeat: -1,
        });
        cutScene.play('SmokinInRoom');
        let playBtn = this.add.image(800, 200, "playBtn")
        let quitBtn = this.add.image(800, 600, "quitBtn")

        playBtn.setInteractive()
        quitBtn.setInteractive()

        playBtn.on('pointerdown', () => {
            AudioManager.getInstance(this).playCutSceneSong(true)
            this.scene.start('IntroSmokingScene');
        });
        playBtn.on('pointerover', () => {
            playBtn.setTexture("playHooverBtn");
        });
        playBtn.on('pointerout', () => {
            playBtn.setTexture("playBtn");
        });

    }
}
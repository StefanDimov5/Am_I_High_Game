import { AudioManager } from "../../audio/AudioManager";

export class IntroSmokingScene extends Phaser.Scene {
  constructor() {
    super('IntroSmokingScene');
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

    this.time.delayedCall(
      10000,
      () => {
        this.add.text(200, 100, "I'm starving. I will go to shop for some food").setColor("black").setFontSize(50).setFontStyle("bold").setBackgroundColor("white");
      },
      null,
      this
    );

    this.time.delayedCall(
      15000,
      () => {
        this.scene.start('WalkToShop');
      },
      null,
      this
    );

    this.add.text(1200, 800, "PRESS SPACE TO SKIP").setColor("red").setFontSize(30).setFontStyle("bold");
  }

  update() {
    this.skipScene();
  }

  public skipScene(): void {
    let space = this.input.keyboard.addKey("SPACE");
    if (space.isDown) {
      this.scene.stop();
      this.scene.start("MainPlatformer");
    }
  }
}

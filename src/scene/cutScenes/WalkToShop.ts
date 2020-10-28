export class WalkToShop extends Phaser.Scene {
  private trippyBg: Phaser.GameObjects.TileSprite;
  constructor() {
    super('WalkToShop');
  }

  create() {
    let cutScene = this.physics.add.sprite(0, 0, 'city').setOrigin(0).setScale(1, 0.9);
    this.trippyBg = this.add.tileSprite(0, 0, 1700, 912, 'trippyBg').setOrigin(0).setAlpha(0);

    let mainHero = this.physics.add.sprite(150, 650, 'mainHero').setScale(8);

    this.anims.create({
      key: 'mainHeroIdle',
      frameRate: 4,
      frames: this.anims.generateFrameNames('mainHero', {
        start: 1,
        end: 4,
      }),
      repeat: -1,
    });
    this.anims.create({
      key: 'mainHeroRun',
      frameRate: 10,
      frames: this.anims.generateFrameNames('mainHero', {
        start: 6,
        end: 8,
      }),
      repeat: -1,
    });
    mainHero.play('mainHeroIdle');

    this.tweens.add({
      targets: mainHero,
      x: 1000,
      delay: 2000,
      duration: 3000,
    });
    this.time.delayedCall(2000, () => {
      mainHero.play('mainHeroRun');
    });

    this.tweens.add({
      targets: this.trippyBg,
      alpha: { from: 0, to: 1 },
      delay: 3000,
      duration: 100,
      yoyo: true,
      repeat: 3,
      repeatDelay: 500,
      onComplete: () => {
        this.trippyBg.setAlpha(1);
      },
      onCompleteScope: this,
    });

    this.time.delayedCall(
      10000,
      () => {
        this.time.delayedCall(
          6000,
          () => {
            this.scene.start('MainPlatformer');
          },
          null,
          this
        );
      },
      null,
      this
    );
    this.add.text(1200, 800, "PRESS SPACE TO SKIP").setColor("red").setFontSize(30).setFontStyle("bold");
  }

  update() {
    this.skipScene();
    this.trippyBg.tilePositionX += 15;
  }

  public skipScene(): void {
    let space = this.input.keyboard.addKey("SPACE");
    if (space.isDown) {
      this.scene.stop();
      this.scene.start("MainPlatformer");
    }
  }
}

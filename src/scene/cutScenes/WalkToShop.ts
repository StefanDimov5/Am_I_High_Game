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
        end: 9,
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
  }

  update() {
    this.trippyBg.tilePositionX += 2;
  }
}
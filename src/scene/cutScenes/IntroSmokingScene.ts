export class IntroSmokingScene extends Phaser.Scene {
  constructor() {
    super('IntroSmokingScene');
  }

  create() {
    this.cameras.main.fadeIn(2000);
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
      4000,
      () => {
        this.scene.start('WalkToShop');
      },
      null,
      this
    );
  }
}

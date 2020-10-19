export class Coin extends Phaser.Physics.Arcade.Sprite {
  private coinScore: number = 100;
  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, 'coin');
    scene.physics.world.enable(this);
    this.setScale(0.7);
    this.setGravityY(200);
    this.scene.add.existing(this);
  }

  public getCoinScore(): number {
    return this.coinScore;
  }
  public coinDestroy() {
    this.setVisible(false);
    this.setActive(false);
    this.destroy();
  }
}

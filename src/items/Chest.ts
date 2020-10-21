export class Chest extends Phaser.Physics.Arcade.Sprite {
  private coinScore: number = 300;
  private openStatus: boolean = false;
  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, 'chest');
    scene.physics.world.enable(this);
    this.scene.add.existing(this);
  }

  public getCoinScore(): number {
    if (!this.openStatus) {
      return this.coinScore;
    } else {
      return 0;
    }
  }

  public open() {
    this.openStatus = true;
  }

  public isOpen(): boolean {
    return this.openStatus;
  }

  public coinDestroy() {
    this.setVisible(false);
    this.setActive(false);
    this.destroy();
  }
}

export class HealthBar extends Phaser.Physics.Arcade.Sprite {
  private coinScore: number = 100;
  private health: number;
  private healthValue: number;
  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, 'healthBar');
    scene.physics.world.enable(this);
    this.setScale(1, 1);
    // this.barMove();
    this.scene.add.existing(this);
  }

  public barMove() {
    this.scene.add.tween({
      targets: this,
      x: this.x + 100,
      yoyo: true,
      duration: 2000,
      repeat: -1,
    });
  }

  public setBar(health: number) {
    this.healthValue = health / 10;
  }

  public updateBar(health: number): void {
    let scaleX = this.healthValue * health;

    this.setScale(scaleX / 10, 1);
  }
}

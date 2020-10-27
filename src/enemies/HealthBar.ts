export class HealthBar extends Phaser.Physics.Arcade.Sprite {
  private coinScore: number = 100;
  private size: number
  private health: number;
  private healthValue: number;
  constructor(scene: Phaser.Scene, x: number, y: number,size: number) {
    super(scene, x, y, 'healthBar');
    scene.physics.world.enable(this);
    this.setScale(1, 1);
    this.size = size
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
    this.healthValue = health;
    this.setScale(this.size,1)
  }

  public updateBar(health: number): void {
    let scaleX =  health*this.size;

    this.setScale(scaleX /this.healthValue, 1);
  }
}

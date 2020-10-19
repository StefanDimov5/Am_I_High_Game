export class EnemyPlatformer extends Phaser.Physics.Arcade.Sprite {
  private visibleToCamera: boolean;
  private bullet: Phaser.Physics.Arcade.Sprite;
  private bullets: Phaser.Physics.Arcade.Sprite[] = [];

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, 'hero');
    if (this != undefined) {
      scene.physics.world.enable(this);
      this.setScale(1.5);
      this.setGravityY(700);
      this.setCollideWorldBounds(true);
      this.enemyMove();
      this.flipX = false;
      this.scene.time.addEvent({
        callback: this.shoot,
        repeat: -1,
        delay: 2000,
        callbackScope: this,
      });

      this.scene.add.existing(this);
    }
  }

  public enemyMove() {
    this.scene.add.tween({
      targets: this,
      x: this.x + 100,
      yoyo: true,
      flipX: true,
      duration: 2000,
      repeat: -1,
    });
  }

  public getBullets(): Phaser.Physics.Arcade.Sprite[] {
    return this.bullets;
  }

  public shoot() {
    if (this.isVisibleToCamera)
      if (this.active) {
        this.bullet = this.scene.physics.add.sprite(this.x, this.y, 'knife', 13);
        this.bullet.setSize(16, 8);
        this.bullets.push(this.bullet);
        if (this.flipX) {
          this.bullet.setVelocityX(-500);
        }
        if (!this.flipX) {
          this.bullet.setVelocityX(500);
        }
        this.scene.time.delayedCall(500, () => {
          this.bullet.destroy();
        });
      }
  }

  public enemyDestroy() {
    this.setVisible(false);
    this.setActive(false);
    this.destroy(true);
  }

  public isVisibleToCamera(): void {
    if (this.x > this.scene.cameras.main.x && this.x < this.scene.cameras.main.x + 1600) {
      this.visibleToCamera = true;
    } else {
      this.visibleToCamera = false;
    }
  }
}

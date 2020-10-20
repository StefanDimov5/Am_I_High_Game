import { EnemyPlatformer } from './EnemyPlatformer';
import { HealthBar } from './HealthBar';

export class EnemyPlatformerContainer extends Phaser.GameObjects.Container {
  private enemy: EnemyPlatformer;
  private healthBar: HealthBar;
  private healthBarBack: HealthBar;
  private bullet: Phaser.Physics.Arcade.Sprite;
  private enemyBullets: Phaser.Physics.Arcade.Group;
  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y);
    this.enemy = new EnemyPlatformer(this.scene, 0, 40, this);
    this.healthBarBack = new HealthBar(this.scene, -this.enemy.width / 2, 0).setOrigin(0, 0);
    this.healthBar = new HealthBar(this.scene, -this.enemy.width / 2, 0).setOrigin(0, 0);
    this.healthBar.setBar(this.enemy.getHealthStatus());
    this.healthBarBack.tint = 0x00000;
    this.enemyBullets = this.scene.physics.add.group();
    this.add(this.enemy);
    this.add(this.healthBarBack);
    this.add(this.healthBar);
    // this.scene.time.addEvent({
    //   callback: this.shoot,
    //   repeat: -1,
    //   delay: 2000,
    //   callbackScope: this,
    // });
    // this.bulletGroup();
    this.scene.add.existing(this);
  }

  public getEnemyBullet() {
    return this.enemy.getBullets();
  }

  public isVisible() {
    return this.enemy.isVisibleToCamera();
  }

  public bulletGroup() {
    // this.enemyBullets.forEach((bullet) => {
    //   this.enemyBulletsGroup.add(bullet);
    // });
  }

  public getEnemy(): EnemyPlatformer {
    return this.enemy;
  }

  public enemyMove(): void {
    this.scene.add.tween({
      targets: this,
      x: this.x + 100,
      yoyo: true,
      flipX: true,
      duration: 2000,
      repeat: -1,
    });
  }

  updateBar() {
    this.healthBar.updateBar(this.enemy.getHealthStatus());
    if (!this.enemy.active) {
      this.healthBar.destroy();
      this.healthBarBack.destroy();
    }
    // this.add(this.enemy.getBullets().getChildren());
  }

  public updatePosition() {
    this.healthBar.x = this.enemy.x - this.enemy.width / 2;
    this.healthBar.y = this.enemy.y - 40;
    this.healthBarBack.x = this.enemy.x - this.enemy.width / 2;
    this.healthBarBack.y = this.enemy.y - 40;
  }

  public shoot() {
    if (this.active) {
      this.bullet = this.scene.physics.add.sprite(this.enemy.x, this.enemy.y, 'knife', 13);
      this.bullet.setSize(16, 8);
      this.enemyBullets.add(this.bullet);
      if (this.enemy.flipX) {
        this.bullet.setVelocityX(-500);
      }
      if (!this.enemy.flipX) {
        this.bullet.setVelocityX(500);
      }
      this.scene.time.delayedCall(500, () => {
        this.bullet.destroy();
      });
    }
  }
}

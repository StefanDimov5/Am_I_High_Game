import { EnemyPlatformer } from './EnemyPlatformer';
import { HealthBar } from './HealthBar';

export class EnemyPlatformerContainer extends Phaser.GameObjects.Container {
  private enemy: EnemyPlatformer;
  private healthBar: HealthBar;
  private healthBarBack: HealthBar;
  private bullet: Phaser.Physics.Arcade.Sprite;
  private enemyBullets: Phaser.Physics.Arcade.Group;
  private player
  constructor(scene: Phaser.Scene, x: number, y: number,player) {
    super(scene, x, y,);
    this.player = player
    this.enemy = new EnemyPlatformer(this.scene, 0, 40,this,this.player);
    this.healthBarBack = new HealthBar(this.scene, -this.enemy.width / 2, 0).setOrigin(0, 0);
    this.healthBar = new HealthBar(this.scene, -this.enemy.width / 2, 0).setOrigin(0, 0);
    this.healthBar.setBar(this.enemy.getHealthStatus());
    this.healthBarBack.tint = 0x00000;
    this.enemyBullets = this.scene.physics.add.group();
    this.add(this.enemy);
    this.add(this.healthBarBack);
    this.add(this.healthBar);
    this.scene.add.existing(this);
  }

  public getEnemyBullet() {
    return this.enemy.getBullets();
  }


  public getEnemy(): EnemyPlatformer {
    return this.enemy;
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


}

import { EnemyPlatformer } from './EnemyPlatformer';
import { HealthBar } from './HealthBar';
import { BossTopDown } from './BossTopDown';

export class BossTopDownContainer extends Phaser.GameObjects.Container {
  private boss: BossTopDown;
  private healthBar: HealthBar;
  private healthBarBack: HealthBar;
  private bullet: Phaser.Physics.Arcade.Sprite;
  private enemyBullets: Phaser.Physics.Arcade.Group;
  private healthBarX: number
  private healthBarY: number
  constructor(scene: Phaser.Scene, x: number, y: number,healthBarX,healthBarY) {
    super(scene, x, y);
    this.healthBarX = healthBarX
    this.healthBarY = healthBarY
    this.boss = new BossTopDown(this.scene, 0, 40,this);
    this.healthBarBack = new HealthBar(this.scene,this.healthBarX,this.healthBarY).setOrigin(0, 0).setScale(20,5);
    this.healthBar = new HealthBar(this.scene,this.healthBarX,this.healthBarY).setOrigin(0, 0).setScale(20,5);
    this.healthBar.setBar(this.boss.getHealthStatus());
    this.healthBarBack.tint = 0x00000;
    this.enemyBullets = this.scene.physics.add.group();
    this.add(this.boss);
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
    return this.boss.getBullets();
  }

  public isVisible() {
    return this.boss.isVisibleToCamera();
  }

  public bulletGroup() {
    // this.enemyBullets.forEach((bullet) => {
    //   this.enemyBulletsGroup.add(bullet);
    // });
  }

  public getEnemy(): BossTopDown {
    return this.boss;
  }


  updateBar() {
    this.healthBar.updateBar(this.boss.getHealthStatus());
    if (!this.boss.active) {
      this.healthBar.destroy();
      this.healthBarBack.destroy();
    }
  }

  public updatePosition() {
    this.healthBar.x = this.boss.x - this.boss.width / 2;
    this.healthBar.y = this.boss.y - 40;
    this.healthBarBack.x = this.boss.x - this.boss.width / 2;
    this.healthBarBack.y = this.boss.y - 40;
  }

}

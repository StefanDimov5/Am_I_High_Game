
import { HealthBar } from './HealthBar';
import { BossTopDown } from './BossTopDown';

export class BossTopDownContainer extends Phaser.GameObjects.Container {
  private boss: BossTopDown;
  private healthBar: HealthBar;
  private healthBarBack: HealthBar;
  private bullet: Phaser.Physics.Arcade.Sprite;
  private enemyBullets: Phaser.Physics.Arcade.Group;
  private player
  constructor(scene: Phaser.Scene, x: number, y: number, player, enemyLayer) {
    super(scene, x, y);
    this.player = player
    this.boss = new BossTopDown(this.scene, 0, 40, this, this.player, enemyLayer);
    this.healthBarBack = new HealthBar(this.scene, -this.boss.width / 2, 0, 6).setOrigin(0, 0)
    this.healthBar = new HealthBar(this.scene, -this.boss.width / 2, 0, 6).setOrigin(0, 0);
    this.healthBar.setBar(this.boss.getHealthStatus());

    this.healthBarBack.setBar(this.boss.getHealthStatus())
    this.healthBarBack.tint = 0x00000;
    this.enemyBullets = this.scene.physics.add.group();
    this.add(this.boss);
    this.add(this.healthBarBack);
    this.add(this.healthBar);
    this.scene.add.existing(this);
  }

  public getBoss(): BossTopDown {
    return this.boss;
  }


  public updateBar(): void {
    this.healthBar.updateBar(this.boss.getHealthStatus());
    if (!this.boss.active) {
      this.healthBar.destroy();
      this.healthBarBack.destroy();
    }
  }

  public updatePosition() {
    this.healthBar.x = this.boss.x - this.boss.displayWidth / 2;
    this.healthBar.y = this.boss.y - 40;
    this.healthBarBack.x = this.boss.x - this.boss.displayWidth / 2;
    this.healthBarBack.y = this.boss.y - 40;
  }

  public update(): void {
    this.updateBar()
    this.updatePosition()
  }

}

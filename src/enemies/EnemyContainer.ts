
import { IsPlayer } from '../Player/IsPlayer';
import { Enemy } from './Enemy';
import { HealthBar } from './HealthBar';

export class EnemyContainer extends Phaser.GameObjects.Container {
  private enemy: Enemy;
  private healthBar: HealthBar;
  private healthBarBack: HealthBar;
  private bullet: Phaser.Physics.Arcade.Sprite;
  private enemyBullets: Phaser.Physics.Arcade.Group;
  private player: IsPlayer;
  constructor(scene: Phaser.Scene, x: number, y: number,player: IsPlayer,range: number) {
    super(scene, x, y,);
    this.player = player
    this.enemy = new Enemy(this.scene, 0, 70,this,this.player,range);
    this.healthBarBack = new HealthBar(this.scene, -this.enemy.width / 2, 0,2).setOrigin(0, 0);
    this.healthBar = new HealthBar(this.scene, -this.enemy.width / 2, 0,2).setOrigin(0, 0);
    
    this.healthBarBack.setBar(this.enemy.getHealthStatus());
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


  public getEnemy(): Enemy {
    return this.enemy;
  }


  public getHealthBar(): HealthBar {
    return this.healthBar,this.healthBarBack
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
    this.healthBar.y = this.enemy.y - 60;
    this.healthBarBack.x = this.enemy.x - this.enemy.width / 2;
    this.healthBarBack.y = this.enemy.y - 60;
  }


}

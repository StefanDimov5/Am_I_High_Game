import { IsPlayer } from "../Player/IsPlayer";

export class EnemyKamikaze extends Phaser.Physics.Arcade.Sprite {
  private health: number = 10;
  private targetX
  private targetY

  constructor(scene: Phaser.Scene, x: number, y: number,targetX,targetY) {
    super(scene, x, y, 'hero');
    this.targetX = targetX
    this.targetY = targetY

    if (this != undefined) {
      scene.physics.world.enable(this);
      this.setScale(1.5);
      this.setCollideWorldBounds(true);
    //   this.enemyAttack();
      this.flipX = false;

      this.scene.add.existing(this);
    }
  }


  public reset(){
      this.x = 1400,
      this.y = Phaser.Math.Between(0,900)
      this.enemyAttack()
  }

  public enemyAttack() {
        if (this.active) {
          this.scene.physics.moveToObject(this,{x:this.targetX,y:this.targetY}, 250)
        }
  }

  public getHealthStatus(): number {
    return this.health;
  }

  public enemyDestroy() {
    this.setVisible(false);
    this.setActive(false);
    this.destroy(true);
  }
}
import { IsPlayer } from "../Player/IsPlayer";

export class EnemyKamikaze extends Phaser.Physics.Arcade.Sprite {
  private health: number = 10;
  private targetX
  private targetY

  constructor(scene: Phaser.Scene, x: number, y: number,targetX,targetY) {
    super(scene, x, y, 'enemy');
    this.targetX = targetX
    this.targetY = targetY
    this.play("enemyIdle",true)

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

  public enemyAnimsInit() {
    this.scene.anims.create({
      key: 'enemyIdle',
      frameRate:15,
      frames: this.scene.anims.generateFrameNames('enemy', {
        start: 1,
        end: 24,
      }),
      repeat: -1,
    });
  }


  public enemyDestroy() {
    this.setVisible(false);
    this.setActive(false);
    this.destroy(true);
  }
}
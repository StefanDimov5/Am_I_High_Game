import { AudioManager } from "../audio/AudioManager";
import { IsPlayer } from "../Player/IsPlayer";

export class Enemy extends Phaser.Physics.Arcade.Sprite {
  private visibleToCamera: boolean;
  private bullet: Phaser.Physics.Arcade.Sprite;
  private bullets: Phaser.Physics.Arcade.Group;
  private health: number = 10;
  private container;
  private rt
  private canShoot: boolean = false
  private target: IsPlayer
  private alive = false
  private range: number

  constructor(scene: Phaser.Scene, x: number, y: number, container, target: IsPlayer, range: number) {
    super(scene, x, y, 'enemy');
    this.container = container;
    this.target = target
    this.range = range
    if (this != undefined) {
      scene.physics.world.enable(this);
      this.setScale(0.7);
      this.enemyAnimsInit()
      this.setSize(91, 92)
      this.setGravityY(700);
      this.setCollideWorldBounds(true);
      this.enemyMove();
      this.flipX = true;
      this.scene.time.addEvent({
        callback: this.shoot,
        repeat: -1,
        delay: 2000,
        callbackScope: this,
      });
      this.bullets = this.scene.physics.add.group();
      this.play("enemyIdle", true)
      this.scene.add.existing(this);
    }
  }

  public isAlive(): boolean {
    return this.alive
  }

  public setHealth(): void {
    this.health = 10
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

  public getBullets(): Phaser.Physics.Arcade.Group {
    return this.bullets;
  }

  public shoot() {
    if (this.canShoot) {

      if (this.container.visible) {
        if (this.active) {
          this.bullet = this.scene.physics.add.sprite(this.x + this.container.x, this.y + this.container.y, 'bullet', 1);
          this.bullet.setSize(16, 8);
          this.bullets.add(this.bullet);
          this.scene.physics.moveToObject(this.bullet, this.target, 250)

        }
      }
    }
  }

  public takeDamage(damage: number): void {
    this.health -= damage;
    AudioManager.getInstance(this.scene).playHurt()
    if (this.health <= 0) {
      this.enemyDestroy();
    }
  }

  public canShootPlayer() {
    if ((this.x + this.container.x) - this.target.x < this.range && (this.x + this.container.x) - this.target.x > -this.range && (this.y + this.container.y) - this.target.y < this.range && (this.y + this.container.y) - this.target.y > -this.range) {
      this.canShoot = true
    } else {
      this.canShoot = false
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

  public enemyAnimsInit() {
    this.scene.anims.create({
      key: 'enemyIdle',
      frameRate: 15,
      frames: this.scene.anims.generateFrameNames('enemy', {
        start: 1,
        end: 24,
      }),
      repeat: -1,
    });
  }

}

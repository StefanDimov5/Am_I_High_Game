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

  constructor(scene: Phaser.Scene, x: number, y: number, container,target: IsPlayer, range: number) {
    super(scene, x, y, 'hero');
    this.container = container;
    this.target = target
    this.range = range
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
      this.bullets = this.scene.physics.add.group();

      this.scene.add.existing(this);
    }
  }

  public isAlive():boolean{
    return this.alive
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
    if(this.canShoot){
      
      if (this.container.visible) {
        if (this.active) {
          this.bullet = this.scene.physics.add.sprite(this.x + this.container.x, this.y + this.container.y, 'knife', 13);
          
          this.bullet.setSize(16, 8);
          this.bullets.add(this.bullet);
          this.scene.physics.moveToObject(this.bullet,this.target, 250)

        }
      }
    }
  }

  public takeDamage(damage: number): void {
    this.health -= damage;
    if (this.health <= 0) {
      this.enemyDestroy();
    }
  }

  public canShootPlayer() {
    if((this.x + this.container.x) - this.target.x <this.range &&(this.x + this.container.x) - this.target.x >-this.range&&(this.y + this.container.y) - this.target.y <this.range &&(this.y + this.container.y) - this.target.y >-this.range){
        this.canShoot = true 
    }else {
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
}

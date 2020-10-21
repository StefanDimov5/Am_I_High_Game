export class BossTopDown extends Phaser.Physics.Arcade.Sprite {
    private visibleToCamera: boolean;
    private bullet: Phaser.Physics.Arcade.Sprite;
    private bullets: Phaser.Physics.Arcade.Group;
    private health: number = 10;
    private container;
    private rt
  
    constructor(scene: Phaser.Scene, x: number, y: number,container) {
      super(scene, x, y, 'bossIdle',1);
      this.container = container
        scene.physics.world.enable(this);
        this.setScale(0.2);
        this.flipX = true;
        this.setCollideWorldBounds(true);
        this.enemyMove();

        this.scene.time.addEvent({
          callback: this.shoot,
          repeat: -1,
          delay: 500,
          callbackScope: this,
        });

        this.bullets = this.scene.physics.add.group();
  
        this.scene.add.existing(this);
    }
  
    public enemyMove() {
      this.scene.add.tween({
        targets: this,
        y: 600,
        yoyo: true,
        duration: 4000,
        repeat: -1,
      });
    }
  
    public getBullets(): Phaser.Physics.Arcade.Group {
      return this.bullets;
    }
  
    public shoot() {
      if (this.isVisibleToCamera) {
        if (this.active) {
          this.bullet = this.scene.physics.add.sprite(this.x + this.container.x, this.y + this.container.y, 'knife', 13);
          this.bullet.setSize(16, 8);
          this.bullets.add(this.bullet);
            this.bullet.setVelocityX(-1000);
        }
      }
    }
  
    public enemyShoot(): void {
        this.scene.time.addEvent({
            callback: this.shoot,
            repeat: -1,
            delay: 500,
            callbackScope: this,
          });
    }
    public takeDamage(damage: number): void {
      this.health -= damage;
      if (this.health <= 0) {
        this.enemyDestroy();
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
  
    public isVisibleToCamera(): void {
      if (this.active) {
        if (this.x > this.scene.cameras.main.x && this.x < this.scene.cameras.main.x + 1600) {
          this.visibleToCamera = true;
        } else {
          this.visibleToCamera = false;
        }
      }
    }
  }
  
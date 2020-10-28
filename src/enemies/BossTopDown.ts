import { AudioManager } from "../audio/AudioManager";
import { Enemy } from "./Enemy";
import { EnemyContainer } from "./EnemyContainer";


export class BossTopDown extends Phaser.Physics.Arcade.Sprite {
  private visibleToCamera: boolean;
  private bullet: Phaser.Physics.Arcade.Sprite;
  private bullets: Phaser.Physics.Arcade.Group;
  private health: number = 80;
  private container;
  private player
  private shootAttack2Delay: number = 1000
  private shootStatus: boolean = false
  private shootingEvent: Phaser.Time.TimerEvent
  private shootingEvent2: Phaser.Time.TimerEvent
  private enemies: Enemy[] = []
  private enemyContainers: EnemyContainer[] = []
  private enemyLayer: Phaser.Tilemaps.ObjectLayer

  constructor(scene: Phaser.Scene, x: number, y: number, container, player, enemyLayer: Phaser.Tilemaps.ObjectLayer) {
    super(scene, x, y, 'bossIdle', 1);
    this.container = container;
    this.player = player;
    this.enemyLayer = enemyLayer;
    scene.physics.world.enable(this);
    this.setScale(0.2);
    this.flipX = true;
    this.setCollideWorldBounds(true);
    this.enemyMove();
    this.enemySpawn();

    this.shootingEvent = this.scene.time.addEvent({
      callback: this.shootAttack1,
      repeat: -1,
      delay: 500,
      callbackScope: this,
    });

    this.shootingEvent2 = this.scene.time.addEvent({
      callback: this.shootAttack2,
      repeat: -1,
      delay: this.shootAttack2Delay,
      callbackScope: this,
      paused: true
    });

    this.scene.time.addEvent({
      callback: this.shootingTimer,
      repeat: -1,
      delay: 1000,
      callbackScope: this
    });




    this.bullets = this.scene.physics.add.group();

    this.scene.add.existing(this);
  }

  public enemyMove(): void {
    this.scene.add.tween({
      targets: this,
      y: 600,
      yoyo: true,
      duration: 4000,
      repeat: 1,
    });
  }

  public shootingTimer(): void {
    if (this.phase2()) {
      console.log(this.health);

      this.shootingEvent2.paused = true;
      this.enemyContainers.forEach((enemyContainer) => {
        enemyContainer.setVisible(true);
        enemyContainer.getEnemy().visible = true;
      })
      this.shootingEvent.paused = true;
    }
  }

  public phase2(): boolean {
    if (this.health <= 40) {
      return true;
    } else {
      return false;
    }
  }


  public getBullets(): Phaser.Physics.Arcade.Group {
    return this.bullets;
  }

  public shootAttack2Start(): void {
    let deadEnemiesCount: number = 0;
    this.enemies.forEach((enemy) => {
      if (!enemy.active) {
        deadEnemiesCount++;
      }
    })
    if (deadEnemiesCount == this.enemies.length) {
      this.shootingEvent2.paused = false;
      this.active = true;
    }
  }
  public canShoot(): void {
    let deadCount: number = 0;
    this.enemyContainers.forEach((enemyContainer) => {
      if (!enemyContainer.getEnemy().active) {
        deadCount++;
      }
    });
    if (deadCount == this.enemyContainers.length) {
      this.shootingEvent2.paused = false;
    }
  }

  public enemySpawn(): void {
    this.enemyLayer.objects.forEach((enemyObj) => {
      if (enemyObj.name == 'EnemySpawn') {
        let enemyContainer = new EnemyContainer(this.scene, enemyObj.x, enemyObj.y - 100, this.player, 1000);
        this.enemies.push(enemyContainer.getEnemy().setGravityY(0));
        this.enemyContainers.push(enemyContainer);
        enemyContainer.setVisible(false);
        enemyContainer.getEnemy().setVisible(false);
      }
    });
  }

  public getEnemyContainers(): EnemyContainer[] {
    return this.enemyContainers;
  }

  public getEnemies(): Enemy[] {
    return this.enemies;
  }


  public shootAttack1(): void {
    if (this.active) {
      this.bullet = this.scene.physics.add.sprite(this.x + this.container.x, this.y + this.container.y, 'bullet', 1);
      this.bullets.add(this.bullet);
      this.scene.physics.moveTo(this.bullet, this.player.x, this.player.y, 500);
      this.bullet.setSize(16, 8);
    }

  }

  public shootAttack2(): void {
    if (this.active) {
      let bullet = this.scene.physics.add.sprite(this.x + this.container.x, this.y + this.container.y + 200, 'bullet', 1);
      let bullet2 = this.scene.physics.add.sprite(this.x + this.container.x, this.y + this.container.y - 200, 'bullet', 1);
      this.bullets.add(bullet);
      this.bullets.add(bullet2);
      this.scene.physics.moveTo(bullet, this.player.x, this.player.y, 500);
      this.scene.physics.moveTo(bullet2, this.player.x, this.player.y, 500);
      bullet.setSize(16, 8);
      bullet2.setSize(16, 8);
    }

  }

  public enemyUpdate(): void {
    if (this.enemyContainers.length > 0) {
      this.enemyContainers.forEach((enemyContainer) => {
        enemyContainer.updateBar();
        enemyContainer.updatePosition();
        enemyContainer.getEnemy().canShootPlayer();
      });
    }
  }

  public enemyShoot(): void {
    this.scene.time.addEvent({
      callback: this.shootAttack1,
      repeat: -1,
      delay: 500,
      callbackScope: this,
    });
  }

  public takeDamage(damage: number): void {
    this.health -= damage;
    AudioManager.getInstance(this.scene).playHurt()
    if (this.health <= 0) {
      this.scene.scene.stop()
      this.scene.scene.start("MainMenu")
    }
  }

  public getHealthStatus(): number {
    return this.health;
  }

  public enemyDestroy(): void {
    this.setVisible(false);
    this.setActive(false);
  }
}

import { IsPlayer } from '../IsPlayer';
import { PlayerStats } from '../PlayerStats';

export class PlayerTopDown extends Phaser.Physics.Arcade.Sprite implements IsPlayer {
  private playerStats: PlayerStats;
  private bullet: Phaser.Physics.Arcade.Sprite;
  private bullets: Phaser.Physics.Arcade.Group;
  private damage: number = 5;
  private canShoot: boolean = true;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, 'mainHero');
    scene.physics.world.enable(this);
    this.setScale(1);
    this.setSize(32, 64);

    this.setCollideWorldBounds(true);
    this.playerStats = new PlayerStats(this);
    this.bullets = this.scene.physics.add.group();

    this.playerAnimsInit();
    this.scene.add.existing(this);
  }

  public getBullet() {
    return this.bullets;
  }

  public getPlayerStats(): PlayerStats {
    return this.playerStats;
  }

  public getDamage(): number {
    return this.damage;
  }
  public controlls() {
    let keys = this.scene.input.keyboard.createCursorKeys();
    let W = this.scene.input.keyboard.addKey('W');
    let A = this.scene.input.keyboard.addKey('A');
    let D = this.scene.input.keyboard.addKey('D');
    let S = this.scene.input.keyboard.addKey('S');
    let C = this.scene.input.keyboard.addKey('C');
    if (this.active) {
      this.setVelocity(0, 0);
      if (keys.up.isDown || A.isDown) {
        this.setVelocityY(-400);
        this.play('mainHeroRun', true);
      } else if (keys.down.isDown || S.isDown) {
        this.setVelocityY(400);
        this.play('mainHeroRun', true);
      }

      if (keys.left.isDown || A.isDown) {
        this.setVelocityX(-400);
        this.flipX = true;
        this.play('mainHeroRun', true);
      } else if (keys.right.isDown || D.isDown) {
        this.setVelocityX(400);
        this.flipX = false;
        this.play('mainHeroRun', true);
      } else {
        if (this.anims.getCurrentKey() != 'mainHeroShoot') {
          this.play('mainHeroIdle');
        }
      }
    }
    if (Phaser.Input.Keyboard.JustDown(C)) {
      if (this.canShoot) {
        this.canShoot = false;
        this.bullet = this.scene.physics.add.sprite(this.x, this.y, 'knife', 13);
        this.bullet.setSize(16, 8);
        this.bullets.add(this.bullet);
        this.scene.time.delayedCall(500, () => {
          this.bullet.destroy();
        });
        if (this.flipX) {
          this.bullet.setVelocityX(-500);
        }
        if (!this.flipX) {
          this.bullet.setVelocityX(500);
        }
        this.play('mainHeroShoot', true);
        this.scene.time.delayedCall(
          500,
          () => {
            this.canShoot = true;
          },
          null,
          this
        );
      }
    }
  }

  public playerAnimsInit() {
    this.scene.anims.create({
      key: 'mainHeroIdle',
      frameRate: 4,
      frames: this.scene.anims.generateFrameNames('mainHero', {
        start: 1,
        end: 4,
      }),
      repeat: -1,
    });
    this.scene.anims.create({
      key: 'mainHeroRun',
      frameRate: 10,
      frames: this.scene.anims.generateFrameNames('mainHero', {
        start: 6,
        end: 8,
      }),
      repeat: -1,
    });
    this.scene.anims.create({
      key: 'mainHeroShoot',
      frameRate: 15,
      frames: this.scene.anims.generateFrameNames('mainHero', {
        start: 9,
        end: 13,
      }),
    });
  }

  public die(): void {
    this.setActive(false);
    this.setAlpha(0.5);
  }
}
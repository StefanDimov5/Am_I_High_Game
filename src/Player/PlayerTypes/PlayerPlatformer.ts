import { IsPlayer } from '../IsPlayer';
import { PlayerStats } from '../PlayerStats';

export class PlayerPlatformer extends Phaser.Physics.Arcade.Sprite implements IsPlayer {
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
    this.setGravityY(700);
    this.setCollideWorldBounds(true);
    this.playerStats = new PlayerStats(this);
    this.bullets = this.scene.physics.add.group();

    this.playerAnimsInit();
    this.scene.add.existing(this);
  }

  public getBullets() {
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
    let C = this.scene.input.keyboard.addKey('C');
    if (this.active) {
      if (keys.left.isDown || A.isDown) {
        this.setVelocityX(-400);
        if (this.body.blocked.down) {
          this.play('mainHeroRun', true);
        }
      } else if (keys.right.isDown || D.isDown) {
        this.setVelocityX(400);
        if (this.body.blocked.down) {
          this.play('mainHeroRun', true);
        }
      } else {
        if (this.anims.getCurrentKey() != 'mainHeroShoot') {
          this.play('mainHeroIdle');
        }
      }

      if ((keys.space.isDown || W.isDown) && (this.body.blocked.down || this.body.blocked.left || this.body.blocked.right)) {
        this.setVelocityY(-500);
      }
      this.scene.input.on("pointerdown",(pointer)=>{
        if (this.canShoot) {
          this.canShoot = false;
            this.bullet = this.scene.physics.add.sprite(this.x, this.y, 'bullet', 1);
          this.bullet.setSize(16, 8);
          this.bullets.add(this.bullet);
          this.scene.physics.moveTo(this.bullet,this.scene.cameras.main.getWorldPoint(pointer.x,pointer.y).x,this.scene.cameras.main.getWorldPoint(pointer.x,pointer.y).y , 1000);
          // this.scene.time.delayedCall(500, () => {
            //   this.bullet.destroy();
            // });
            
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
        )
        this.scene.input.on("pointermove",(pointer)=>{
          if(this.x > this.scene.cameras.main.getWorldPoint(pointer.x,pointer.y).x){
            this.flipX = true
          }else{
            this.flipX = false
          }
        }
          )
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
import { IsPlayer } from '../IsPlayer';
import { PlayerStats } from '../PlayerStats';

export class PlayerPlatformer extends Phaser.Physics.Arcade.Sprite implements IsPlayer {
  private playerStats: PlayerStats;
  private bullet: Phaser.Physics.Arcade.Sprite;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, 'hero');
    scene.physics.world.enable(this);
    this.setScale(1.7);
    this.setGravityY(700);
    this.setCollideWorldBounds(true);
    this.playerStats = new PlayerStats(this);
    this.scene.add.existing(this);
  }

  public getBullet() {
    return this.bullet;
  }

  public getPlayerStats(): PlayerStats {
    return this.playerStats;
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
        this.flipX = true;
      } else if (keys.right.isDown || D.isDown) {
        this.setVelocityX(400);
        this.flipX = false;
      }

      if ((keys.space.isDown || W.isDown) && (this.body.blocked.down || this.body.blocked.left || this.body.blocked.right)) {
        this.setVelocityY(-500);
      }
      if (Phaser.Input.Keyboard.JustDown(C)) {
        this.bullet = this.scene.physics.add.sprite(this.x, this.y, 'knife', 13);
        this.bullet.setSize(16, 8);
        this.scene.time.delayedCall(500, () => {
          this.bullet.destroy();
        });
        if (this.flipX) {
          this.bullet.setVelocityX(-500);
        }
        if (!this.flipX) {
          this.bullet.setVelocityX(500);
        }
      }
    }
  }

  public die(): void {
    this.setActive(false);
    this.setAlpha(0.5);
  }
}

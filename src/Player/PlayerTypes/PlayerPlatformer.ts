import { PlayerStats } from '../PlayerStats';

export class PlayerPlatformer extends Phaser.Physics.Arcade.Sprite {
  private playerStats: PlayerStats;
  private weapon: Phaser.Physics.Arcade.Sprite;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, 'hero');
    scene.physics.world.enable(this);
    this.setScale(2);
    this.setGravityY(700);
    this.setCollideWorldBounds(true);
    this.scene.add.existing(this);
  }

  public getWeapon() {
    return this.weapon;
  }

  public controlls() {
    let keys = this.scene.input.keyboard.createCursorKeys();
    let W = this.scene.input.keyboard.addKey('W');
    let A = this.scene.input.keyboard.addKey('A');
    let D = this.scene.input.keyboard.addKey('D');
    let C = this.scene.input.keyboard.addKey('C');
    if (keys.left.isDown || A.isDown) {
      this.setVelocityX(-400);
      this.flipX = true;
    } else if (keys.right.isDown || D.isDown) {
      this.setVelocityX(400);
      this.flipX = false;
    }

    if ((keys.space.isDown || W.isDown) && this.body.blocked.down) {
      this.setVelocityY(-500);
    }
    if (Phaser.Input.Keyboard.JustDown(C)) {
      this.weapon = this.scene.physics.add.sprite(this.x, this.y, 'knife', 13);
      if (this.flipX) {
        this.weapon.setVelocityX(-500);
      }
      if (!this.flipX) {
        this.weapon.setVelocityX(500);
      }
    }
  }
}

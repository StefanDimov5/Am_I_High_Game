import { World } from 'matter';
import { PlayerStats } from '../../Player/PlayerStats';
import { PlayerPlatformer } from '../../Player/PlayerTypes/PlayerPlatformer';

export class MainPlatformer extends Phaser.Scene {
  private playerStats: PlayerStats;
  private playerPlatformer: PlayerPlatformer;
  constructor() {
    super('MainPlatformer');
  }
  create() {
    let map = this.make.tilemap({ key: 'map' });
    let terrain = map.addTilesetImage('mainlevbuild2', 'map_atlas');
    let platforms = map.createStaticLayer('mainMap', terrain, 0, 0);
    let grass = map.createStaticLayer('inFront', terrain, 0, 0);

    this.physics.world.setBounds(0, 0, platforms.width, platforms.height);
    this.playerStats = new PlayerStats(500, 400);

    this.playerPlatformer = new PlayerPlatformer(this, this.playerStats.getX(), this.playerStats.getY());

    platforms.setCollisionByProperty({ collides: true });
    platforms.setCollisionBetween(1, 10000, true, true);

    this.physics.add.collider(this.playerPlatformer, platforms);
    this.cameras.main.startFollow(this.playerPlatformer);
    this.cameras.main.setBounds(0, 0, platforms.width, platforms.height);
  }

  update() {
    this.playerPlatformer.setVelocityX(0);
    this.playerPlatformer.controlls();
  }
}

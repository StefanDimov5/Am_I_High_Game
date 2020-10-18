import { World } from 'matter';
import { EnemyPlatformer } from '../../enemies/EnemyPlatformer';
import { PlayerStats } from '../../Player/PlayerStats';
import { PlayerPlatformer } from '../../Player/PlayerTypes/PlayerPlatformer';

export class MainPlatformer extends Phaser.Scene {
  private playerStats: PlayerStats;
  private playerPlatformer: PlayerPlatformer;
  private enemies: EnemyPlatformer[] = [];
  constructor() {
    super('MainPlatformer');
  }
  create() {
    let map = this.make.tilemap({ key: 'map' });
    let terrain = map.addTilesetImage('mainlevbuild2', 'map_atlas');
    let platforms = map.createStaticLayer('mainMap', terrain, 0, 0);
    let grass = map.createStaticLayer('inFront', terrain, 0, 0);
    let objLayer = map.getObjectLayer('Objects');
    // this.enemies = this.physics.add.group();
    let enemiesObj = objLayer.objects.forEach((enemyObj) => {
      if (enemyObj.name == 'Enemy') {
        let enemy = new EnemyPlatformer(this, enemyObj.x, enemyObj.y);
        this.enemies.push(enemy);
        enemy.setGravityY(700);
      }
    });

    let coinsObj = objLayer.objects.forEach((coinObj) => {
      if (coinObj.name == 'coin') {
        let coin = this.physics.add.sprite(coinObj.x, coinObj.y, 'coin');
      }
    });

    console.log(objLayer.objects.length - this.enemies.length);

    this.physics.world.setBounds(0, 0, platforms.width, platforms.height);
    this.playerStats = new PlayerStats(500, 400);

    this.playerPlatformer = new PlayerPlatformer(this, this.playerStats.getX(), this.playerStats.getY());

    platforms.setCollisionByProperty({ collides: true });
    platforms.setCollisionBetween(1, 10000, true, true);

    this.physics.add.collider(this.playerPlatformer, platforms);

    this.physics.add.collider(this.enemies, platforms);
    this.cameras.main.startFollow(this.playerPlatformer);
    this.cameras.main.setBounds(0, 0, platforms.width, platforms.height);
  }

  update() {
    this.playerPlatformer.setVelocityX(0);
    this.playerPlatformer.controlls();
    this.enemies.forEach((enemy) => {
      enemy.isVisibleToCamera;
    });
  }
}

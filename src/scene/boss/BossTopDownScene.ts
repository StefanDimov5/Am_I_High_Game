import { World } from 'matter';
import { Tilemaps } from 'phaser';
import { Coin } from '../../items/Coin';
import { GameApp } from '../../game';
import { PlayerStats } from '../../Player/PlayerStats';
import { PlayerPlatformer } from '../../Player/PlayerTypes/PlayerPlatformer';
import { PlayerTopDown } from '../../Player/PlayerTypes/PlayerTopDown';
import { Chest } from '../../items/Chest';
import { BossTopDown } from '../../enemies/BossTopDown';
import { BossTopDownContainer } from '../../enemies/BossTopDownContainer';
import { Enemy } from '../../enemies/Enemy';

export class BossTopDownScene extends Phaser.Scene {
  private playerStats: PlayerStats;
  private chestQuantityText: Phaser.GameObjects.Text;
  private healthText: Phaser.GameObjects.Text;
  private playerTopDown: PlayerTopDown;
  private chests: Chest[] = [];
  private bg1: Phaser.GameObjects.TileSprite;
  private bg2: Phaser.GameObjects.TileSprite;
  private bg3: Phaser.GameObjects.TileSprite;
  private bg4: Phaser.GameObjects.TileSprite;
  private rt;
  private vision;

  private minimap;
  private boss: BossTopDownContainer
  private map: Tilemaps.Tilemap;
  private ground: Tilemaps.StaticTilemapLayer;
  private walls: Tilemaps.StaticTilemapLayer;
  private objLayer: Tilemaps.ObjectLayer;
  private playerSpawnObj: Phaser.GameObjects.Sprite;
  private enemyContainers

  constructor() {
    super('BossTopDownScene');
  }

  create() {
    this.createTileMap()
    
    
    this.playerTopDown = new PlayerTopDown(this, 100, 300);
    this.boss = new BossTopDownContainer(this,1400,100,this.playerTopDown, this.objLayer)
    this.collisions()
    this.enemyContainers =  this.boss.getBoss().getEnemyContainers()
  }

  update() {
    this.playerTopDown.controlls();
    this.boss.getBoss().enemyUpdate()
    this.boss.getBoss().canShoot()
    this.boss.getBoss().shootAttack2Start()
    this.boss.getBoss().phase2()
    this.boss.update()
    this.boss.getBoss().getEnemyContainers().forEach((enemyContainer) => {
      enemyContainer.updateBar();
      enemyContainer.updatePosition();
      enemyContainer.getEnemy().canShootPlayer()
    });
  }

  public createTileMap(): void {
    this.map = this.make.tilemap({ key: 'BossTopDownMap' });
    let terrain = this.map.addTilesetImage('mainlevbuild', 'mapAtlasTopDown');
    this.ground = this.map.createStaticLayer('Ground', terrain, 0, 0);
    this.walls = this.map.createStaticLayer('Walls', terrain, 0, 0);


    // let grass = this.map.createStaticLayer('inFront', terrain, 0, 0);
    this.objLayer = this.map.getObjectLayer('Objects');
    this.physics.world.setBounds(0, 0, this.walls.width, this.walls.height);

    this.walls.setCollisionByProperty({ collides: true });
    this.walls.setCollisionBetween(1, 600, true, true);
  }

  public collisions() {
    this.physics.add.collider(this.playerTopDown, this.walls);
    this.physics.add.collider(this.boss, this.walls);
    this.bulletCollisions()
  }

  public bulletCollisions() {
      this.physics.add.overlap(this.playerTopDown.getBullet(), this.boss.getBoss(), this.playerShootCollide, null, this);

      this.physics.add.overlap(this.playerTopDown.getBullet(), this.boss.getBoss().getEnemies(), this.playerShootCollide, null, this);
      this.physics.add.collider(this.playerTopDown.getBullet(), this.walls, this.bulletHit, null, this);
      this.boss.getBoss().getEnemyContainers().forEach((enemy) => {
          this.physics.add.overlap(enemy.getEnemyBullet(), this.playerTopDown, this.enemyShootCollide, null, this);
          this.physics.add.collider(enemy.getEnemyBullet(), this.walls, this.bulletHit, null, this);
        });
  }

  public playerShootCollide( enemy: Enemy,bullet) {
    if(enemy.visible){
      bullet.destroy();

  enemy.takeDamage(this.playerTopDown.getDamage());

}
    console.log(enemy.getHealthStatus());
  }

  public enemyShootCollide(player: PlayerTopDown, bullet: Phaser.Physics.Arcade.Sprite) {
    bullet.destroy();
    player.getPlayerStats().hurt();
  }

  public bulletHit(bullet: Phaser.Physics.Arcade.Sprite, platforms) {
    bullet.destroy();
  }

  public setUI(): void {
    this.add.image(10, 40, 'heart').setScale(0.7).setOrigin(0).setScrollFactor(0);
    this.healthText = this.add.text(60, 40, `${this.playerTopDown.getPlayerStats().getHealth()}`).setFontSize(50).setOrigin(0).setScrollFactor(0);
  }

  public updateUi(): void {
    this.healthText.text = this.playerTopDown.getPlayerStats().getHealth().toString();
  }

}
  
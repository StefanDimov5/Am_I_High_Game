import { World } from 'matter';
import { Tilemaps } from 'phaser';
import { Coin } from '../../items/Coin';
import { EnemyPlatformer } from '../../enemies/EnemyPlatformer';
import { EnemyPlatformerContainer } from '../../enemies/EnemyPlatformerContainer';
import { GameApp } from '../../game';
import { PlayerStats } from '../../Player/PlayerStats';
import { PlayerPlatformer } from '../../Player/PlayerTypes/PlayerPlatformer';
import { PlayerTopDown } from '../../Player/PlayerTypes/PlayerTopDown';
import { Chest } from '../../items/Chest';

export class MainTopDown extends Phaser.Scene {
  private playerStats: PlayerStats;
  private coinScoreText: Phaser.GameObjects.Text;
  private chestQuantity: number = 0;
  private chestQuantityText: Phaser.GameObjects.Text;
  private healthText: Phaser.GameObjects.Text;
  private playerTopDown: PlayerTopDown;
  private enemyPlatformer: EnemyPlatformer;
  private enemyContainer: EnemyPlatformerContainer;
  private enemies: EnemyPlatformer[] = [];
  private enemiesContainers: EnemyPlatformerContainer[] = [];
  private chests: Chest[] = [];
  private bg1: Phaser.GameObjects.TileSprite;
  private bg2: Phaser.GameObjects.TileSprite;
  private bg3: Phaser.GameObjects.TileSprite;
  private bg4: Phaser.GameObjects.TileSprite;
  private rt;
  private vision;

  private minimap;

  private map: Tilemaps.Tilemap;
  private ground: Tilemaps.StaticTilemapLayer;
  private walls: Tilemaps.StaticTilemapLayer;
  private objLayer: Tilemaps.ObjectLayer;
  private playerSpawnObj: Phaser.GameObjects.Sprite;

  constructor() {
    super('MainTopDown');
  }

  create() {
    this.createTileMap();
    this.chestSpawn();
    this.playerSpawn();
    this.enemySpawn();
    
    this.rt = this.make.renderTexture(
      {
        width: 3200,
        height: 912,
      },
      true
      );
      
      this.rt.fill(0x000000, 1);
      
      
      // // set a dark blue tint
      this.rt.draw(this.ground, this.chests, this.enemies);
      this.rt.setTint(0x000000);
      this.vision = this.make.image({
        x: this.playerTopDown.x,
        y: this.playerTopDown.y,
        key: 'light',
        add: false,
      });
      this.vision.scale = 1;
      
      this.rt.mask = new Phaser.Display.Masks.BitmapMask(this, this.vision);
      this.rt.mask.invertAlpha = true;
      this.setUI();
    this.collisions();
    this.cameraSetup();
    this.bulletCollisions();
  }

  update() {

    this.enemiesContainers.forEach((enemyContainer) => {
      enemyContainer.updateBar();
      enemyContainer.updatePosition();
      enemyContainer.getEnemy().canShootPlayer()
    });
    if (this.vision) {
      this.vision.x = this.playerTopDown.x;
      this.vision.y = this.playerTopDown.y;
    }
    this.playerTopDown.controlls();
    this.updateUi();
  }

  public createTileMap(): void {
    this.map = this.make.tilemap({ key: 'mapTopDown' });
    let terrain = this.map.addTilesetImage('mainlevbuild', 'mapAtlasTopDown');
    this.ground = this.map.createStaticLayer('Ground', terrain, 0, 0);
    let groundItems = this.map.createStaticLayer('GroundItems', terrain, 0, 0);
    this.walls = this.map.createStaticLayer('Walls', terrain, 0, 0);

    let overPlayer = this.map.createStaticLayer('OverPlayer', terrain, 0, 0);

    // let grass = this.map.createStaticLayer('inFront', terrain, 0, 0);
    this.objLayer = this.map.getObjectLayer('Objects');
    this.physics.world.setBounds(0, 0, this.walls.width, this.walls.height);

    this.walls.setCollisionByProperty({ collides: true });
    this.walls.setCollisionBetween(1, 600, true, true);
  }

  public cameraSetup(): void {
    this.cameras.main.startFollow(this.playerTopDown);
    this.cameras.main.setBounds(0, 0, this.walls.width, this.walls.height);
  }

  public collisions(): void {
    this.physics.add.collider(this.playerTopDown, this.walls);
    this.physics.add.collider(this.chests, this.walls);
    this.physics.add.collider(this.enemies, this.walls);
    this.physics.add.overlap(this.playerTopDown, this.chests, this.playerChestCollect, null, this);
  }

  public playerChestCollect(playerPlatformer: PlayerTopDown, chest: Chest): void {
    this.playerTopDown.getPlayerStats().scoreUp(chest.getCoinScore());
    
    if(!chest.isOpen()){
      this.chestQuantity--;
    }
    chest.open();
    console.log(chest.isOpen());
    
    chest.setFrame(0);
  }

  public playerSpawn(): void {
    this.objLayer.objects.forEach((playerSpawn) => {
      if (playerSpawn.name == 'PlayerSpawn') {
        this.playerTopDown = new PlayerTopDown(this, playerSpawn.x, playerSpawn.y);
        this.lights.addLight(this.playerTopDown.x,this.playerTopDown.y,150)
      }
    });
  }

  public chestSpawn(): void {
    let chestObj = this.objLayer.objects.forEach((chestObj) => {
      if (chestObj.name == 'Chest') {
        this.chestQuantity += 1;
        let chest = new Chest(this, chestObj.x, chestObj.y).setFrame(1).setOrigin(0, 1);
        chest.setScale(1, 1);
        this.chests.push(chest);
      }
    });
  }

  public enemySpawn(): void {
    let enemiesObj = this.objLayer.objects.forEach((enemyObj) => {
      if (enemyObj.name == 'Enemy') {
        this.enemyContainer = new EnemyPlatformerContainer(this, enemyObj.x, enemyObj.y,this.playerTopDown);
        this.enemies.push(this.enemyContainer.getEnemy().setGravityY(0));

        this.enemiesContainers.push(this.enemyContainer);
      }
    });
  }

  public bulletCollisions(): void {
    if (this.playerTopDown.getBullet()) {
      this.physics.add.overlap(this.playerTopDown.getBullet(), this.enemies, this.playerShootCollide, null, this);
      this.physics.add.collider(this.playerTopDown.getBullet(), this.walls, this.bulletHit, null, this);
    }
    this.enemiesContainers.forEach((enemy) => {
      this.physics.add.overlap(enemy.getEnemyBullet(), this.playerTopDown, this.enemyShootCollide, null, this);
      this.physics.add.collider(enemy.getEnemyBullet(), this.walls, this.bulletHit, null, this);
    });
  }

  public playerShootCollide(enemy: EnemyPlatformer, bullet) {
    bullet.destroy();

    enemy.takeDamage(this.playerTopDown.getDamage());
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

    this.add.image(10, 110, 'coin').setOrigin(0).setScrollFactor(0);
    this.coinScoreText = this.add.text(60, 110, `${this.playerTopDown.getPlayerStats().getScore()}`).setFontSize(50).setOrigin(0).setScrollFactor(0);

    this.add.image(10, 170, 'chest', 1).setOrigin(0).setScrollFactor(0).setScale(1.2);
    this.chestQuantityText = this.add.text(65, 170, `${this.chestQuantity} Left`).setFontSize(50).setOrigin(0).setScrollFactor(0);
  }

  public updateUi(): void {
    this.healthText.text = this.playerTopDown.getPlayerStats().getHealth().toString();
    this.coinScoreText.text = this.playerTopDown.getPlayerStats().getScore().toString();
    this.chestQuantityText.text = `${this.chestQuantity} Left`;
  }
}

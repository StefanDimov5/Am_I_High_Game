import { World } from 'matter';
import { Tilemaps } from 'phaser';
import { Coin } from '../../items/Coin';
import { GameApp } from '../../game';
import { PlayerStats } from '../../Player/PlayerStats';
import { PlayerPlatformer } from '../../Player/PlayerTypes/PlayerPlatformer';
import { Enemy } from '../../enemies/Enemy';
import { EnemyContainer } from '../../enemies/EnemyContainer';
import { AudioManager } from '../../audio/AudioManager';

export class MainPlatformer extends Phaser.Scene {
  private playerStats: PlayerStats;
  private coinScoreText: Phaser.GameObjects.Text;
  private healthText: Phaser.GameObjects.Text;
  private playerPlatformer: PlayerPlatformer;
  private enemyPlatformer: Enemy;
  private enemyContainer: EnemyContainer;
  private enemies: Enemy[] = [];
  private enemiesContainers: EnemyContainer[] = [];
  private coins: Phaser.Physics.Arcade.Sprite[] = [];
  private bg1: Phaser.GameObjects.TileSprite;
  private bg2: Phaser.GameObjects.TileSprite;
  private bg3: Phaser.GameObjects.TileSprite;
  private bg4: Phaser.GameObjects.TileSprite;

  private map: Tilemaps.Tilemap;
  private platforms: Tilemaps.StaticTilemapLayer;
  private objLayer: Tilemaps.ObjectLayer;
  private playerSpawnObj: Phaser.GameObjects.Sprite;
  private timer: Phaser.Time.TimerEvent
  private timerText: Phaser.GameObjects.Text

  constructor() {
    super('MainPlatformer');
  }

  create() {
    AudioManager.getInstance(this).playCutSceneSong(false)
    AudioManager.getInstance(this).playBackgroundMusic(true)
    let cameraFade1 = this.cameras.main.fadeIn(1000, 0, 0, 0);
    this.cameras.main.once('camerafadeincomplete', function (camera) {
      camera.fadeOut(1000, 0, 0, 0);
    });
    this.time.delayedCall(
      2000,
      () => {
        this.cameras.main.fadeIn(1000, 0, 0, 0);
      },
      null,
      this
    );
    this.setBackground();
    this.createTileMap();
    this.playerSpawn();
    this.enemySpawn();
    this.coinSpawn();
    this.collisions();
    this.cameraSetup();
    this.setUI();
    this.bulletCollisions();
    this.timer = this.time.addEvent({
      delay: 100000,
      callback: this.startScene,
      callbackScope: this
    })

    // (100000,()=>{
    //   this.scene.stop()
    //   this.scene.start("MainTopDown")
    // }).getOverallProgress()
  }

  startScene() {
    this.scene.stop()
    this.scene.start("MainTopDown")
  }
  update() {
    this.enemiesContainers.forEach((enemyContainer) => {
      enemyContainer.updateBar();
      enemyContainer.updatePosition();
      enemyContainer.getEnemy().canShootPlayer()
    });
    if (this.playerPlatformer.body.velocity.x > 0) {
      this.bg2.x -= 0.01;
      this.bg3.x -= 0.1;
      this.bg4.x -= 0.3;
    }
    if (this.playerPlatformer.body.velocity.x < 0) {
      this.bg2.x += 0.01;
      this.bg3.x += 0.1;
      this.bg4.x += 0.3;
    }
    this.playerPlatformer.setVelocityX(0);
    this.playerPlatformer.controlls();
    this.updateUi();
  }

  public setBackground() {
    this.bg1 = this.add.tileSprite(0, 0, 3200, 912, 'bg1').setOrigin(0, 0).setScale(1.5);
    this.bg2 = this.add.tileSprite(0, 0, 3200, 912, 'bg2').setOrigin(0, 0).setScale(1.5);
    this.bg3 = this.add.tileSprite(0, 0, 3200, 912, 'bg3').setOrigin(0, 0).setScale(1.5);
    this.bg4 = this.add.tileSprite(0, 0, 3200, 912, 'bg4').setOrigin(0, 0).setScale(1.5);
  }

  public createTileMap(): void {
    this.map = this.make.tilemap({ key: 'mapPlatformer' });
    let terrain = this.map.addTilesetImage('mainlevbuild2', 'map_atlas');
    this.platforms = this.map.createStaticLayer('mainMap', terrain, 0, 0);

    let grass = this.map.createStaticLayer('inFront', terrain, 0, 0);
    this.objLayer = this.map.getObjectLayer('Objects');
    this.physics.world.setBounds(0, 0, this.platforms.width, this.platforms.height);

    this.platforms.setCollisionByProperty({ collides: true });
    this.platforms.setCollisionBetween(1, 10000, true, true);
  }

  public playerSpawn(): void {
    this.objLayer.objects.forEach((playerSpawn) => {
      if (playerSpawn.name == 'PlayerSpawn') {
        this.playerPlatformer = new PlayerPlatformer(this, playerSpawn.x, playerSpawn.y);
      }
    });
  }

  public enemySpawn(): void {
    let enemiesObj = this.objLayer.objects.forEach((enemyObj) => {
      if (enemyObj.name == 'Enemy') {
        this.enemyContainer = new EnemyContainer(this, enemyObj.x, enemyObj.y - 100, this.playerPlatformer, 500);
        this.enemies.push(this.enemyContainer.getEnemy());
        this.enemyContainer.getEnemy().setHealth()
        this.enemiesContainers.push(this.enemyContainer);
      }
    });
  }

  public coinSpawn(): void {
    let coinsObj = this.objLayer.objects.forEach((coinObj) => {
      if (coinObj.name == 'coin') {
        let coin = new Coin(this, coinObj.x, coinObj.y);
        this.coins.push(coin);
      }
    });
  }

  public cameraSetup(): void {
    this.cameras.main.startFollow(this.playerPlatformer);
    this.cameras.main.setBounds(0, 0, this.platforms.width, this.platforms.height);
  }

  public collisions(): void {
    this.physics.add.collider(this.playerPlatformer, this.platforms);
    this.physics.add.collider(this.coins, this.platforms);
    this.physics.add.collider(this.enemies, this.platforms);
    this.physics.add.collider(this.playerPlatformer, this.coins, this.playerCoinCollect, null, this);
  }

  public bulletCollisions(): void {
    if (this.playerPlatformer.getBullets()) {
      this.physics.add.collider(this.playerPlatformer.getBullets(), this.enemies, this.playerShootCollide, null, this);
      this.physics.add.collider(this.playerPlatformer.getBullets(), this.platforms, this.bulletHit, null, this);
    }
    this.enemiesContainers.forEach((enemy) => {
      this.physics.add.collider(enemy.getEnemyBullet(), this.playerPlatformer, this.enemyShootCollide, null, this);
      this.physics.add.collider(enemy.getEnemyBullet(), this.platforms, this.bulletHit, null, this);
    });
  }

  public playerCoinCollect(playerPlatformer: PlayerPlatformer, coin: Coin): void {
    this.playerPlatformer.getPlayerStats().scoreUp(coin.getCoinScore());
    coin.coinDestroy();
  }

  public playerShootCollide(enemy: Enemy, bullet) {

    enemy.takeDamage(this.playerPlatformer.getDamage());
    bullet.destroy();
  }

  public enemyShootCollide(player: PlayerPlatformer, bullet: Phaser.Physics.Arcade.Sprite) {
    bullet.destroy();
    player.getPlayerStats().hurt();
  }

  public bulletHit(bullet: Phaser.Physics.Arcade.Sprite, platforms) {
    bullet.destroy();
  }

  public setUI(): void {
    this.add.image(10, 40, 'heart').setScale(0.7).setOrigin(0).setScrollFactor(0);
    this.healthText = this.add.text(60, 40, `${this.playerPlatformer.getPlayerStats().getHealth()}`).setFontSize(50).setOrigin(0).setScrollFactor(0);

    this.add.image(10, 110, 'coin').setOrigin(0).setScrollFactor(0);
    this.coinScoreText = this.add.text(60, 110, `${this.playerPlatformer.getPlayerStats().getScore()}`).setFontSize(50).setOrigin(0).setScrollFactor(0);

    this.timerText = this.add.text(800, 40, `${this.timer}`).setFontSize(50).setOrigin(0.5).setScrollFactor(0);
  }

  public updateUi(): void {
    this.healthText.text = this.playerPlatformer.getPlayerStats().getHealth().toString();
    this.coinScoreText.text = this.playerPlatformer.getPlayerStats().getScore().toString();
    if (this.playerPlatformer.getPlayerStats().getScore() == this.coins.length * 100) {
      this.scene.stop()
      this.scene.start("MainTopDown")
    }
    this.timerText.text = `${Math.floor(100 - this.timer.getElapsedSeconds())}`
  }
}

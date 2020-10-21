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
import { BossTopDown } from '../../enemies/BossTopDown';
import { BossTopDownContainer } from '../../enemies/BossTopDownContainer';

export class BossTopDownScene extends Phaser.Scene {
  private playerStats: PlayerStats;
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
  private boss: BossTopDownContainer
  private map: Tilemaps.Tilemap;
  private ground: Tilemaps.StaticTilemapLayer;
  private walls: Tilemaps.StaticTilemapLayer;
  private objLayer: Tilemaps.ObjectLayer;
  private playerSpawnObj: Phaser.GameObjects.Sprite;

  constructor() {
    super('BossTopDownScene');
  }

  create() {
    
    
    this.playerTopDown = new PlayerTopDown(this, 100, 300);
    this.boss = new BossTopDownContainer(this,1400,100,400,200)
  }

  update() {
    this.playerTopDown.controlls();
  }
}
  
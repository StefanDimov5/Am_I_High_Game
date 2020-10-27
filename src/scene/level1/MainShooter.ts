import { World } from 'matter';
import { Tilemaps } from 'phaser';
import { Coin } from '../../items/Coin';
import { GameApp } from '../../game';
import { PlayerStats } from '../../Player/PlayerStats';
import { PlayerPlatformer } from '../../Player/PlayerTypes/PlayerPlatformer';
import { PlayerTopDown } from '../../Player/PlayerTypes/PlayerTopDown';
import { Chest } from '../../items/Chest';
import { EnemyContainer } from '../../enemies/EnemyContainer';
import { Enemy } from '../../enemies/Enemy';
import { EnemyKamikaze } from '../../enemies/EnemyKamikaze';
import { HealthBar } from '../../enemies/HealthBar';
import { Building } from '../../Player/Building';

export class MainShooter extends Phaser.Scene {
    private playerStats: PlayerStats;
    private enemiesGroup: Phaser.Physics.Arcade.Group
    private building:Building
    private cursorShoot: Phaser.Physics.Arcade.Sprite
    private hitPoints: Phaser.Types.Tilemaps.TiledObject[] = []
    private shootColider: Phaser.Physics.Arcade.Collider
    private map: Tilemaps.Tilemap;
    private buildingLayer: Tilemaps.StaticTilemapLayer;
  
    private timer:Phaser.Time.TimerEvent
    private timerText:Phaser.GameObjects.Text
  

  constructor() {
    super('MainShooter');
  }

  create() {
    this.createTileMap();
    this.hitPointsSpawn()
    this.enemySpawn();
    this.shooterCursor()
    this.cursorMovement()
    this.building = new Building(this,100,400)
    this.collisions();
    this.setUI()
    this.timer = this.time.addEvent({
        delay:100000,
        callback :this.startScene,
        callbackScope: this
      })
    }
  
    startScene() {
        this.scene.stop()
        this.scene.start("BossTopDownScene")
    }

    update() {
        this.building.updateBar()
        this.updateUi()
    }

    public createTileMap(): void {
        this.map = this.make.tilemap({ key: 'mainShooterMap' });
        let terrain = this.map.addTilesetImage('ShooterMap', 'mapAtlasShooter');
        let map = this.map.createStaticLayer('Background_and_Foreground', terrain, 0, 0);
        this.buildingLayer = this.map.createStaticLayer('MainLayer', terrain, 0, 0);
    this.map.createStaticLayer('some_small_objects', terrain, 0, 0);
        this.buildingLayer.setCollisionByProperty({ collides: true });
        this.buildingLayer.setCollisionBetween(1809, 1902, true, true);
    }

    public collisions(): void {
        this.physics.add.collider(this.enemiesGroup,this.buildingLayer,this.enemyHitBuilding,null,this)
    }

    public shooterCursor(): void {
        this.cursorShoot = this.physics.add.sprite(100,100,"cursor").setScale(.02).setSize(512,512).setOffset(1200,1200).setCollideWorldBounds(true)
        this.input.on(
            'pointerdown',
            (pointer) => {
            this.input.mouse.requestPointerLock();
            },
            this
        );
        this.input.on('pointerdown', () => {
            this.shootColider = this.physics.add.overlap(this.cursorShoot, this.enemiesGroup, this.hitEnemy,null,this);
        });
        this.input.on('pointerup', () => {
            this.physics.world.removeCollider(this.shootColider);
        });
    }

    public cursorMovement(): void {
        this.input.on(
        'pointermove',
        function (pointer) {
            if (this.input.mouse.locked) {
            this.cursorShoot.x += pointer.movementX;
            this.cursorShoot.y += pointer.movementY;
            }
        },
        this
        );
    }

    public hitEnemy(cursorShoot , enemy:EnemyKamikaze): void {
        enemy.reset()
    }

    public hitPointsSpawn(): void {
        this.map.getObjectLayer('objects').objects.forEach((hitPoint) => {
            if (hitPoint.name == 'HitPoint') {
                
                this.hitPoints.push(hitPoint)
            }

            console.log(this.hitPoints);
        });
    }

    public enemySpawn(): void {
        this.enemiesGroup = this.physics.add.group()
        for(let i = 0; i< 4;i++){
            let enemy = new EnemyKamikaze(this,1200,Phaser.Math.Between(0,900),this.hitPoints[Phaser.Math.Between(0,this.hitPoints.length-1)].x,this.hitPoints[Phaser.Math.Between(0,this.hitPoints.length-1)].y)
            this.enemiesGroup.add(enemy)
            enemy.enemyAttack()
        }
    }

    public enemyHitBuilding( enemy: EnemyKamikaze,building): void {
    enemy.reset()
    this.building.hurt()
    }

    public setUI(): void {
        this.timerText = this.add.text(800, 40, `${this.timer}`).setFontSize(50).setOrigin(0.5).setScrollFactor(0);
      }
    
      public updateUi(): void {
        this.timerText.text = `${Math.floor(100 - this.timer.getElapsedSeconds())}`
      }
}

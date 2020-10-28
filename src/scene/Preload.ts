export class Preload extends Phaser.Scene {
  constructor() {
    super('preload');
  }

  preload() {
    this.load.image("playBtn", "assets/buttons/Play.png")
    this.load.image("playHooverBtn", "assets/buttons/Start_Red_Btn.png")
    this.load.image("resume", "assets/buttons/Resume.png")
    this.load.image("resumeHooverBtn", "assets/buttons/Resume_Red_Btn.png")
    this.load.image("quitBtn", "assets/buttons/Exit.png")
    this.load.image("quitHooverBtn", "assets/buttons/Quit_Red_Btn.png")
    this.load.image('map_atlas', 'assets/maps/platformer/mainlevbuild2.png');
    this.load.tilemapTiledJSON('mapPlatformer', 'assets/maps/platformer/platformMap.json');
    this.load.tilemapTiledJSON('mapTopDown', 'assets/maps/TopDown/TopDownMap.json');
    this.load.tilemapTiledJSON('BossTopDownMap', 'assets/maps/TopDown/BossTopDownMap.json');
    this.load.tilemapTiledJSON('mainShooterMap', 'assets/maps/mainShooter/Shooter.json');
    this.load.image('mapAtlasShooter', "assets/maps/mainShooter/Devil'sCoinTileset.png");
    this.load.image('mapAtlasTopDown', 'assets/maps/TopDown/mainlevbuild.png');
    this.load.spritesheet('chest', 'assets/maps/TopDown/chests_32x32.png', { frameWidth: 32, frameHeight: 32 });
    this.load.spritesheet('bossIdle', 'assets/boss/Robot Idle.png', { frameWidth: 1000, frameHeight: 1000 });
    this.load.spritesheet('bossShoot', 'assets/boss/robot shooting.png', { frameWidth: 1000, frameHeight: 1000 });
    this.load.image("cursor", 'assets/cursor.png')
    this.load.spritesheet('chest', 'assets/maps/TopDown/chests_32x32.png', { frameWidth: 32, frameHeight: 32 });
    this.load.spritesheet('chest', 'assets/maps/TopDown/chests_32x32.png', { frameWidth: 32, frameHeight: 32 });
    this.load.image('bg1', 'assets/bg1.png');
    this.load.image('bg2', 'assets/bg2.png');
    this.load.image('bg3', 'assets/bg3.png');
    this.load.image('bg4', 'assets/bg4.png');;
    this.load.image('healthBar', 'assets/healthBar.png');
    this.load.image('coin', 'assets/goldenCoin.png');
    this.load.image('heart', 'assets/heartIcon.png');
    this.load.image('light', 'assets/light.png');
    this.load.image('city', 'assets/City1.png');
    this.load.image('trippyBg', 'assets/trippyBg.jpg');
    this.load.spritesheet('mainHero', 'assets/mainGuy.png', { frameWidth: 64, frameHeight: 64 });
    this.load.spritesheet('bullet', 'assets/enemy/Ball_sheet.png', { frameWidth: 64, frameHeight: 64 });
    this.load.spritesheet('enemy', 'assets/enemy/Drone_idle.png', { frameWidth: 91, frameHeight: 92 });
    this.load.spritesheet('enemyFire', 'assets/enemy/Drone_fire.png', { frameWidth: 128, frameHeight: 128 });

    this.load.spritesheet('SmokinInRoom', 'assets/SmokinInRoom.png', { frameWidth: 1600, frameHeight: 912 });

    this.load.audio('backgroundMusic', ['assets/audio/themeSong/Am_I_High.mp3', 'assets/audio/themeSong/Am_I_High.ogg']);
    this.load.audio('cutSceneSong', ['assets/audio/cutSceneSong/cutscene.mp3', 'assets/audio/cutSceneSong/cutscene.ogg']);
    this.load.audio('hurt', ['assets/audio/hurt/hurt.mp3', 'assets/audio/hurt/hurt.ogg']);
    this.load.audio('shoot', ['assets/audio/shoot/shoot.mp3', 'assets/audio/shoot/shoot.ogg']);
    this.load.audio('gameOver', ['assets/audio/gameOver/gameover.mp3', 'assets/audio/gameOver/gameover.ogg']);
  }

  create() {
    this.scene.start('MainPlatformer');
  }
}

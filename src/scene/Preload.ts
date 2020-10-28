export class Preload extends Phaser.Scene {
  constructor() {
    super('preload');
  }

  preload() {
    this.load.image("playBtn", "assets/images/buttons/Play.png")
    this.load.image("playHooverBtn", "assets/images/buttons/Start_Red_Btn.png")
    this.load.image("resume", "assets/images/buttons/Resume.png")
    this.load.image("resumeHooverBtn", "assets/images/buttons/Resume_Red_Btn.png")
    this.load.image("quitBtn", "assets/images/buttons/Exit.png")
    this.load.image("quitHooverBtn", "assets/images/buttons/Quit_Red_Btn.png")
    this.load.image('map_atlas', 'assets/images/maps/platformer/mainlevbuild2.png');
    this.load.tilemapTiledJSON('mapPlatformer', 'assets/images/maps/platformer/platformMap.json');
    this.load.tilemapTiledJSON('mapTopDown', 'assets/images/maps/TopDown/TopDownMap.json');
    this.load.tilemapTiledJSON('BossTopDownMap', 'assets/images/maps/TopDown/BossTopDownMap.json');
    this.load.tilemapTiledJSON('mainShooterMap', 'assets/images/maps/mainShooter/Shooter.json');
    this.load.image('mapAtlasShooter', "assets/images/maps/mainShooter/Devil'sCoinTileset.png");
    this.load.image('mapAtlasTopDown', 'assets/images/maps/TopDown/mainlevbuild.png');
    this.load.spritesheet('chest', 'assets/images/maps/TopDown/chests_32x32.png', { frameWidth: 32, frameHeight: 32 });
    this.load.spritesheet('bossIdle', 'assets/images/boss/Robot Idle.png', { frameWidth: 1000, frameHeight: 1000 });
    this.load.spritesheet('bossShoot', 'assets/images/boss/robot shooting.png', { frameWidth: 1000, frameHeight: 1000 });
    this.load.image("cursor", 'assets/images/cursor.png')
    this.load.spritesheet('chest', 'assets/images/maps/TopDown/chests_32x32.png', { frameWidth: 32, frameHeight: 32 });
    this.load.spritesheet('chest', 'assets/images/maps/TopDown/chests_32x32.png', { frameWidth: 32, frameHeight: 32 });
    this.load.image('bg1', 'assets/images/bg1.png');
    this.load.image('bg2', 'assets/images/bg2.png');
    this.load.image('bg3', 'assets/images/bg3.png');
    this.load.image('bg4', 'assets/images/bg4.png');;
    this.load.image('healthBar', 'assets/images/healthBar.png');
    this.load.image('coin', 'assets/images/goldenCoin.png');
    this.load.image('heart', 'assets/images/heartIcon.png');
    this.load.image('light', 'assets/images/light.png');
    this.load.image('city', 'assets/images/City1.png');
    this.load.image('trippyBg', 'assets/images/trippyBg.jpg');
    this.load.spritesheet('controlls', 'assets/images/controlls.png', { frameWidth: 252, frameHeight: 252 });
    this.load.spritesheet('mainHero', 'assets/images/mainGuy.png', { frameWidth: 64, frameHeight: 64 });
    this.load.spritesheet('bullet', 'assets/images/enemy/Ball_sheet.png', { frameWidth: 64, frameHeight: 64 });
    this.load.spritesheet('enemy', 'assets/images/enemy/Drone_idle.png', { frameWidth: 91, frameHeight: 92 });
    this.load.spritesheet('enemyFire', 'assets/images/enemy/Drone_fire.png', { frameWidth: 128, frameHeight: 128 });
    this.load.spritesheet('SmokinInRoom', 'assets/images/SmokinInRoom.png', { frameWidth: 1600, frameHeight: 912 });

    this.load.audio('backgroundMusic', ['assets/audio/themeSong/Am_I_High.mp3', 'assets/audio/themeSong/Am_I_High.ogg']);
    this.load.audio('cutSceneSong', ['assets/audio/cutSceneSong/cutscene.mp3', 'assets/audio/cutSceneSong/cutscene.ogg']);
    this.load.audio('hurt', ['assets/audio/hurt/hurt.mp3', 'assets/audio/hurt/hurt.ogg']);
    this.load.audio('shoot', ['assets/audio/shoot/shoot.mp3', 'assets/audio/shoot/shoot.ogg']);
    this.load.audio('gameOver', ['assets/audio/gameOver/gameover.mp3', 'assets/audio/gameOver/gameover.ogg']);
  }

  create() {
    this.scene.start('MainMenu');
  }
}

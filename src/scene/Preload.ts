export class Preload extends Phaser.Scene {
  constructor() {
    super('preload');
  }

  preload() {
    this.load.image('map_atlas', 'assets/mainlevbuild2.png');
    this.load.tilemapTiledJSON('map', 'assets/platformMap.json');
    this.load.image('bg1', 'assets/bg1.png');
    this.load.image('bg2', 'assets/bg2.png');
    this.load.image('bg3', 'assets/bg3.png');
    this.load.image('bg4', 'assets/bg4.png');
    this.load.image('hero', 'assets/player.png');
    this.load.image('coin', 'assets/goldenCoin.png');
    this.load.image('heart', 'assets/heartIcon.png');
    this.load.image('city', 'assets/City1.png');
    this.load.image('trippyBg', 'assets/trippyBg.jpg');
    this.load.spritesheet('mainHero', 'assets/mainGuy.png', { frameWidth: 64, frameHeight: 64 });
    this.load.spritesheet('knife', 'assets/throwingKnife.png', { frameWidth: 128, frameHeight: 96 });
    this.load.spritesheet('SmokinInRoom', 'assets/SmokinInRoom.png', { frameWidth: 1600, frameHeight: 912 });
  }

  create() {
    this.scene.start('IntroSmokingScene');
  }
}

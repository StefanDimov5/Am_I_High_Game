export class Preload extends Phaser.Scene {
  constructor() {
    super('preload');
  }

  preload() {
    this.load.image('map_atlas', 'assets/mainlevbuild2.png');
    this.load.tilemapTiledJSON('map', 'assets/platformMap.json');
    this.load.image('hero', 'assets/player.png');
  }

  create() {
    this.scene.start('MainPlatformer');
  }
}

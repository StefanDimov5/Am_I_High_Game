export class MainPlatformer extends Phaser.Scene {
  constructor() {
    super('MainPlatformer');
  }
  create() {
    let map = this.make.tilemap({ key: 'map' });
    let terrain = map.addTilesetImage('mainlevbuild2', 'map_atlas');
    let platforms = map.createStaticLayer('mainMap', terrain, 0, 0);
    let grass = map.createStaticLayer('inFront', terrain, 0, 0);
  }
}

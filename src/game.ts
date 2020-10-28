import 'phaser';
import { Preload } from './scene/Preload';
import { MainPlatformer } from './scene/level1/MainPlatformer';
import { IntroSmokingScene } from './scene/cutScenes/IntroSmokingScene';
import { WalkToShop } from './scene/cutScenes/WalkToShop';
import { MainTopDown } from './scene/level1/MainTopDown';
import { BossTopDownScene } from './scene/boss/BossTopDownScene';
import { MainShooter } from './scene/level1/MainShooter';
import { MainMenu } from './scene/menus/MainMenu';
import { GameOver } from './scene/menus/GameOver';

class GameApp extends Phaser.Game {
  public static gameConfig: Phaser.Types.Core.GameConfig = null;

  constructor(config: Phaser.Types.Core.GameConfig) {
    GameApp.gameConfig = config;

    if (GameApp.gameConfig == null) {
      GameApp.gameConfig = {
        type: Phaser.AUTO,
        parent: 'content',
        backgroundColor: '#385e78',
        physics: {
          default: 'arcade',
          arcade: {
            debug: false,
          },
        },
        width: 1600,
        height: 912,
        scene: [Preload, IntroSmokingScene, WalkToShop, MainTopDown, MainPlatformer, BossTopDownScene, MainShooter, MainMenu, GameOver],
      };
    }

    super(GameApp.gameConfig);
  }
}

export { GameApp };

new GameApp(null);

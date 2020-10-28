export class AudioManager {
    private static instance: AudioManager;

    private scene: Phaser.Scene;
    private cutSceneMusic: Phaser.Sound.BaseSound;
    private backgroundMusic: Phaser.Sound.BaseSound;
    private gunShoot: Phaser.Sound.BaseSound;
    private hurt: Phaser.Sound.BaseSound;
    private gameOver: Phaser.Sound.BaseSound;

    private constructor(scene: Phaser.Scene) {
        this.scene = scene;

        this.cutSceneMusic = this.scene.sound.add("cutSceneSong", {
            volume: 1,
            loop: true,
            mute: false

        })

        this.backgroundMusic = this.scene.sound.add("backgroundMusic", {
            volume: 0.5,
            loop: true
        })

        this.gameOver = this.scene.sound.add("gameOver", {
            volume: 0.6,
            loop: true
        })

        this.hurt = this.scene.sound.add("hurt", {
            volume: 1,
            loop: false
        })

        this.gunShoot = this.scene.sound.add("shoot", {
            volume: 0.2,
            loop: false
        })
    }


    public playCutSceneSong(status: boolean): void {
        if (status) {
            this.cutSceneMusic.play();

        } else {
            this.cutSceneMusic.stop();
        }
    }

    public playBackgroundMusic(status: boolean): void {
        if (status) {
            this.backgroundMusic.play();
        } else {
            this.backgroundMusic.stop();
        }
    }

    public playGameOver(status: boolean): void {
        if (status) {
            this.gameOver.play();
        } else {
            this.gameOver.stop();
        }
    }

    public playHurt(): void {
        this.hurt.play();
    }

    public playShoot(): void {
        this.gunShoot.play();
    }

    public static getInstance(scene: Phaser.Scene) {
        if (!AudioManager.instance) {
            AudioManager.instance = new AudioManager(scene);
        }
        return AudioManager.instance;
    }
}
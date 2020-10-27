export class BaseButton extends Phaser.GameObjects.Container {
   
    private sprite: Phaser.GameObjects.Sprite;
    private defaultFrame: string;
    private overFrame: string;

    private tween: Phaser.Tweens.Tween;

    constructor(scene: Phaser.Scene, key: string,frame?: string, onOverFrame?: string) {
        super(scene)

        this.sprite = new Phaser.GameObjects.Sprite(this.scene, 0, 0, key);
        this.sprite.setInteractive();

        this.defaultFrame = frame;
        this.overFrame = onOverFrame;
        if (this.overFrame){
            this.sprite.on("pointerover",this.onOver, this);
            this.sprite.on("pointerover",this.onOut, this)
        }

        this.add(this.sprite);
    }

    public enable(status: boolean): void {
        if (status) {
            this.sprite.setInteractive();
            this.sprite.setTint(0xffffff);
        } else {
            this.sprite.disableInteractive();
            this.sprite.setTint(0xd8ceab);
        }
    }

    private onOver(): void {
        this.sprite.setFrame(this.overFrame);

        this.tween = this.scene.add.tween({
            targets: this.sprite,
            angle: {start: -1 , to: 1},
            ease: Phaser.Math.Easing.Linear.Linear,
            duration: 600,
            yoyo: true,
            loop: -1,
        })
    }

    private onOut(): void {
        this.sprite.setFrame(this.defaultFrame);
        this.scene.tweens.remove(this.tween);
        this.sprite.setAngle(0);
    }

    public setOnClick(callback: Function, context: any): void {
        this.sprite.on('pointerdown', callback, context);
    }

    public destroy(fromScene: boolean): void {
        if (this.sprite != null) {
            this.sprite.destroy(fromScene);
            this.sprite = null;
        }

        

        super.destroy(fromScene);

    }

}
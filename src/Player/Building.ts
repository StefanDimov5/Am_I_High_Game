import { HealthBar } from "../enemies/HealthBar";

export class Building extends Phaser.GameObjects.Container {
    private health: number = 100
    private healthBar: HealthBar;
    private healthBarBack: HealthBar;
    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y)
        this.healthBarBack = new HealthBar(this.scene, 0, 0, 10).setOrigin(0, 0);
        this.healthBar = new HealthBar(this.scene, 0, 0, 10).setOrigin(0, 0);
        this.healthBarBack.setBar(this.health);
        this.healthBar.setBar(this.health);
        this.healthBarBack.tint = 0x00000;
        this.add(this.healthBarBack);
        this.add(this.healthBar);
        this.scene.add.existing(this);
    }

    public updateBar(): void {
        this.healthBar.updateBar(this.health);
    }

    public getHealth(): number {
        return this.health;
    }

    public hurt(): void {
        this.health -= 5
        console.log(this.health);
    }
}
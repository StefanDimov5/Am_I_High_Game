export class PlayerStats {
  private x;
  private y;
  private health;
  private level;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  public getX() {
    return this.x;
  }

  public getY() {
    return this.y;
  }

  public getHealth() {
    return this.health;
  }

  public getLevel() {
    return this.level;
  }
}

import { IsPlayer } from './IsPlayer';

export class PlayerStats {
  private score: number = 0;
  private health: number = 5;
  private level: number = 0;
  private player: IsPlayer;

  constructor(player: IsPlayer) {
    this.player = player;
  }

  public getHealth() {
    return this.health;
  }

  public getLevel() {
    return this.level;
  }

  public getScore() {
    return this.score;
  }

  public scoreUp(score: number) {
    this.score += score;
  }

  public hurt() {
    this.health--;
    if (this.health <= 0) {
      this.player.die();
      this.health == 0;
    }
  }
}

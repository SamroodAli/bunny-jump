import Phaser from "phaser";
import BackgroundImage from "../assets/bg_layer1.png";
class Game extends Phaser.Scene {
  constructor() {
    super("game");
  }
  preload() {
    this.load.image("background", BackgroundImage);
  }
  create() {
    this.add.image(250, 320, "background");
  }
}
export default Game;

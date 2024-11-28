import Phaser from 'phaser';
import LoobyScene from './scenes/Looby';
import HarvestGameScene from './scenes/Havest';
import { FontPlugin } from 'phaser-font-plugin';
import ResultScene from './scenes/Result';
export const SCREEN_SIZE = {
  width: window.innerWidth,
  height: window.innerHeight
}
const config:  Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: SCREEN_SIZE.width,
  height: SCREEN_SIZE.height,
  render: {
    transparent: true,
  },
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 400, x: 0},
    },
  },
  plugins: {
    global: [
      {
        key: 'FontPlugin',
        plugin: FontPlugin,
        start: true,
      },
    ],
  },
  scene: [LoobyScene, HarvestGameScene, ResultScene ]
}

const startGame = (parentId: string) => {
  return new Phaser.Game({...config, parent: parentId})
}

export default startGame
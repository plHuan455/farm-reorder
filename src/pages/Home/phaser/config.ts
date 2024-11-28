import Phaser from 'phaser';
import HomeScene, { SCREEN_SIZE } from './screen';

const config: Phaser.Types.Core.GameConfig = {
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
  scene: [HomeScene]
}

const startGame = (parentId: string) => {
  return new Phaser.Game({...config, parent: parentId})
}

export default startGame
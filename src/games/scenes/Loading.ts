
// }
export default class LoadingScene extends Phaser.Scene {
  constructor() {
    super('LoadingScene') 
  }
  // 800, 600
  preload() {
    this.load.image('token', '/images/TFC.webp')
  }

  create() {
    const text = this.add.text(0, 0, 'Loading ...', {
      color: '#000000'
    }).setDepth(2)
    const logo = this.add.image(0, 0, 'token')
    // const container = this.add.container(this.cameras.main.width / 2, this.cameras.main.height / 2, [logo, text])
    text.setOrigin(0.5, 0)
    text.setPosition(0, logo.height /2 + 10);

    // this.scene.start('HarvestGameScene')
    // 
  }

  update() {

  }
}
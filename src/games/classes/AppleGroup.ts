export class AppleGroup {
  private MAGNET_SPAWN_RATIO: number = 0.04
  private group: Phaser.Physics.Arcade.Group
  
  constructor(group: Phaser.Physics.Arcade.Group){
    this.group = group
  }

  public getGroup = () => this.group

  public spawnApple(params: {maxX: number, maxY: number}) {
    const isSpawnMagnet = Phaser.Math.Between(1, 10) + this.MAGNET_SPAWN_RATIO * 10 > 10
    const x = Phaser.Math.Between(0, params.maxX - 35)
    if(isSpawnMagnet) {
      this.group?.create(x, 0, 'magnet').setData('type', 'magnet').setRotation(Phaser.Math.Between(0, 360)).setDisplaySize(35, 35).setScale(0.7 + 0.1 * Phaser.Math.Between(0, 1.5)) as Phaser.Types.Physics.Arcade.ImageWithDynamicBody
    }
    else {
      const apple = this.group?.create(x, 0, 'apple' ).setData('type', 'apple').setRotation(Phaser.Math.Between(0, 360)).setDisplaySize(35, 35).setScale(0.4 + 0.1 * Phaser.Math.Between(0, 1.5)) as Phaser.Types.Physics.Arcade.ImageWithDynamicBody
      apple.setCircle(apple.width / 2);
    }
  }


  public gotApple = (apple: Phaser.Types.Physics.Arcade.ImageWithDynamicBody, cb: (type: 'apple' | 'boom' | 'magnet') => void) => {
    apple.disableBody(true, true)
    this.group?.remove(apple)
    cb(apple.getData('type'))
    apple.destroy(true)
  }
}
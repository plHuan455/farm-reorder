export class CloudGroup{
  private cloudNames = ['cloud-1', 'cloud-2']

  private maxX: number
  private maxY: number
  private speed: number = 20
  private cloudGroup: Phaser.Physics.Arcade.Group
  
  constructor(cloudGroup: Phaser.Physics.Arcade.Group, options: {maxX: number; maxY: number}) {
    this.maxX = options.maxX
    this.maxY = options.maxY

    this.cloudGroup = cloudGroup
    this.spawnCloud({initX: -100})
    this.spawnCloud({initX: this.maxX / 2})
  }

  private spawnCloud(options?: {initX: number}) {
    const name = this.cloudNames[Phaser.Math.Between(0, this.cloudNames.length - 1)]
    const cloud = this.cloudGroup.create(-100, Phaser.Math.Between(0, this.maxY), name)
    .setOrigin(0, 0) as Phaser.Types.Physics.Arcade.ImageWithDynamicBody
    cloud.setX(options?.initX ??  0 - cloud.displayWidth)
    cloud.body.allowGravity = false
  }

  public update() {

    if(this.cloudGroup?.children.size < 2)  {
      this.spawnCloud()
    }
    this.cloudGroup?.children.each((c) => {
      const cloud = c as Phaser.Types.Physics.Arcade.ImageWithDynamicBody;
      cloud?.setVelocityX(this.speed)
      if (cloud.x >= this.maxX) {
        cloud.disableBody(true, true); // Loại bỏ quả táo rơi khỏi màn hình
        this.cloudGroup?.remove(cloud)
        return null
      }

      return null
    })
  }

}
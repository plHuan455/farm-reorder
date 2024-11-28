import { EMITS } from "@/libs/phaser/constants"
import { CloudGroup } from "../classes/Cloud"
import { EventBus } from "@/libs/phaser"

export const SCREEN_SIZE = {
  width: window.innerWidth,
  height: window.innerHeight
}
export default class LoobyScene extends Phaser.Scene {
  private cloudGroup?: CloudGroup
  constructor() {
    super('LoobyScene')
  }
  preload() {
    this.load.image('tree', '/assets/tree.webp')
    this.load.image('background', '/images/bg.webp')
    this.load.image('ton-lay', '/images/ton-lay.webp')
    this.load.image('cloud-1', '/images/cloud-1.webp')
    this.load.image('cloud-2', '/images/cloud-2.webp')
  } 

  create() {
    this.add.image(0, -10, 'background').setOrigin(0, 0).setDisplaySize(SCREEN_SIZE.width, SCREEN_SIZE.height + 10)
    this.cloudGroup = new CloudGroup(this.physics.add.group(), {maxX: SCREEN_SIZE.width, maxY: SCREEN_SIZE.height * 0.4})
    this.add.image(SCREEN_SIZE.width * 0.1, SCREEN_SIZE.height * 0.75, 'ton-lay').setOrigin(0, 0).setScale(0.5)
    const tree =  this.add.image(SCREEN_SIZE.width / 2, SCREEN_SIZE.height / 2, 'tree').setScale(0.65).setDepth(10)
    tree.setInteractive({ cursor: "pointer" })
     // Add click event
    tree.on('pointerdown', () => {
       EventBus.emit(EMITS.GO_GAME)
    })

    EventBus.on(EMITS.PLAY_GAME, () => {
      this.scene.start('HarvestGameScene')
    }) 
    
  }

  update() {
    this.cloudGroup?.update()
  }
}
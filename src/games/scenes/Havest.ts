// const SCREEN_SIZE = {
//   width: 375,
//   height: 667

import { AppleGroup } from "@/games/classes/AppleGroup"
import { SCREEN_SIZE } from "../configs"

// }
export default class HarvestGameScene extends Phaser.Scene {
  private SPEED = 500
  private BOOM_SPAWN_RATIO = 8
  private TON_SPAWN_RATIO = 2
  private MAX_TON_COUNT = 2
  private collectedTon: number = 0

  private nextAppleTime?: number
  private endTime?: number

  private endMagnetTime?: number

  private timeDisplay?: Phaser.GameObjects.Text
  private magnetDisplay?: Phaser.GameObjects.Image
  private tokenText?: Phaser.GameObjects.Text
  private tonText?: Phaser.GameObjects.Text

  private cursors?: Phaser.Types.Input.Keyboard.CursorKeys
  private appleGroup?: AppleGroup
  private boomGroup?: Phaser.Physics.Arcade.Group
  private tonGroup?: Phaser.Physics.Arcade.Group
  private basket?: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody

  private token: number = 0

  constructor() {
    super('HarvestGameScene')
  }
  preload() {
    this.load.font('martian', 'fonts/MartianMono.ttf')
    this.load.image('tree', '/assets/tree.png')
    this.load.image('apple', '/assets/apple.webp')
    this.load.image('sky', '/assets/ground-2.png')
    this.load.image('harvest-bg', '/assets/harvest-bg.webp')
    this.load.image('magnet', '/assets/magnet.webp')
    this.load.image('alarm', '/assets/alarm.svg')
    this.load.image('token', '/assets/token.webp')
    this.load.image('ton', '/images/ton-token.webp')
    this.load.spritesheet('baskets', '/assets/baskets.webp', { frameWidth: 129, frameHeight: 120})
    this.load.spritesheet('boom-sprite', 'assets/boom-sprite.webp', {frameWidth: 240, frameHeight: 232})
    this.load.spritesheet('boom', '/assets/boom.webp', {frameWidth: 47, frameHeight: 78, startFrame: 0, endFrame: 2})
  } 

  create() {
    this.add.image(-1, -1, 'harvest-bg').setDisplaySize(SCREEN_SIZE.width + 1, SCREEN_SIZE.height + 1).setOrigin(0)


    this.createTimeDisplay()
    this.createTokenDisplay()
    this.createTonDisplay()

    this.magnetDisplay = this.add.image(SCREEN_SIZE.width -30, 96, 'magnet').setScale(0.3).setVisible(false)
    this.tweens.add({
      targets: this.magnetDisplay,
      scaleX: 0.5,  // Scale theo chiều ngang (tăng lên gấp 2)
      scaleY: 0.5,  // Scale theo chiều dọc (tăng lên gấp 2)
      duration: 1000,  // Thời gian hiệu ứng (500ms)
      yoyo: true,  // Lặp lại hiệu ứng (scale xuống sau khi scale lên)
      repeat: -1,  // Lặp vô hạn
      ease: 'Power1',  // Loại easing để hiệu ứng mượt mà
    });

    // this.basket = this.physics.add.image(0, SCREEN_SIZE.height - 100, "basket").setOrigin(0, 0).setDisplaySize(70, 70).setCollideWorldBounds(true).setDepth(10)
    // this.basket.body.allowGravity = false
    
    this.basket = this.physics.add.sprite(0, SCREEN_SIZE.height - 100, "baskets").setOrigin(0, 0).setScale(0.6).setDepth(10)
    this.basket.setBounce(0.2)
    this.basket.body.allowGravity = false


    this.createAnim()

    this.nextAppleTime = this.time.now
    this.endTime = this.time.now + 30 * 1000

    this.appleGroup = new AppleGroup(this.physics.add.group())
    this.boomGroup = this.physics.add.group()
    this.tonGroup = this.physics.add.group()
    this.spawnApple()

    this.physics.add.overlap(this.basket, this.appleGroup.getGroup(), this.overlapAppleBasket, this.checkApplePosition)
    this.physics.add.overlap(this.basket, this.boomGroup, this.overlapBoomBasket, this.checkApplePosition)
    this.physics.add.overlap(this.basket, this.tonGroup, this.overlapTonBasket, this.checkApplePosition)

    this.cursors = this.input.keyboard?.createCursorKeys()

     // Sự kiện di chuyển chuột
     // eslint-disable-next-line @typescript-eslint/no-explicit-any
     this.input.on('pointermove', (pointer: any) => {
      if (this.basket) {
        // this.basket.x = Phaser.Math.Clamp(pointer.x, this.basket.displayWidth / 2, SCREEN_SIZE.width - this.basket.displayWidth / 2);
        this.basket.x = pointer.x - this.basket.displayWidth / 2
      }
    });
  }


  private createTokenDisplay() {
    this.token = 0
    const container = this.add.container(SCREEN_SIZE.width - 18, 28).setDepth(10)
    const tokenImg = this.add.image(0, 0, 'token').setOrigin(1, 0.5).setDisplaySize(28, 28)
    this.tokenText = this.add.text(0 - tokenImg.displayWidth - 6 , 0, '0', {
      fontSize: 20,
      color: '#ffffff',
      fontFamily: 'martian'
    }).setOrigin(1, 0.5)
    
    container.add([tokenImg, this.tokenText])

  }

  private createTimeDisplay () {
    const container = this.add.container(28, 28).setDepth(10)
    const alarmImg = this.add.image(0, 0, 'alarm')
    this.timeDisplay = this.add.text(alarmImg.x + alarmImg.displayWidth / 2 + 8, 0, '00:00', {
      fontSize: 20,
      color: '#FBAC31',
      fontFamily: 'martian'
    }).setOrigin(0, 0.5)
    container.add([alarmImg, this.timeDisplay])
  }
  private updateToken() {
    this.tokenText?.setText(String(this.token))
  }

  private updateTonDisplay() {
    this.tonText?.setText(String(this.collectedTon))
  }

  private createTonDisplay() {
    this.collectedTon =0
    const container = this.add.container(SCREEN_SIZE.width - 18, 62).setDepth(10)
    const tonImg = this.add.image(0, 0, 'ton').setOrigin(1, 0.5).setDisplaySize(26, 26)
    this.tonText = this.add.text(0 - tonImg.displayWidth - 7.5 , 0, '0', {
      fontSize: 20,
      color: '#ffffff',
      fontFamily: 'martian'
    }).setOrigin(1, 0.5)

    container.add([tonImg, this.tonText])

  }

  private createAnim(){
    this.anims.create({
      key: 'boom-sprite',
      frames: this.anims.generateFrameNumbers('boom-sprite', { start: 0, end: 3 }),
      frameRate: 10,
      hideOnComplete: true
    })

    this.anims.create({
      key: 'boom',
      frames: this.anims.generateFrameNumbers('boom', { start: 0, end: 2 }),
      frameRate: 10,
      repeat: -1
    })

    this.anims.create({
      key: 'basket-0',
      frames: [
        {key: 'baskets', frame: 0}
      ],
      frameRate: 20
    })

    this.anims.create({
      key: 'basket-1',
      frames: [
        {key: 'baskets', frame: 1}
      ],
      frameRate: 20
    })

    this.anims.create({
      key: 'basket-2',
      frames: [
        {key: 'baskets', frame: 2}
      ],
      frameRate: 20
    })

    this.anims.create({
      key: 'basket-3',
      frames: [
        {key: 'baskets', frame: 3}
      ],
      frameRate: 20
    })
  }

  private spawnBoom() {
    const isSpawnBoom = Phaser.Math.FloatBetween(0, 100) < this.BOOM_SPAWN_RATIO
    if(isSpawnBoom) {
      const x = Phaser.Math.Between(35, SCREEN_SIZE.width - 35)
      const boom = this.add.sprite(x, 0, 'boom').setRotation(Phaser.Math.Between(0, 360)).anims.play('boom')
      this.boomGroup?.add(boom)
    }
  }

  private spawnTon() {
    if(this.collectedTon >= this.MAX_TON_COUNT) return
    const isSpawnTon = Phaser.Math.FloatBetween(0, 100) < this.TON_SPAWN_RATIO
    if(isSpawnTon) {
      const x = Phaser.Math.Between(35, SCREEN_SIZE.width - 35)
      const ton = this.physics.add.image(x, 0, 'ton').setDisplaySize(30, 30)
      this.tonGroup?.add(ton)
      ton.setGravityY(600)
    }
  }

  private overlapAppleBasket:Phaser.Types.Physics.Arcade.ArcadePhysicsCallback = (_, a) => {
    const apple = a as Phaser.Types.Physics.Arcade.ImageWithDynamicBody
    this.appleGroup?.gotApple(apple,  (type) => {
      switch(type) {
        case 'apple': {
          this.token += 1
          break;
        }
        case 'magnet': {
          this.endMagnetTime = this.time.now + 5000
          break;
        }
      }
    })
  }


  private overlapBoomBasket:Phaser.Types.Physics.Arcade.ArcadePhysicsCallback = (_, b) => {
    this.token = 0
    this.collectedTon = 0
    const boom = b as Phaser.Types.Physics.Arcade.ImageWithDynamicBody
    this.add.sprite(boom.x, boom.y, 'boom-sprite').setScale(0.8).anims.play('boom-sprite')
    this.boomGroup?.remove(boom)
    boom.destroy(true)
  }

  private overlapTonBasket:Phaser.Types.Physics.Arcade.ArcadePhysicsCallback = (_, t) => {
    this.collectedTon += 1
    const ton = t as Phaser.Types.Physics.Arcade.ImageWithDynamicBody
    this.tonGroup?.remove(ton)
    ton.destroy(true)
  }


  private checkApplePosition: Phaser.Types.Physics.Arcade.ArcadePhysicsCallback =  (b, a) => {
    // Kiểm tra nếu quả táo chạm vào nửa dưới của cái giỏ
    const basket = b as Phaser.Types.Physics.Arcade.ImageWithDynamicBody
    const apple = a as Phaser.Types.Physics.Arcade.ImageWithDynamicBody
    const basketBottomHalf = basket.y + basket.displayHeight / 2;
    return apple.y + apple.displayHeight / 2 >= basketBottomHalf;
  }

  private spawnApple() {
    this.appleGroup?.spawnApple({maxX: SCREEN_SIZE.width, maxY: SCREEN_SIZE.height})
  }


  private updateTimeDisplay() {
    const remainingTime = Math.max(0, Math.ceil((this.endTime as number - this.time.now) / 1000));
    const minutes = Math.floor(remainingTime / 60); // Tính số phút
    const remainingSeconds = remainingTime % 60;   // Tính số giây còn lại

    // Đảm bảo định dạng 2 chữ số (padStart)
    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(remainingSeconds).padStart(2, '0');
    this.timeDisplay?.setText(`${formattedMinutes}:${formattedSeconds}`)
  }

  private isMagnetTime() {
    return Boolean(this.endMagnetTime && this.time.now < this.endMagnetTime)
  }

  private displayMagnet(isShow: boolean) {
    this.magnetDisplay?.setVisible(isShow)
  }

  update() {
    this.updateTimeDisplay()

    if(this.endTime as number <= this.time.now) {
      this.scene.pause()
      this.scene.start('ResultScene', {token: this.token, ton: this.collectedTon})
    }

    if(this.token > 10) {
      this.basket?.anims.play('basket-3', true)
    }
    else if(this.token > 5) {
      this.basket?.anims.play('basket-2', true)
    }
    else if(this.token > 1) {
      this.basket?.anims.play('basket-1', true)
    }
    else {
      this.basket?.anims.play('basket-0', true)
    }

    this.displayMagnet(this.isMagnetTime())

    this.updateToken()
    this.updateTonDisplay()

    this.appleGroup?.getGroup()?.children.iterate((apple) => {
      const appleSprite = apple as Phaser.Types.Physics.Arcade.ImageWithDynamicBody;
      if(!appleSprite) return null
      if(this.isMagnetTime() && appleSprite.getData('type') === 'apple' && this.basket){
        const space = this.basket.x + this.basket.x/2 - appleSprite.x  - appleSprite.displayWidth /2

        const cons = appleSprite.y < this.basket.y / 3 ? 60 : 350
        this.basket &&appleSprite.setVelocityX(this.basket.x > appleSprite.x ? Math.min(cons, space) : Math.max(-cons, space)) 
      }
      else {
        appleSprite.setVelocityX(0)
      }
      if (appleSprite.y + 35 >= SCREEN_SIZE.height) {
        appleSprite.disableBody(true, true); // Loại bỏ quả táo rơi khỏi màn hình
        this.appleGroup?.getGroup()?.remove(appleSprite)
        apple.destroy(true)
      }
      return null
    })

    if(!this.nextAppleTime || this.time.now >= this.nextAppleTime) {
      this.spawnApple() 
      this.spawnBoom()
      this.spawnTon()
      this.nextAppleTime = this.time.now + Phaser.Math.Between(10, 300);
    }

    if(this.cursors?.left.isDown) {
      this.basket?.setVelocityX(-this.SPEED)
    } else if(this.cursors?.right.isDown) {
      this.basket?.setVelocityX(this.SPEED)
    }
    else {
      this.basket?.setVelocityX(0)
    }
  }
}
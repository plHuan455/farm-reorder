import { EventBus } from "@/libs/phaser"
import { EMITS } from "@/libs/phaser/constants"
import { formatToken } from "@/utils/number"

export const SCREEN_SIZE = {
  width: window.innerWidth,
  height: window.innerHeight
}
export default class ResultScene extends Phaser.Scene {
  constructor() {
    super('ResultScene')
  }
  preload() {
    this.load.font('martian', 'fonts/MartianMono.ttf')
    this.load.image('token', '/assets/token.webp')
  } 

  create(data) {
    const midX = SCREEN_SIZE.width / 2
    const midY = SCREEN_SIZE.height / 2
    const title = this.add.text(midX, SCREEN_SIZE.height * 0.1, 'You are amazing!', {
      font: '700 24px martian',
      color: '#000000',
      resolution: 3
    }).setOrigin(0.5)

    this.add.text(midX, title.y + title.displayHeight /2  + 18, 'Here is your $TFC reward', {
      font: '400 16px martian',
      color: '#4C4D4F',
      resolution: 3
    }).setOrigin(0.5)
    const tokenImg = this.add.image(midX, midY - 12, 'token').setDisplaySize(60, 60)

    this.add.text(midX, tokenImg.y + 30 + title.displayHeight /2  + 18, formatToken(data.token), {
      font: 'bold 36px martian',
      color: '#EF0739',
      resolution: 3
    }).setOrigin(0.5)

    this.add.rectangle()

    const buttonW = SCREEN_SIZE.width * 0.8
    const buttonH = 56
    const graphics = this.add.graphics();
    graphics.fillStyle(0x000000, 1); // Màu nền nút
    graphics.fillRoundedRect((SCREEN_SIZE.width - buttonW) / 2, SCREEN_SIZE.height * 0.75, buttonW, buttonH, 12);

    const zone = this.add.zone(midX, SCREEN_SIZE.height * 0.75 + buttonH / 2, buttonW, buttonH).setInteractive()
    zone.on('pointerdown', () => {
      EventBus.emit(EMITS.GO_LOOBY)
      this.scene.start('LoobyScene')
    });
    // const button = this.add.rectangle(midX, SCREEN_SIZE.height * 0.9, SCREEN_SIZE.width * 0.8, 50, 0x000000)
    // .setOrigin(0.5) // Đặt tâm của nút
    // .setStrokeStyle(2, 0x0000FF) // Viền màu xanh
    // .setInteractive(); // Để nút có thể nhấn được

  // Thêm text "Confirm"
  this.add.text(midX, SCREEN_SIZE.height * 0.75 + buttonH / 2, 'Confirm', {
    font: 'bold 16px martian',
    color: '#ffffff',
    resolution: 3
  }).setOrigin(0.5);
  }

  update() {
  }
}
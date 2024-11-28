import startGame from "@/games/configs"
import { useLayoutEffect, useRef } from "react"

export default function Game() {
  const game = useRef<Phaser.Game>()
  useLayoutEffect(() => {
    game.current = startGame("game-container")
      return () => {
        if(game.current) {
          game.current.destroy(true)
          game.current = undefined
        }
      }
  }, [])
  return (
    <div id="game-container"></div>
  )
}


// import { useLayoutEffect, useRef } from "react"
import QueryClientProvider from "./libs/react-query/Provider"
import Routing from "./pages/Routing"
// import startGame from "./main"

function App() {
  // const game = useRef<Phaser.Game>()
  // useLayoutEffect(() => {
  //   game.current = startGame("game-container")
  //   return () => {
  //     if(game.current) {
  //       game.current.destroy(true)
  //       game.current = undefined
  //     }
  //   }
  // }, [])
  // return (
  //   <div className="border-3 border-yellow-300 flex items-center justify-center">
  //     <div id="game-container" className="">

  //     </div>
  //   </div>
  // )

  return <QueryClientProvider>
    <Routing />
  </QueryClientProvider>
}

export default App

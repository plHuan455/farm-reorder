import { Outlet } from 'react-router-dom'
import BottomBar from '../components/BottomBar'
import startGame from '@/games/configs'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { EventBus } from '@/libs/phaser'
import { EMITS } from '@/libs/phaser/constants'
import { cn } from '@/utils/className'
import Modal from '@/components/molecules/Modal'
import DailyReward from '@/controllers/DailyReward'
import { useAuth } from '@/libs/auth/Provider'
import { useMutation } from 'react-query'
import QUERY_KEYS from '@/libs/react-query/constants'
import { checkInService } from '@/services/quest'

export default function MainLayout() {
  const auth = useAuth()

  const [openDailyModal, setOpenDailyModal] = useState<boolean>(false)
  const [isLooby, setIsLooby] = useState<boolean>(true)
  const { mutate: checkInMutate } = useMutation({
    mutationKey: [QUERY_KEYS.QUEST.checkIn],
    mutationFn: checkInService,
    onSuccess() {
      auth.onChange?.((preState) => ({...preState, userInfo: preState.userInfo ? {...preState.userInfo, is_checkin_today: true} : undefined}))
    }
  })
  const game = useRef<Phaser.Game>()

  // OPEN DAILY CHECKING
  useEffect(() => {
    if(auth.isLogged && !auth.userInfo?.is_checkin_today) {
      setOpenDailyModal(true)
    }
  }, [auth])
  
  useLayoutEffect(() => {
    game.current = startGame("game-container")
    return () => {
      if (game.current) {
        game.current.destroy(true)
        game.current = undefined
      }
    }
  }, [])

  useEffect(() => {
    if(openDailyModal) return

    EventBus.on(EMITS.GO_GAME, () => {
      setIsLooby(false)
      EventBus.emit(EMITS.PLAY_GAME)
    });

    return () => {
      EventBus.removeListener(EMITS.GO_GAME);
    }
  }, [openDailyModal, EventBus])

  useEffect(() => {
    EventBus.on(EMITS.GO_LOOBY, () => {
      setIsLooby(true)
    });

    return () => {
      EventBus.removeListener(EMITS.GO_LOOBY);
    }
  }, [])
  return (
    <>
      <div className={cn('fixed top-0 left-0 w-screen h-screen duration-700', !isLooby && "scale-150 opacity-0 pointer-events-none")} >
        <Outlet />
        <BottomBar />
      </div>
      <div className='game-container'></div>
      <Modal
        isOpen={openDailyModal}
        onRequestClose={() => setOpenDailyModal(false)}
        contentClassName='w-full h-full bg-background rounded-none'
      >
        <DailyReward onContinue={() => {
          checkInMutate()
          setOpenDailyModal(false)
        }}/>
      </Modal>
    </>
  )
}

import { createContext, useContext, useEffect, useMemo, useState } from "react"
import { Outlet, useSearchParams } from "react-router-dom"
import WebApp from "@twa-dev/sdk"
import { useMutation } from "react-query"
import QUERY_KEYS from "../react-query/constants"
import { getMeService, signInService } from "@/services/auth"
import { IUserInfo } from "@/services/auth/types"
import { LOCAL_STORAGE } from "@/constants/storage"
import Flex from "@/components/atoms/Flex"
import Typography from "@/components/atoms/Typography"
import { joinClanService } from "@/services/clan"


interface Props {
}

interface IAuthData {
  userInfo?: IUserInfo
  isLogged: boolean
  isLoading: boolean
}

interface IAuthContext extends IAuthData {
  onChange?: (data: IAuthData | ((preState: IAuthData) => IAuthData)) => void
}

const initialAuthData: IAuthData = {
  isLoading: true,
  isLogged: false,
  userInfo: undefined
}

const AuthContext = createContext<IAuthContext>(initialAuthData)

export default function AuthProvider({ }: Props) {
  const [auth, setAuth] = useState<IAuthData>(initialAuthData)
  const [searchParams] = useSearchParams() 

  const { mutate: getMeMutate } = useMutation({
    mutationKey: [QUERY_KEYS.AUTH.me],
    mutationFn: getMeService,
    onSuccess(data) {
      setAuth({
        isLoading: false,
        isLogged: true,
        userInfo: data.userInfo
      })
      const startParams = searchParams.get('start')?.split('_')
      const clanId = startParams?.at(2)


      /** HANDLE NÊU CÓ ID RỒI THÌ KHỎI GỌI JOIN */
      if(clanId && !data.userInfo.clan_id) {
        clanId && joinClanMutate({clanId})
      }
    },
    onError() {
      setAuth({
        isLoading: false,
        isLogged: false,
        userInfo: undefined
      })
    },
  })
  const { mutate: signInMutate } = useMutation({
    mutationKey: [QUERY_KEYS.AUTH.signin],
    mutationFn: signInService,
    onSuccess(data) {
      localStorage.setItem(LOCAL_STORAGE.accessToken, data.userInfo.access_token)
      
      const clanId = WebApp.initDataUnsafe.start_param?.split('_')?.at(2)
      if(clanId && !data.userInfo.clan_id) {
        joinClanMutate({clanId})
      }
      setAuth({
        isLoading: false,
        isLogged: true,
        userInfo: data.userInfo
      })
    },
    onError() {
      localStorage.removeItem(LOCAL_STORAGE.accessToken)
      setAuth({
        isLogged: false,
        isLoading: false,
        userInfo: undefined
      })
    }
  })

  const {mutate: joinClanMutate} = useMutation({
    mutationKey: [QUERY_KEYS.CLAN.join],
    mutationFn: joinClanService
  })

  useEffect(() => {
    WebApp.expand()
    WebApp.disableVerticalSwipes()

    if (!WebApp.initDataUnsafe.user) {
      if (localStorage.getItem(LOCAL_STORAGE.accessToken)) {
        getMeMutate()
      }
      return
    }

    const data = WebApp.initDataUnsafe.user
    signInMutate({
      avatar: data.photo_url as string,
      telegram_id: data.id,
      username: data.username as string
    })
  }, [])

  const value = useMemo(() => {
    return {
      ...auth,
      onChange: (data) => {
        if(typeof data === 'function') {
          data(auth)
          return
        }
        return setAuth(data)
      }
    }
  }, [auth])
  return (
    <AuthContext.Provider value={value}>
      {auth.isLoading ? <Flex className="w-full h-screen" center>
        <Typography size={'titleMd'}>Loading ...</Typography>
      </Flex> : <Outlet />}

    </AuthContext.Provider>
  )
}


export function useAuth() {
  return useContext(AuthContext)
}

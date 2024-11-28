"use client"
import { QueryClient, QueryClientProvider as QueryClientProviderLib } from "react-query"


const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchInterval: false,
      staleTime: 90000,
      retry: 0,
    },
  },
})
interface Props {
  children: React.ReactNode
}
export default function QueryClientProvider({ children }: Props) {
  return <QueryClientProviderLib client={queryClient}>{children}</QueryClientProviderLib>
}

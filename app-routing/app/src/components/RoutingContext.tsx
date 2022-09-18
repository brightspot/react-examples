import { createContext } from 'react'
import useSessionStorage from './useSessionStorage'

interface RoutingContextInterface {
  routingOption: number
  setRoutingOption: Function
}

export const RoutingContext = createContext<RoutingContextInterface | null>(
  null
)

const { Provider } = RoutingContext

const RoutingProvider = ({ children }: any) => {
  const [routingOption, setRoutingOption] = useSessionStorage<number>(
    'routing-option',
    1
  )
  const contextValue: RoutingContextInterface = {
    routingOption,
    setRoutingOption,
  }

  return <Provider value={contextValue}>{children}</Provider>
}

RoutingProvider.context = RoutingContext

export default RoutingProvider

// Import 
import styled from 'styled-components'

import { useChat } from "./hooks/useChat"
import SignIn from './signIn'
import ChatRoom from './ChatRoom'

// Wrapper 
const AppWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    width: 500px;
    margin: auto;
`

// App
const App = () => {
  const { signedIn } = useChat()

  return (
    <AppWrapper>
      {signedIn ? <ChatRoom /> : <SignIn />}
    </AppWrapper >
  )
}

export default App
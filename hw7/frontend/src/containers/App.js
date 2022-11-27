import './App.css'
import { useState, useEffect, useRef } from 'react'
import { Button, Input, message, Tag } from 'antd'
import styled from 'styled-components';
import {useChat} from './hooks/useChat'
import ChatRoom from './ChatRoom'
import SignIn from './SignIn'

// 改自 App.css 裡頭的 .App
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 500px;
  margin: auto;
}`;

const App = () => {
  const { status, signedIn, displayStatus } = useChat() 
  useEffect(() => {
    displayStatus(status)}, [status, displayStatus])
  
  return (
    <Wrapper> {signedIn? <ChatRoom/>: <SignIn />} </Wrapper>
)
}
export default App;

// function App() {
//   const { status, messages, sendMessage, clearMessages } = useChat()
//   const [username, setUsername] = useState('')
//   const [body, setBody] = useState('')
//   const bodyRef = useRef(null)
//   const displayStatus = (s) => {
//     if (s.msg) {
//       const { type, msg } = s;
//       const content = {
//         content: msg, duration: 0.5
//       }
//       switch (type) {
//         case 'success': message.success(content)
//           break
//         case 'error':
//         default:
//           message.error(content)
//           break
//       }
//     }
//   }
//   useEffect(() => {
//     displayStatus(status)
//   }, [status])

//   return (
//     <div className="App">
//       <div className="App-title">
//         <h1>Simple Chat</h1>
//         <Button type="primary" danger onClick={clearMessages}>
//           Clear
//         </Button>
//       </div>
//       <div className="App-messages">
//         {messages.length === 0 ? (
//           // Initial or when cleared
//           <p style={{ color: '#ccc' }}> No messages... </p>
//         ) : (
//           // Print each message: { name, textBody}
//           messages.map(({ name, body }, i) => (
//             <p className="App-message" key={i}>
//               <Tag color="blue">{name}</Tag> {body}
//             </p>
//           ))
//         )}
//       </div>
//       <Input
//         // When input "Username", switch to textBody automatically
//         onKeyDown={(e) => {
//           if (e.key === 'Enter') {
//             bodyRef.current.focus()
//           }
//         }}

//         placeholder="Username"
//         // Save and store the username
//         value={username}
//         onChange={(e) => setUsername(e.target.value)}
//         style={{ marginBottom: 10 }}
//       ></Input>
//       <Input.Search
//         // Save and store the textBody
//         ref={bodyRef}
//         value={body}
//         onChange={(e) => setBody(e.target.value)}
//         enterButton="Send"
//         placeholder="Type a message here..."
//         // When "Send" call sendMessage()
//         onSearch={(msg) => {
//           // Check whether the "username", "textBody" is null
//           if (!msg || !username) {
//             displayStatus({
//               type: 'error',
//               msg: 'Please enter a username and a message body.'
//             })
//             return
//           }
//           sendMessage({ name: username, body: msg })
//           setBody('')
//         }}
//       ></Input.Search>
//     </div>
//   )
// }

// export default App

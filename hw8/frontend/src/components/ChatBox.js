import styled from "styled-components"
import Message from "./Message"

const ChatBoxWrapper = styled.div`
    height: calc( 260px - 36px );
    display: flex;
    flex-direction: column;
    overflow: auto;
`

const MsgFooterRef = styled.div`
    height: 20px;
`

const ChatBox = ( { msgs, admin, footerRef } ) => {
    return (
        <>
            <ChatBoxWrapper>
                {msgs.length == 0 ?
                    ( <p style={{ color: '#ccc' }}> No messages... </p> ) :
                    ( msgs.map( ( msg, index ) => {
                        return ( <Message isAdmin={msg.sender == admin} messageBody={msg.body} key={index} /> )
                    } ) )
                }
                <MsgFooterRef ref={footerRef} />
            </ChatBoxWrapper >
        </>
    )
}

export default ChatBox 
// Import 
import styled from "styled-components"

// Wrapper 
const MessageWrapper = styled.div`
    display: flex;
    align-items: center;
    flex-direction: ${( { isMe } ) => ( isMe ? 'row-reverse' : 'row' )};
    margin: 8px 0px;

    & p:first-child{
        margin: 0 5px;
    }

    & p:last-child{
        padding: 2px 5px;
        border-redius: 5px;
        background: #eee;
        color: gray;
        margin: auto 0;
    }
`
// Message
const Message = ( { isAdmin, messageBody } ) => {
    return (
        <MessageWrapper isMe={isAdmin}>
            <p>{messageBody}</p>
        </MessageWrapper>
    )
}

export default Message
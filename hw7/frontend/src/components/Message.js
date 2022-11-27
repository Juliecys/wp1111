import styled from 'styled-components';

// 改自 App.css 裡頭的 .App-title
// const StyledMessage = styled.div`
//     width: 100%;
//     height: 300px;
//     background: #eeeeee52;
//     border-radius: 10px;
//     margin: 20px;
//     padding: 20px;
//     overflow: auto;
// }`;
const StyledMessage = styled.div`
    display: flex;
    align-items: center;
    // 如果是自己的話就靠右（row-reverse），不是自己的 message 就靠左（row）
    flex-direction: ${({isMe}) => (isMe ? 'row-reverse' : 'row')}; 
    margin: 8px 10px;
    
    & p:first-child { 
        margin: 0 5px;
    }
    & p:last-child { 
        padding: 2px 5px; 
        border-radius: 5px; 
        background: #eee; 
        color: gray; 
        margin: auto 0;
    } 
`;

const Message = ({ isMe, message }) => {
    return (
        <StyledMessage isMe={isMe}>
            <p>{message}</p>
            {/* <p><Tag color="blue">{name}</Tag> {message}</p> */}
        </StyledMessage>
    );
};

export default Message;
import { useState, useEffect, useRef } from 'react'
import { Tabs, Input, Modal, Form } from 'antd'
import styled from 'styled-components';
import { useChat } from './hooks/useChat'
import Title from '../components/Title';
import Message from '../components/Message';
import ChatModal from '../components/ChatModal';

// 改自 App.css 裡頭的 .App-messages
const ChatBoxesWrapper = styled.div`
    width: 100%;
    height: 300px;
    background: #eeeeee52;
    border-radius: 10px;
    margin: 20px;
    padding: 20px;
    overflow: auto;
}`;

const ChatBoxWrapper = styled.div`
    height: calc(240px - 36px);
    display: flex;
    flex-direction: column;
    overflow: auto;
`

const FootRef = styled.div` 
    height: 20px;
`;


function ChatRoom() {
    const { me, status, messages, startChat, sendMessage, clearMessages, displayStatus } = useChat()
    // const [username, setUsername] = useState('')
    const [body, setBody] = useState('')
    const [msgSent, setMsgSent] = useState(false)
    // const msgRef = useRef(null)
    const msgFooter = useRef(null)
    const bodyRef = useRef(null)

    const [chatBoxes, setChatBoxes] = useState([]); // { label, children, key }
    const [activeKey, setActiveKey] = useState(""); // 目前被點選的 chatbox
    const [modalOpen, setModalOpen] = useState(false);

    const scrollToBottom = () => {
        msgFooter.current?.scrollIntoView // .? Optional chaining 如果前面的 element 不是 undefined/null 就做接下來的事
            ({ behavior: 'smooth', block: "start" });
    };
    useEffect(() => {
        scrollToBottom();
        setMsgSent(false);
    }, [msgSent]);

    // 產生 chat 的 DOM nodes
    const displayChat = (chat) => {
        console.log("display chat!")
        console.log("chat:", chat)
        return (
            chat.length === 0 ? (
                <p style={{ color: '#ccc' }}> No message... </p>
            ) : (
                <ChatBoxWrapper>
                    {
                        chat.map(({ name, body }, i) => {
                            return (<Message isMe={name === me} message={body} key={i} />)
                        })
                    }
                    <FootRef ref={msgFooter} />
                </ChatBoxWrapper>
            )
        )
    }
    const handleUpdate = (index, chat) => {
        const newChatBoxes = [...chatBoxes];
        console.log("newChatBoxes =", newChatBoxes)
        newChatBoxes[index].children = chat;
        setChatBoxes(newChatBoxes);
    }

    useEffect(() => {
        if (activeKey !== "") {
            const result = chatBoxes.findIndex(item => item.key === activeKey);
            if (result === -1) {
                setChatBoxes([...chatBoxes,
                {
                    label: activeKey,
                    children: displayChat(messages),
                    key: activeKey
                }]);
            }
            else {
                handleUpdate(result, displayChat(messages))
            }
            setMsgSent(true);
        }
    }, [messages]);

    const createChatBox = (friend) => {
        if (chatBoxes.some
            (({ key }) => key === friend)) {
            throw new Error(friend +
                "'s chat box has already opened.");
        }
        setMsgSent(true);
        return friend;
    };

    const removeChatBox = (targetKey, activeKey) => {
        const index = chatBoxes.findIndex(({ key }) => key === activeKey);
        const newChatBoxes = chatBoxes
            .filter(({ key }) => key !== targetKey);
        setChatBoxes(newChatBoxes);
        return (
            activeKey ?
                activeKey === targetKey ?
                    index === 0 ?
                        '' : chatBoxes[index - 1].key
                    : activeKey
                : ''
        );
    };

    return (
        <>
            <Title name={me} />
            <>
                <ChatBoxesWrapper>
                    <Tabs
                        tabBarStyle={{ height: '36px' }}
                        type="editable-card"
                        onChange={(key) => {
                            startChat(me, key);
                            setActiveKey(key);
                            // extractChat(key);
                            // displayChat(messages) // initial chatroom messages
                        }}
                        onEdit={(targetKey, action) => {
                            if (action === 'add') setModalOpen(true);
                            else if (action === 'remove') {
                                setActiveKey(removeChatBox(targetKey, activeKey));
                            }
                        }}
                        activeKey={activeKey}
                        items={chatBoxes}
                    />
                    {/* <>
                        <FootRef ref={msgFooter} />
                    </> */}
                </ChatBoxesWrapper>
                {/* {displayMessages()} */}

                <ChatModal
                    open={modalOpen}
                    // 按下 Create 後的動作
                    onCreate={({ name }) => {
                        startChat(me, name)
                        // console.log("opening", createChatBox(name))

                        setActiveKey(createChatBox(name));
                        setModalOpen(false);
                        // console.log("!!! create", messages)
                        // displayChat(messages);
                    }}
                    // 按下 Cancel 後的動作
                    onCancel={() => { setModalOpen(false); }}
                />
            </>

            <Input.Search
                // Save and store the textBody
                ref={bodyRef}
                value={body}
                onChange={(e) => setBody(e.target.value)}
                enterButton="Send"
                placeholder="Type a message here..."
                // When "Send" call sendMessage()
                onSearch={(msg) => {
                    // Check whether the "username", "textBody" is null
                    // if (!msg || !username) {
                    if (!msg) {
                        displayStatus({
                            type: 'error',
                            msg: 'Please enter a username and a message body.'
                        })
                        return
                    }
                    sendMessage({ name: me, to: activeKey, body: msg })
                    setBody('')
                }}
            ></Input.Search>
        </>
    )
}

export default ChatRoom
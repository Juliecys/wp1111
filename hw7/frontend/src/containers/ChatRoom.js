import { useState, useEffect, useRef } from 'react'
import { Tabs, Input, Modal, Form } from 'antd'
import styled from 'styled-components';
import { useChat } from './hooks/useChat'
import Title from '../components/Title';
import Message from '../components/Message';

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

// const ChatBoxWrapper = styled.div`
//     height: calc(240px - 36px);
//     display: flex;
//     flex-direction: column;
//     overflow: auto;
// `

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
    const [activeKey, setActiveKey] = useState(); // 目前被點選的 chatbox
    const [modalOpen, setModalOpen] = useState(false);

    const scrollToBottom = () => {
        msgFooter.current?.scrollIntoView // .? Optional chaining 如果前面的 element 不是 undefined/null 就做接下來的事
            ({ behavior: 'smooth', block: "start" });
    };
    useEffect(() => {
        scrollToBottom();
        setMsgSent(false);
    }, [msgSent]);

    // const displayMessages = () => (
    //     messages.length === 0 ? (
    //         // Initial or when cleared
    //         <p style={{ color: '#ccc' }}> No messages... </p>
    //     ) : (
    //         // Print each message: { name, textBody }
    //         messages.map(({ name, body }, i) => (
    //             <p className="App-message" key={i}>
    //                 <Tag color="blue">{name}</Tag> {body}
    //             </p>
    //         ))
    //     )
    // )

    // 產生 chat 的 DOM nodes
    // const renderChat = (chat) => {
    //     return (
    //         chat.length === 0 ? (
    //             // Initial or when cleared
    //             <p style={{ color: '#ccc' }}> No messages... </p>
    //         ) : (
    //             // Print each message: { name, textBody }
    //             chat.map(({ name, body }, i) => {
    //                 let isMe = false
    //                 if (name === me) {
    //                     isMe = true
    //                 }
    //                 return <Message key={i} isMe={isMe} message={body} />
    //             })
    //         ))
    // };
    // const extractChat = (friend) => {
    //     return renderChat
    //         (messages.filter
    //             (({ name, body }) => ((name === friend) || (name === me))));
    // }

    const ChatModal = ({ open, onCreate, onCancel }) => {
        const [form] = Form.useForm();
        return (
            <Modal
                open={open}
                title="Create a new chat room"
                okText="Create"
                cancelText="Cancel"
                // Cancel 按鈕
                onCancel={onCancel}
                // Create 按鈕
                onOk={() => {
                    form
                        .validateFields()
                        .then((values) => {
                            form.resetFields();
                            onCreate(values);
                        })
                        .catch((e) => {
                            window.alert(e);
                        });
                }}
            >
                <Form form={form} layout="vertical"
                    name="form_in_modal">
                    <Form.Item
                        name="name"
                        label="Name"
                        rules={[
                            {
                                required: true,
                                message: 'Error: Please enter the name of the person to chat!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                </Form >
            </Modal >
        );
    };

    const createChatBox = (friend) => {
        if (chatBoxes.some
            (({ key }) => key === friend)) {
            throw new Error(friend +
                "'s chat box has already opened.");
        }
        // const chat = extractChat(friend);
        const chat = startChat(me, friend);
        setChatBoxes([...chatBoxes,
        {
            label: friend,
            children: chat,
            key: friend
        }]);
        // For scrollToBottom()
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
                            setActiveKey(key);
                            // extractChat(key);
                            startChat(me, key);
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
                    <>
                        <FootRef ref={msgFooter} />
                    </>
                </ChatBoxesWrapper>
                {/* {displayMessages()} */}

                <ChatModal
                    open={modalOpen}
                    // 按下 Create 後的動作
                    onCreate={({ name }) => {
                        setActiveKey(createChatBox(name));
                        // extractChat(name);
                        startChat(me, name)
                        setModalOpen(false);
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

                    sendMessage({ name: me, body: msg })
                    setBody('')
                }}
            ></Input.Search>
        </>
    )
}

export default ChatRoom
import React, { Component, useContext, useEffect, useRef, useState } from "react";
import { Button, Input, message, Tag } from 'antd'

const client = new WebSocket('ws://localhost:4000');
client.onopen = () => console.log('Backend socket server connected')

const LOCALSTORAGE_KEY = "save-me";
const savedMe = localStorage.getItem(LOCALSTORAGE_KEY)

// Define Context
const ChatContext = React.createContext({
    status: {},
    me: "",
    signedIn: false,
    messages: [],
    startChat: () => { },
    sendMessage: () => { },
    clearMessages: () => { },
});

// Define Context Provider
const ChatProvider = (props) => {
    // define status, me, signedIn, messages
    const [status, setStatus] = useState({});
    const [me, setMe] = useState(savedMe || "");
    const [signedIn, setSignedIn] = useState(false);
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        if (signedIn) {
            localStorage.setItem(LOCALSTORAGE_KEY, me);
        }
    }, [me, signedIn]);

    client.onmessage = (byteString) => {
        const { data } = byteString;
        const [task, payload] = JSON.parse(data);
        switch (task) {
            // Received from server
            case "init": {
                setMessages(payload);
                break;
            }
            case "output": {
                setMessages(() =>
                    [...messages, ...payload]);
                break;
            }
            case "status": {
                setStatus(payload);
                break;
            }
            case "cleared": {
                setMessages([]);
                break;
            }
            default: break;
        }
    }

    const sendData = async (data) => {
        await client.send(JSON.stringify(data));
    };

    const startChat = (name, to) => {
        if (!name || !to) {
            throw new Error('Name or to required.')
        }
        sendData({
            type: "CHAT", 
            payload: { name, to }
        });
    }

    const sendMessage = (name, to, body) => {
        if (!name || !to || !body) {
            throw new Error('name or to or body required.')
        }
        sendData({
            type: "MESSAGE",
            payload: { name, to, body }
        });
    }

    const clearMessages = () => {
        sendData(["CLEAR"]);
    };

    const displayStatus = (s) => {
        if (s.msg) {
            const { type, msg } = s;
            const content = {
                content: msg, duration: 0.5
            }
            switch (type) {
                case 'success': 
                    message.success(content)
                    break
                case 'error':
                default:
                    message.error(content)
                    break
            }
        }
    }
    useEffect(() => {
        displayStatus(status)
    }, [status])

    return (
        // status, messages, sendMessage, clearMessages
        <ChatContext.Provider
            value={{
                status, 
                me, 
                signedIn, 
                messages, 
                setMe, 
                setSignedIn,
                startChat,
                sendMessage, 
                clearMessages, 
                displayStatus
            }}
            {...props}
        />
    );
};

// Define Context Provider
const useChat = () => useContext(ChatContext);
export { ChatProvider, useChat };
// export default useChat;
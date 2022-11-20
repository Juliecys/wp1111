// import {useEffect, useRef, useState} from "react";
import { useState } from "react";
const client = new WebSocket('ws://localhost:4000');
// function useWs(onMessage) {
//   const [ready, setReady] = useState(false);
//   const wsRef = useRef(null);

//   useEffect(() => {
//     const client = new WebSocket("ws://localhost:4000");
//     client.onopen = () => setReady(true);
//     client.onclose = () => setReady(false);
//     client.onmessage = onMessage;
//     wsRef.current = client;
//     return () => client.close();
//   }, []);

//   return {ready, send: wsRef.current?.send.bind(wsRef.current)};
// }

const useChat = () => {
    // define messages, status
    const [status, setStatus] = useState({});
    const [messages, setMessages] = useState([]);
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
        await client.send(
            JSON.stringify(data));
    };

    const sendMessage = (payload) => {
        // setMessages([...messages, { name: payload.name, body: payload.body }]);
        sendData(["input", payload]);
        // setStatus({
        //     type: "success",
        //     msg: "Message sent."
        // });
        // console.log(messages);
    }

    const clearMessages = () => {
        sendData(["clear"]);
    };

    return {
        status, messages, sendMessage, clearMessages
    };
};
export default useChat;
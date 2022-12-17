// Import 
import { useEffect, useRef, useState } from "react"
import { Input, Tabs } from 'antd'
import styled from "styled-components"

import { useChat } from "./hooks/useChat"
import Title from '../components/Title'
import ChatModal from "../components/ChatModal"
import ChatBox from "../components/ChatBox"

// Wrappers 
const ChatBoxesWrapper = styled( Tabs )`
    width: 100%;
    height: 300px;
    background: #eeeeee52;
    border-radius: 10px;
    margin: 20px;
    padding: 20px;
    overflow: auto;
`

// ChatRoom
const ChatRoom = () => {
    const { admin, allMsg, displayStatus, sendMsg, updated, setUpdated } = useChat()

    const [activeKey, setActivekey] = useState( '' )
    const [chatBoxes, setChatBoxes] = useState( [] )
    const [modalOpen, setModalOpen] = useState( false )

    const [msgBody, setMsgBody] = useState( '' )

    const msgFooterRef = useRef( null )

    useEffect( () => {
        if ( updated == false ) {
            update_active_chatBox()
        }
        setUpdated( true )
        scrollToBottom()
    }, [updated] )

    const get_chat_node = ( friendName ) => {
        let curMsgs = allMsg.filter( ( msg ) => {
            return ( ( msg.sender == admin && msg.receiver == friendName ) || ( msg.receiver == admin && msg.sender == friendName ) )
        } )
        return ( <ChatBox msgs={curMsgs} admin={admin} footerRef={msgFooterRef} /> )
    }

    const scrollToBottom = () => {
        msgFooterRef.current?.scrollIntoView( {
            behavior: 'smooth',
            block: 'start'
        } )
    }

    const update_active_chatBox = () => {
        if ( !activeKey ) return

        let newChatBoxes = []
        for ( let i = 0; i < chatBoxes.length; i++ ) {
            let chatBox = {
                label: chatBoxes[i].label,
                children: ( chatBoxes[i].label == activeKey ? get_chat_node( activeKey ) : [] ),
                key: chatBoxes[i].key
            }
            newChatBoxes.push( chatBox )
        }
        setChatBoxes( newChatBoxes )
    }

    const create_chat_box = ( friendName ) => {
        const newChat = get_chat_node( friendName )
        setChatBoxes( ( preChatBoxes ) => {
            return (
                [...preChatBoxes,
                {
                    label: friendName,
                    children: newChat,
                    key: friendName
                }
                ]
            )
        } )
        setActivekey( friendName )
        setUpdated( false )
    }

    const remove_chat_box = ( targetKey, curActiveKey ) => {
        const curIndex = chatBoxes.findIndex( ( { key } ) => { return key == curActiveKey } ) // get current focus tab
        const newChatBoxes = chatBoxes.filter( ( { key } ) => { return key != targetKey } ) // remove target tab
        setChatBoxes( newChatBoxes )

        // Set active key 
        if ( curActiveKey == targetKey ) // remove focus key => switch tab
        {
            if ( newChatBoxes.length == 0 ) {
                setActivekey( '' )
            }
            else {
                let newActiveIndex = Math.min( curIndex, newChatBoxes.length - 1 )
                setActivekey( newChatBoxes[newActiveIndex].key )
            }
        }
    }

    const chatBoxes_on_edit = ( targetKey, action ) => {
        if ( action == 'add' ) {
            setModalOpen( true )
        }
        else if ( action == 'remove' ) {
            remove_chat_box( targetKey, activeKey )
        }
        setUpdated( false )
    }

    const chatBoxes_on_change = ( key ) => {
        setActivekey( key )
        setUpdated( false )
    }

    const Modal_on_create = ( friendName ) => {
        // Already exist 
        if ( chatBoxes.some( ( { key } ) => { return key == friendName } ) ) {
            displayStatus( {
                stsType: 'error',
                stsMsg: `${friendName}'s chat box already opened.`
            } )
            return
        }

        create_chat_box( friendName )
        setModalOpen( false )
        displayStatus( {
            stsType: 'success',
            stsMsg: `Create chat box with ${friendName} successfully.`
        } )
    }

    const Modal_on_cancel = () => {
        setModalOpen( false )
    }

    const Input_on_change = ( event ) => {
        setMsgBody( event.target.value )
    }

    const Input_on_search = ( msg ) => {
        // No msg 
        if ( msg == '' ) {
            displayStatus( {
                stsType: 'error',
                stsMsg: 'Type message to send'
            } )
            return
        }

        // Send successful
        sendMsg( admin, activeKey, msg )
        setMsgBody( '' )
    }

    return (
        <>
            <Title adminName={admin} />
            <>
                <ChatBoxesWrapper
                    tabBarStyle={{ height: '36px' }}
                    type="editable-card"
                    activeKey={activeKey}
                    items={chatBoxes}

                    onEdit={( targetKey, action ) => { chatBoxes_on_edit( targetKey, action ) }}
                    onChange={( key ) => { chatBoxes_on_change( key ) }}
                />

                <ChatModal
                    open={modalOpen}

                    onCreate={( { name } ) => { Modal_on_create( name ) }}
                    onCancel={Modal_on_cancel}
                />
            </>
            <Input.Search
                enterButton='Send'
                placeholder='Type your message here'
                value={msgBody}
                onChange={( event ) => { Input_on_change( event ) }}
                onSearch={( msg ) => { Input_on_search( msg ) }}
            />

            {/* {updated ? <p display='none'></p> : <p display='none'></p>} */}
        </>
    )
}

export default ChatRoom
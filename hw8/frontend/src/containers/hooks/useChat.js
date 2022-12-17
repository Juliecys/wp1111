// Import 
import { useState, createContext, useContext, useEffect } from "react"
import { message } from "antd"

// Local storage 
const LOCAL_STORAGE_ADMIN = 'saved_admin'
const savedAdmin = localStorage.getItem( LOCAL_STORAGE_ADMIN )

// Web socket 
const clientWS = new WebSocket( 'ws://localhost:4000' )
const sendData = async ( data ) => {
    await clientWS.send( JSON.stringify( data ) )
}

// Context outline 
const ChatContext = createContext(
    {
        // states 
        signedIn: false,
        setSignedIn: () => {},

        admin: '',
        setAdmin: () => {},

        allMsg: [],
        setAllMsg: () => {},

        updated: true,
        setUpdated: () => {},

        // functions 
        displayStatus: () => {},
        sendMsg: () => {}
    }
)

// Create context content 
const ChatProvider = ( props ) => {
    const [signedIn, setSignedIn] = useState( false )
    const [admin, setAdmin] = useState( savedAdmin || '' )
    const [allMsg, setAllMsg] = useState( [] )
    const [updated, setUpdated] = useState( true )

    useEffect( () => {
        setUpdated( false )
    }, [allMsg] )

    useEffect( () => {
        localStorage.setItem( LOCAL_STORAGE_ADMIN, admin )
    }, [signedIn] )

    clientWS.onmessage = ( byteString ) => {
        const { data } = byteString
        const [task, payload] = JSON.parse( data )
        switch ( task ) {
            case 'init_complete': {
                setAllMsg( payload )
            }

            case 'msg_sent': {
                setAllMsg( ( preAllMsg ) => {
                    return [...preAllMsg, payload]
                } )
                break
            }

            case 'show_sts': {
                displayStatus( payload )
            }

            default: break
        }

    }

    clientWS.onopen = () => {
        sendData( ['init_msgs'] )
    }

    const displayStatus = ( sts ) => {
        if ( sts ) {
            const { stsType, stsMsg } = sts
            const content = {
                content: stsMsg, duration: 1.5
            }

            switch ( stsType ) {
                case 'success': {
                    message.success( content )
                    break
                }
                case 'error':
                default: {
                    message.error( content )
                    break
                }
            }
        }
    }

    const sendMsg = ( sender, receiver, body ) => {
        const newMsg = {
            sender: sender,
            receiver: receiver,
            body: body
        }
        sendData( ['send_msg', newMsg] )
        setUpdated( false )
    }

    return (
        <ChatContext.Provider
            value={
                {
                    signedIn,
                    setSignedIn,
                    admin,
                    setAdmin,
                    allMsg,
                    setAllMsg,
                    updated,
                    setUpdated,

                    displayStatus,
                    sendMsg
                }
            }
            {...props}
        />
    )
}

// Export hook
const useChat = () => { return useContext( ChatContext ) }
export { useChat, ChatProvider }
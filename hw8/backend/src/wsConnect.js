import Message from '../models/MessageModel'

const sendData = ( clientWS, data ) => {
    clientWS.send( JSON.stringify( data ) )
}

const broadcastData = ( serverWS, data ) => {
    serverWS.clients.forEach( ( client ) => {
        sendData( client, data )
    } )
}

const wsConnect = {
    onMessage: ( serverWS, clientWS ) => {
        return (
            async ( byteString ) => {
                const { data } = byteString
                const [task, payload] = JSON.parse( data )

                switch ( task ) {
                    case 'init_msgs': {
                        Message.find().sort( { created_at: -1 } ).limit( 100 ).exec( ( err, res ) => {
                            if ( err ) {
                                let initFailedSts = {
                                    stsType: 'error',
                                    stsMsg: 'Load chat record failed ಥ_ಥ'
                                }
                                sendData( clientWS, ['show_sts', initFailedSts] )
                                throw err
                            }
                            else {
                                broadcastData( serverWS, ['init_complete', res] )
                            }
                        } )
                        break
                    }

                    case 'send_msg': {
                        const { sender, receiver, body } = payload
                        const message = new Message( { sender, receiver, body } )

                        try {
                            await message.save()
                        }
                        catch ( error ) {
                            let msgSentFailSts = {
                                stsType: 'error',
                                stsMsg: 'Message sent failed (⋟﹏⋞)'
                            }
                            broadcastData( serverWS, ['show_sts', msgSentFailSts] )
                            throw new Error( 'Message DB save error' + error )
                        }

                        let msgSentSucSts = {
                            stsType: 'success',
                            stsMsg: 'Message sent ( ﾟДﾟ)b'
                        }
                        broadcastData( serverWS, ['msg_sent', payload] )
                        sendData( clientWS, ['show_sts', msgSentSucSts] )
                        break
                    }

                    default: break
                }
            }
        )
    }
}

export default wsConnect
import Message from "./models/message"

const sendData = (data, ws) => { ws.send(JSON.stringify(data)); }
const sendStatus = (payload, ws) => { sendData(["status", payload], ws); }
const broadcastMessage = (wss, data, status) => {
    wss.clients.forEach((client) => {
        sendData(data, client);
        sendStatus(status, client);
    });
};

export default {
    initData: (ws) => {
        Message.find().sort({ created_at: -1 }).limit(100)
            .exec((err, res) => {
                if (err) throw err;
                // initialize app with existing messages 
                sendData(["init", res], ws);
            });
    },
    onMessage: (wss) => (
        async (byteString) => {
            // console.log("byte:", byteString);
            const { data } = byteString
            const [task, payload] = JSON.parse(data)
            switch (task) {
                case 'input': {
                    const { name, body } = payload
                    // Save payload to DB
                    const message = new Message({ name, body })
                    try {
                        await message.save();
                    } catch (e) {
                        throw new Error
                            ("Message DB save error: " + e);
                    }
                    // Respond to client
                    // let temp_data = ['output', [payload]]
                    // let temp_status = { type: 'success', msg: 'Message sent.' }
                    broadcastMessage(
                        wss, 
                        ['output', [payload]], 
                        { 
                            type: 'success', 
                            msg: 'Message sent.'
                        })
                    
                    // // Send message to client
                    // sendData(['output', [payload]], ws)
                    // // Send Notification message
                    // sendStatus({
                    //     type: 'success', msg: 'Message sent.'
                    // }, ws)
                    break
                }
                case 'clear': {
                    Message.deleteMany({}, () => {
                        // let temp_data = ['cleared']
                        // let temp_status = { type: 'info', msg: 'Message cache cleared.' }
                        broadcastMessage(
                            wss, 
                            ['cleared'], 
                            { 
                                type: 'info', 
                                msg: 'Message cache cleared.' 
                            })
                        // sendData(['cleared'], ws)
                        // sendStatus
                        //     ({ type: 'info', msg: 'Message cache cleared.' }, ws)
                    })
                    break
                }
                default: break
            }
        }
    )
}
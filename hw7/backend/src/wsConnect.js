import Message from "./models/message"
import { UserModel, MessageModel, ChatBoxModel } from "./models/chatbox"

const makeName =
    (name, to) => { return [name, to].sort().join('_'); };

const validateChatBox = async (name, participants) => {
    let box = await ChatBoxModel.findOne({ name });
    if (!box)
        box = await new ChatBoxModel
            ({ name, users: participants }).save();
    return box.populate
        (["users", { path: 'messages', populate: 'sender' }]);

};
const sendData = (data, ws) => { ws.send(JSON.stringify(data)); }
const sendStatus = (payload, ws) => { sendData(["status", payload], ws); }
// Send message to every client
const broadcastMessage = (wss, data, status) => {
    wss.clients.forEach((client) => {
        sendData(data, client);
        sendStatus(status, client);
    });
};

// 在 global scope 將 chatBoxes 宣告成空物件
const chatBoxes = {}; // global variable
export default {
    initData: (ws) => {
        Message.find().sort({ created_at: -1 }).limit(100)
            .exec((err, res) => {
                if (err) throw err;
                // initialize app with existing messages 
                sendData(["init", res], ws);
            });
    },

    onMessage: (wss, ws) => (
        async (byteString) => {
            // console.log("byte:", byteString);
            const { data } = byteString
            const [task, payload] = JSON.parse(data)
            switch (task) {
                case 'CHAT': {
                    const { name, to } = payload
                    const chatBoxName = makeName(name, to)
                    // const chatbox = new ChatBoxModel({ chatBoxName, name, to });
                    ChatBoxModel.find().sort({ created_at: -1 }).limit(100)
                        .exec((err, res) => {
                            if (err) throw err;
                            // initialize app with existing messages 
                            sendData(["init", res], ws);
                        });
                }
                case 'MESSAGE': {
                    const { chatBox, sender, body } = payload
                    // Save payload to DB
                    const message = new MessageModel({ chatBox, sender, body })
                    try {
                        await message.save();
                    } catch (e) {
                        throw new Error
                            ("Message DB save error: " + e);
                    }
                    // Respond to client
                    broadcastMessage(
                        wss,
                        ['output', [payload]],
                        {
                            type: 'success',
                            msg: 'Message sent.'
                        })

                    break
                }
                case 'CLEAR': {
                    Message.deleteMany({}, () => {
                        broadcastMessage(
                            wss,
                            ['cleared'],
                            {
                                type: 'info',
                                msg: 'Message cache cleared.'
                            })
                    })
                    break
                }

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
                    broadcastMessage(
                        wss,
                        ['output', [payload]],
                        {
                            type: 'success',
                            msg: 'Message sent.'
                        })

                    break
                }
                case 'clear': {
                    Message.deleteMany({}, () => {
                        broadcastMessage(
                            wss,
                            ['cleared'],
                            {
                                type: 'info',
                                msg: 'Message cache cleared.'
                            })
                    })
                    break
                }
                default: break
            }
        }
    )
}
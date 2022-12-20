import Message from "./models/message"
import { UserModel, MessageModel, ChatBoxModel } from "./models/chatbox"

const makeName = (name, to) => { return [name, to].sort().join('_'); };

// 若 User 已存在，更新 chatBoxes 。 若 User 尚未被建立，儲存一個新的 User 到 DB
const saveChatBox_forUser = async (name, TheChatBox, User) => {
    let dbUser = await UserModel.findOne({ name: name });
    if (!dbUser) {
        User.chatBoxes.push(TheChatBox._id)
        await User.save()
    }
    else {
        dbUser.chatBoxes.push(TheChatBox._id)
    }
}
const validateUser = async (name) => {
    let dbUser = await UserModel.findOne({ name: name });
    if (!dbUser) {
        dbUser = await new UserModel({ name: name })
    }
    return dbUser;
}
const validateChatBox = async (name, participants) => {
    let box = await ChatBoxModel.findOne({ name: name });
    if (!box)
        box = await new ChatBoxModel({ name, users: participants }).save();
    return box.populate
        (["users", { path: 'messages', populate: 'sender' }]);
    // return box;
};

const createMessage = async (name, to, msg) => {
    const chatBoxName = makeName(name, to)
    let chatbox = await ChatBoxModel.findOne({ name: chatBoxName }); // 找到 message 所屬的 ChatBox 在 DB 的資料
    let sender = await UserModel.findOne({ name: name }); // 找到傳送 message 的 User 在 DB 的資料

    let message = await new MessageModel({ chatBox: chatbox._id, sender: sender._id, body: msg });

    // 更新 ChatBox 
    chatbox.messages.push(message._id)
    chatbox.save()

    try {
        await message.save();
    } catch (e) {
        throw new Error
            ("Message DB save error: " + e);
    }

    return message
}

const sendData = (data, ws) => { ws.send(JSON.stringify(data)); }
const sendStatus = (payload, ws) => { sendData(["status", payload], ws); }
// Send message to every client
const broadcastMessage = (wss, ws, data, status) => {
    wss.clients.forEach((client) => {
        if (ws.box == client.box) {
            sendData(data, client);
            sendStatus(status, client);
        }
    });
};

// 在 global scope 將 chatBoxes 宣告成空物件
const chatBoxes = {}; // global variable
export default {
    // initData: (ws) => {
    //     Message.find().sort({ created_at: -1 }).limit(100)
    //         .exec((err, res) => {
    //             if (err) throw err;
    //             // initialize app with existing messages 
    //             sendData(["init", res], ws);
    //         });
    // },

    onMessage: (wss, ws) => {
        async (byteString) => {
            // console.log("byte:", byteString);
            const { data } = byteString
            const { type, payload } = JSON.parse(data)
            switch (type) {
                case 'CHAT': {
                    const { name, to } = payload
                    const chatBoxName = makeName(name, to)
                    // console.log("chatBoxName:", chatBoxName)

                    const User1 = await validateUser(name);
                    const User2 = await validateUser(to);

                    const TheChatBox = await validateChatBox(chatBoxName, [User1._id, User2._id])
                    // console.log("TheChatBox", TheChatBox)

                    saveChatBox_forUser(name, TheChatBox, User1)
                    saveChatBox_forUser(to, TheChatBox, User2)

                    let init_messages = []
                    const Box = await TheChatBox.populate({ path: 'messages', populate: 'sender' })
                    console.log(TheChatBox)
                    Box.messages.map((e) => {
                        init_messages.push({ name: e.sender.name, body: e.body })
                    })
                    ws.box = makeName(name, to)
                    // console.log(init_messages)
                    sendData(["init", init_messages], ws);

                    break
                }

                case 'MESSAGE': {
                    const { name, to, body } = payload

                    // Save payload to DB
                    const message = createMessage(name, to, body)
                    const frontend_payload = { name, body }
                    // Respond to client
                    ws.box = makeName(name, to)
                    broadcastMessage(
                        wss,
                        ws,
                        ['output', [frontend_payload]],
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
                            ws,
                            ['cleared'],
                            {
                                type: 'info',
                                msg: 'Message cache cleared.'
                            })
                    })
                    break
                }

                // case 'input': {
                //     const { name, body } = payload
                //     // Save payload to DB
                //     const message = new Message({ name, body })
                //     try {
                //         await message.save();
                //     } catch (e) {
                //         throw new Error
                //             ("Message DB save error: " + e);
                //     }
                //     // Respond to client
                //     broadcastMessage(
                //         wss,
                //         ['output', [payload]],
                //         {
                //             type: 'success',
                //             msg: 'Message sent.'
                //         })

                //     break
                // }
                // case 'clear': {
                //     Message.deleteMany({}, () => {
                //         broadcastMessage(
                //             wss,
                //             ['cleared'],
                //             {
                //                 type: 'info',
                //                 msg: 'Message cache cleared.'
                //             })
                //     })
                //     break
                // }
                default: break
            }
        }
    }
}
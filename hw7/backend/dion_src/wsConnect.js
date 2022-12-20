import { MessageModel, ChatBoxModel } from "./models/chatbox";
import { broadcastMessage } from "./hooks/send";

const makeName = (name, to) => {
  return [name, to].sort().join("_");
};

const validateChatBox = async (name) => {
  let box = await ChatBoxModel.findOne({ name });
  if (!box) {
    box = await new ChatBoxModel({ name, messages: [] }).save();
    console.log("New ChatBox created");
  }
  const result = await box.populate("messages");
  let msg = [];
  if (result.messages.length) {
    for (const message of result.messages) {
      msg.push({ name: message.sender, body: message.body });
    }
  }
  return msg;
};

const messageHandler = async (sender, body, name) => {
  let message = await new MessageModel({ sender, body }).save();
  let box = await ChatBoxModel.findOne({ name });
  let messages = box.messages;
  messages.push(message);
  await ChatBoxModel.findOneAndUpdate({ name }, { messages });
};

const clearHandler = async (name) => {
  let box = await ChatBoxModel.findOne({ name });
  for (const message of box.messages) {
    await MessageModel.findOneAndDelete({ _id: message });
  }
  await ChatBoxModel.findOneAndUpdate({ name }, { messages: [] });
  return [];
};

const clearDBHandler = async () => {
  await ChatBoxModel.deleteMany({});
  await MessageModel.deleteMany({});
  return [];
};

export default {
  onMessage: (wss, ws) => async (byteString) => {
    const { data } = byteString;
    const { type, payload } = JSON.parse(data);
    switch (type) {
      case "CHAT": {
        const { name, to } = payload;
        try {
          const msg = await validateChatBox(makeName(name, to));
          ws.box = makeName(name, to);
          console.log(ws.box);
          broadcastMessage(wss, ws, ["init", msg], {
            type: "success",
            msg: "CHATBOX CREATED!",
          });
        } catch (e) {
          throw new Error("ChatBox DB save error: " + e);
        }
        break;
      }
      case "MESSAGE": {
        const { name, to, body } = payload;
        try {
          await messageHandler(name, body, makeName(name, to));
          broadcastMessage(wss, ws, ["output", { name, body }], {
            type: "success",
            msg: "MESSAGE SENT!",
          });
        } catch (e) {
          throw new Error("Message DB save error: " + e);
        }
        break;
      }
      case "CLEARDB": {
        try {
          const msg = await clearDBHandler();
          broadcastMessage(
            wss,
            ws,
            ["cleared", msg],
            {
              type: "info",
              msg: "DATABASE CLEARED!",
            },
            false
          );
        } catch (e) {
          throw new Error("clear error: " + e);
        }
      }
      default:
        break;
    }
  },
};

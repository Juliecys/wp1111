import mongoose from "mongoose";

const Schema = mongoose.Schema;

const MessageSchema = new Schema({
  sender: { type: String },
  body: { type: String, required: [true, "Body field is required."] },
});
const MessageModel = mongoose.model("Message", MessageSchema);

const ChatBoxSchema = new Schema({
  name: { type: String, required: [true, "Name field is required."] },
  messages: [{ type: mongoose.Types.ObjectId, ref: "Message" }],
});
const ChatBoxModel = mongoose.model("ChatBox", ChatBoxSchema);

export { MessageModel, ChatBoxModel };

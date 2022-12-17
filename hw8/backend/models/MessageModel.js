import mongoose from "mongoose"

const Schema = mongoose.Schema

const MessageSchema = new Schema( {
    sender: {
        type: String,
        required: [true, 'Sender field is required']
    },
    receiver: {
        type: String,
        required: [true, 'Receiver field is required']
    },
    body: {
        type: String,
        required: [true, 'Body field is required']
    }
} )

const Message = mongoose.model( 'message', MessageSchema )
export default Message 
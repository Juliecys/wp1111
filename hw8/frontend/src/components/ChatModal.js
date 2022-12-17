// Import 
import { Form, Input, Modal } from 'antd'
import FormItem from "antd/es/form/FormItem"

// ChatModal 
const ChatModal = ( { open, onCreate, onCancel } ) => {

    const [form] = Form.useForm()

    return (
        <Modal
            open={open}
            title='Create a new chat room'
            okText='Create'
            cancelText='Cancel'

            onCancel={onCancel}
            onOk={() => {
                form.validateFields().then( ( values ) => {
                    form.resetFields()
                    onCreate( values )
                } ).catch( ( err ) => {
                    window.alert( err )
                } )
            }}
        >
            <Form
                form={form}
                layout='vertical'
                name='form_in_modal'
            >
                <FormItem
                    name="name"
                    label="Name"
                    rules={[
                        {
                            required: true,
                            message: 'Please enter the name of the person to chat!'
                        }
                    ]}
                >
                    <Input />
                </FormItem>

            </Form>

        </Modal>
    )
}

export default ChatModal
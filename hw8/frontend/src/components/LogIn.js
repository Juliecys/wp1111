// Import 
import { Input } from 'antd'
import { UserOutlined } from "@ant-design/icons"

// LogIn
const LogIn = ( { curName, setCurName, handleLogIn } ) => {

    return (
        <Input.Search
            size="large"
            style={{ width: 300, margin: 50 }}
            prefix={<UserOutlined />}
            placeholder="Enter your name"
            value={curName}
            onChange={( e ) => setCurName( e.target.value )}
            enterButton="Sign In"
            onSearch={( adminName ) => handleLogIn( adminName )}
        />
    )
}

export default LogIn
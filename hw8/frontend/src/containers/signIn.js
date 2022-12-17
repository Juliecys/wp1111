// Import 
import { useChat } from "./hooks/useChat"

import Title from "../components/Title"
import LogIn from "../components/LogIn"

// SignIn
const SignIn = () => {
    const { setSignedIn, admin, setAdmin, displayStatus } = useChat()

    const handleLogIn = ( adminName ) => {
        if ( adminName == '' ) {
            // Log in failed 
            displayStatus( {
                stsType: 'error',
                stsMsg: 'Please enter your name ಠ_ಠ'
            } )
        }
        else {
            // Log in successful 
            setSignedIn( true )
            setAdmin( adminName )

            displayStatus( {
                stsType: 'success',
                stsMsg: `Hello, ${admin} ( ˘ ³˘)♥`
            } )
        }
    }

    return (
        <>
            <Title />
            <LogIn curName={admin} setCurName={setAdmin} handleLogIn={handleLogIn} />
        </>
    )
}

export default SignIn
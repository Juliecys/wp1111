import styled from 'styled-components'

// Wrapper 
const TitleWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    h1 {
    margin: 0;
    margin-right: 20px;
    font-size: 3em;
`

// Title 
const Title = ( { adminName } ) => (
    <TitleWrapper><h1>{adminName ? `${adminName}'s` : "My"} Chat Room</h1></TitleWrapper>
)

export default Title


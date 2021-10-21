import { ButtonGroup, Button } from  "@material-ui/core";

const LogsigninBtns = (props) => {
    
    return(<>
        <ButtonGroup variant="contained" aria-label="outlined button group">
            <Button onClick={props.openSigninForm}>Sign Up</Button>
            <Button onClick={props.openLoginForm}>Log In</Button>
        </ButtonGroup>
    </>)
}

export default LogsigninBtns;
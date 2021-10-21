const Login = (props) => {

    const handleSubmit = (e) => {
        e.preventDefault();
        if(props.formVal === 0){
            console.log("signing in");

        } else {console.log("logging in")}
    }

    const btnMsg = props.formVal === 0 ? "Sign Up" : "Log In";  // 0 = sign up ; 1 = log in

    const form = 
    <form style={{"border":"solid red 1px"}}>
        <label htmlFor={"email"}>Email</label><input id={"email"} type={"email"} required></input>
        <label htmlFor={"password"}>Password</label><input id={"password"} type={"password"} required></input>
        <button onClick={e=> handleSubmit(e)}>{btnMsg}</button>
    </form>;

    return(<>{form}</>)
}

export default Login;
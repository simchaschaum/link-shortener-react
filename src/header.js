import { useState } from "react";
import Login from './login';
import LogsigninBtns from "./logsigninBtns";

const Header = () => {
    const [formState, setFormState] = useState(0) // 0 = buttons (no form); 1 = show form
    const [formVal, setFormVal] = useState(0) // 0 = signin; 1 = login

    const openForm = (val) => {
        setFormState(1);
        setFormVal(val);
    }

    return(
        <div>
            {formState === 0 ? 
                <LogsigninBtns openSigninForm={()=>openForm(0)} openLoginForm={()=>openForm(1)}/>
                    : <Login formVal={formVal} closeForm={()=>setFormState(0)}/>
            }
            <h1>Link Shortener</h1>
            <div>
                <h3>Shorten any URL!</h3>
                <p>With this free Link Shortener you can make Links shorter and easier to remember.<br/> 
                Just enter a Link into the form and click on the above Button to generate a short Link. <br/>
                When visiting the short-Link, the short-Link will immediately redirect you to the long Link.</p>
                <h6>This site uses <a className="link" href="https://shrtco.de/docs/" target="_Blank" rel="noreferrer">Shrtcode API</a></h6>
            </div>
        </div>
    )
}

export default Header;
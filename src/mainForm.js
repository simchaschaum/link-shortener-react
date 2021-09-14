import React from "react";
import { FormControl, FormLabel, RadioGroup, FormControlLabel, Radio } from "@material-ui/core";
import './App.css';
import HandleError from "./handleError";
import Link from "./link";
import Spinner from 'react-bootstrap/Spinner'

class MainForm extends React.Component{
    constructor(props){
        super(props);
        this.state={
            inputLink: "",
            shortDomain: "shrtco.de",
            errorMsg: "",
            hideSpinner: true,
            submitBtn: "Shorten it!",
            links: []
        }
    }
   
    // const [inputLink, setInputLink] = useState();
    // const [shortDomain, setShortDomain] = useState("shrtco.de");
    // const [errorMsg, setErrorMsg] = useState("");
    // const [hideSpinner, setHideSpinner] = useState(true);
    // const [submitBtn, setSubmitBtn] = useState("Shorten it!");
    // const [links, setLinks] = useState([]);
    // let linksArr = links;


    handleSubmit = (e) => {
        e.preventDefault();
        if(this.state.inputLink && this.state.inputLink){
            let submitBtnArr = ["Shortening...","Getting there...", "Working on it...", "Sorry for the delay..."];
            this.setState({
                errorMsg: "",
                hideSpinner: false,
                submitBtn: submitBtnArr[0]
            })
            // setErrorMsg("");
            // setHideSpinner(false);
            let num = 0;
            // setSubmitBtn(submitBtnArr[0])
            let msgChange = () => {
                num = num === 3 ? 0 : num+1;
                this.setState({submitBtn: submitBtnArr[num]})
                // setSubmitBtn(submitBtnArr[num])
            }
            let submitBtnChg = setInterval(msgChange, 3000);    
            const start = 'https://api.shrtco.de/v2/shorten?url=';
            const longLink = this.state.inputLink;
            console.log("fetching...");        
            fetch(start + longLink)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                clearInterval(submitBtnChg);
                // setSubmitBtn("Shorten it!");
                // setHideSpinner(true)
                this.setState({
                    submitBtn: "Shorten it!",
                    hideSpinner: true
                })
                if(!data.ok){
                    this.setState({errorMsg: HandleError(data.error_code)});
                } else{
                    let display = this.state.shortDomain === "shrtco.de" ? data.result.short_link
                        : this.state.shortDomain === "9qr.de" ? data.result.short_link2
                            : data.result.short_link3;
                    let newArr = this.state.links;
                    newArr.unshift({
                        link: display,
                        originalLink: data.result.original_link
                    })
                    this.setState({links: newArr, inputLink: ""});
                }
            })
        } else {
            this.setState({errorMsg: HandleError(2)})
        }
    }

    clearLinks = () => {
        this.setState({links: []})
    }

    render(){

        let clearLinksBtn = this.state.links.length === 0 ? null
            : <a id="clearLinks" className="link" onClick={this.clearLinks}>Clear Links</a>

        return(<div>
            <form id="input" action="">
                <h2>Type or paste any link in the box below.</h2>
                <div id="inputDiv">
                    <input id="urlInput" type="url" placeholder="www.example.com" value={this.state.inputLink} onChange={e => this.setState({inputLink: e.target.value, errorMsg: ""})}/>
                    <button id="urlSubmit" onClick={event=> this.handleSubmit(event)}>
                        <span id="urlSubmit-text">{this.state.submitBtn}</span>
                        <Spinner
                            as="span"
                            animation="border"
                            size="sm"
                            role="status"
                            aria-hidden="true"
                            hidden={this.state.hideSpinner}
                            />
                    </button>
                </div>
                <div id="errorMsg">{this.state.errorMsg}</div>
                <FormControl component="fieldset">
                    <FormLabel component="legend">Short Domain:</FormLabel>
                    <RadioGroup aria-label="shortDomain" name="gender1" value={this.state.shortDomain} onChange={e => this.setState({shortDomain: e.target.value})}>
                        <FormControlLabel value="shrtco.de" control={<Radio />} label="shrtco.de" checked={this.state.shortDomain==="shrtco.de"}/>
                        <FormControlLabel value="9qr.de" control={<Radio />} label="9qr.de" checked={this.state.shortDomain==="9qr.de"}/>
                        <FormControlLabel value="shiny.link" control={<Radio />} label="shiny.link" checked={this.state.shortDomain==="shiny.link"}/>
                    </RadioGroup>
                </FormControl>
            </form>
            {clearLinksBtn}
            <div>{this.state.links.map((item,index) => (<div key={index}>
                <Link 
                    link={item.link}
                    originalLink={item.originalLink}
                />
                </div>))}</div>
        </div>)
    }
    
}

export default MainForm;
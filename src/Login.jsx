import React from "react";
import Axios from "axios";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import './BookPage.css'

const config = require("./config");

export default function Login() {
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');

    function authorize() {
        Axios.post(config.apiUrl + "login", {
            username: username,
            password: password
        }).then((data)=>{
            const d = new Date();
            d.setTime(d.getTime() + 60*60*24*1000);
            document.cookie = 'session_key=' + data.data + "; expires=" + d.toUTCString() + "; SameSite=Strict; Secure";
            document.cookie = 'username=' + username + "; expires=" + d.toUTCString() + "; SameSite=Strict; Secure";
            console.log(document.cookie);
        }).catch((err)=>{
            console.log(err);
        });
    }

    return (
        <div className='BookPageContainer'>
            <h1> Prihlásenie </h1>
            <TextField fullWidth required label="Meno" onChange={(e) => { setUsername(e.target.value); }} />
            <TextField fullWidth type="password" label="Heslo" autoComplete="current-password" onChange={(e) => { setPassword(e.target.value); }} />
            <Button fullWidth onClick={authorize}> Prihlásiť </Button>
        </div>
    );
}

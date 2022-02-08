import React from "react";
import Axios from "axios";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import '../books/BookPage.css'

const config = require("../config");

export default function Login() {
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [errorName, setErrorName] = React.useState(false);
    const [errorPass, setErrorPass] = React.useState(false);

    function authorize() {
        let ret = false;
        if (!username) {
            setErrorName(true);
            ret = true;
        }
        if (!password) { 
            setErrorPass(true);
            ret = true;
        }
        if (ret) return;

        Axios.post(config.apiUrl + "login", {
            username: username,
            password: password
        }).then((data)=>{
            const d = new Date();
            d.setTime(d.getTime() + 60*60*24*1000);
            document.cookie = 'session_key=' + data.data + "; expires=" + d.toUTCString() + "; SameSite=Strict; Secure";
            document.cookie = 'username=' + username + "; expires=" + d.toUTCString() + "; SameSite=Strict; Secure";
            window.location = '/admin';
        }).catch((err)=>{
            setErrorName(true);
            setErrorPass(true);
        });
    }

    return (
        <div className='BookPageContainer'>
            <h1> Prihlásenie </h1>
            <TextField error={errorName} fullWidth required label="Meno" onChange={(e) => { setUsername(e.target.value); }} />
            <TextField error={errorPass} fullWidth type="password" label="Heslo" autoComplete="current-password" onChange={(e) => { setPassword(e.target.value); }} />
            <Button fullWidth onClick={authorize}> Prihlásiť </Button>
        </div>
    );
}

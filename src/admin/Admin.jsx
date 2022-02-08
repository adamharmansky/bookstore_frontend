import React from "react";
import Button from "@material-ui/core/Button";
import '../books/BookPage.css'
import {validateSession, logout, getCookie} from '../Utility';

export default function Admin() {
    React.useEffect(() => {
        validateSession();
    }, []);

    return (
        <div className='BookPageContainer'>
            <h1> Administrátor </h1>
            {getCookie('username') ?
                <div className='AdminOptionContainer'>
                    <h2> {"Prihlásený ako " + getCookie('username')} </h2>
                    <Button fullWidth onClick={()=>(window.location = '/add')}> Pridať knihu </Button>
                    <Button fullWidth onClick={logout}> Odhlásiť </Button>
                </div>
            :
                <Button fullWidth onClick={()=>(window.location = '/login')}> Prihlásiť </Button>
            }
        </div>
    );
}

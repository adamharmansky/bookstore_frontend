import React from "react";
import Button from "@material-ui/core/Button";
import './BookPage.css'
import {validateSession} from './Utility';

export default function Admin() {
    React.useEffect(() => {
        validateSession();
    }, []);

    return (
        <div className='BookPageContainer'>
            <h1> Administrátor </h1>
            {document.cookie.match('username=') ?
                <div className='AdminOptionContainer'>
                    <h2> {"Prihlásený ako " + document.cookie.match('username=[^;]+')[0].split('=')[1]} </h2>
                    <Button fullWidth onClick={()=>(window.location = '/add')}> Pridať knihu </Button>
                </div>
            :
                <Button fullWidth onClick={()=>(window.location = '/login')}> Prihlásiť </Button>
            }
        </div>
    );
}

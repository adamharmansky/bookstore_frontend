import React from 'react'
import Axios from 'axios'
import Button from "@material-ui/core/Button";
import {bookList, getCookie} from '../Utility'

const config = require('../config')

export default function AuthorPage() {
    const [authorData, setAuthorData] = React.useState({})
    let can_remove_authors = getCookie('session_key') ? true : false;

    React.useEffect(() => {
        Axios.get(config.apiUrl + 'author/?author=' + window.location.pathname.match('[^/]*$')).then((data) => {
            setAuthorData(data.data)
        }).catch((err)=>{
            console.log(err);
        })
    }, [])

    function remove_author() {
        Axios.post(config.apiUrl + 'author/remove?author=' + window.location.pathname.match('[^/]*$'), {
            key: getCookie('session_key')
        }).then((data) => {
            window.location.href = '/authors';
        });
    }

    return (
        <div className='AuthorPageContainer'>
            <h1 className='PageHeading'> {"Knihy od autora " + authorData.author_name} { can_remove_authors ? <Button variant='contained' onClick={remove_author}> Odstrániť autora </Button> : []}</h1>
            {authorData.books ? bookList(authorData.books) : []}
        </div>
    )
}

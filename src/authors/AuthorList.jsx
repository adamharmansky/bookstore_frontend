import React from 'react';
import Axios from 'axios';
import {pageNumbers} from '../Utility';

const config = require('../config');

export default function AuthorList() {
    var [authorList, setAuthorList] = React.useState([]);
    var [pageCount, setPageCount] = React.useState(0);

    React.useEffect(() => {
        const url = new URL(window.location.href)
        Axios.get(config.apiUrl + 'author/list' + url.search).then((data) => {
            setAuthorList(data.data.authors);
            setPageCount(data.data.pageCount);
        })
    }, [])

    const params = new URLSearchParams(window.location.search);
    const current_page = params.has('page')  ? parseInt(params.get('page')) : 0;
    const query =  params.has('query') ? params.get('query') : '';
    function create_url(page) {
        let params = [];
        if (page) params.push('page=' + page);
        if (query) params.push('q=' + query);
        return "/authors/?" + params.join('&');
    }

    return (
        <div>
            <h1 className='PageHeading'> Autori </h1>
            <form className='SearchForm' name="search_form">
                <input name="q" type="text" placeholder="Zadajte meno autora..." defaultValue={query}/>
            </form>
            <div className='PageList'>
                {authorList.map((value, key) => {
                    return (
                        <a className='ListItem' href={"/author/" + value.author_id}>
                            <h2 className='ListItemTitle'> {value.author_name} </h2>
                        </a>
                    );
                })}
                <p className='NotFound'> {authorList.length === 0 ? "Neboli nájdené žiadne výsledky" : ""} </p>
                {pageCount > 1 ? <div className='PageNumbers'> { pageNumbers(current_page, pageCount, create_url) } </div> : []}
            </div>
        </div>
    );
}

import React from 'react';
import Axios from 'axios';
import {pageNumbers, bookList as listBooks} from '../Utility';

const config = require("../config");

export default function BookList() {
    var [bookList, setBookList] = React.useState([]);
    var [pageCount, setPageCount] = React.useState(0);

    React.useEffect(() => {
        const url = new URL(window.location.href)
        Axios.get(config.apiUrl + 'list' + url.search).then((data) => {
            setBookList(data.data.books);
            setPageCount(data.data.pageCount);
        })
    }, []);

    const params = new URLSearchParams(window.location.search);
    const current_page = params.has('page')  ? parseInt(params.get('page')) : 0;
    const query =  params.has('query') ? params.get('query') : '';
    function create_url(page) {
        let params = [];
        if (page) params.push('page=' + page);
        if (query) params.push('q=' + query);
        return "/list/?" + params.join('&');
    }

    return (
        <div>
            <h1 className='PageHeading'> Knihy </h1>
            <form className='SearchForm' name="search_form">
                    <input name="q" type="text" placeholder="Zadajte názov knihy..." defaultValue={query}/>
            </form>
            <div className='PageList'>
                {listBooks(bookList)}
                <p> {bookList.length === 0 ? "Neboli nájdené žiadne knihy" : ""} </p>
                {pageCount > 1 ? <div className='PageNumbers'> { pageNumbers(current_page, pageCount, create_url) } </div> : []}
            </div>
        </div>
    );
}

import React from 'react';
import Axios from 'axios';
import './BookPage.css'
import {pageNumbers, bookList as listBooks} from './Utility';

const config = require('./config')

export default function BookList() {
    var [bookList, setBookList] = React.useState([]);
    var [pageCount, setPageCount] = React.useState(0);
    var [subjectInfo, setSubjectInfo] = React.useState(0);

    React.useEffect(() => {
        const url = new URL(window.location.href)
        Axios.get(config.apiUrl + 'list' + url.search + (url.search ? '&' : '?') + 'subject=' + window.location.pathname.match('[^/?]*$')).then((data) => {
            console.log(data);
            setBookList(data.data.books);
            setPageCount(data.data.pageCount);
        })
        Axios.get(config.apiUrl + 'subject?subject=' + window.location.pathname.match('[^/]*$')).then((data) => {
            console.log(data);
            setSubjectInfo(data.data);
        });
    }, []);

    const params = new URLSearchParams(window.location.search);
    const current_page = params.has('page')  ? parseInt(params.get('page')) : 0;
    const query =  params.has('query') ? params.get('query') : '';
    const subject = parseInt(window.location.pathname.match('[^/?]*$'));
    function create_url(page) {
        let params = [];
        if (page) params.push('page=' + page);
        if (query) params.push('q=' + query);
        return "/subject/"+subject+"?" + params.join('&');
    }

    return (
        <div>
            <h1 className='PageHeading'> {subjectInfo.subject_long_name ? subjectInfo.subject_long_name : 'Neznámy predmet'} </h1>
            <form className='SearchForm' name="search_form">
                    <input name="q" type="text" placeholder="Zadajte názov knihy..." defaultValue={query}/>
            </form>
            <div className='BookList'>
                {listBooks(bookList)}
                <p className='NotFound'> {bookList.length === 0 ? "Neboli nájdené žiadne knihy" : ""} </p>
                {pageCount > 1 ? <div className='PageNumbers'> { pageNumbers(current_page, pageCount, create_url) } </div> : []}
            </div>
        </div>
    );
}

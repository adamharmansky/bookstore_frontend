import React from 'react';
import Axios from 'axios';
import {get_query, bookList as listBooks} from './Utility';
import DocumentMeta from 'react-document-meta';

const config = require("./config");

export default function BookList() {
    var [bookList, setBookList] = React.useState([]);
    var [pageCount, setPageCount] = React.useState(0);

    React.useEffect(() => {
        const url = new URL(window.location.href)
        Axios.get(config.apiUrl + 'list' + url.search).then((data) => {
            console.log(data);
            setBookList(data.data.books);
            setPageCount(data.data.pageCount);
        })
    }, []);

    const pageNumbers = [];
    const page_text = get_query('page')
    const current_page = page_text.length > 0 ? parseInt(page_text) : 0;
    const query = get_query('q')

    if (current_page > 0) pageNumbers.push(<a className='PageNumber' href={"/list?page="+(current_page-1)+(query?"&q="+query:"")}>{"<<"}</a>);
    for (let i = 0; i < pageCount; i++) {
        pageNumbers.push(i === current_page ? <span className='CurrentPageNumber'>{i}</span> : <a className='PageNumber' href={"/list?page="+i+(query?"&q="+query:"")}>{i}</a>);
    }
    if (current_page < pageCount-1) pageNumbers.push(<a className='PageNumber' href={"/list?page="+(current_page+1)+(query?"&q="+query:"")}>{">>"}</a>);

	const meta = {
		title: "Gympos knižnica",
		description: "Vitajte na stránke knižnice Gymnázia Posťová 9 v Košiciach!",
		meta: {
			name: {
				keywords: "knižnica, gymnázium, gympos, knihy",
				"og:title": "Gympos knižnica - zoznam kníh",
				"og:description": "Vitajte na stránke knižnice Gymnázia Posťová 9 v Košiciach!",
				"og:image": "/ogimage.png"
			}
		}
	};

    return (
        <div>
            <DocumentMeta {...meta}/>
            <h1 className='PageHeading'> Knihy </h1>
            <form className='SearchForm' name="search_form">
                    <input name="q" type="text" placeholder="Zadajte názov knihy..." defaultValue={query}/>
            </form>
            <div className='PageList'>
                {listBooks(bookList)}
                <p> {bookList.length === 0 ? "Neboli nájdené žiadne knihy" : ""} </p>
                {pageCount > 1 ? <div className='PageNumbers'> {pageNumbers} </div> : []}
            </div>
        </div>
    );
}

import Axios from "axios";

const config = require("./config");

export function minutesToReadableTime(minutes) {
    return ((minutes>=60?Math.floor(minutes/60)+"h ":"")+(minutes%60!==0?minutes%60+"m":""));
}

export function bookList(books) {
    return books.map((book) => {
        var authors = [];

        if (book.authors) {
            authors = book.authors.map((author) => {
                return <span><a className='BookPageAuthor' href={"/author/"+author.author_id}>{author.author_name}</a>; </span>;
            });
        }

        const style = {
            "--subject-clr0": book.subject_color0,
            "--subject-clr1": book.subject_color1,
            "--subject-clr2": book.subject_color2,
            "--subject-bg":   book.subject_background
        };

        return book.title ? (
                <a key={book.title} className='ListItem' href={'/book/' + book.isbn} style={style}>
                        <div className='BookListItemStripe'> </div>
                        <img className='BookListItemImage' src={book.image ? book.image : "/reading.png"} alt='Chýbajúci obrázok'></img>
                        <div className='BookListItemBlock'>
                            <h3> {book.title} </h3>
                            <div className='BookListItemInfo'>
                                {authors}{book.year_pub}, {book.pages} strán, {minutesToReadableTime(book.read_time)}, {book.lang_name}, {book.subject_name}
                            </div>
                            <p className='BookListItemDescription'> {book.desc ? book.desc.slice(0,360) + (book.desc.length > 360 ? "..." : "") : "Žiaden popis"} </p>
                        </div>
                </a>
            ):(
                <a key={book.title} className='ListItem ErrorListItem' href={'/book/' + book.isbn} style={style}>
                    ERROR
                </a>
            );
    })
}

export function pageNumbers(current_page, page_count, page_link) {
    let numbers = [];
    if (current_page > 0) numbers.push(<a className='PageNumber' href={page_link(current_page-1)}>{"<<"}</a>);
    for (let i = 0; i < page_count; i++) {
        numbers.push(i === current_page ? <span className='CurrentPageNumber'>{i}</span> : <a className='PageNumber' href={page_link(i)}>{i}</a>);
    }
    if (current_page < page_count-1) numbers.push(<a className='PageNumber' href={page_link(current_page+1)}>{">>"}</a>);
    return numbers;
}

export function loadingIcon() {
    return (
        <div className='LoadingPopup'>
            <div className='LoadingIcon'>
                <svg className="LoadingCircle" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                    <path fill="none" stroke="#219e50" d="M10,50 a40,40 0 0,0 40,40" stroke-linecap='round' stroke-width='10' />
                </svg>
            </div>
            <div className='LoadingText'> Obsah sa načítava </div>
        </div>
    );
}

function invalidateSession() {
    document.cookie = 'session_key=lmao;expires=Thu, 01 Jan 1970 00:00:01 GMT';
    document.cookie = 'username=lmao;expires=Thu, 01 Jan 1970 00:00:01 GMT';
    window.location.href = "/login"
}

export function validateSession() {
    let match = document.cookie.match('session_key=[^;]+');
    if (!match) invalidateSession();
    let cookey = match[0].split('=')[1];

    if (cookey) {
        Axios.post(config.apiUrl + 'verifykey', {
            key: cookey
        }).catch((err)=> {
            console.log(err);
            invalidateSession();
        });
    } else {
        invalidateSession();
    }
}

export function logout() {
    let match = document.cookie.match('session_key=[^;]+');
    if (!match) {
        invalidateSession();
        return;
    }
    let cookey = match[0].split('=')[1];

    Axios.post(config.apiUrl + 'logout', {
        key: cookey
    }).then((data)=>{
        invalidateSession();
    }).catch((err) => {
        invalidateSession();
    });
}

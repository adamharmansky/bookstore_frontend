import React from 'react';
import Axios from 'axios';
import './MainPage.css';

const config = require("./config");

export default function BookList() {

    var [subjectList, setSubjectList] = React.useState([]);

    React.useEffect(() => {
        Axios.get(config.apiUrl + 'subject/list').then((data) => {
            setSubjectList(data.data);
        })
    }, []);

    let subjects = subjectList.map((subject, i) => { 
        const style = {
            "--subject-clr0": subject.subject_color0,
            "--subject-clr1": subject.subject_color1,
            "--subject-clr2": subject.subject_color2,
            "--subject-bg":   subject.subject_background,
        };

        const classNames = "SubjectBook "+(i===subjectList.length-1?"LastBook":"");
        return <a className={classNames} style={style} href={"/subject/"+subject.subject_id}>{subject.subject_name}</a> 
    });

    return (
        <div className='MainPageContainer'>
            <div className='MainPageHeading'>
                <img className='BooksImage' src="/books.png" alt="Chýbajúci obrázok"/>
                <h1><font className='GymposGreen'>GYMPOS</font> Knižnica</h1>
            </div>
            <div className='HeadingShelf'/>
            <div className='MainPageBody'>
                <div className='BookShelfTop'>
                    <div className='MainPageSubjects'> {subjects} </div>
                    <img className='PlantPot' src="/plantpot.png" alt="ERROR" />
                </div>
                <div className='Shelf'/>
                <div className='BoardsContainer'>
                    <div className='Board'>Po: 10.30-10.45 a 13.30-14.30 <br/> Štv: 8.15-8.40 <br/> Pia: 10.30-10.40 </div>
                    <div className='Board'>Sem pôjde instagram...</div>
                </div>
                <p> V prípade záujmu o vypožičanie knihy, kontaktujte <a href='mailto:stroncerova@gympos.sk'>p. prof. Štroncerovú</a> </p>       
                <div className='InfoLinksContainer'>
                    <div className='InfoLinksColumn'>
                        <h3 className='InfoLinksHeading'> Dôležité Odkazy </h3>
                        <a className='InfoLink' href='https://www.gympos.sk' > Gymnázium Poštová 9 </a>
                        <a className='InfoLink' href='/admin' > Vstup administrátora </a>
                    </div>
                    <div className='InfoLinksColumn'>
                        <h3 className='InfoLinksHeading'> Autori </h3>
                        <a className='InfoLink' href='https://www.harmansky.xyz' >Adam Harmanský</a>
                        <a className='InfoLink' href='http://pavolkomlos.me/sk/index.html' >Pavol Komloš</a>
                        <a className='InfoLink' href='https://github.com/adamharmansky/bookstore_frontend'>Kód stránky na Githube</a>
                    </div>
                </div>
            </div>
        </div>
    );
}

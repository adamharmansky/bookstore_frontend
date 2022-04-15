import React from 'react';
import Axios from 'axios';
import './MainPage.css';
import { Splide, SplideSlide, SplideTrack } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';

const config = require("../config");

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
    
    const half = Math.ceil(subjects.length/2);

    const firstHalf = subjects.slice(0,half+1);
    const secondHalf = subjects.slice(-half+1);
    
    // const booksWidth = window.matchMedia("(min-width: 900px)").matches;

    return (
        <div className='MainPage'>
            <div className='MainPageContainer'>

                <div className='MainPageHeading'>
                    <img className='BookpointLogo' src="/bookpoint.png" alt="Chýbajúci obrázok"/>
                    <h1>GYMPOS <br/> <b>BOOKPOINT</b></h1>
                </div>

                <div className='MainPageBody'>

                    <div className='BookShelfTop'>
                        <div className='MainPageSubjects'> {firstHalf} </div>
                    </div>
                    <div className='Shelf'/>

                    <div className='BookShelfTop'>
                        <div className='MainPageSubjects'> {secondHalf} </div>
                        <img className='PlantPot' src="/plantpot.webp" alt="" />
                    </div>
                    <div className='Shelf'/>

                    <div className='OpeningHours'>
                        <div className="oh"><b>Otváracie hodiny</b></div>
                        <div><b>Po:</b> 10:30-45 a 13:30-14:30</div>                        
                        <div><b>Štv:</b> 8:15-40</div>                        
                        <div><b>Pia:</b> 10:30-40</div>                    
                    </div>

                    <hr/>

                    <Splide hasTrack={false} options={
                        {
                            type: 'loop',
                            heightRatio: 0.602,
                            autoWidth: true,
                            pagination: false, 
                            padding: '6%',
                            gap: '2%'
                        }
                    }>
                        <SplideTrack>
                           <SplideSlide><img src="https://picsum.photos/id/1018/1000/600/" alt=""/></SplideSlide> 
                           <SplideSlide><img src="https://picsum.photos/id/1015/1000/600/" alt=""/></SplideSlide> 
                           <SplideSlide><img src="https://picsum.photos/id/1019/1000/600/" alt=""/></SplideSlide> 
                           <SplideSlide><img src="https://picsum.photos/id/1016/1000/600/" alt=""/></SplideSlide> 
                        </SplideTrack>
                    </Splide>
        
                    <hr/>

                    <p> V prípade záujmu o vypožičanie knihy, kontaktujte <a href='mailto:stroncerova@gympos.sk'>p. prof. Štroncerovú</a> </p>       
                </div>
            </div>

            <div className='InfoLinksContainer'>
                <div className='InfoLinksColumn'>
                    <h3 className='InfoLinksHeading'> Dôležité Odkazy </h3>
                    <a className='InfoLink' href='https://www.gympos.sk' > Gymnázium Poštová 9 </a>
                    <a className='InfoLink' href='/admin' > Vstup administrátora </a>
                </div>
                <div className='InfoLinksColumn'>
                    <h3 className='InfoLinksHeading'> Autori </h3>
                    <a className='InfoLink' href='https://www.harmansky.xyz' >Adam Harmanský</a>
                    <a className='InfoLink' href='http://pavolkomlos.xyz/sk/index.html' >Pavol Komloš</a>
                    <a className='InfoLink' href='https://github.com/adamharmansky/bookstore_frontend'>Kód stránky na Githube</a>
                </div>
            </div>

        </div>
    );
}

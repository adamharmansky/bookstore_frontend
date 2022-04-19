import React from 'react';
import Axios from 'axios';
import './MainPage.css';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';

const config = require("../config");

export default function BookList() {
    var [subjectList, setSubjectList] = React.useState([]);
    var [pictuteList, setPictureList] = React.useState([]);

    React.useEffect(() => {
        Axios.get(config.apiUrl + 'subject/list').then((data) => {
            setSubjectList(data.data);
        });
        Axios.get(config.apiUrl + 'gallery').then((data) => {
            setPictureList(data.data);
        });
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
    
    const isMobile = window.matchMedia("(max-width: 650px)").matches;
    
    return (
        <div className='MainPage'>
            <div className='MainPageContainer'>

                <div className='MainPageHeading'>
                    <img className='BookpointLogo' src="/bookpoint.png" alt="Chýbajúci obrázok"/>
                    <h1>GYMPOS <br/> <b>BOOKPOINT</b></h1>
                </div>

                <div className='MainPageBody'>

                    {
                        isMobile ?
                        (
                            <div className="Books">
                                <div className='BookShelfTop'>
                                    <div className='MainPageSubjects'> {firstHalf} </div>
                                    <img className='PlantPot' src="/plantpot.png" alt="" />
                                </div>
                                <div className='Shelf'/>

                                <div className='BookShelfTop'>
                                    <div className='MainPageSubjects'> {secondHalf} </div>
                                </div>
                                <div className='Shelf'/>
                            </div>
                        )
                        :
                        (
                            <div className="Books">
                                <div className='BookShelfTop'>
                                    <div className='MainPageSubjects'> {subjects} </div>
                                    <img className='PlantPot' src="/plantpot.png" alt="" />
                                </div>
                                <div className='Shelf'/>
                            </div>
                        )
                    }

                    <div className='OpeningHours'>
                        <div className="oh"><b>Otváracie hodiny</b></div>
                        <div className="oh">|</div>
                        <div><b>Po:</b> 10:30-10:45 a 13:30-14:30</div>                        
                        <div><b>Štv:</b> 8:15-8:40</div>                        
                        <div><b>Pia:</b> 10:30-10:40</div>                    
                    </div>

                    <hr/>

                    <Splide options={{
                            type: 'loop',
                            heightRatio: 0.615,
                            pagination: false, 
                            padding: '7%',
                            gap: '1.8%',
                            autoplay: true,
                            interval: 9000,
                            perPage: 1,
                            focus: 'center',
                    }}>
                        {pictuteList.map((p) => { return <SplideSlide><img src={p.picture_path} alt=""/></SplideSlide>})}
                    </Splide>
        
                    <hr/>

                    <p> V prípade záujmu o vypožičanie knihy, kontaktujte, prosím, <a href='mailto:stroncerova@gympos.sk'>prof. Štroncerovú</a>.</p>       
                </div>
            </div>
        </div>
    );
}

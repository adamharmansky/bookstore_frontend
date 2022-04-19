import React from 'react';
import './MainPage.css';


export default function AboutPage() {

    return (
        <div className='MainPage'>
            <div className='MainPageContainer'>

                <div className='MainPageHeading'>
                    <img className='BookpointLogo' src="/bookpoint.png" alt="Chýbajúci obrázok"/>
                    <h1>GYMPOS <br/> <b>BOOKPOINT</b></h1>
                </div>
        
                <hr/>

                <div className='MainPageBody' style={{"line-height": "1.8rem"}}>
                    <p>
                        Vďaka projektu „IT Farming Creativity Lab" dostáva naša školská knižnica nové pútavé digitálne prostredie.
                        Naším cieľom je taktiež zatraktívniť a sprístupniť literatúru a čítanie kníh mladým ľuďom.
                        Pretože aj my, ktorí na projekte pracujeme (študenti gymnázia), si uvedomujeme,
                        že čítanie je jedným z možných a vhodných spôsobov úniku z každodennej rutiny
                        a ako čoskoro mladí dospelí vieme vďaka nemu aj naďalej rásť.
                    </p>

                    <hr/>

                    <p>
                        Okrem toho je súčasťou projektu aj instagramový profil <a href="https://www.instagram.com/gympos_bookpoint">@gympos_bookpoint</a>, 
                        kde pre našich sledovateľov pripravujeme pravidelnú rubriku Víkendové tipy, Reels a videá s knižnou tematikou,
                        posty pri príležitosti rôznych významných dní, no i vedomostné kvízy a zaujímavosti z literárneho sveta.
                    </p>
                </div>
            </div>
        </div>
    );
}

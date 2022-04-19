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

            <div className='InfoLinksContainer'>
                <div className='InfoLinksColumn'>
                    <h3 className='InfoLinksHeading'> Dôležité Odkazy </h3>
                    <a className='InfoLink' href='https://www.gympos.sk' > Gymnázium Poštová 9 </a>
                    <a className='InfoLink' href='https://www.instagram.com/gympos_bookpoint' > Bookpoint Instagram </a>
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

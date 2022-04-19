import React from 'react'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import './App.css'
import './styles.css'
import BookList from './books/BookList'
import MainPage from './main/MainPage'
import AboutPage from './main/AboutPage'
import BookPage from './books/BookPage'
import AuthorPage from './authors/AuthorPage'
import AddBook from './admin/AddBook'
import AuthorList from './authors/AuthorList'
import SubjectPage from './books/SubjectPage'
import Login from './admin/Login'
import Admin from './admin/Admin'
import GalleryEditor from './admin/Gallery'
import {getCookie} from './Utility';

function App() {
    return (
        <div className='App'>
            <div className='NavBar'>
                <a className='NavBarButton' href='/'> Domov </a>
                <a className='NavBarButton' href='/about'> O nás </a>
                <a className='NavBarButton' href='/list'> Zoznam kníh </a>
                <a className='NavBarButton' href='/authors'> Zoznam autorov </a>
                {getCookie('session_key') ? <a className='NavBarButton' href='/admin'> Prihlásený ako {getCookie('username')} </a> : []}
                {/* <a className='NavBarButton' href='/add'> Pridať knihu </a> */}
            </div>
            <main>
                <Router>
                    <Routes>
                        <Route path='/' element={<MainPage />} />
                        <Route path='/about' element={<AboutPage />} />
                        <Route path='/list' element={<BookList />} />
                        <Route path='/book/*' element={<BookPage />} />
                        <Route path='/authors' element={<AuthorList />} />
                        <Route path='/author/*' element={<AuthorPage />} />
                        <Route path='/subject/*' element={<SubjectPage />} />
                        <Route path='/add' element={<AddBook />} />
                        <Route path='/admin' element={<Admin />} />
                        <Route path='/login' element={<Login />} />
                        <Route path='/gallery' element={<GalleryEditor />} />
                    </Routes>
                </Router>
            </main>
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

export default App;

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
                    </Routes>
                </Router>
            </main>
        </div>
    );
}

export default App;

import React from 'react'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import './App.css'
import './styles.css'
import BookList from './BookList'
import MainPage from './MainPage'
import BookPage from './BookPage'
import AuthorPage from './AuthorPage'
import AddBook from './AddBook'
import AuthorList from './AuthorList'
import SubjectPage from './SubjectPage'
import Login from './Login'
import Admin from './Admin'

function App() {
    return (
        <div className='App'>
            <div className='NavBar'>
                <a className='NavBarButton' href='/'> Domov </a>
                <a className='NavBarButton' href='/list'> Zoznam kníh </a>
                <a className='NavBarButton' href='/authors'> Zoznam autorov </a>
                {document.cookie.match('session_key=') ? <a className='NavBarButton' href='/admin'> Prihlásený ako {document.cookie.match('username=[^;]+')[0].split('=')[1]} </a> : []}
                {/* <a className='NavBarButton' href='/add'> Pridať knihu </a> */}
            </div>
            <main>
                <Router>
                    <Routes>
                        <Route path='/' element={<MainPage />} />
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

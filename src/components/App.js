import './App.scss';
import Header from './Header';
import Sidebar from './Sidebar';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Books from '../pages/Books';
import Quotes from '../pages/Quotes';
import Stats from '../pages/Stats';
import { useState } from 'react';
import { auth } from '../index';
import { onAuthStateChanged, setPersistence, browserLocalPersistence } from 'firebase/auth';
import SingleBook from '../pages/SingleBook';
import SingleQuote from '../pages/SingleQuote';
import { Navigate } from 'react-router-dom';
import Settings from '../pages/Settings';
import { useEffect } from 'react';
import { modalSelector } from '../selectors/sectionSelector';
import { useSelector } from 'react-redux';
import AddModal from './popups/AddModal';
import LoginModal from './popups/LoginModal';

function App() {
  const [isLoggedin, setIsLoggedIn] = useState(!!auth.currentUser);
  
  onAuthStateChanged(auth, function(user) {
    setIsLoggedIn(!!user);
  });

  return (
      <Router>
        <div className="wrapper">
          <Sidebar/>
          <main>
            
            <Header authed={isLoggedin}/> 

            <Routes>
                <Route path="/" element={<Navigate to="/books"/>}/>
                <Route path="/books" element={<div className='route-wrapper'><Books/></div>}/>
                <Route path="/books/:bookId" element={<div className='route-wrapper'><SingleBook/></div>}/>
                <Route path="/quotes" element={<div className='route-wrapper'><Quotes/></div>}/>
                <Route path="/quotes/:quoteId" element={<div className='route-wrapper'><SingleQuote/></div>}/>
                <Route path="/stats" element={<div className='route-wrapper'><Stats/></div>}/>
                <Route path="/settings" element={<div className='route-wrapper'><Settings/></div>}/>
                {/* <Route path='/modals/add-modal' element={isLoggedin ? <AddModal/> : <Navigate to="/books"/>}/>
                <Route path='/modals/login-modal' element={!isLoggedin ? <LoginModal/> : <Navigate to="/books"/>}/> */}
            </Routes>
          </main>
        </div>
      </Router>
  )
}

export default App;

import './App.scss';
import Header from './Header';
import Sidebar from './Sidebar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Books from '../pages/Books';
import Quotes from '../pages/Quotes';
import Stats from '../pages/Stats';
import { useState } from 'react';
import { auth } from '../index';
import { onAuthStateChanged } from 'firebase/auth';
import SingleBook from '../pages/SingleBook';
import SingleQuote from '../pages/SingleQuote';
import { Navigate } from 'react-router-dom';
import Settings from '../pages/Settings';

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
                <Route path="/quotes" element={<div className='route-wrapper'><Quotes/></div>}/>
                <Route path="/stats" element={<div className='route-wrapper'><Stats/></div>}/>
                <Route path="/" element={<Navigate to="/books"/>}/>
                <Route path="/books" element={<div className='route-wrapper'><Books/></div>}/>
                <Route path="/books/:bookId" element={<SingleBook></SingleBook>}/>
                <Route path="/quotes/:quoteId" element={<SingleQuote></SingleQuote>}/>
                <Route path="/settings" element={<Settings></Settings>}/>
            </Routes>
          </main>
        </div>
      </Router>
  )
}

export default App;

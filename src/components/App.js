import './App.scss';
import Header from './Header';
import Sidebar from './Sidebar';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Books from '../pages/Books';
import Quotes from '../pages/Quotes';
import Stats from '../pages/Stats';
import React, { useState } from 'react';
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
import About from '../pages/About';
import { publicRoutes, privateRoutes } from '../routes';
import { useAuthState } from "react-firebase-hooks/auth"
import { ColorRing } from 'react-loader-spinner';

export const authContext = React.createContext(null);


function App() {
  const [user, loading, error] = useAuthState(auth);

  if (loading || error) {
    return (
      <div className='loader'>
        <ColorRing
          visible={true}
          height="120"
          width="120"
          ariaLabel="blocks-loading"
          wrapperStyle={{}}
          wrapperClass="blocks-wrapper"
          colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
        />
        <p>If it takes too long, try to reload a page or try later.</p>
      </div>
    ) 
  }
  
  return (
    <authContext.Provider value={user}>
      <Router>
        <div className="wrapper">
          <Sidebar/>
          <main>
            <Header authed={user}/> 
            <div className='route-wrapper'>            
              {user
                ? 
                <Routes>
                  {privateRoutes.map(item => {
                    return <Route key={item.path} path={item.path} element={item.component}/>
                  })}  
                  <Route path="*" element={<Navigate to="/books"/>}/>
                </Routes> 
                :
                <Routes>
                  {publicRoutes.map(item => {
                    return <Route key={item.path} path={item.path} element={item.component}/>
                  })}
                  <Route path="*" element={<Navigate to="/about"/>}/>
                </Routes> 
              }
            </div>
          </main>
        </div>
      </Router>
    </authContext.Provider>
  )
}

export default App;

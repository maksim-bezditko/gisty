import styles from "./App.module.scss";
import Header from '../Header/Header';
import Sidebar from '../Sidebar/Sidebar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React from 'react';
import { auth } from '../../main';
import { Navigate } from 'react-router-dom';
import { publicRoutes, privateRoutes } from '../../routing/routes';
import { useAuthState } from "react-firebase-hooks/auth";
import { ColorRing } from "react-loader-spinner";

export const authContext = React.createContext<any | null>(null);

function App() {
  const [user, loading, error] = useAuthState(auth);

  if (loading || error) {
    return (
      <div className={styles.loader}>
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
        <div className={styles.wrapper}>
          <Sidebar/>
          <main>
            <Header/> 
            <div className={styles.pageWrapper}>            
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

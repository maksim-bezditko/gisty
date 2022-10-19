import './App.scss';
import Header from './Header';
import Sidebar from './Sidebar';
import store from '../store/store';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Books from '../pages/Books';
import Quotes from '../pages/Quotes';
import Stats from '../pages/Stats';

function App() {
  return (
    <Provider store={store}>
      <Router>
      
        <div className="wrapper">
          <Sidebar/>
          <main>
            <Header/>

            <Routes>
                <Route path="/quotes" element={<div className='route-wrapper'><Quotes/></div>}/>
                <Route path="/stats" element={<div className='route-wrapper'><Stats/></div>}/>
                <Route path="/" element={<div className='route-wrapper'><Books/></div>}/>
            </Routes>

          </main>
        </div>
      </Router>
    </Provider>
    
  )
}

export default App;

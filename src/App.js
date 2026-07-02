import { useState, useEffect } from 'react';
import './App.css';
import Header from './Header';
import Footer from './Footer';
//import Carousel from './Carousel';
import AboutUS from './AboutUS';
import Services from './Services';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home';




function App() {
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    document.body.classList.remove('theme-dark', 'theme-light');
    document.body.classList.add(`theme-${theme}`);
  }, [theme]);

  const toggleTheme = () => setTheme((prevTheme) => (prevTheme === 'dark' ? 'light' : 'dark'));

  return (
    <div className="App">
      <div className={`site-theme ${theme === 'dark' ? 'theme-dark' : 'theme-light'}`}>
        <Router>
          <Routes>
            <Route
              path="/*"
              element={
                <>
                  <Header theme={theme} onToggleTheme={toggleTheme} />
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/aboutus" element={<AboutUS />} />
                    <Route path="/services" element={<Services />} />
                  </Routes>
                </>
              }
            />
          </Routes>
        </Router>
      </div>

      <Footer />

     {/* <Footer/> */}               {/*
      <Router>
         <Routes>
            <Route  path='/' element={<>
            <Header/>
            <Routes>
            <Route  path='/ ' element={<Home/>}/>
            <Route path='/aboutus' element={<AboutUS/>}/>
            <Route path='/services' element={<Services/>}/>
          </Routes>
            </> }/>
              <Route path='/login' element={<Login/>}/>
            <Route path='/siginup'  element={<Signup/>}/>
         </Routes>
      </Router>
                     */}


    </div>
  );
}

export default App;
import { useState, useEffect } from 'react';
import './App.css';
import Header from './Header';
import AboutUS from './AboutUS';
import Services from './Services';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home';
import Login from './Login';
import Signup from './Signup';
import Dashboard from './Dashboard';

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
            
            <Route path="/dashboard" element={<Dashboard />} />
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
            <Route path="/login" element={<Login/>}/>
            <Route path="/signup" element={<Signup/>}/>
          </Routes>
        </Router>
      </div>

      
    </div>
  );
}

export default App;
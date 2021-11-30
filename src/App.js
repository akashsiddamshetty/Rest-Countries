import React, { useState } from "react";
import './dist/App.css';
import { GlobalStyles } from "./components/globalStyle";
import { ThemeProvider } from "styled-components";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Countries from "./components/Countries";
import Country from "./components/Country";
import { lightTheme, darkTheme } from "./components/Theme";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';



export default function App() {
  const [theme, setTheme] = useState('dark');
  const toggleTheme = () => (theme === 'dark') ? setTheme('light') : setTheme('dark');

  return (
    <Router>
      <ThemeProvider theme={theme === 'dark' ? darkTheme : lightTheme}>
        <GlobalStyles />
        <header className="container">
          <Link className="link" to="/"><h2>Where in the world?</h2></Link>
          <button onClick={toggleTheme}>
            <FontAwesomeIcon icon={theme === 'light' ? faMoon : faSun} />
            {theme === 'dark' ? ' Light ' : ' Dark '}Mode
          </button>
        </header>
        <Switch>
          <Route path="/" exact>
            <Countries />
          </Route>
          <Route path="/:name" component={Country} />
        </Switch>
      </ThemeProvider>
    </Router>
  );
}



import React, { useState } from "react";
import './dist/App.css';
import { GlobalStyles } from "./components/globalStyle";
import { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme } from "./components/Theme";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
import Section from "./components/Section";
import CountryDetails from "./components/CountryDetails";

export default function App() {
  const [theme, setTheme] = useState('dark');

  const toggleTheme = () => (theme === 'dark') ? setTheme('light') : setTheme('dark');
  return (
    <Router>


      <ThemeProvider theme={theme === 'dark' ? darkTheme : lightTheme}>

        <GlobalStyles />
        <header className="container">
          <h2>Where in the world?</h2>
          <button onClick={toggleTheme}>
            <FontAwesomeIcon icon={theme === 'light' ? faMoon : faSun} />
            {theme === 'dark' ? ' Light ' : ' Dark '}Mode
          </button>
        </header>
        <Switch>
          <Route path="/" exact>

            <Section />
          </Route>
          <Route path="/CountryDetails/:id" component={CountryDetails} />
        </Switch>

      </ThemeProvider>

    </Router>


  );
}



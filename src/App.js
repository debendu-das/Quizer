import React from 'react';

import './App.css';
import Appbar from './components/Appbar/appbar';
import Quizer from './components/Quizer/quizer';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from './components/Home/home';
import About from './components/About/about';

function App() {

  return (
    <BrowserRouter>
      <div className="App">
        <Appbar />

        <Switch>
          <Route exact path="/about">
            <About />
          </Route>
          <Route path="/quiz">
            <Quizer />
          </Route>
          <Route path="/">
            <Home />
          </Route>
      </Switch>
        
      </div>
    </BrowserRouter>
  );
}

export default App;

import React from 'react';
import { BrowserRouter, Route} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css'

import HomePage from './components/HomePage';
import Header from './components/Header-and-Footer/Header';
import Footer from './components/Header-and-Footer/Footer';

import Nationality from './components/Nationality/Nationality';
import Recipe from './components/Recipe/Recipe';


function App() {
  document.title = "Search many things";
  return (
    <div>      

      <BrowserRouter>
        <Header />
        <Route path="/" exact component={HomePage} />
        <Route path="/nationality" component={Nationality} />
        <Route path="/recipe" component={Recipe} />
      </BrowserRouter>

      <Footer />
    </div>
  );
}

export default App;

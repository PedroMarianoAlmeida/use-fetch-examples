import React from 'react';
import { BrowserRouter, Route} from "react-router-dom";

import HomePage from './components/HomePage';
import Header from './components/Header-and-Footer/Header';
import Footer from './components/Header-and-Footer/Footer';

import Nationality from './components/Nationality';

function App() {
  return (
    <div>
      <Header />

      <BrowserRouter>
        <Route path="/" exact component={HomePage} />
        <Route path="/nationality" component={Nationality} />
      </BrowserRouter>

      <Footer />
    </div>
  );
}

export default App;

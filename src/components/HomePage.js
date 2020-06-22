import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
    return (
      <div className="container mb-5 pb-5">
        <div className="row">
            <div className="col-12">
                <h1 className="mt-1 mb-4">What is this website?</h1>
                <p>It is some examples of how to apply useFetch in real free API</p>
                <p>Click on buttons above to be redirected to each example</p>

                <button className="btn btn-dark mx-1"><Link to="/nationality" className="text-white">Nacionality</Link></button>
            </div>
        </div>
      </div>
    );
}
 
export default HomePage;
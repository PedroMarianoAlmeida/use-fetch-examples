import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
    return (
      <div className="container mb-5 pb-5">
        <div className="row">
            <div className="col-12">
                <h1 className="mt-1 mb-4">What is this website?</h1>
                <p>Have you wondered in which countries your name is more common?  Or want to find a recipe by your ingredients? Or just pass time doing a useful search (or not so useful)?</p>
                <p>So you are in the right place! Please click in buttons above to try it out</p>

                <button className="btn btn-dark mx-1"><Link to="/nationality" className="text-white">Nacionality Name</Link></button>
                <button className="btn btn-dark mx-1">Recipe by ingredients <br /> (in constrution)</button>
            </div>
        </div>
      </div>
    );
}
 
export default HomePage;
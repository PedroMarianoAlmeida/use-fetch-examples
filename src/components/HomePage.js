import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
    return (
      <div className="container mb-5 pb-5">
        <div className="row justify-content-center">
            <div className="col-12">
                <h1 className="mt-1 mb-4">What is this website?</h1>
                <p>Have you wondered in which countries your name is more common?  Or want to find a recipe by your ingredients? Or just pass time doing a useful search (or not so useful)?</p>
                <p>So you are in the right place! Please click in buttons above to try it out</p>
            </div>

            <div className="col-12 col-md-3 my-2 d-flex justify-content-center">
              <button className="btn btn-dark mx-1"><Link to="/nationality" className="text-white">Nacionality Name</Link></button>
            </div>
        
            <div className="col-12 col-md-3 my-2 d-flex justify-content-center">
              <button className="btn btn-dark mx-1"><Link to="/recipe" className="text-white">Recipe by ingredients</Link></button>
            </div>

        </div>
      </div>
    );
}
 
export default HomePage;
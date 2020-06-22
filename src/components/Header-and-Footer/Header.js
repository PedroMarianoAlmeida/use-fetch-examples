import React from 'react';
import { Link } from 'react-router-dom'

const Header = () => {
    return ( 
        <div className="bg-dark">
            <h1 className="text-white py-3 text-center">
                <Link to="/" className="text-white">
                    Search many things
                </Link>
            </h1>
        </div>
     );
}
 
export default Header;
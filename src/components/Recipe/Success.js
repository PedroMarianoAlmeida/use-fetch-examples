import React from 'react';

const Sucess = (rawData) => {
   const myData = Array.from(rawData);
    
    return ( 
        <ul className="text-danger"> 
            {
                <li> 
                    {
                        myData.forEach( (recipe) => {
                            console.log(recipe);
                            return(
                                <ul key={recipe.id}> {recipe.title} </ul>
                            )
                        })
                    }
                </li> 
            }   
        </ul>
     );
}
 
export default Sucess;
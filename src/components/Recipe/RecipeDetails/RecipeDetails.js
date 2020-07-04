import React from 'react';

import useFetch from './../../../custom-hooks/useFetch'

const RecipeDetails = (props) => {
    return (
        <h3>id: {props.recipeId}</h3>
      );
}
 
export default RecipeDetails;
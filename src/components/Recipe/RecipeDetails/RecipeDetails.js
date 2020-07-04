import React from 'react';

import useFetch from './../../../custom-hooks/useFetch';

import API_KEYS from './../../../api-keys';

import Success from './Success';

const RecipeDetails = (props) => {
    const configuration = {
        url: "https://api.spoonacular.com/recipes/informationBulk?",
        parameters:  [ { apiKey: API_KEYS.recipe }, {ids: props.recipeId} ],
        
        shouldRun: true,
        logResponses: false,
    
        doWhenInactive: () => <h6>Something goes wrong, close card</h6>,
        doWhenFetching: () => <h6>...Loading</h6>,
        doWhenFail: (error) => <h6>Number of request expired for today, come back tomorow</h6>,
        doWhenSuccess: (rawAnswer) => <Success result={{rawAnswer}} />
    }

    const [recipeDetails, setConfiguration] = useFetch(configuration);
    
    return (
        <div>
            { recipeDetails }
        </div>
      );
}
 
export default RecipeDetails;
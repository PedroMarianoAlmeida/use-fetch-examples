import React, {useState} from 'react';
import useFetch from './../../custom-hooks/useFetch';

import API_KEYS from './../../api-keys';
import Sucess from './Success';

const Recipe = () => {
    
    const configuration = {
        url: "https://api.spoonacular.com/recipes/findByIngredients?",
        parameters:  [ { apiKey: API_KEYS.recipe }, { number: 2} ],
        
        shouldRun: false,
        logResponses: true,
    
        doWhenInactive: () => <h6>Insert ingredients on the input box</h6>,
        doWhenFetching: () => <h6>...Loading</h6>,
        doWhenFail: (error) => <h6>Error: {error.name} - {error.message} </h6>,
        doWhenSuccess: (rawAnswer) => <Sucess rawAnswer={rawAnswer} />
    }

    const [recipeList, setConfiguration] = useFetch(configuration);

    const [ingredientInput, setingredientInput] = useState("");

    const handleChange = (e) => {
        setingredientInput(e.target.value);
        
    }

    const handleSubmit= (e) => {
        e.preventDefault();
        if ( configuration.hasOwnProperty('ingredients') ) delete configuration.ingredients;
        const objectToParameters = tratedIngredientList(ingredientInput);
        configuration.parameters.push(objectToParameters);
        configuration.shouldRun = true; 
        setConfiguration(configuration);
        setingredientInput("");
    }

    const tratedIngredientList = (ingredientList) => {
        return { ingredients: ingredientList.toLowerCase().replace(/ /g, '') };
    }

    return ( 
        <div className="container mb-5 pb-5">
            <div className="row">
                <div className="col-12 col-md-6">
                    <h1 className="mt-1 mb-4">Recipe</h1>
                    <p>This page utilizes <a href="https://spoonacular.com/food-api" target="_blank" rel="noopener noreferrer">spoonacular API</a> to find recipies by your ingredients.</p>
                    <p>Please separate each ingredients by commas (ex.: onion, garlic) in the input bellow.</p>
                    
                    <form onSubmit={handleSubmit} className="mb-3 d-block">
                        <input type="text" placeholder="ingredients" required value={ingredientInput} onChange={handleChange}/>
                        <input type="submit" value="Send" className="btn btn-dark mx-1"/>
                    </form>    

                </div>

                <div className="col-12 col-md-6 bg-light pt-5 pb-5 mb-5">
                    <h4>Answer</h4>
                    { recipeList }
                </div>

            </div>
        </div>
     );
}
 
export default Recipe;
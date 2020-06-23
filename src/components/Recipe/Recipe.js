import React, {useState} from 'react';
import useFetch from './../../custom-hooks/useFetch'

const Recipe = () => {
    
    const configuration = {
        url: "http://www.recipepuppy.com/api/?",
        fetchInicialization: {mode: 'no-cors'},
        
        shouldRun: false,
        logResponses: true,
    
        doWhenInactive: () => <h6>Insert ingredients on the input box</h6>,
        doWhenFetching: () => <h6>...Loading</h6>,
        doWhenFail: (error) => <h6>Error: {error.name} - {error.message} </h6>,
        doWhenSuccess: (rawAnswer) => <h6>{ JSON.stringify(rawAnswer) }</h6>
    }

    const [recipeList, setConfiguration] = useFetch(configuration);

    const [ingredientInput, setingredientInput] = useState("");

    const handleChange = (e) => {
        setingredientInput(e.target.value);
        
    }

    const handleSubmit= (e) => {
        e.preventDefault();
        const objectToParameters = tratedIngredientList(ingredientInput);
        //configuration.parameters = //objectToParameters;
        configuration.url = "http://www.recipepuppy.com/api/?i=onions,garlic&q=omelet&p=3";
        configuration.shouldRun = true; 
        setConfiguration(configuration);
        setingredientInput("");
    }

    const tratedIngredientList = (ingredientList) => {
        let arrayOfObjectParameters = [];
        ingredientList.split(',').forEach(element => {
            let myObject = {};
            myObject.i = element.trim();
            arrayOfObjectParameters.push(myObject);
        });
        return arrayOfObjectParameters;
    }

    return ( 
        <div className="container mb-5 pb-5">
            <div className="row">
                <div className="col-12 col-md-6">
                    <h1 className="mt-1 mb-4">Recipe</h1>
                    <p>This page utilizes <a href="http://www.recipepuppy.com/" target="_blank" rel="noopener noreferrer">recipepuppy.com/</a> to find recipies by your ingredients.</p>
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
import React from 'react';
/*
Para pegar os detalhes da receita
https://spoonacular.com/food-api/docs#Get-Recipe-Information-Bulk
*/

const Success = (props) => {
   console.log( props.result );
   console.log( props.ingredients );

   const listOfRecipies = props.result.rawAnswer;
   const userIngredients = props.ingredients.objectToParameters.ingredients;
   console.log(userIngredients);

    //Verify if the missed ingredients are realy missig or the user input is a part of complete name missed ingredient
    const missingIngredients = (recipeItem) => {

        if (recipeItem.missedIngredientCount === 0) return <p>No missing ingredients</p>
        
        let realMissedIngredients = recipeItem.missedIngredients.filter( (missedIngredient) => !userIngredients.includes(missedIngredient.name));
        if (realMissedIngredients.length === 0) return <p>No missing ingredients</p>        
        
        let stringRealMissedIngredients = "";
        realMissedIngredients.forEach((ingredient, index) => {
            stringRealMissedIngredients += ingredient.name;
            if(index < realMissedIngredients.length - 1) stringRealMissedIngredients += ", "
        });
        
        return (
            <p><strong>{`${realMissedIngredients.length} missing ingredient${realMissedIngredients.length !== 1 ? "s" : ""}:`}</strong> {stringRealMissedIngredients}</p>
        )
    }

    const unusedIngredients = (recipeItem) => {
        const allRecipeIngredients = [ ...[recipeItem.usedIngredients], ...[recipeItem.missedIngredients] ].flat(1);
        const allRecipeIngredientsName = allRecipeIngredients.reduce( (acumulator, ingredientObject) => acumulator + ingredientObject.name + " - ", "" )
        
        const userIngredientsList = userIngredients.split(',')

        const unusedUserIngredients = userIngredientsList.filter( (userIngredient) => !allRecipeIngredientsName.includes(userIngredient) );
        if (unusedUserIngredients.length === 0) return <p>Use all ingredients</p>

        let stringRealUnusedIngredients = "";
        unusedUserIngredients.forEach((ingredient, index) => {
            stringRealUnusedIngredients += ingredient;
            if(index < unusedUserIngredients.length - 1) stringRealUnusedIngredients += ", "
        });

        console.log(allRecipeIngredientsName);
        console.log(unusedUserIngredients);
        
        return (
            <p><strong>{`${unusedUserIngredients.length} missing ingredient${unusedUserIngredients.length !== 1 ? "s" : ""}:`}</strong> {stringRealUnusedIngredients}</p>
        )
    }

    return (         
        <div className='row'>

            {listOfRecipies.map( (recipe) => {
                return(
                    <div key={recipe.id} className='col-12 my-2'>
                        <div className='row'>
                            <div className="col-3">
                                <img className="img-fluid" src={recipe.image}/>                               
                            </div>
                            <div className='col-9 my-auto'>
                                <h5>{recipe.title}</h5>
                                { missingIngredients(recipe) }
                                { unusedIngredients(recipe) }
                            </div>                          
                        </div>
                    </div>
                )
            })}
        </div>
     );
}
 
export default Success;
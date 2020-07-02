import React from 'react';
/*
Para pegar os detalhes da receita
https://spoonacular.com/food-api/docs#Get-Recipe-Information-Bulk
*/

const Success = (props) => {
   console.log( props.result );
   console.log( props.ingredients );

   const listOfRecipies = props.result.rawAnswer;
   const userIngredients = props.ingredients.objectToParameters.ingredients.split(',');
   console.log(userIngredients);

    const missingIngredients = (recipeItem) => {
        let missedIngredientCount = recipeItem.missedIngredientCount;
        if (missedIngredientCount === 0) return <p>No missing ingredients</p>
        
        let realMissedIngredients = [];

        userIngredients.forEach( (ingredient) => {
            recipeItem.missedIngredients.forEach ( (missedIngredient) => {
                //console.log(ingredient, missedIngredient.name);
                if ( missedIngredient.name.includes(ingredient) ) missedIngredientCount--;
            })
        })
        if (missedIngredientCount === 0) return <p>No missing ingredients</p>        
        
        return (
            <p>{missedIngredientCount} missing Ingredients</p>
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
                            </div>                          
                        </div>
                    </div>
                )
            })}
        </div>
     );
}
 
export default Success;
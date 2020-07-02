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

        recipeItem.missedIngredients.forEach ( (missedIngredient) => {
            let realMissedIngredient = true;
            userIngredients.forEach( (ingredient) => {
                if ( missedIngredient.name.includes(ingredient) ){
                    missedIngredientCount--;
                    realMissedIngredient = false;
                }
            })
            if (realMissedIngredient) realMissedIngredients.push(missedIngredient.name);
        })

        if (missedIngredientCount === 0) return <p>No missing ingredients</p>        
        
        let stringRealMissedIngredients = "";
        realMissedIngredients.forEach((ingredient, index) => {
            stringRealMissedIngredients += ingredient;
            if(index < realMissedIngredients.length - 1) stringRealMissedIngredients += ", "
        });
        
        return (
            <p><strong>{`${missedIngredientCount} missing ingredient${missedIngredientCount !== 1 ? "s" : ""}:`}</strong> {stringRealMissedIngredients}</p>
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
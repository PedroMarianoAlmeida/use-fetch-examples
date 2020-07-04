import React from 'react';
import RecipeDetails from './RecipeDetails/RecipeDetails';
import Modal from 'react-bootstrap/Modal'
/*
Para pegar os detalhes da receita
https://spoonacular.com/food-api/docs#Get-Recipe-Information-Bulk
*/

const Success = (props) => {
   //console.log( props.result );
   //console.log( props.ingredients );

   const listOfRecipies = props.result.rawAnswer;
   const userIngredients = props.ingredients.objectToParameters.ingredients.split(',');

    //Verify if the missed ingredients are realy missig or the user input is a part of complete name missed ingredient
    const missingIngredients = (recipeItem) => {

        if (recipeItem.missedIngredientCount === 0) return <p>No missing ingredients</p>
        
        const realMissedIngredients = recipeItem.missedIngredients.filter( (missedIngredient) => {
            for(let userIngredient of userIngredients) {
                if ( missedIngredient.name.includes(userIngredient) ) return false          
            }
            return true;
        });
        if (realMissedIngredients.length === 0) return <p>No missing ingredients</p>        
        
        let stringRealMissedIngredients = "";
        realMissedIngredients.forEach((ingredient, index) => {
            stringRealMissedIngredients += ingredient.name;
            if(index < realMissedIngredients.length - 1) stringRealMissedIngredients += ", "
        });
        
        return (
            <p><strong>{`${realMissedIngredients.length} missing ingredient${realMissedIngredients.length !== 1 ? "s" : ""}: `}</strong> {stringRealMissedIngredients}</p>
        )
    }

    const unusedIngredients = (recipeItem) => {
        const allRecipeIngredients = [ ...[recipeItem.usedIngredients], ...[recipeItem.missedIngredients] ].flat(1);
        const allRecipeIngredientsName = allRecipeIngredients.reduce( (acumulator, ingredientObject) => acumulator + ingredientObject.name + " - ", "" )

        const unusedUserIngredients = userIngredients.filter( (userIngredient) => !allRecipeIngredientsName.includes(userIngredient) );
        if (unusedUserIngredients.length === 0) return <p>Use all your ingredients</p>

        let stringRealUnusedIngredients = "";
        unusedUserIngredients.forEach((ingredient, index) => {
            stringRealUnusedIngredients += ingredient;
            if(index < unusedUserIngredients.length - 1) stringRealUnusedIngredients += ", "
        });
        
        return (
            <p><strong>{`${unusedUserIngredients.length} unused ingredient${unusedUserIngredients.length !== 1 ? "s" : ""}: `}</strong>{stringRealUnusedIngredients}</p>
        )
    }

    const [showModal, setShowModal] = React.useState(false);
    const [recipeId, setRecipeId] = React.useState("");
    const [recipeTitle, setRecipeTitle] = React.useState("");
    const handleClick = (e) => {
        setShowModal(true);
        setRecipeId(e.target.id);
        setRecipeTitle(e.target.alt);
    }

    return (         
        <React.Fragment>
            <div className='row'>
                <div className='col-12'>
                    <p className="bg-warning text-danger text-center py-2"><strong>Click in the photo to see de recipe steps</strong></p>
                    <p>
                        <small>
                            <strong>Missing ingredient: </strong>It is in the recipe but you didn't insert the ingredient on search <br />
                            <strong>Unused ingredient: </strong>You inserted on search but isn't used in this recipe
                        </small>
                    </p>
                </div>
                {listOfRecipies.map( (recipe) => {
                    return(
                        <div key={recipe.id} className='col-12 my-2'>
                            <div className='row'>
                                <div className='col-12'>
                                <h5 className="text-center bg-dark text-white py-2">{recipe.title}</h5>
                                </div>
                                
                                <div className="col-4">
                                    <img className="img-fluid" src={recipe.image} id={recipe.id} 
                                    alt={recipe.title} onClick={handleClick} style={{cursor: "pointer"}}/>                               
                                </div>
                                <div className='col-8 my-auto'>                   
                                    { missingIngredients(recipe) }
                                    { unusedIngredients(recipe) }
                                </div>                          
                            </div> 
                        </div>
                    )
                })}
            </div>

            <Modal show={showModal} size="lg" centered>
                <Modal.Header className="d-flex justify-content-center">
                    <Modal.Title className='text-center'>
                        {recipeTitle}
                    </Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <RecipeDetails recipeId={recipeId} />
                </Modal.Body>

                <Modal.Footer className="d-flex justify-content-center">
                    <button onClick={() => setShowModal(false)}
                    className="btn btn-dark">
                        Close Recipe
                    </button>
                </Modal.Footer>

            </Modal>
        </React.Fragment>
     );
}
 
export default Success;
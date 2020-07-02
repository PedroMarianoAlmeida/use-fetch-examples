import React from 'react';
/*
Para pegar os detalhes da receita
https://spoonacular.com/food-api/docs#Get-Recipe-Information-Bulk
*/

const Success = (props) => {
   console.log( props.result );
   console.log( props.ingredients );

   const listOfRecipies = props.result.rawAnswer;

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
                                <p>
                                    {

                                    }
                                </p>
                            </div>                          
                        </div>
                    </div>
                )
            })}
        </div>
     );
}
 
export default Success;
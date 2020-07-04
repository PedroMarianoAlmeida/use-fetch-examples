import React from 'react';
import Modal from 'react-bootstrap/Modal'

const RecipeDetails = (props) => {
    console.log("datais")
    return (
        <Modal.Body>{props.recipeId}</Modal.Body>
      );
}
 
export default RecipeDetails;
import React from 'react';

const Success = (props) => {
    const recipe = props.result.rawAnswer[0];
    return (
        <React.Fragment>
            {recipe.analyzedInstructions.map( (macrosteps, index) =>{
                return(
                    <React.Fragment>
                        <h4 key={index}>{macrosteps.name}</h4>
                        {macrosteps.steps.map( (step, index)=>{
                            return(
                                <p key={index}>{step.step}</p>
                            )
                        })}
                    </React.Fragment>

                )
            })}
        
            <p>More details in <a href={recipe.sourceUrl} target="_blank" rel="noopener noreferrer">oficial recipe website</a></p>
        </React.Fragment>
      );
}
 
export default Success;
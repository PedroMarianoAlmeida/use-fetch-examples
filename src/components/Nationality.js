import React, {useState, Fragment} from 'react';
import useFetch from './../custom-hooks/useFetch';
import { render } from '@testing-library/react';

const Nationality = () => {
    const configuration = {
        url: "https://api.nationalize.io?",
        //errorAPIvalue:  [ "Response", "False", "Error"] ,
        
        shouldRun: false,
        logResponses: true,
    
        doWhenInactive: () => <h6>Insert names above</h6>,
        doWhenFetching: () => <h6>...Loading</h6>,
        doWhenFail: (error) => <h6>Error: {JSON.stringify(error)} </h6>,
        doWhenSuccess: (rawAnswer) => renderWhenSucess(rawAnswer)
    }
    
    const [namesList, setConfiguration] = useFetch(configuration);

    const renderWhenSucess = (answerObject) => {
        console.log( Array.isArray(answerObject) )

        const individualRender = (personObject) => {
            return(
                <Fragment>
                    {personObject.name}:
                    {personObject.country.length > 0 ? 
                        personObject.country.map( (country, index) => {
                        return(
                            <span key={index}> {country.country_id} - {Math.round(country.probability*100)}% {index < personObject.country.length - 1 ? "/": ""} </span>
                        )
                        }) :
                        <span>" No data about this name"</span>  
                    }
                </Fragment>
            )
        }

        return(
            <div>
                { Array.isArray(answerObject) ? 
                    answerObject.map( (person, index) => {
                        return(
                            <div key={index}>{individualRender(person)}</div>
                        )
                    }) : 
                    individualRender(answerObject)
                }
            </div>
        )
    
    }
    
    const [names, setNames] = useState("");

    const handleChange = (e) => {
        setNames(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const objectToParameters = treatedNames(names);
        if ( objectToParameters.length <= 10){
            configuration.parameters = objectToParameters;
            configuration.shouldRun = true; 
        } 
        else{
            configuration.doWhenInactive = ()=> <h6>Limit names exceed the max (10)</h6>;
        }           
        setConfiguration(configuration);
        setNames("");
    }

    const treatedNames = (inputNames) => {
        const inputNamesWithoutCommas = inputNames.replace(/ /g,'');
        
        let arrayOfObjectParameters = [];
        inputNamesWithoutCommas.split(',').map(element => {
            let myObject = {};
            myObject.name = element;
            arrayOfObjectParameters.push(myObject);
        });
        return arrayOfObjectParameters;
    }
    
    return (
        <div>
            <h1>Nationality</h1>
            <p>This page utilizes <a href="https://nationalize.io/" target="_blank" rel="noopener noreferrer">nationalize.io</a> to predicts the nationality of a person given their name.</p>
            <p>You can add 10 names in each search (in the free version, which I used).</p>
            <p>Please separate each name by commas (ex.: Peter, Jonh, Michael) in the input bellow.</p>
        
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="names" required value={names} onChange={handleChange}/>
                <input type="submit" value="Send" />
            </form>

            { namesList }
        </div>
      );
}
 
export default Nationality;
import React, {useState, Fragment} from 'react';
import useFetch from './../../custom-hooks/useFetch';

const Nationality = () => {
    const configuration = {
        url: "https://api.nationalize.io?",
        
        shouldRun: false,
        logResponses: true,
    
        doWhenInactive: () => <h6>Insert names on the input box</h6>,
        doWhenFetching: () => <h6>...Loading</h6>,
        doWhenFail: (error) => <h6>Error: {error.name} - {error.message} </h6>,
        doWhenSuccess: (rawAnswer) => renderWhenSucess(rawAnswer)
    }
    
    const [namesList, setConfiguration] = useFetch(configuration);

    const renderWhenSucess = (answerObject) => {
        console.log( Array.isArray(answerObject) )

        const individualRender = (personObject) => {
            return(
                <Fragment>
                    <td className="text-center">{personObject.name}</td>
                    {personObject.country.length > 0 ? 
                        personObject.country.map( (country, index) => {
                        return(
                            <td key={index} className="text-center"> {country.country_id} - {Math.round(country.probability*100)}%</td>
                        )
                        }) :
                        <td colspan="3" className="text-center bg-danger"> No data about this name</td> 
                    }
                </Fragment>
            )
        }

        return(
            <table className="table">
                <thead>
                    <tr>
                        <th scope='col' className="text-center">Name</th>
                        <th scope='col' className="text-center">Country 1</th>
                        <th scope='col' className="text-center">Country 2</th>
                        <th scope='col' className="text-center">Country 3</th>
                    </tr>
                </thead>
                <tbody>
                    
                    { Array.isArray(answerObject) ? 
                        answerObject.map( (person, index) => {
                            return(
                                <tr key={index}>{individualRender(person)}</tr>
                            )
                        }) : 
                        <tr>{individualRender(answerObject)}</tr>
                    }
                    
                </tbody>
            </table>
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
        let arrayOfObjectParameters = [];
        inputNames.split(',').forEach(element => {
            let myObject = {};
            myObject.name = element.trim();
            arrayOfObjectParameters.push(myObject);
        });
        return arrayOfObjectParameters;
    }

    const wrongAdress = () => {
        configuration.url="wrongAdress";
        configuration.shouldRun = true;
        configuration.parameters = [];
        setConfiguration(configuration);
    }

    const invalidKey = () => {
        configuration.parameters = [ {name: "one"}, {apikey: "one"} ];
        configuration.shouldRun = true;
        setConfiguration(configuration);
    }

    const withourParameters = () => {
        configuration.url = "https://api.nationalize.io";
        configuration.parameters = [ ];
        configuration.shouldRun = true;
        setConfiguration(configuration);
    }
    
    return (
        <div className="container mb-5 pb-5">
            <div className="row">
                <div className="col-12 col-md-6">
                    <h1 className="mt-1 mb-4">Nationality</h1>
                    <p>This page utilizes <a href="https://nationalize.io/" target="_blank" rel="noopener noreferrer">nationalize.io</a> to predict the nationality of a person given their name.</p>
                    <p>You can add 10 names in each search (in the free version, which I used).</p>
                    <p>Please separate each name by commas (ex.: Peter, Jonh, Michael) in the input bellow.</p>

                    
                    <form onSubmit={handleSubmit} className="mb-3 d-block">
                        <input type="text" placeholder="names" required value={names} onChange={handleChange}/>
                        <input type="submit" value="Send" className="btn btn-dark mx-1"/>
                    </form>                  
                    
                </div>

                <div className="col-12 col-md-6 bg-light pt-5 pb-5 mb-5">
                    <h4>Answer</h4>
                    { namesList }
                </div>

                <div className="col-12">
                    <div>Provocated Errors (for programmers):</div>
                    <button className="btn btn-dark m-1" onClick={wrongAdress}>Wrong adress</button>
                    <button className="btn btn-dark m-1" onClick={invalidKey}>Invalid key</button>
                    <button className="btn btn-dark m-1" onClick={withourParameters}>Without Parameters</button>
                </div>
            </div>    
        </div>
      );
}
 
export default Nationality;
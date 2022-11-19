import React from "react"

export default function Country(){
    
    const [countryData, setCountryData] = React.useState([])
    const [searchTerm, setSearchTerm] = React.useState("")
    let streamlinedCountryStats = {}
    let countryElements = null
    
    function handleTextEntry(event) {
        setSearchTerm(event.target.value)
    }
    
    function handleClick(){
        fetch(`https://restcountries.com/v3.1/name/${searchTerm}`)
        .then((response) => response.json())
        .then((data) => {
            setCountryData(data)
            setSearchTerm("")
            }).catch(err => console.error(err))
    }
    
    if (countryData.length > 0) {
        const currencyObj = countryData[0].currencies 
        const currencyName = Object.values(currencyObj)[0].name;
        const languageArray = Object.values(countryData[0].languages)
        const rawPopulationNum = countryData[0].population;
        let internationalNumberFormat = new Intl.NumberFormat('en-US')
    
        streamlinedCountryStats = {
            commonName: countryData[0].name.common,
            officialName: countryData[0].name.official,
            capital: countryData[0].capital[0],
            population: internationalNumberFormat.format(rawPopulationNum),
            flag: countryData[0].flags.png,
            currency: currencyName,
            languages: languageArray
        }
       
       countryElements = (
           <div className="country--wrapper">
                <img className="flag-image" src={streamlinedCountryStats.flag} />
                <h1 className="country-name">{streamlinedCountryStats.commonName}</h1>
                <div className="stats-wrapper">
                    <p className="text"><span className="bold">Official name:</span> {streamlinedCountryStats.officialName}</p>
                    <p className="text"><span className="bold">Capital:</span> {streamlinedCountryStats.capital} </p>
                    <p className="text"><span className="bold">Population: </span> {streamlinedCountryStats.population}</p>
                    <p className="text"><span className="bold">Currency:</span> {streamlinedCountryStats.currency}</p>
                    <p className="text"><span className="bold">Languages: </span> {streamlinedCountryStats.languages.join(", ")}</p>
                </div>
           </div>
       )
    }
    
    
    return(
       <div className="search-results--container">
            <div className="input--wrapper">
                    <input
                        className="input--field"
                        type="text"
                        placeholder="Enter country name"
                        name="search-term"
                        value={searchTerm}
                        onChange={handleTextEntry}
                    />
                    <button className="search--btn" onClick={handleClick}>Search</button>
            </div>
          {countryElements}
       </div>    
    )
}

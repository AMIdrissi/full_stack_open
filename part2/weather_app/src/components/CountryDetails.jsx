const CountryDetails = ({ country }) => {
  if (country === null) {
    return null;
  } else {
    return (
      <div key={country.name.common}>
        <h1>{country.name.common}</h1>

        <p>Capital {country.capital[0]}</p>
        <p>Area {country.area}</p>

        <h3>Languages</h3>
        <ul>
          {Object.values(country.languages).map((language) => (
            <li key={language}>{language}</li>
          ))}
        </ul>
        <img src={country.flags.png} alt={country.flags.alt} />
      </div>
    );
  }
};

export default CountryDetails;

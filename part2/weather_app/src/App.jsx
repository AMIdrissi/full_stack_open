import { useEffect, useState } from "react";
import weatherService from "./services/weatherService";
import CountrySearch from "./components/CountrySearch";
import CountryDetails from "./components/CountryDetails";
import Countries from "./components/Countries";

function MainBody({
  filteredCountries,
  targetCountry,
  searchQuery,
  hanldeShowDetails,
}) {
  const getMessage = () => {
    if (searchQuery === "" || searchQuery === null) {
      return "Enter your search query";
    }
    if (filteredCountries.length > 10) {
      return "Too many matches, specify another filter";
    }
    if (filteredCountries.length === 0) {
      return "No matches found";
    }
  };

  if (filteredCountries.length === 1) {
    const theCountry = filteredCountries[0];
    return <CountryDetails country={theCountry} />;
  } else if (filteredCountries.length <= 10 && filteredCountries.length > 0) {
    return (
      <div>
        <Countries
          countries={filteredCountries}
          hanldeShowDetails={hanldeShowDetails}
        />
        <CountryDetails country={targetCountry} />
      </div>
    );
  } else {
    return <p>{getMessage()}</p>;
  }
}

function App() {
  const [countries, setCountries] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [targetCountry, setTargetCountry] = useState(null);

  useEffect(() => {
    weatherService.getAllCountries().then((data) => {
      setCountries(data);
    });
  }, []);

  const cleanedSearchQuery = searchQuery.trim();

  const hanldeShowDetails = (e, countryName) => {
    setTargetCountry(
      countries.find((country) => country.name.common === countryName),
    );
  };

  const handleCountrySearchQuery = (e) => {
    setSearchQuery(e.target.value);
    setTargetCountry(null);
  };

  const filteredCountries = countries.filter((country) =>
    country.name.common
      .toLowerCase()
      .includes(cleanedSearchQuery.toLocaleLowerCase()),
  );

  return (
    <div>
      <CountrySearch
        searchQuery={cleanedSearchQuery}
        setSearchQuery={handleCountrySearchQuery}
      />
      <MainBody
        filteredCountries={filteredCountries}
        targetCountry={targetCountry}
        searchQuery={cleanedSearchQuery}
        hanldeShowDetails={hanldeShowDetails}
      />
    </div>
  );
}

export default App;

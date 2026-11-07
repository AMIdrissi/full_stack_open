import { useEffect, useState } from "react";
import weatherService from "./services/weatherService";
import CountrySearch from "./components/CountrySearch";
import MainBody from "./components/MainBody";

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

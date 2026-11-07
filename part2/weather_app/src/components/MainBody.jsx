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

export default MainBody;

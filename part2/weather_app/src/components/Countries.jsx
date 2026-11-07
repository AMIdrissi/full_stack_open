const Countries = ({ countries, hanldeShowDetails }) => {
  return (
    <div>
      {countries.map((country) => {
        return (
          <div key={country.name.common}>
            {country.name.common}
            <button
              onClick={(e) => {
                hanldeShowDetails(e, country.name.common);
              }}
            >
              show
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default Countries;

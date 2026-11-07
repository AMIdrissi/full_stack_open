const CountrySearch = ({ searchQuery, setSearchQuery }) => {
  return (
    <div style={{display:"flex", justifyItems:"center"}}>
      find countries 
      <input type="text" value={searchQuery} onChange={setSearchQuery} />
    </div>
  );
};

export default CountrySearch;

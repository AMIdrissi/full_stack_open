
const Filter = ({ searchQuery, setSearchQuery }) => {
  const handleSearchQueryChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div>
      filter shown with:
      <input value={searchQuery} onChange={handleSearchQueryChange} />
    </div>
  );
};

export default Filter;

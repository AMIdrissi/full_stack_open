const Persons = ({ persons, searchQuery, handleDelete }) => {
  const filteredPersons = persons.filter(
    (person) =>
      person.name.toLowerCase().search(searchQuery.toLowerCase()) >= 0,
  );

  const handleDeleteClickEvent = (id) => {
    const person = persons.find((p) => p.id === id);
    let doDelete = confirm(`Do you want to delete ${person.name}`);
    if (doDelete) {
      handleDelete(id);
    }
  };

  if (filteredPersons.length == 0) {
    return (
      <div>
        <p>No contact information found</p>
      </div>
    );
  } else {
    return (
      <div>
        {filteredPersons.map((person) => (
          <div key={person.id} style={{ display: "flex" }}>
            <p>
              {person.name} {person.number}
            </p>
            <span style={{ width: "20px" }}></span>
            <button
              onClick={() => {
                handleDeleteClickEvent(person.id);
              }}
            >
              delete
            </button>
          </div>
        ))}
      </div>
    );
  }
};

export default Persons;

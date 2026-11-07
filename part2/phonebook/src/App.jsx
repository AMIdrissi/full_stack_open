import { useEffect, useState } from "react";
import Filter from "./conponents/Filter";
import PersonForm from "./conponents/PersonForm";
import Persons from "./conponents/Persons";
import personService from "./services/persons";
import NotificationBox from "./conponents/NotificationBox";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [message, setMessage] = useState(null);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    personService.getAll().then((persons) => {
      setPersons(persons);
    });
  }, []);

  const handleDelete = (id) => {
    personService.deletePerson(id).then(() => {
      setPersons(persons.filter((person) => person.id !== id));
    });
  };

  return (
    <div>
      <h2>Phonebook</h2>

      <NotificationBox message={message} isError={isError} />
      <Filter searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      <h3>add new</h3>

      <PersonForm
        newName={newName}
        newNumber={newNumber}
        persons={persons}
        setNewName={setNewName}
        setNewNumber={setNewNumber}
        setPersons={setPersons}
        setMessage={setMessage}
        setIsError={setIsError}
      />
      <h3>Numbers</h3>
      <Persons
        persons={persons}
        searchQuery={searchQuery}
        handleDelete={handleDelete}
      />
    </div>
  );
};

export default App;

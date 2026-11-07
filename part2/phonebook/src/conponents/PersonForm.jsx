import personService from "../services/persons";

const PersonForm = ({
  newName,
  setNewName,
  newNumber,
  setNewNumber,
  persons,
  setPersons,
  setMessage,
  setIsError,
}) => {
  const resetMessage = () => {
    setTimeout(() => {
      setMessage(null);
    }, 5000);
  };

  const handleUpdate = ({ personThatExists, newNumber }) => {
    let doUpdate = confirm(
      `${personThatExists.name} is already added to phonebook, replace the old number with a new one ?`,
    );
    if (doUpdate) {
      const newPerson = {
        ...personThatExists,
        number: newNumber,
      };
      personService
        .updatePerson(newPerson)
        .then((person) => {
          setPersons(persons.map((p) => (p.id === person.id ? person : p)));
          setIsError(false);
          setMessage(`Phone number for ${person.name} has been updated`);
          setNewName("");
          setNewNumber("");

          resetMessage();
        })
        .catch((error) => {
          setIsError(true);
          setMessage(
            `Information of ${personThatExists.name} has already been removed from the server`,
          );
          resetMessage();
        });
    }
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();

    const newNameValue = newName.trim();
    const personThatExists = persons.find(
      (person) => person.name === newNameValue,
    );
    if (!personThatExists) {
      personService
        .createPerson({ newNameValue, newNumber })
        .then((person) => {
          setPersons(persons.concat(person));
          setIsError(false);
          setMessage(`Added ${newNameValue}`);
          setNewName("");
          setNewNumber("");

          resetMessage();
        })
        .catch((error) => {
          setIsError(true);
          setMessage(
            `Information of ${newNameValue} has already been removed from the server`,
          );
          resetMessage();
        });
    } else {
      handleUpdate({
        personThatExists,
        newNumber,
      });
    }
  };

  const handleTextChange = (e) => {
    setNewName(e.target.value);
  };

  const handleNumberChange = (e) => {
    const number = e.target.value;
    setNewNumber(number);
  };

  return (
    <form onSubmit={handleOnSubmit}>
      <div>
        name: <input value={newName} onChange={handleTextChange} />
      </div>
      <div>
        number: <input value={newNumber} onChange={handleNumberChange} />
      </div>

      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default PersonForm;

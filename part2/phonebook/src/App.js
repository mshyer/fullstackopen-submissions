import { useState } from 'react';
import People from './components/People';
import Filter from './components/Filter';
import Form from './components/Form'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 0 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 1 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 2 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 3 }
  ]);

  const [newName, setNewName] = useState('');

  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState('');
  const [filtered, setFiltered] = useState(null);

  const filteredPersons = function(filter) {
    return persons.filter(person => {
      return person.name.toLowerCase().includes(filter.toLowerCase());
    })
  }

  const handleFilterChange = function(eve) {
    setFilter(eve.target.value);
    setFiltered(filteredPersons(eve.target.value));
  }
  const noDuplicates = function() {
    let noDuplicate = true;
    persons.forEach(person => {
      if (person.name === newName) {
        noDuplicate = false;
      }
    });
    return noDuplicate;
  };

  const handleUpdateName = function(eve) {
    setNewName(eve.target.value);
  };

  const handleUpdateNumber = function(eve) {
    setNewNumber(eve.target.value);
  }

  const handleNewContact = function(eve) {
    eve.preventDefault();
    if (noDuplicates()) {
      setPersons(
        persons.concat(
          {name: newName, id: persons.length, number: newNumber})
      )
      setFiltered(null);
      setNewName('');
      setNewNumber('');
    } else {
      alert(`${newName} is already added to phonebook`)
    }
  }
  console.log(persons)

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        <Filter handler={handleFilterChange}/>
      </div>
      <Form 
        handleSubmit={handleNewContact}
        handleUpdateName={handleUpdateName}
        handleUpdateNumber={handleUpdateNumber} 
        newName={newName}
        newNumber={newNumber}
        />
      <h2>Numbers</h2>
      <People contacts={
        filtered === null ? persons : filtered
        } />
    </div>
  );
}

export default App;

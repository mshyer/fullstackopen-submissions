import { useState, useEffect } from 'react';
import axios from 'axios';

import People from './components/People';
import Filter from './components/Filter';
import Form from './components/Form'
import services from './services/phonebook';

const App = () => {
  // const [persons, setPersons] = useState([
  //   { name: 'Arto Hellas', number: '040-123456', id: 0 },
  //   { name: 'Ada Lovelace', number: '39-44-5323523', id: 1 },
  //   { name: 'Dan Abramov', number: '12-43-234345', id: 2 },
  //   { name: 'Mary Poppendieck', number: '39-23-6423122', id: 3 }
  // ]);
  const [persons, setPersons] = useState([]);

  useEffect(() => {
    services.getAll()
    .then(response => {
      setPersons(response.data);
    }).catch(err => {
      console.error(err);
    });
  }, []);



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
      services.create({ 
        name: newName,
        id: Math.max(...persons.map(person => person.id)) + 1,
        number: newNumber })
        .then(response => {
          setPersons(
            persons.concat(
              response.data
            )
          )
        }).catch(err => {
          console.error('There was an error: ' + err)
        })

      setFiltered(null);
      setNewName('');
      setNewNumber('');
    } else {
      if (window.confirm(`${newName} is already added to phonebook, Replace the old number with a new one?`)) {
        let person = persons.find(person => person.name === newName);
        let id = person.id;
        services.update(id, { ...person, number: newNumber })
          .then(response => {
            setPersons(persons.map(person => {
              return person.id === id ? response.data : person;
            }))
            // setPersons(persons.map(person => {
          })
      }
    }
  };

  const handleDelete = function(id) {
    if (window.confirm('Do you really want to delete the person?')) {
      services.remove(id).then(response => {
        setPersons(
          persons.filter(person => person.id !== id)
        )
        setFiltered(null);
        setNewName('');
        setNewNumber('');
        
      })
    }
  };

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
      <People 
        contacts={filtered === null ? persons : filtered}
        handleDelete={handleDelete}/>
    </div>
  );
}

export default App;

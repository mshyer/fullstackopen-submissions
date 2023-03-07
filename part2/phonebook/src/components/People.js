const People = ({contacts}) => {
  return (
    <>
      {contacts.map(contact => {
        return <p key={contact.id}>{contact.name}: {contact.number}</p>
      })}
    </>
  );
};

export default People;
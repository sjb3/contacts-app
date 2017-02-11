class Contact extends React.Component {
  render() {
    return <div>{this.props.name}</div>;
  }
}

class ContactList extends React.Component {
  render() {
    // 11/ 2. you can use curly braces in JSX to execute javascript.
    // here we use {} to let us use map to dynamically render contacts
    return (
      <div>
        <h2>Contacts List</h2>
        {
          // 4/ 3. this.props is an array so we can map an array of objects to an array of Contacts
          this.props.contacts.map(contact => {
            // 4. React needs help knowing which elements to re-render, so we give each one a key
            return <Contact name={contact.name} key={contact.name}/>
          })
        }
      </div>
    );
  }
}

// 11/ 1. here's the data source for our contacts list. we've added some fields we'll need later.
const contacts = [
  {
    name: 'Albert Einstein',
    planet: 'Earth',
    isFavorite: true
  }, {
    name: 'Steve Jobs',
    planet: 'Earth',
    isFavorite: false
  }
];

ReactDOM.render(
  // 5. pass in the list of contacts as an attribute/prop to the ContactList
  <ContactList contacts={contacts}/>,
  document.getElementById('root')
)
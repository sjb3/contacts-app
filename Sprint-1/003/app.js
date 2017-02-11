class Contact extends React.Component {
  render() { return <div>{this.props.name}</div>;}
}

class ContactList extends React.Component {
  render() {
    // 4/ 2. we want to sort a copy of the data, not the original source, so we use .slice() to copy
    const sorted = this.props.contacts.slice().sort((a, b) => {
      // 3. A > B > S
      return a.name > b.name;
    })
    return (
      <div>
        <h2>Contacts List</h2>
        {
          // 4. here use sorted instead of this.props.contacts
          sorted.map(contact => {
            return <Contact name={contact.name} key={contact.name}/>
          })
        }
      </div>
    );
  }
}

// 5/ 1. add another contact in the last position that when sorted will be in the second position
const contacts = [
  {name: 'Albert Einstein', planet: 'Earth', isFavorite: true},
  {name: 'Steve Jobs', planet: 'Earth', isFavorite: false},
  {name: 'Bob the Builder', planet: 'Earth', isFavorite: false}
];

ReactDOM.render(
  <ContactList contacts={contacts}/>,
  document.getElementById('root')
)
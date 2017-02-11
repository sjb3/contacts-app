class Contact extends React.Component {
  render() {
    return <div>{this.props.name}</div>;
  }
}

// 13/ Create a new component to contain all of our contacts
class ContactList extends React.Component {
  render() {
    // 8/ use parenthesis when returning over multiple lines
    return (
      // 5/ only ONE root element can be returned
      <div>
        <h2>Contacts List</h2>
        <Contact name="Albert Einstein" />
        <Contact name="Steve Jobs" />  
      </div>
    );
  }
}

ReactDOM.render(
  <ContactList />,
  document.getElementById('root')
)